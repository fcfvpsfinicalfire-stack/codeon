import { Request, Response } from 'express';
import prisma from '../utils/prismaClient';
import { sendServerDeployedEmail } from '../services/emailService';
import { createNotification } from './notificationController';

// Admin: Approve Order -> Activate Service
export const approveOrder = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.body;
        // @ts-ignore
        const adminId = req.user?.userId;

        if (!orderId) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        // 1. Update Order & Payment Status
        const order = await prisma.order.update({
            where: { id: parseInt(orderId) },
            data: {
                status: 'active',
                payment_status: 'active', // or 'paid'
                payment: {
                    update: {
                        status: 'approved'
                    }
                }
            },
            include: { user: true }
        });

        // 2. Create Server Record (Simulate Deployment)
        const server = await prisma.server.create({
            data: {
                order_id: order.id,
                node_name: 'Node-Alpha-01', // Logic to select node
                ip_address: '192.168.1.' + Math.floor(Math.random() * 255),
                port: 25500 + Math.floor(Math.random() * 1000),
                status: 'online' // Instant activation for now
            }
        });

        // 3. Notify User (Simulate Email)
        await sendServerDeployedEmail(order.user.email, {
            node_name: server.node_name,
            ip_address: server.ip_address,
            port: server.port
        });
        console.log(`[EMAIL SENT] To: ${order.user.email} | Subject: Your Server is Ready!`);

        // TRIGGER NOTIFICATION
        await createNotification(
            order.user_id,
            'success',
            'Service Activated',
            `Your server ${server.node_name} has been deployed successfully.`
        );

        // 4. Log Activity
        await prisma.activityLog.create({
            data: {
                user_id: adminId, // Admin who did this
                action: `Approved Order ${order.order_code}`
            }
        });

        res.json({ success: true, order, server });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Order approval failed' });
    }
}


// Admin: Reject Order
export const rejectOrder = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.body;
        // @ts-ignore
        const adminId = req.user?.userId;

        if (!orderId) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        const order = await prisma.order.update({
            where: { id: parseInt(orderId) },
            data: {
                status: 'cancelled',
                payment_status: 'failed',
                payment: {
                    update: { status: 'rejected' }
                }
            },
            include: { user: true }
        });

        // Notify User
        await createNotification(
            order.user_id,
            'alert', // red alert
            'Order Rejected',
            `Your order #${order.order_code} has been rejected. Please contact support.`
        );

        // Log Activity
        await prisma.activityLog.create({
            data: {
                user_id: adminId,
                action: `Rejected Order ${order.order_code}`
            }
        });

        console.log(`[ORDER REJECTED] ID: ${order.id} by Admin: ${adminId}`);
        res.json({ success: true, order });

    } catch (error) {
        console.error("REJECT ERROR:", error);
        res.status(500).json({ error: 'Order rejection failed' });
    }
};

export const getPendingOrders = async (req: Request, res: Response) => {
    console.log("ADMIN FETCH PENDING ORDERS");
    try {
        const orders = await prisma.order.findMany({
            where: { status: { in: ['pending', 'verifying', 'pending_payment'] } },
            include: { user: true, payment: true },
            orderBy: { created_at: 'desc' }
        });
        res.json(orders);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch pending orders" });
    }
}

