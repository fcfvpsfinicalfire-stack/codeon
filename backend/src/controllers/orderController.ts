import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prismaClient';
import { createMagicLink } from '../services/magicLinkService';
import { sendWelcomeEmail, sendMagicLinkEmail } from '../services/emailService';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// The core flow: Order + User Detection + Auto Login Token
export const createOrder = async (req: Request, res: Response) => {
    const {
        email,
        password,
        username,
        fullName,
        serviceType,
        planName,
        amount,
        ram,
        idempotencyKey // New: UUID
    } = req.body;

    // 1. Idempotency Check
    if (idempotencyKey) {
        const existingOrder = await prisma.order.findUnique({
            where: { idempotency_key: idempotencyKey }
        });
        if (existingOrder) {
            return res.json({
                success: true,
                message: 'Order already exists',
                orderId: existingOrder.id,
                orderCode: existingOrder.order_code,
                // Do not return token here for safety, or return if it was just created (requires more state).
                // Simplest: Just return order info. User might need to login if they lost the token.
                existing: true
            });
        }
    }

    try {
        let user = await prisma.user.findUnique({ where: { email } });
        let isNewUser = false;
        let canAutoLogin = false;

        // 2. User Detection Logic
        if (user) {
            // Case: Existing User
            if (user.password_hash) {
                // Has password -> REQUIRE LOGIN (No Auto Login)
                // However, user is placing an order. We can allow the order to be placed as "Draft" or "Pending" checks.
                // But the requirement says: "Password thiyenawa -> login required" (at order start? or allows order but no auto-login?)
                // The requirement says "Order temp state hold".
                // If password exists, we should probably ERROR here if not authenticated, OR allow order but force them to login to pay.

                // Let's check if they are already authenticated via header
                const authHeader = req.headers['authorization'];
                let isAuthenticated = false;
                if (authHeader) {
                    try {
                        const token = authHeader.split(' ')[1];
                        const v: any = jwt.verify(token, JWT_SECRET);
                        if (v.userId === user.id) isAuthenticated = true;
                    } catch (e) { }
                }

                if (!isAuthenticated) {
                    // Require Login
                    // We can opt to either reject the order OR create it and tell them to login.
                    // The user said "Password thiyenawa -> login required".
                    // This likely means blocking the order flow until login?
                    // Or allowing the order but returning { requiresLogin: true }.
                    // Let's return a specific status so frontend can pop up a login modal.
                    // BUT, if they entered a password in the request (e.g. they typed it), we can try to auth.
                    if (password) {
                        const match = await bcrypt.compare(password, user.password_hash);
                        if (!match) return res.status(401).json({ error: 'Invalid password.' });
                        canAutoLogin = true; // They proved identity
                    } else {
                        return res.status(403).json({ error: 'Account exists. Please login.', requiresLogin: true });
                    }
                } else {
                    canAutoLogin = true; // Already logged in
                }

            } else {
                // No password (Magic Link User) -> ALLOW Auto Login (One-time) logic?
                // User said "Password naththang -> magic link allowed".
                // We can treat this as "Can Auto Login" for this session since they provided email (and maybe we send a magic link too?).
                // "Magic link auto send".
                canAutoLogin = true; // Treat as trusted for the flow, but send link.
            }
        } else {
            // Case: New User -> Auto Create
            isNewUser = true;

            let passwordHash = null;
            if (password) {
                passwordHash = await bcrypt.hash(password, 10);
            }

            user = await prisma.user.create({
                data: {
                    email,
                    username: username || email.split('@')[0] + Math.floor(Math.random() * 1000),
                    full_name: fullName || 'Client',
                    role: 'client',
                    status: 'active',
                    password_hash: passwordHash
                }
            });
            canAutoLogin = true; // New user is definitely the owner
        }

        // 3. Create Order (Status: DRAFT or PAYMENT_PENDING)
        // Since this is "Direct Order" (pre-payment usually), we set to PENDING_PAYMENT or DRAFT.
        // User said: "Order Click -> Draft".
        // Let's use 'draft' as default.
        const orderCode = `CO-${Math.floor(1000 + Math.random() * 9000)}`;
        const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';

        const order = await prisma.order.create({
            data: {
                user_id: user.id,
                order_code: orderCode,
                service_type: serviceType || 'minecraft',
                plan_name: planName || 'Starter',
                ram_gb: ram ? parseInt(ram) : 4,
                price_lkr: parseFloat(amount),
                payment_status: 'pending',
                status: 'draft',
                idempotency_key: idempotencyKey,
                ip_address: clientIp as string
            }
        });

        // 4. Send Magic Link / Welcome Email
        let magicLinkToken = "";
        if (isNewUser || !user.password_hash) {
            magicLinkToken = await createMagicLink(user.id);
            const magicLinkUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/magic-login?token=${magicLinkToken}`;
            await sendMagicLinkEmail(user.email, magicLinkUrl);
        } else if (isNewUser) {
            // Welcome email
            await sendWelcomeEmail(user.email, user.full_name || 'Client', orderCode);
        }

        // 5. Generate Auto-Login Token (Scoped)
        let token = null;
        if (canAutoLogin) {
            token = jwt.sign(
                {
                    userId: user.id,
                    role: user.role,
                    scope: 'checkout_login' // SCOPED TOKEN
                },
                JWT_SECRET,
                { expiresIn: '15m' } // Short-lived
            );
        }

        res.json({
            success: true,
            token, // Returning this allows frontend to auto-login
            orderId: order.id,
            orderCode: order.order_code,
            user: {
                id: user.id,
                email: user.email,
                name: user.full_name,
                hasPassword: !!user.password_hash
            },
            status: 'draft'
        });

    } catch (error: any) {
        console.error("Order Error:", error);
        res.status(500).json({ error: 'Order processing failed', details: error.message });
    }
};

export const getMyOrders = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.userId;
    try {
        const orders = await prisma.order.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' },
            include: {
                server: true
            }
        });
        res.json(orders);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

export const toggleAutoRenew = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.userId;
    const { id } = req.params;

    try {
        const order = await prisma.order.findUnique({ where: { id: parseInt(id) } });

        if (!order || order.user_id !== userId) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { auto_renew: !order.auto_renew }
        });

        res.json({ success: true, auto_renew: updatedOrder.auto_renew });
    } catch (error) {
        res.status(500).json({ error: 'Failed to toggle auto-renew' });
    }
};

export const getTrustStatus = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.userId;
    const { id } = req.params;

    try {
        const orderId = parseInt(id);
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { payment: true }
        });

        if (!order) return res.status(404).json({ error: 'Order not found' });
        if (order.user_id !== userId) return res.status(403).json({ error: 'Unauthorized' });

        // Logic to determine step
        let step = "ORDER_CREATED";
        let message = "Your order is secured. No payment yet.";
        let verified = false;

        // Payment status check
        if (order.payment_status === 'rejected') {
            step = "REJECTED";
            message = `Payment rejected: ${order.payment?.rejection_reason || 'Verification failed'}`;
        } else if (order.service_status === 'active' || order.status === 'active') {
            step = "ACTIVE";
            message = "🎉 Your service is live and ready to use.";
            verified = true;
        } else if (order.payment_status === 'submitted' || order.status === 'verifying') {
            step = "UNDER_REVIEW";
            message = "Our billing team is verifying your payment. Typical verification time: 5–30 minutes.";
            verified = true; // Payment submitted implies some level of progress (user side done)
        } else if (order.payment_status === 'paid') {
            // Paid but not active?
            step = "UNDER_REVIEW"; // Still setting up
            verified = true;
        }

        // Fetch latest relevant activity
        const latestLog = await prisma.activityLog.findFirst({
            where: {
                entity_id: order.payment?.id.toString(), // Logged against payment usually
                entity_type: 'PAYMENT'
            },
            orderBy: { created_at: 'desc' }
        });

        res.json({
            step,
            verified,
            message,
            updatedAt: latestLog?.created_at || order.created_at,
            rejectionById: order.payment?.rejection_reason // In case needed specifically
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to fetch trust status" });
    }
};
