import cron from 'node-cron';
import prisma from '../utils/prismaClient';
import { sendPaymentReminder } from './emailService';

export const initCronJobs = () => {
    console.log('[CRON] ⏳ Initializing System Cron Jobs...');

    // Rule: Run every 10 minutes
    // In production, maybe every hour. For dev/demo, 10 mins is good.
    cron.schedule('*/10 * * * *', async () => {
        console.log('[CRON] 🔄 Running Auto Payment Reminder Check...');
        await checkUnpaidOrders();
    });
};

const checkUnpaidOrders = async () => {
    try {
        const now = new Date();

        // 1. Fetch ALL Orders strictly pending payment for >6 hours
        // We only care about orders created > 6 hours ago
        const orders = await prisma.order.findMany({
            where: {
                payment_status: 'pending', // Only if not submitted/paid
                created_at: {
                    lt: new Date(now.getTime() - 6 * 60 * 60 * 1000) // Older than 6h
                },
                // Exclude cancelled/rejected if needed, though they might be 'failed' payment status
                status: {
                    notIn: ['cancelled', 'provision_failed']
                }
            },
            include: { user: true }
        });

        for (const order of orders) {
            const hoursSince = (now.getTime() - order.created_at.getTime()) / (1000 * 60 * 60);

            // Define Reminder Levels
            let reminderType = '';
            if (hoursSince >= 48) reminderType = 'PAYMENT_REMINDER_48H';
            else if (hoursSince >= 24) reminderType = 'PAYMENT_REMINDER_24H';
            else if (hoursSince >= 6) reminderType = 'PAYMENT_REMINDER_6H';

            // If no reminder needed yet (shouldn't happen due to query, but safe check)
            if (!reminderType) continue;

            // CHECK IF ALREADY SENT
            // We check ActivityLog for THIS specific reminder type on THIS order
            const existingLog = await prisma.activityLog.findFirst({
                where: {
                    entity_type: 'ORDER',
                    entity_id: order.id.toString(),
                    action: reminderType
                }
            });

            if (existingLog) continue; // Already sent this level

            // SEND EMAIL
            console.log(`[CRON] 📧 Sending ${reminderType} to ${order.user.email} (Order #${order.order_code})`);

            const hoursLabel = reminderType === 'PAYMENT_REMINDER_48H' ? 48 : reminderType === 'PAYMENT_REMINDER_24H' ? 24 : 6;

            await sendPaymentReminder(
                order.user.email,
                order.user.full_name || order.user.username || 'Client',
                order.order_code,
                hoursLabel
            );

            // LOG IT (To prevent resend)
            await prisma.activityLog.create({
                data: {
                    user_id: order.user_id,
                    action: reminderType,
                    entity_type: 'ORDER',
                    entity_id: order.id.toString(),
                    metadata: JSON.stringify({ sent_at: new Date() })
                }
            });
        }

    } catch (error) {
        console.error('[CRON] ❌ Error in payment reminder job:', error);
    }
};
