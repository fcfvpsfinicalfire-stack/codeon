import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Get all notifications for the authenticated user
export const getNotifications = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;

        const notifications = await prisma.notification.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' },
            take: 20 // Limit to recent 20
        });

        const unreadCount = await prisma.notification.count({
            where: { user_id: userId, read: false }
        });

        res.json({ notifications, unreadCount });
    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};

// Mark a notification as read
export const markAsRead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = (req as any).user.userId;

        // Optionally mark ALL as read if id is 'all'
        if (id === 'all') {
            await prisma.notification.updateMany({
                where: { user_id: userId, read: false },
                data: { read: true }
            });
            return res.json({ message: 'All notifications marked as read' });
        }

        const notification = await prisma.notification.findUnique({
            where: { id }
        });

        if (!notification || notification.user_id !== userId) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        const updated = await prisma.notification.update({
            where: { id },
            data: { read: true }
        });

        res.json(updated);
    } catch (error) {
        console.error('Mark read error:', error);
        res.status(500).json({ error: 'Failed to update notification' });
    }
};

// Internal helper to create notification
export const createNotification = async (userId: number, type: string, title: string, message: string) => {
    try {
        await prisma.notification.create({
            data: {
                user_id: userId,
                type,
                title,
                message
            }
        });
    } catch (error) {
        console.error('Create notification error:', error);
        // Don't throw, just log (notifications shouldn't break core flow)
    }
};
