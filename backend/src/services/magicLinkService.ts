import crypto from 'crypto';
import prisma from '../utils/prismaClient';

const HASH_ALGORITHM = 'sha256';
const TOKEN_EXPIRY_MS = 15 * 60 * 1000; // 15 Minutes
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 Hour
const RATE_LIMIT_MAX_REQUESTS = 5;

// Helper to hash token
const hashToken = (token: string) => {
    return crypto.createHash(HASH_ALGORITHM).update(token).digest('hex');
};

import { IS_MAGIC_LINK_ENABLED } from '../middlewares/authMiddleware';

// ...

export const createMagicLink = async (userId: number) => {
    // 0. Kill Switch Check
    if (!IS_MAGIC_LINK_ENABLED) {
        throw new Error("Security Policy: Magic Login is currently disabled. Please use password.");
    }

    // 1. Fetch User to check Role
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    // 2. Role Security: Admins cannot use Magic Links
    if (user.role === 'admin' || user.role === 'staff') {
        throw new Error("Security Policy: Administrative accounts must use password login.");
    }

    // 3. Rate Limiting: Check recent requests
    const recentLinks = await prisma.magicLink.count({
        where: {
            user_id: userId,
            created_at: {
                gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MS)
            }
        }
    });

    if (recentLinks >= RATE_LIMIT_MAX_REQUESTS) {
        throw new Error("Rate Limit Exceeded: Too many login requests. Please wait 1 hour.");
    }

    // 4. Auto-Revocation: Invalidate previous unused links
    await prisma.magicLink.updateMany({
        where: { user_id: userId, used: false },
        data: { used: true }
    });

    // 5. Generate & Hash Token
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_MS);

    // 6. Store Hash
    await prisma.magicLink.create({
        data: {
            user_id: userId,
            token: hashedToken, // Storing HASH, not raw token
            expires_at: expiresAt
        }
    });

    return rawToken; // Return RAW token to be sent via email
};

export const verifyMagicLink = async (rawToken: string) => {
    const hashedToken = hashToken(rawToken);

    const link = await prisma.magicLink.findUnique({
        where: { token: hashedToken },
        include: { user: true }
    });

    if (!link) return null;

    if (link.used) return null; // Already used

    // Clock Skew Tolerance: Allow 30s grace period
    const now = new Date();
    const expiryWithSkew = new Date(link.expires_at.getTime() + 30 * 1000);

    if (expiryWithSkew < now) return null; // Expired

    // Mark as used
    await prisma.magicLink.update({
        where: { id: link.id },
        data: { used: true }
    });

    return link.user;
};
