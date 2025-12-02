

import React, { useState } from 'react';

const nodeJsCode = `
const express = require('express');
const axios = require('axios');
require('dotenv').config(); // To use environment variables from a .env file

const app = express();
// Use express.json() to parse raw JSON bodies from your billing system
app.use(express.json());

// --- CONFIGURATION ---
// Load these from environment variables for security
const PTERODACTYL_API_KEY = process.env.PTERODACTYL_API_KEY;
const PTERODACTYL_PANEL_URL = process.env.PTERODACTYL_PANEL_URL;
// A secret key you create to verify requests from your billing panel
const WHMCS_SECRET = process.env.WHMCS_SECRET; 

// Pterodactyl Server Creation Logic for a 2GB Minecraft Server
async function createMinecraftServer(customerName) {
    console.log('Attempting to create a 2GB Minecraft server...');
    const serverName = \`WHMCS 2GB Server - \${customerName || 'Customer'} - \${Date.now()}\`;

    const serverDetails = {
        name: serverName,
        user: 1, // **IMPORTANT**: This should be dynamically set to the customer's user ID.
        nest: 1, // Minecraft nest ID
        egg: 3,  // Paper server Egg ID
        docker_image: 'ghcr.io/pterodactyl/yolks:java_17',
        startup: 'java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}',
        limits: {
            memory: 2048, // 2GB RAM
            disk: 10240, // 10GB Disk
            cpu: 100 // 1 vCore
        },
        feature_limits: { databases: 1, allocations: 1, backups: 1 },
        environment: { SERVER_JARFILE: 'server.jar', EULA_AGREEMENT: 'true' },
        deploy: { locations: [1], dedicated_ip: false, port_range: [] },
        start_on_completion: true
    };

    try {
        const response = await axios.post(
            \`\${PTERODACTYL_PANEL_URL}/api/application/servers\`,
            serverDetails,
            { headers: { 'Authorization': \`Bearer \${PTERODACTYL_API_KEY}\` } }
        );
        console.log('Server created successfully:', response.data.attributes.identifier);
        return response.data;
    } catch (error) {
        console.error('Error creating Pterodactyl server:', error.response ? error.response.data.errors : error.message);
        throw error;
    }
}

// Custom webhook endpoint for your billing system (e.g., WHMCS)
app.post('/whmcs-provision', async (req, res) => {
    const { secret, customer } = req.body;
    
    // Simple secret key verification
    if (secret !== WHMCS_SECRET) {
        return res.status(401).send('Unauthorized');
    }

    console.log('WHMCS provision request received. Creating server...');
    const customerName = customer?.name || 'New';

    try {
        await createMinecraftServer(customerName);
        res.status(200).send('Webhook received and server creation initiated.');
    } catch (error) {
        res.status(500).send('Server creation failed.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Automation server running on port \${PORT}\`));
`;

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gray-900/80 border border-white/10 rounded-xl my-4 relative">
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold py-1 px-3 rounded-md transition-colors z-10"
            >
                {copied ? <><i className="fa-solid fa-check mr-2"></i>Copied!</> : <><i className="fa-solid fa-copy mr-2"></i>Copy</>}
            </button>
            <pre className="p-4 overflow-x-auto text-sm">
                <code className="language-js">{code}</code>
            </pre>
        </div>
    );
};

const automationFeatures = [
    {
        icon: 'fa-solid fa-rocket',
        title: 'Instant Server Provisioning',
        description: 'Once your payment is confirmed via our WHMCS billing panel, our system automatically creates and deploys your server in minutes.'
    },
    {
        icon: 'fa-solid fa-arrows-rotate',
        title: 'Automated Lifecycle Management',
        description: 'Servers are automatically suspended for overdue invoices and terminated after a grace period, ensuring smooth resource management.'
    },
    {
        icon: 'fa-solid fa-sliders',
        title: 'Client Area Control',
        description: 'Perform essential actions like starting, stopping, and restarting your server directly from your billing account dashboard.'
    },
    {
        icon: 'fa-solid fa-headset',
        title: 'Integrated 24/7 Support',
        description: 'Access our support resources, including a 24/7 live chat and ticket system, directly from your client area for fast assistance.'
    }
];

