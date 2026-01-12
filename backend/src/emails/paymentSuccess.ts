export const paymentSuccessEmail = (name: string, amount: number, orderId: string) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
            .content { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
            .amount { font-size: 32px; font-weight: bold; color: #10b981; text-align: center; margin: 20px 0; }
            .details { background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 20px; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #6b7280; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">CODEON HOSTING</div>
            </div>
            <div class="content">
                <h2>Payment Received! 💰</h2>
                <p>Hi ${name},</p>
                <p>Thank you for your payment. Your transaction was successful.</p>
                
                <div class="amount">LKR ${amount.toLocaleString()}</div>
                
                <div class="details">
                    <p><strong>Order ID:</strong> #${orderId}</p>
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                    <p><strong>Status:</strong> Paid & Active</p>
                </div>

                <p>Your service is now active and ready to use.</p>
            </div>
            <div class="footer">
                <p>© ${new Date().getFullYear()} CodeOn Hosting. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
