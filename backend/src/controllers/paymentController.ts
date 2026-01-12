import { Request, Response } from 'express';
import prisma from '../utils/prismaClient';
import fs from 'fs';
import path from 'path';

// Helper to delete file if validation fails
const cleanupFile = (filePath: string) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

export const submitPayment = async (req: Request, res: Response) => {
    console.log("PAYMENT SUBMIT API HIT", req.body);
    // 1. File Check
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Proof of payment file is required.' });
    }

    const { orderId, amount, method, date, notes } = req.body;
    const userId = (req as any).user?.userId; // Assuming authMiddleware populates this

    // Combine date into notes for admin reference
    const combinedNotes = date ? `Paid on: ${date}\n${notes || ''}` : notes;

    // 2. Input Validation
    if (!orderId || !amount || !method || !date) {
        cleanupFile(req.file.path);
        return res.status(400).json({ success: false, message: 'Missing required payment details.' });
    }

    try {
        const orderIdInt = parseInt(orderId);
        const amountFloat = parseFloat(amount);

        // 3. Order Validation
        const order = await prisma.order.findUnique({
            where: { id: orderIdInt },
            include: { payment: true }
        });

        if (!order) {
            cleanupFile(req.file.path);
            return res.status(404).json({ success: false, message: 'Order not found.' });
        }

        if (order.user_id !== userId) {
            cleanupFile(req.file.path);
            return res.status(403).json({ success: false, message: 'Unauthorized access to this order.' });
        }

        if (order.payment_status === 'active' || order.payment_status === 'paid' || order.payment_status === 'approved') {
            cleanupFile(req.file.path);
            return res.status(400).json({ success: false, message: 'Order is already paid.' });
        }

        // Check for existing active submission
        if (order.payment && order.payment.status === 'submitted') {
            cleanupFile(req.file.path);
            return res.status(400).json({ success: false, message: 'A payment is already under review for this order.' });
        }

        // 4. Secure File Renaming
        // Rename from temp to: payment_{orderId}_{timestamp}.ext
        const timestamp = Date.now();
        const ext = path.extname(req.file.originalname);
        const newFilename = `payment_${orderIdInt}_${timestamp}${ext}`;
        const newPath = path.join('uploads/payments', newFilename);

        // Rename logic
        fs.renameSync(req.file.path, newPath);

        // 5. Database Transaction
        const result = await prisma.$transaction(async (tx) => {
            // Upsert Payment (Create or Update if rejected previously)
            const payment = await tx.payment.upsert({
                where: { order_id: orderIdInt },
                update: {
                    method,
                    amount: amountFloat,
                    proof_url: `payments/${newFilename}`,
                    status: 'submitted',
                    submitted_at: new Date(),
                    notes: combinedNotes || null,
                    rejection_reason: null // Clear previous rejection
                },
                create: {
                    order_id: orderIdInt,
                    method,
                    amount: amountFloat,
                    proof_url: `payments/${newFilename}`,
                    status: 'submitted',
                    notes: combinedNotes || null
                }
            });

            // Update Order Status
            await tx.order.update({
                where: { id: orderIdInt },
                data: {
                    payment_status: 'submitted',
                    status: 'verifying', // Important for Admin Dashboard to see it
                    service_status: order.service_status === 'active' ? 'active' : 'hold' // Hold if not active
                }
            });

            // Log Activity
            await tx.activityLog.create({
                data: {
                    user_id: userId,
                    action: 'PAYMENT_SUBMITTED',
                    entity_type: 'PAYMENT',
                    entity_id: payment.id.toString(),
                    ip_address: req.ip,
                    metadata: JSON.stringify({
                        orderId: orderIdInt,
                        amount: amountFloat,
                        method,
                        file: newFilename
                    })
                }
            });

            return payment;
        });

        // 6. Success Response
        console.log("PAYMENT SAVED TO DB", result.id);
        res.json({
            success: true,
            message: 'Payment submitted successfully.',
            payment: result
        });

    } catch (error) {
        console.error('Payment Submission Error:', error);
        cleanupFile(req.file.path); // Ensure temp file is gone

        // Internal logging handled, return generic error
        res.status(500).json({
            success: false,
            message: 'Internal server error during payment submission.'
        });
    }
};

// Admin: Approve Payment
// Import services
import { provisionServer } from '../services/provisioningService';
import { sendServerDeployedEmail } from '../services/emailService';

