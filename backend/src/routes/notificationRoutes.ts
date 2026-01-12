import express from 'express';
import { getNotifications, markAsRead } from '../controllers/notificationController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authenticateToken); // Provide security

router.get('/', getNotifications);
router.put('/:id/read', markAsRead);

export default router;
