import express from 'express';
import { createOrder, getMyOrders, toggleAutoRenew, getTrustStatus } from '../controllers/orderController';
import { getPendingOrders, approveOrder } from '../controllers/adminController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

// Admin
router.get('/admin/pending', authenticateToken, getPendingOrders);
router.post('/admin/approve', authenticateToken, approveOrder);

// User
router.get('/', authenticateToken, getMyOrders);
router.post('/', createOrder); // Public order creation
router.put('/:id/toggle-renew', authenticateToken, toggleAutoRenew);
router.get('/:id/trust-status', authenticateToken, getTrustStatus);

export default router;