export const approvePayment = async (req: Request, res: Response) => {
    const { orderId } = req.body;
    const adminId = (req as any).user?.userId;

    if (!orderId) return res.status(400).json({ success: false, message: "Order ID required" });

    try {
        const orderIdInt = parseInt(orderId);

        // Step 1: Mark Payment Approved (DB Transaction)
        const { order, payment } = await prisma.$transaction(async (tx) => {
            const ord = await tx.order.findUnique({
                where: { id: orderIdInt },
                include: { payment: true, user: true } // Include user for provisioning
            });

            if (!ord || !ord.payment) throw new Error("Order or payment submission not found");
            if (ord.payment.status === 'approved') throw new Error("Payment already approved");

            const pay = await tx.payment.update({
                where: { order_id: orderIdInt },
                data: { status: 'approved', approved_at: new Date() }
            });

            // Set to verifying/provisioning state
            await tx.order.update({
                where: { id: orderIdInt },
                data: {
                    payment_status: 'paid',
                    status: 'provisioning',
                    service_status: 'pending' // provisioning
                }
            });

            // Log Admin Action
            await tx.activityLog.create({
                data: {
                    user_id: adminId,
                    action: 'PAYMENT_APPROVED',
                    entity_type: 'PAYMENT',
                    entity_id: pay.id.toString(),
                    ip_address: req.ip,
                    metadata: JSON.stringify({ orderId: orderIdInt, adminId })
                }
            });

            return { order: ord, payment: pay };
        });

        // Step 2: Trigger Auto Provisioning (External API)
        // We do this OUTSIDE the transaction to avoid locking DB during API calls
        try {
            const serverCreds = await provisionServer(order);

            // Step 3: Save Server Details & Activate Order
            await prisma.$transaction(async (tx) => {
                await tx.server.create({
                    data: {
                        order_id: order.id,
                        node_name: serverCreds.node_name,
                        ip_address: serverCreds.ip_address,
                        port: serverCreds.port,
                        status: 'online'
                    }
                });

                await tx.order.update({
                    where: { id: order.id },
                    data: {
                        status: 'active',
                        service_status: 'active'
                    }
                });
            });

            // Step 4: Send Credentials Email
            // We pass the credentials + panel url if available
            await sendServerDeployedEmail(order.user.email, serverCreds);

            res.json({ success: true, message: "Payment Approved. Server Provisioned & Activated!", payment });

        } catch (provisionError: any) {
            console.error("Provisioning Failed:", provisionError);

            // Fallback: Mark as Provision Failed
            await prisma.order.update({
                where: { id: order.id },
                data: { status: 'provision_failed' }
            });

            res.status(200).json({
                success: true,
                message: "Payment Approved, but Auto-Provisioning Failed. Admin intervention required.",
                warning: true
            });
        }

    } catch (error: any) {
        console.error("Approval Error:", error);
        res.status(400).json({ success: false, message: error.message || "Approval failed" });
    }
};

// Admin: Reject Payment
export const rejectPayment = async (req: Request, res: Response) => {
    const { orderId, reason } = req.body;
    const adminId = (req as any).user?.userId;

    if (!orderId || !reason) return res.status(400).json({ success: false, message: "Order ID and Reason required" });

    try {
        const orderIdInt = parseInt(orderId);

        const result = await prisma.$transaction(async (tx) => {
            const order = await tx.order.findUnique({
                where: { id: orderIdInt },
                include: { payment: true }
            });

            if (!order || !order.payment) throw new Error("Order or payment submission not found");

            // 2. Reject Payment
            const payment = await tx.payment.update({
                where: { order_id: orderIdInt },
                data: {
                    status: 'rejected',
                    rejection_reason: reason
                }
            });

            // 3. Update Order Status (Keep on hold/pending, but mark payment as rejected)
            await tx.order.update({
                where: { id: orderIdInt },
                data: {
                    payment_status: 'rejected'
                    // service_status remains 'hold' or 'pending'
                }
            });

            // 4. Log Activity
            await tx.activityLog.create({
                data: {
                    user_id: adminId,
                    action: 'PAYMENT_REJECTED',
                    entity_type: 'PAYMENT',
                    entity_id: payment.id.toString(),
                    ip_address: req.ip,
                    metadata: JSON.stringify({ orderId: orderIdInt, reason })
                }
            });

            // TODO: Send Email Notification (Payment Rejected)

            return payment;
        });

        res.json({ success: true, message: "Payment Rejected", payment: result });

    } catch (error: any) {
        console.error("Rejection Error:", error);
        res.status(400).json({ success: false, message: error.message || "Rejection failed" });
    }
};
