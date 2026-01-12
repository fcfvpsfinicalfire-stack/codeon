import express from 'express';
import { getMyTickets, createTicket, replyTicket } from '../controllers/ticketController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authenticateToken, getMyTickets);
router.post('/', authenticateToken, createTicket);
router.post('/:ticketId/reply', authenticateToken, replyTicket);

export default router;