export const getAllOrders = async (req: Request, res: Response) => {
    console.log("ADMIN FETCH ALL ORDERS HIT");
    try {
        const orders = await prisma.order.findMany({
            include: { user: true, payment: true, server: true },
            orderBy: { created_at: 'desc' }
        });
        console.log(`ADMIN FETCH ALL ORDERS: Found ${orders.length} orders`);
        res.json(orders);
    } catch (e) {
        console.error("ADMIN FETCH ALL ORDERS ERROR:", e);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

export const getClients = async (req: Request, res: Response) => {
    console.log("ADMIN FETCH CLIENTS");
    try {
        const clients = await prisma.user.findMany({
            where: { role: 'client' },
            include: {
                orders: { select: { plan_name: true, status: true } }
            },
            orderBy: { created_at: 'desc' }
        });

        // Format for frontend
        const formattedClients = clients.map(c => ({
            id: c.id,
            name: c.full_name || c.username,
            email: c.email,
            status: c.status,
            joined_at: c.created_at,
            plan: c.orders.length > 0 ? c.orders[0].plan_name : 'No Plan',
            order_count: c.orders.length
        }));

        res.json(formattedClients);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch clients" });
    }
};

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const totalRevenue = await prisma.order.aggregate({
            _sum: { price_lkr: true },
            where: { payment_status: 'active' } // or 'paid'
        });

        const activeSubs = await prisma.order.count({
            where: { status: 'active' }
        });

        const pendingCount = await prisma.order.count({
            where: { status: { in: ['pending', 'verifying', 'pending_payment'] } }
        });

        // Mock Chart Data for now (or calculate real if enough data)
        const chart_data = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            revenue: 10000 + Math.random() * 5000
        }));

        res.json({
            total_revenue: totalRevenue._sum.price_lkr || 0,
            active_subs: activeSubs,
            pending_orders: pendingCount,
            chart_data
        });
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }
};

export const getSystemLogs = async (req: Request, res: Response) => {
    try {
        const logs = await prisma.activityLog.findMany({
            orderBy: { created_at: 'desc' },
            take: 50,
            include: { user: { select: { email: true } } }
        });

        const formattedLogs = logs.map(l => ({
            time: l.created_at,
            level: 'info', // default
            message: `${l.user?.email || 'System'}: ${l.action}`
        }));

        res.json(formattedLogs);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch logs" });
    }
};

// --- SUPPORT TICKETS ---

export const getAllTickets = async (req: Request, res: Response) => {
    try {
        const tickets = await prisma.ticket.findMany({
            orderBy: { updated_at: 'desc' },
            include: {
                user: { select: { email: true, full_name: true } },
                messages: { orderBy: { created_at: 'asc' } }
            }
        });
        res.json(tickets);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to fetch tickets" });
    }
};

export const adminReplyTicket = async (req: Request, res: Response) => {
    const { ticketId, message } = req.body;

    try {
        const ticket = await prisma.ticket.findUnique({
            where: { id: ticketId }
        });

        if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

        await prisma.ticketMessage.create({
            data: {
                ticket_id: ticketId,
                sender: 'admin',
                message: message
            }
        });

        const updatedTicket = await prisma.ticket.update({
            where: { id: ticketId },
            data: {
                status: 'replied',
                updated_at: new Date()
            },
            include: { messages: { orderBy: { created_at: 'asc' } }, user: true }
        });

        // Trigger Notification
        await createNotification(
            ticket.user_id,
            'info',
            'Support Ticket Update',
            `Admin replied to ticket #${ticket.id}`
        );

        res.json(updatedTicket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to reply' });
    }
};

export const closeTicket = async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    try {
        const ticket = await prisma.ticket.update({
            where: { id: ticketId },
            data: { status: 'closed' }
        });
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Failed to close ticket' });
    }
};

// --- CLIENT DETAILS ---

export const getClientDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: "Client ID required" });

        const user = await prisma.user.findUnique({
            where: { id: parseInt(id as string) },
            include: {
                orders: {
                    orderBy: { created_at: 'desc' },
                    select: {
                        id: true, order_code: true, plan_name: true, price_lkr: true,
                        status: true, payment_status: true, created_at: true
                    }
                },
                activityLogs: {
                    orderBy: { created_at: 'desc' },
                    take: 20
                }
            }
        });

        if (!user) return res.status(404).json({ error: "User not found" });

        const payload = {
            profile: {
                id: user.id,
                name: user.full_name || user.username,
                email: user.email,
                joinDate: user.created_at
            },
            orders: user.orders.map(o => ({
                id: o.order_code || o.id,
                product: o.plan_name,
                price: `LKR ${o.price_lkr}`,
                status: o.status,
                date: o.created_at
            })),
            logs: user.activityLogs.map(l => ({
                date: l.created_at.toISOString().split('T')[0],
                action: l.action,
                ip: '192.168.x.x' // Placeholder as we don't track IP yet
            }))
        };

        res.json(payload);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to fetch client details" });
    }
};
