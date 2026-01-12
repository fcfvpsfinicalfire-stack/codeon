import express from 'express';
import { approveOrder, getPendingOrders, rejectOrder } from '../controllers/adminController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

// Middleware (Imported from authMiddleware to avoid duplication)
import { requireAdmin } from '../middlewares/authMiddleware';

router.post('/approve', authenticateToken, requireAdmin, approveOrder);
router.post('/reject', authenticateToken, requireAdmin, rejectOrder);
router.get('/pending', authenticateToken, requireAdmin, getPendingOrders);

// New Routes
import { getAllOrders, getClients, getDashboardStats, getSystemLogs } from '../controllers/adminController';
router.get('/orders', authenticateToken, requireAdmin, getAllOrders);
router.get('/clients', authenticateToken, requireAdmin, getClients);
router.get('/revenue', authenticateToken, requireAdmin, getDashboardStats);
router.get('/logs', authenticateToken, requireAdmin, getSystemLogs);
// Ticket Routes
import { getAllTickets, adminReplyTicket, closeTicket } from '../controllers/adminController';
router.get('/tickets', authenticateToken, requireAdmin, getAllTickets);
router.post('/tickets/reply', authenticateToken, requireAdmin, adminReplyTicket);
router.post('/tickets/close', authenticateToken, requireAdmin, closeTicket);

// Client Details
import { getClientDetails } from '../controllers/adminController';
router.get('/client-details', authenticateToken, requireAdmin, getClientDetails);

export default router;
