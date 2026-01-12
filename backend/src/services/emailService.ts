import nodemailer from 'nodemailer';

// Configure Transporter (Use environment variables in production)
// For dev, we can use Ethereal or a dummy logger if no credentials
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ethereal.user@ethereal.email',
        pass: 'ethereal_pass'
    }
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const info = await transporter.sendMail({
            from: '"CodeOn Hosting" <noreply@codeon.lk>',
            to,
            subject,
            html
        });
        console.log(`[EMAIL SENT] MessageId: ${info.messageId}`);
        console.log(`[EMAIL PREVIEW] ${nodemailer.getTestMessageUrl(info)}`);
        return info;
    } catch (error) {
        console.error("Email sending failed:", error);
        // Don't throw, just log in dev
        return null;
    }
};

export const sendWelcomeEmail = async (email: string, name: string, orderCode: string) => {
    const html = `
        <h1>Welcome to CodeOn Hosting!</h1>
        <p>Hi ${name},</p>
        <p>Thank you for your order (<strong>${orderCode}</strong>). Your account has been created successfully.</p>
        <p>You can access your client portal immediately to manage your services.</p>
        <a href="http://localhost:5173/portal">Go to Dashboard</a>
    `;
    await sendEmail(email, "Welcome to CodeOn Hosting", html);
};

export const sendServerDeployedEmail = async (email: string, serverDetails: any) => {
    const html = `
        <h1>Your Server is Ready! 🚀</h1>
        <p>Good news! Your payment has been verified and your server is online.</p>
        <h3>Connection Details:</h3>
        <ul>
            <li><strong>Node:</strong> ${serverDetails.node_name}</li>
            <li><strong>IP Address:</strong> ${serverDetails.ip_address}</li>
            <li><strong>Port:</strong> ${serverDetails.port}</li>
        </ul>
        <hr/>
        <h3>Access Credentials:</h3>
        <ul>
            <li><strong>Panel URL:</strong> <a href="${serverDetails.panel_url}">${serverDetails.panel_url}</a></li>
            <li><strong>Username:</strong> ${serverDetails.username}</li>
            <li><strong>Password:</strong> ${serverDetails.password}</li>
        </ul>
        <p><em>Please change your password immediately after logging in.</em></p>
        <br/>
        <a href="http://localhost:5173/ClientPortal">Go to Client Portal</a>
    `;
    await sendEmail(email, "Action Required: Server Deployed", html);
};

export const sendMagicLinkEmail = async (email: string, link: string) => {
    const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #3b82f6;">Confirm Your Identity</h2>
            <p>You requested a secure login link for your CodeOn Hosting account.</p>
            <p>Click the button below to sign in instantly. This link expires in 15 minutes.</p>
            
            <a href="${link}" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Sign In Directly</a>
            
            <p style="font-size: 12px; color: #666;">If you didn't request this, you can safely ignore this email.</p>
            <p style="font-size: 12px; color: #666;">Or copy/paste: ${link}</p>
        </div>
    `;
    await sendEmail(email, "Secure Login Link - CodeOn Hosting", html);
};

export const sendPaymentReminder = async (email: string, name: string, orderCode: string, hours: number) => {
    let subject = "";
    let color = "#3b82f6"; // Blue
    let msg = "";

    if (hours === 6) {
        subject = `Action Required: PENDING Payment for Order #${orderCode}`;
        msg = `We noticed your order #${orderCode} is still pending payment. To activate your server instantly, please submit your payment proof.`;
    } else if (hours === 24) {
        subject = `Reminder: Your Server Order #${orderCode} is waiting`;
        color = "#eab308"; // Yellow
        msg = `It's been 24 hours. Your server hardware is reserved but will be released soon if payment is not received.`;
    } else if (hours === 48) {
        subject = `Final Notice: Order #${orderCode} will be cancelled`;
        color = "#ef4444"; // Red
        msg = `This is a final reminder. Your order #${orderCode} has not been paid. It will be automatically cancelled in 12 hours.`;
    }

    const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: ${color};">${subject}</h2>
            <p>Hi ${name},</p>
            <p>${msg}</p>
            
            <a href="http://localhost:5173/ClientPortal" style="display: inline-block; background-color: ${color}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">
                Pay Now / Upload Slip
            </a>
            
            <p style="font-size: 12px; color: #666;">If you have already paid, please ignore this message while we verify your slip.</p>
        </div>
    `;
    await sendEmail(email, subject, html);
};
