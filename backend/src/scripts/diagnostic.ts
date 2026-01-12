import prisma from '../utils/prismaClient';

async function main() {
    console.log('🔍 DIAGNOSTIC: Checking Database Integrity...');

    const userCount = await prisma.user.count();
    const orderCount = await prisma.order.count();
    const paymentCount = await prisma.payment.count();

    console.log(`📊 TOTALS: Users: ${userCount} | Orders: ${orderCount} | Payments: ${paymentCount}`);

    console.log('\n📋 LIST OF ORDERS:');
    const orders = await prisma.order.findMany({
        include: { user: true, payment: true }
    });

    if (orders.length === 0) {
        console.log("   (No orders found)");
    } else {
        orders.forEach(o => {
            console.log(`   [ID: ${o.id}] User: ${o.user?.email} | Status: ${o.status} | PayStatus: ${o.payment_status} | Proof: ${o.payment?.proof_url || 'NULL'}`);
        });
    }

    console.log('\n👤 LIST OF ADMIN USERS:');
    const admins = await prisma.user.findMany({ where: { role: 'admin' } });
    admins.forEach(a => console.log(`   ${a.email} (ID: ${a.id})`));

    console.log('\n🏁 DIAGNOSTIC COMPLETE');
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
