import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prismaClient';
import { verifyMagicLink as verifyLinkService } from '../services/magicLinkService';
import { sendEmail } from '../lib/email';
import { welcomeEmail } from '../emails/welcome';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email.' });
        }

        // 2. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create User
        const user = await prisma.user.create({
            data: {
                full_name: name,
                email,
                username: email.split('@')[0] + Math.floor(Math.random() * 1000), // temp username
                password_hash: hashedPassword,
                role: 'client',
                status: 'active'
            }
        });

        // 🟢 AUTO EMAIL TRIGGER
        // We don't await this to prevent blocking the response time
        sendEmail({
            to: user.email,
            subject: "🎉 Welcome to CodeOn Hosting",
            html: welcomeEmail(user.full_name || 'User'),
        });

        // 4. Auto Login (Generate Token)
        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
                v: user.token_version || 1
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token,
            user: { id: user.id, email: user.email, name: user.full_name, role: user.role, hasPassword: !!user.password_hash }
        });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        if (!user.password_hash) {
            return res.status(400).json({ error: 'Please use the Magic Link sent to your email to login.' });
        }

        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // 🔐 AUTO LOGIN ALERT EMAIL
        /* await sendEmail({
             to: user.email,
             subject: "🔐 New Login Detected",
             html: `<p>New login detected from IP ${req.ip || 'Unknown'}</p>`,
         }); */

        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
                v: user.token_version || 1
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Log Activity
        const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP';
        await prisma.activityLog.create({
            data: {
                user_id: user.id,
                action: `Login successful via Password from IP: ${clientIp}`
            }
        });

        res.json({ token, user: { id: user.id, email: user.email, name: user.full_name, role: user.role, hasPassword: !!user.password_hash } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
};

export const checkEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        res.json({ exists: !!user, hasPassword: !!(user && user.password_hash) });
    } catch (error) {
        res.status(500).json({ error: 'Check email failed' });
    }
};

export const verifyMagicLink = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        const user = await verifyLinkService(token);

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired magic link' });
        }

        const jwtToken = jwt.sign(
            {
                userId: user.id,
                role: user.role,
                v: user.token_version || 1
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Log Activity
        const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP';
        await prisma.activityLog.create({
            data: {
                user_id: user.id,
                action: `Login successful via Magic Link from IP: ${clientIp}`
            }
        });

        res.json({
            success: true,
            token: jwtToken,
            user: { id: user.id, email: user.email, name: user.full_name, role: user.role, hasPassword: !!user.password_hash }
        });
    } catch (error) {
        res.status(500).json({ error: 'Verification failed' });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.userId;
    const { name, currentPassword, newPassword } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Update Name
        if (name) {
            await prisma.user.update({ where: { id: userId }, data: { full_name: name } });
        }

        // Update Password
        if (newPassword) {
            if (user.password_hash) {
                // Verify current if exists
                if (!currentPassword) return res.status(400).json({ error: 'Current password required' });
                const isValid = await bcrypt.compare(currentPassword, user.password_hash);
                if (!isValid) return res.status(400).json({ error: 'Invalid current password' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await prisma.user.update({ where: { id: userId }, data: { password_hash: hashedPassword } });
        }

        const updatedUser = await prisma.user.findUnique({ where: { id: userId } });

        res.json({ success: true, user: { id: updatedUser?.id, email: updatedUser?.email, name: updatedUser?.full_name, role: updatedUser?.role, hasPassword: !!updatedUser?.password_hash } });

    } catch (error) {
        res.status(500).json({ error: 'Update failed' });
    }
};

export const getLoginHistory = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.userId;
    try {
        const logs = await prisma.activityLog.findMany({
            where: {
                user_id: userId,
                // Simple filter to only show "Login" or "Order" actions which imply login
                action: { contains: 'Login' }
            },
            orderBy: { created_at: 'desc' },
            take: 5
        });
        res.json(logs);
    } catch (error) {
        console.error("Fetch Logs Error:", error);
        res.status(500).json({ error: 'Failed to fetch login history' });
    }
};
