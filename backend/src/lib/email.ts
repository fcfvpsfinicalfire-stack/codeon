import { Resend } from 'resend';

let resend: Resend | null = null;

interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
    // Lazy initialization to ensure env vars are loaded
    if (!resend) {
        const apiKey = process.env.RESEND_API_KEY;
        if (apiKey) {
            resend = new Resend(apiKey);
        } else {
            console.warn("RESEND_API_KEY is not set. Email sending skipped.");
            return null;
        }
    }

    try {
        const data = await resend.emails.send({
            from: "CODEON <no-reply@codeonhosting.com>",
            to,
            subject,
            html,
        });
        return data;
    } catch (error) {
        console.error("Email sending failed:", error);
        // Don't throw error to prevent blocking main flow
        return null;
    }
}
