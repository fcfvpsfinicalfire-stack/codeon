export const welcomeEmail = (name: string) => {
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
            .button { display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white !important; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 20px; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #6b7280; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">CODEON HOSTING</div>
            </div>
            <div class="content">
                <h2>Welcome to CodeOn, ${name}! 🎉</h2>
                <p>We're thrilled to have you on board. Your account has been successfully created.</p>
                <p>You can now deploy high-performance servers, manage your resources, and scale your applications with ease.</p>
                
                <div style="text-align: center;">
                    <a href="https://codeonhosting.com/console" class="button">Go to Console</a>
                </div>
            </div>
            <div class="footer">
                <p>© ${new Date().getFullYear()} CodeOn Hosting. All rights reserved.</p>
                <p>If you didn't create this account, please ignore this email.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
