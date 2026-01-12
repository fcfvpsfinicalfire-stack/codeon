import prisma from '../utils/prismaClient';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const API_URL = 'http://localhost:5000/api';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// 1. Setup Test Data
async function setup() {
    console.log("🛠️ SETUP: Creating Test Data...");

    // Create Admin User
    const adminEmail = `admin.test.${Date.now()}@codeon.local`;
    const admin = await prisma.user.create({
        data: { email: adminEmail, username: `admin_${Date.now()}`, password: 'hash', role: 'admin', full_name: 'Super Admin' }
    });
    const adminToken = jwt.sign({ userId: admin.id, role: admin.role, v: 1 }, JWT_SECRET, { expiresIn: '1h' });

    // Create Client User
    const clientEmail = `client.test.${Date.now()}@gmail.com`;
    const client = await prisma.user.create({
        data: { email: clientEmail, username: `client_${Date.now()}`, password: 'hash', role: 'client', full_name: 'Test Client' }
    });
    const clientToken = jwt.sign({ userId: client.id, role: client.role, v: 1 }, JWT_SECRET, { expiresIn: '1h' });

    // Create Order to Reject
    const order = await prisma.order.create({
        data: {
            user_id: client.id,
            service_type: 'game_hosting',
            plan_name: 'Ryzen 9 Pro',
            price: 5000,
            price_lkr: 5000,
            status: 'verifying',
            payment_status: 'submitted',
            order_code: `REJECT_TEST_${Date.now()}`
        }
    });

    // Create Payment
    await prisma.payment.create({
        data: {
            order_id: order.id,
            amount: 5000,
            method: 'BANK_TRANSFER',
            status: 'submitted',
            proof_url: 'payments/test_proof.jpg'
        }
    });

    return { adminToken, clientToken, orderId: order.id, adminId: admin.id, clientId: client.id };
}

// 2. Test Reject Flow
async function testRejectFlow(data: any) {
    console.log("\n🧪 TEST 1: Admin Reject Order");
    try {
        const res = await axios.post(`${API_URL}/admin/reject`,
            { orderId: data.orderId },
            { headers: { Authorization: `Bearer ${data.adminToken}` } }
        );

        if (res.data.success) {
            console.log("   ✅ API Call Success");
        } else {
            console.error("   ❌ API Call Failed", res.data);
            return;
        }

        // Verify DB State
        const updatedOrder = await prisma.order.findUnique({
            where: { id: data.orderId },
            include: { payment: true }
        });

        if (updatedOrder?.status === 'cancelled' && updatedOrder?.payment?.status === 'rejected') {
            console.log("   ✅ DB: Order Status = Cancelled");
            console.log("   ✅ DB: Payment Status = Rejected");
        } else {
            console.error("   ❌ DB Verification Failed", updatedOrder);
        }

        // Verify Notification
        const notif = await prisma.notification.findFirst({
            where: { user_id: data.clientId, type: 'alert' }, // red alert
            orderBy: { created_at: 'desc' }
        });
        if (notif && notif.message.includes("rejected")) {
            console.log("   ✅ Notification Sent: ", notif.message);
        } else {
            console.error("   ❌ Notification Missing");
        }

        // Verify Log
        const log = await prisma.activityLog.findFirst({
            where: { user_id: data.adminId, action: { contains: "Rejected Order" } },
            orderBy: { created_at: 'desc' }
        });
        if (log) {
            console.log("   ✅ Admin Log Created: ", log.action);
        } else {
            console.error("   ❌ Admin Log Missing");
        }

    } catch (e: any) {
        console.error("   ❌ TEST FAILED:", e.response?.data || e.message);
    }
}

// 3. Test Security
async function testSecurity(data: any) {
    console.log("\n🧪 TEST 2: Security Check (Role: Client)");
    try {
        await axios.post(`${API_URL}/admin/reject`,
            { orderId: data.orderId }, // Try to reject again (or verify access)
            { headers: { Authorization: `Bearer ${data.clientToken}` } }
        );
        console.error("   ❌ SECURITY FAIL: Client was able to access Admin API!");
    } catch (e: any) {
        if (e.response?.status === 403) {
            console.log("   ✅ Security Pass: Client got 403 Forbidden");
        } else {
            console.error("   ⚠️ Unexpected Error:", e.response?.status);
        }
    }
}

async function main() {
    try {
        const data = await setup();
        await testRejectFlow(data);
        await testSecurity(data);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
