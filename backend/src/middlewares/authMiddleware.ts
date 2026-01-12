import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prismaClient';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const verified: any = jwt.verify(token, JWT_SECRET);

        // Logout-All Check: Verify Token Version
        // detailed check requires fetching user
        // Optimization: We could cache this, but for security, DB check is best.
        if (verified.userId) {
            const user = await prisma.user.findUnique({
                where: { id: verified.userId },
                select: { id: true, role: true, token_version: true } // fast select
            });

            if (!user) return res.status(403).json({ error: 'User not found' });

            // Check Version
            if (verified.v && user.token_version && verified.v !== user.token_version) {
                return res.status(403).json({ error: 'Session expired (logged out from other devices).' });
            }

            // Attach full verified payload + fetched info if needed
            // @ts-ignore
            req.user = { ...verified, ...user };
        } else {
            // @ts-ignore
            req.user = verified;
        }

        console.log("AUTH USER:", (req as any).user); // DEBUG: Check Role

        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
};

// Feature Flag: Kill Switch
export const IS_MAGIC_LINK_ENABLED = true;

// Invoice Lock: Require session < 6 hours
export const requireRecentAuth = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user;

    // If auth failed previously, user won't be set, so authenticateToken must be called first
    if (!user) return res.status(401).json({ error: 'Authentication required' });

    // iat is in seconds
    const now = Math.floor(Date.now() / 1000);
    const tokenAge = now - (user.iat || 0);
    const MAX_AGE_SECONDS = 6 * 60 * 60; // 6 Hours

    if (tokenAge > MAX_AGE_SECONDS) {
        return res.status(403).json({
            error: 'Security Check: Session too old. Please re-login to proceed with billing.'
        });
    }
    next();
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user;
    if (!user || user.role !== 'admin') {
        return res.status(403).json({ error: 'Administrative Access Required.' });
    }
    next();
};
