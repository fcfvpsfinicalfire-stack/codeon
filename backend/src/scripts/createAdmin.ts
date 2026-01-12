
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@codeon.local';
    const password = 'adminpassword123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            role: 'admin',
            password_hash: hashedPassword
        },
        create: {
            email,
            full_name: 'System Administrator',
            username: 'admin',
            password_hash: hashedPassword,
            role: 'admin',
            status: 'active'
        },
    });

    console.log(`Admin user created/updated: ${user.email}`);
    console.log(`Password: ${password}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
