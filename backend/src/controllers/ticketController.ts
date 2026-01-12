import { Request, Response } from 'express';
import prisma from '../utils/prismaClient';

export const getMyTickets = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.userId;
    try {
        const tickets = await prisma.ticket.findMany({
            where: { user_id: userId },
            orderBy: { updated_at: 'desc' },
            include: {
                order: { select: { order_code: true } },
                messages: { orderBy: { created_at: 'asc' } }
            }
        });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
};

export const createTicket = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.userId;
    const { subject, message, orderId, category, priority } = req.body;
    console.log("TICKET CREATE HIT", { userId, subject });

    try {
        const ticket = await prisma.ticket.create({
            data: {
                user_id: userId,
                subject,
                order_id: orderId ? parseInt(orderId) : null,
                category: category || 'general',
                priority: priority || 'low',
                status: 'open',
                messages: {
                    create: {
                        sender: 'client',
                        message: message
                    }
                }
            },
            include: { messages: true }
        });
        res.json(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create ticket' });
    }
};

export const replyTicket = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.userId;
    const { ticketId } = req.params;
    const { message } = req.body;

    try {
        const ticket = await prisma.ticket.findFirst({
            where: { id: ticketId, user_id: userId }
        });

        if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

        if (ticket.status === 'closed') {
            return res.status(400).json({ error: 'Ticket is closed' });
        }

        const newMessage = await prisma.ticketMessage.create({
            data: {
                ticket_id: ticket.id,
                sender: 'client',
                message: message
            }
        });

        // Update ticket updated_at and status if needed (client reply usually keeps it open)
        const updatedTicket = await prisma.ticket.update({
            where: { id: ticket.id },
            data: { status: 'open' },
            include: { messages: { orderBy: { created_at: 'asc' } } }
        });

        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ error: 'Failed to reply' });
    }
};