const FeatureCard: React.FC<{ feature: typeof automationFeatures[0] }> = ({ feature }) => (
    <div className="relative group h-full transition-all duration-300 transform hover:-translate-y-2">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-brand-cyan to-brand-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-border-chase" style={{ backgroundSize: '400% 400%'}}></div>
        <div className="relative bg-card-bg-solid/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full">
            <div className="flex-shrink-0 w-16 h-16 mb-6 flex items-center justify-center bg-white/5 rounded-xl text-brand-cyan text-3xl border border-white/10 group-hover:border-brand-cyan/50 group-hover:text-white transition-all duration-300">
                <i className={feature.icon}></i>
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
            </div>
        </div>
    </div>
);

const AutomationFlowVisual: React.FC = () => (
    <div className="relative w-full max-w-4xl mx-auto my-12 h-64 flex items-center justify-between">
        {/* Panels */}
        <div className="z-10 flex flex-col items-center text-center w-32">
            <div className="w-24 h-24 flex items-center justify-center bg-card-bg-solid border-2 border-brand-cyan/50 rounded-xl shadow-lg shadow-brand-cyan/10">
                <i className="fa-solid fa-file-invoice-dollar text-4xl text-brand-cyan"></i>
            </div>
            <h4 className="font-bold mt-2">Billing Panel</h4>
            <p className="text-xs text-gray-400">(WHMCS)</p>
        </div>

        <div className="z-10 flex flex-col items-center text-center w-32">
            <div className="w-24 h-24 flex items-center justify-center bg-card-bg-solid border-2 border-brand-magenta/50 rounded-xl shadow-lg shadow-brand-magenta/10">
                <i className="fa-solid fa-gamepad text-4xl text-brand-magenta"></i>
            </div>
            <h4 className="font-bold mt-2">Game Panel</h4>
            <p className="text-xs text-gray-400">(Pterodactyl)</p>
        </div>

        {/* Core Engine */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="w-32 h-32 flex items-center justify-center bg-gradient-to-br from-brand-cyan/20 to-brand-magenta/20 border-2 border-purple-500/50 rounded-full animate-pulse-glow-purple shadow-lg">
                <div className="w-24 h-24 bg-dark-bg rounded-full flex flex-col items-center justify-center">
                     <i className="fa-solid fa-robot text-3xl text-purple-300"></i>
                     <p className="text-xs font-bold mt-1">ENGINE</p>
                </div>
            </div>
        </div>

        {/* SVG Path for animation */}
        <svg className="absolute top-0 left-0 w-full h-full z-0 opacity-50" viewBox="0 0 800 256">
            <path id="flow-path-1" d="M 128 128 C 300 0, 500 0, 672 128" stroke="url(#line-gradient-auto)" strokeWidth="2" fill="none" strokeDasharray="5 5" />
            <path id="flow-path-2" d="M 672 128 C 500 256, 300 256, 128 128" stroke="url(#line-gradient-auto-rev)" strokeWidth="2" fill="none" strokeDasharray="5 5" />
             <defs>
                <linearGradient id="line-gradient-auto" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#A755F7" />
                </linearGradient>
                 <linearGradient id="line-gradient-auto-rev" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A755F7" />
                    <stop offset="100%" stopColor="#E11D48" />
                </linearGradient>
            </defs>
        </svg>

        {/* Animated Data Packets */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
            <div className="absolute w-3 h-3 bg-brand-cyan rounded-full shadow-[0_0_8px_theme(colors.brand-cyan)] animate-data-flow" style={{ offsetPath: 'path("M 128 128 C 300 0, 500 0, 672 128")', animationDelay: '0s' }}></div>
            <div className="absolute w-3 h-3 bg-brand-cyan rounded-full shadow-[0_0_8px_theme(colors.brand-cyan)] animate-data-flow" style={{ offsetPath: 'path("M 128 128 C 300 0, 500 0, 672 128")', animationDelay: '2s' }}></div>
            <div className="absolute w-3 h-3 bg-brand-magenta rounded-full shadow-[0_0_8px_theme(colors.brand-magenta)] animate-data-flow" style={{ offsetPath: 'path("M 672 128 C 500 256, 300 256, 128 128")', animationDelay: '1s' }}></div>
            <div className="absolute w-3 h-3 bg-brand-magenta rounded-full shadow-[0_0_8px_theme(colors.brand-magenta)] animate-data-flow" style={{ offsetPath: 'path("M 672 128 C 500 256, 300 256, 128 128")', animationDelay: '3s' }}></div>
        </div>
    </div>
);

const HowItWorksStep: React.FC<{ number: string; title: string; description: string; }> = ({ number, title, description }) => (
    <div className="relative pl-12">
        <div className="absolute left-0 top-0 w-8 h-8 flex items-center justify-center bg-brand-cyan/10 border-2 border-brand-cyan/50 text-brand-cyan font-bold rounded-full">
            {number}
        </div>
        <h3 className="font-bold text-xl text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);


const AutomationPage: React.FC = () => {
    return (
        <div className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-25" style={{
                backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(34, 211, 238, 0.1), transparent 40%), radial-gradient(circle at 90% 80%, rgba(225, 29, 72, 0.1), transparent 40%)',
            }}></div>
             <div className="relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center space-x-2 bg-badge-bg text-badge-text font-semibold px-4 py-2 rounded-full mb-6">
                        <i className="fa-solid fa-robot"></i>
                        <span>The Future is Automated</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                        Instant Provisioning, Zero Delay
                    </h1>
                    <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
                        Our platform is built on a powerful automation engine that connects industry-leading billing software directly to our game panel, providing you with a seamless and instant hosting experience.
                    </p>
                </div>

                <AutomationFlowVisual />

                {/* How It Works Section */}
                <div className="max-w-4xl mx-auto mt-20">
                    <h2 className="text-3xl font-bold text-center mb-12">How It Works: A 60-Second Journey</h2>
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>
                        <HowItWorksStep number="1" title="Order Placed" description="You select your perfect plan and complete the secure checkout process through our billing portal." />
                        <HowItWorksStep number="2" title="Signal Sent" description="The moment your payment is confirmed, our billing panel sends a secure, encrypted signal (a webhook) to our automation engine." />
                        <HowItWorksStep number="3" title="Server Created" description="Our engine instantly processes the signal, creating your server on the Pterodactyl panel with the exact specifications you ordered." />
                        <HowItWorksStep number="4" title="Ready to Play!" description="You receive an email with your login details. Your server is fully provisioned, online, and ready for you to connect—all in minutes." />
                    </div>
                </div>

                {/* Core Benefits Section */}
                <div className="max-w-7xl mx-auto mt-24">
                    <h2 className="text-3xl font-bold text-center mb-12">Core Automation Benefits</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {automationFeatures.map((feature, index) => (
                            <FeatureCard key={index} feature={feature} />
                        ))}
                    </div>
                </div>


                {/* Developer's Corner */}
                <div className="max-w-4xl mx-auto mt-24">
                    <div className="relative bg-card-bg-solid/50 backdrop-blur-md border-2 border-purple-500/20 rounded-2xl p-8 md:p-12 text-center">
                        <div className="absolute -top-8 -left-8 w-24 h-24 bg-purple-600/30 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-cyan-600/30 rounded-full blur-3xl"></div>
                        <div className="relative">
                            <h2 className="text-3xl font-bold text-white">For the Technically Curious</h2>
                            <p className="mt-4 text-gray-400">
                                Curious how it works under the hood? Here's a simplified Node.js example demonstrating how a similar webhook-based provisioning system could be built.
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-8 bg-rose-900/50 border-2 border-rose-500 rounded-xl p-6 flex items-start space-x-4">
                        <i className="fa-solid fa-shield-halved text-3xl text-rose-300 mt-1"></i>
                        <div>
                            <h4 className="text-xl font-bold text-white">Important Security Notice</h4>
                            <p className="text-rose-200 mt-2">
                                This code is for a **backend server** and must NOT be run in a browser or public frontend. Your Pterodactyl API Key is a secret and exposing it will compromise your panel.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 bg-card-bg-solid/50 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8">
                        <p className="mb-4 text-gray-300">This example script creates a web server that listens for a custom webhook, which you could trigger from a WHMCS module after a product is purchased. It then calls the Pterodactyl API to create the server.</p>
                        <CodeBlock code={nodeJsCode} />
                        <div className="bg-amber-900/30 border-2 border-amber-500 rounded-xl p-4 mt-4">
                            <h4 className="font-bold text-white">Configuration is Key!</h4>
                            <p className="text-amber-200 mt-1 text-sm">
                            For this code to work, you must correctly configure the Pterodactyl IDs (user, nest, egg, location) to match your panel's setup. These are highlighted in the code comments.
                            </p>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    );
};

export default AutomationPage;