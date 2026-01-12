import prisma from '../utils/prismaClient';
import fs from 'fs';
import path from 'path';

async function main() {
    console.log('🌱 Seeding Test Data for Admin Panel Verification...');

    // 1. Create a Test Client
    const clientEmail = `test.client.${Date.now()}@example.com`;
    console.log(`Creating Client: ${clientEmail}`);
    const client = await prisma.user.create({
        data: {
            email: clientEmail,
            username: `Client_${Date.now()}`,
            full_name: 'Test Client Alpha',
            password: 'hashed_password_here', // Mock
            role: 'client',
            status: 'active'
        }
    });

    // 2. Create a Pending Order with Payment
    console.log('Creating Order and Payment Receipt...');
    const order = await prisma.order.create({
        data: {
            user_id: client.id,
            service_type: 'game_hosting',
            plan_name: 'Ryzen 9 Pro',
            price: 4500.00,
            price_lkr: 4500.00,
            status: 'verifying',
            payment_status: 'submitted',
            order_code: `ORD-${Date.now()}`
        }
    });

    // Create dummy receipt file
    const uploadsDir = path.join(__dirname, '../../uploads/payments');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const receiptFilename = `test_receipt_${order.id}.txt`;
    fs.writeFileSync(path.join(uploadsDir, receiptFilename), 'This is a mock receipt image for testing.');

    await prisma.payment.create({
        data: {
            order_id: order.id,
            amount: 4500.00,
            method: 'BANK_TRANSFER',
            transaction_id: `TXN-${Date.now()}`,
            status: 'submitted',
            proof_url: `payments/${receiptFilename}`,
            notes: 'Please verify ASAP'
        }
    });

    // 3. Create a Support Ticket
    console.log('Creating Support Ticket...');
    await prisma.ticket.create({
        data: {
            user_id: client.id,
            subject: 'Server Setup Inquiry',
            category: 'technical',
            priority: 'high',
            status: 'open',
            messages: {
                create: {
                    sender: 'client',
                    message: 'Hello, I just uploaded my receipt. When will my server be online?'
                }
            }
        }
    });

    console.log('✅ Seeding Complete! Refresh the Admin Dashboard.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
