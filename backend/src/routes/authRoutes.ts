import express from 'express';
import { login, checkEmail, verifyMagicLink, register, updateProfile, getLoginHistory } from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/check-email', checkEmail);
router.post('/verify-magic-link', verifyMagicLink);
router.put('/me', authenticateToken, updateProfile);
router.get('/history', authenticateToken, getLoginHistory);

export default router;
