import express from 'express';
import Stripe from 'stripe';
import prisma from '../utils/prismaClient';
import { sendEmail } from '../lib/email';
import { paymentSuccessEmail } from '../emails/paymentSuccess';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { submitPayment, approvePayment, rejectPayment } from '../controllers/paymentController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

// Initialize Stripe ensuring the key exists
const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
    console.warn("STRIPE_SECRET_KEY is missing in .env");
}

const stripe = new Stripe(stripeSecret || '', {
    apiVersion: '2023-10-16'
});

// Configure Multer for temp uploads
const upload = multer({
    dest: 'uploads/temp/', // Temp storage before controller moves it
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Ensure temp directory exists
if (!fs.existsSync('uploads/temp')) {
    fs.mkdirSync('uploads/temp', { recursive: true });
}

// --- MANUAL PAYMENT ROUTES ---

// Submit Payment Receipt
router.post('/submit', authenticateToken, upload.single('proof'), submitPayment);

// Admin Actions
// Note: In real app, apply admin middleware
router.post('/approve', authenticateToken, approvePayment);
router.post('/reject', authenticateToken, rejectPayment);


// --- STRIPE ROUTES ---

// Create Payment Intent
router.post('/create-payment-intent', async (req, res) => {
    const { amount, currency = 'lkr', orderId } = req.body;

    if (!amount) {
        return res.status(400).json({ error: 'Amount is required' });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(Number(amount) * 100), // Convert to cents and ensure integer
            currency,
            metadata: { orderId: orderId ? String(orderId) : 'unknown' },
            payment_method_types: ['card'],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Confirm Payment & Activate Service
router.post('/confirm-payment', async (req, res) => {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
        return res.status(400).json({ error: 'Payment Intent ID is required' });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ error: 'Payment not successful' });
        }

        const orderId = paymentIntent.metadata.orderId;
        if (!orderId) {
            return res.status(400).json({ error: 'Order ID not found in payment metadata' });
        }

        // Update Order Status
        const order = await prisma.order.update({
            where: { id: parseInt(orderId) },
            data: {
                status: 'active',
                payment_status: 'paid',
                // updated_at: not in schema
            },
            include: { user: true } // Fetch user for email
        });

        // Send Email
        if (order && order.user) {
            await sendEmail({
                to: order.user.email,
                subject: "💰 Payment Received - Order #" + orderId,
                html: paymentSuccessEmail(order.user.full_name || 'Customer', Number(order.price_lkr), orderId)
            });
        }

        res.json({ success: true, order });

    } catch (error: any) {
        console.error("Payment Confirmation Error:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
