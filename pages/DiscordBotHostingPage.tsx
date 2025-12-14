
import React, { useState } from 'react';
import AdvancedFeatures from '../components/AdvancedFeatures';
import FAQ from '../components/FAQ';
import JoinDiscord from '../components/JoinDiscord';

// --- DATA ---
const budgetPlans = [
    {
        name: 'Starter',
        isPopular: false,
        price: 350,
        specs: {
            cpu: '1 vCPU',
            ram: '512 MB',
            storage: '5 GB',
            bandwidth: 'Unlimited'
        }
    },
    {
        name: 'Basic',
        isPopular: true,
        price: 700,
        specs: {
            cpu: '1 vCPU',
            ram: '1 GB',
            storage: '10 GB',
            bandwidth: 'Unlimited'
        }
    },
    {
        name: 'Standard',
        isPopular: false,
        price: 1400,
        specs: {
            cpu: '2 vCPU',
            ram: '2 GB',
            storage: '20 GB',
            bandwidth: 'Unlimited'
        }
    }
];

const premiumPlans = [
    {
        name: 'Pro',
        isPopular: false,
        price: 2800,
        specs: {
            cpu: '2 vCPU',
            ram: '4 GB',
            storage: '40 GB',
            bandwidth: 'Unlimited'
        }
    },
    {
        name: 'Elite',
        isPopular: true,
        price: 5600,
        specs: {
            cpu: '4 vCPU',
            ram: '8 GB',
            storage: '80 GB',
            bandwidth: 'Unlimited'
        }
    },
    {
        name: 'Ultimate',
        isPopular: false,
        price: 11200,
        specs: {
            cpu: '4 vCPU',
            ram: '16 GB',
            storage: '160 GB',
            bandwidth: 'Unlimited'
        }
    }
];


const discordHostingFeatures = [
  {
    icon: 'fa-solid fa-rocket',
    title: 'Instant Setup',
    description: 'Deploy your Discord bot in seconds with our automated setup process. No complex configurations needed.'
  },
  {
    icon: 'fa-solid fa-clock',
    title: '24/7 Uptime',
    description: 'Our reliable infrastructure ensures your bot is always online and ready to serve your community, day or night.'
  },
  {
    icon: 'fa-solid fa-gamepad',
    title: 'Powerful Panel',
    description: 'Manage your bot with ease using our intuitive Pterodactyl control panel, featuring a file manager, console, and more.'
  },
  {
    icon: 'fa-brands fa-node-js',
    title: 'Node.js Support',
    description: 'Built and optimized for Node.js, the most popular language for Discord bots, ensuring peak performance.'
  },
];


// --- COMPONENTS ---
const PlanCard: React.FC<{ plan: typeof budgetPlans[0] }> = ({ plan }) => {
    const SpecItem: React.FC<{ icon: string, label: string, value: string }> = ({ icon, label, value }) => (
        <li className="flex items-center space-x-3">
            <i className={`fa-solid ${icon} text-purple-400 w-5`}></i>
            <span className="text-gray-300">{label}: <span className="font-bold text-white">{value}</span></span>
        </li>
    );
    return (
        <div className={`relative bg-card-bg-solid border rounded-2xl p-8 flex flex-col h-full transition-all duration-300 group ${plan.isPopular ? 'border-2 border-discord-blue shadow-2xl shadow-discord-blue/20 bg-gradient-to-b from-[#111222] to-discord-blue/10' : 'border-white/10 hover:border-discord-blue/50 hover:-translate-y-1'}`}>
            {plan.isPopular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-discord-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    POPULAR
                </div>
            )}
            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
            <p className="text-gray-400">Discord Bot Plan</p>
            
            <div className="my-6 border-t border-white/10 pt-6">
                <p className="text-5xl font-extrabold text-white">
                    LKR {plan.price}
                    <span className="text-lg font-medium text-gray-400">/mo</span>
                </p>
            </div>
            
            <ul className="space-y-4 text-gray-300 flex-grow mb-8">
                <SpecItem icon="fa-microchip" label="CPU" value={plan.specs.cpu} />
                <SpecItem icon="fa-memory" label="RAM" value={plan.specs.ram} />
                <SpecItem icon="fa-hard-drive" label="Storage" value={plan.specs.storage} />
                <SpecItem icon="fa-wifi" label="Bandwidth" value={plan.specs.bandwidth} />
            </ul>

            <a href="https://discord.gg/codeon" target="_blank" rel="noopener noreferrer" className={`w-full text-center mt-auto py-3 px-6 font-bold rounded-lg transition-all duration-300 ${plan.isPopular ? 'bg-discord-blue text-white hover:opacity-90' : 'bg-white/10 text-white hover:bg-white/20'}`}>
              Get Started
            </a>
        </div>
    );
}

const FeatureCard: React.FC<{ feature: typeof discordHostingFeatures[0] }> = ({ feature }) => (
    <div className="bg-card-bg-solid/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1 hover:border-discord-blue/50">
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-discord-blue/20 rounded-lg text-discord-blue text-2xl">
                <i className={feature.icon}></i>
            </div>
            <div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-gray-400">{feature.description}</p>
            </div>
        </div>
    </div>
);


const DiscordBotHostingPage: React.FC = () => {
    const [planType, setPlanType] = useState<'budget' | 'premium'>('budget');
    const plans = planType === 'budget' ? budgetPlans : premiumPlans;

    return (
        <>
            {/* Hero Section */}
            <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://i.imgur.com/Yh3t8v5.png')" }}>
                <div className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm"></div>
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="inline-flex items-center space-x-2 bg-card-bg-solid border border-discord-blue/50 text-blue-300 font-semibold px-4 py-2 rounded-full mb-6">
                       <i className="fa-brands fa-discord"></i>
                       <span>Always Online, Always Ready</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                        Unleash Your Discord Bot's <span className="text-transparent bg-clip-text bg-gradient-to-r from-discord-blue to-purple-400">Potential</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto">
                        Experience 24/7 uptime, instant setup, and powerful performance with our hosting solutions, built for developers and communities of all sizes.
                    </p>
                    <a href="#plans" className="mt-10 inline-block bg-discord-blue text-white font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-discord-blue/20">
                        View Plans
                    </a>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center space-x-2 bg-badge-bg text-badge-text font-semibold px-4 py-2 rounded-full mb-6">
                        <i className="fa-solid fa-star text-yellow-400"></i>
                        <span>Key Benefits</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
                        Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-discord-blue to-purple-400">Features</span> Included
                    </h2>
                    <p className="mt-4 text-lg text-gray-300">
                        We've packed our Discord Bot Hosting with essential features to ensure your bot is fast, reliable, and easy to manage.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {discordHostingFeatures.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
            </section>


            {/* Plans Section */}
            <div id="plans" className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold">Find the Perfect Plan</h2>
                        <p className="mt-4 text-lg text-gray-300">
                            Whether you're starting a new project or scaling up, we have a plan that fits your needs.
                        </p>
                    </div>

                    <div className="space-y-12 mt-16">
                        <section>
                            <h2 className="text-lg font-semibold mb-4 text-center text-gray-300">1. Select Plan Type</h2>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button onClick={() => setPlanType('budget')} className={`flex items-center space-x-3 px-6 py-3 rounded-lg border-2 transition-all duration-300 font-semibold ${planType === 'budget' ? 'bg-discord-blue text-white border-discord-blue' : 'bg-card-bg-solid border-gray-800 text-gray-300 hover:border-gray-600'}`}>
                                    <i className="fa-solid fa-dollar-sign"></i>
                                    <span>Budget Plans</span>
                                </button>
                                <button onClick={() => setPlanType('premium')} className={`flex items-center space-x-3 px-6 py-3 rounded-lg border-2 transition-all duration-300 font-semibold ${planType === 'premium' ? 'bg-discord-blue text-white border-discord-blue' : 'bg-card-bg-solid border-gray-800 text-gray-300 hover:border-gray-600'}`}>
                                    <i className="fa-solid fa-rocket"></i>
                                    <span>Premium Plans</span>
                                </button>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold mb-4 text-center text-gray-300">2. Choose Your Package</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {plans.map(plan => <PlanCard key={plan.name} plan={plan} />)}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Custom Bot Section */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="relative bg-card-bg-solid border border-white/10 rounded-xl p-8 md:p-12 overflow-hidden group">
                     <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-gradient-to-tr from-discord-blue/10 to-purple-600/10 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-125"></div>
                     <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                         <div>
                             <h2 className="text-3xl md:text-4xl font-bold">
                                 Need a <span className="text-transparent bg-clip-text bg-gradient-to-r from-discord-blue to-purple-400">Custom Bot?</span>
                             </h2>
                             <p className="text-gray-300 mt-4 max-w-lg">
                                 Have a unique idea? Our expert developers can build a custom Discord bot tailored to your community's specific needs. Join our Discord and open a ticket to get a quote!
                             </p>
                             <a 
                                href="https://discord.gg/codeon" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-8 inline-flex items-center space-x-2 bg-gradient-to-r from-discord-blue to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity transform hover:scale-105"
                            >
                                 <span>Get a Quote on Discord</span>
                                 <i className="fa-solid fa-arrow-right"></i>
                             </a>
                         </div>
                         <div className="hidden md:flex justify-center items-center">
                            <div className="relative w-52 h-52 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
                                <div className="absolute inset-0 bg-gradient-to-br from-discord-blue/10 to-purple-500/10 rounded-2xl blur-lg animate-[subtle-bob_8s_ease-in-out_infinite]"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-card-bg-solid/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
                                    <i className="fa-solid fa-robot text-7xl text-blue-300"></i>
                                </div>
                                <div className="absolute -top-4 -left-4 p-3 bg-card-bg-solid rounded-xl border border-white/10 shadow-lg animate-[subtle-bob_8s_ease-in-out_infinite_1s]">
                                    <i className="fa-solid fa-code text-3xl text-indigo-300"></i>
                                </div>
                                <div className="absolute -bottom-4 -right-4 p-3 bg-card-bg-solid rounded-xl border border-white/10 shadow-lg animate-[subtle-bob_8s_ease-in-out_infinite_2s]">
                                    <i className="fa-solid fa-cubes text-3xl text-green-300"></i>
                                </div>
                            </div>
                         </div>
                     </div>
                 </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <AdvancedFeatures />
                 <FAQ />
                 <JoinDiscord />
            </div>
        </>
    );
};

export default DiscordBotHostingPage;
