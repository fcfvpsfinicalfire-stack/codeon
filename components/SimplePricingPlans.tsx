
import React from 'react';
import { Page } from '../App';

interface SimplePricingPlansProps {
    setPage: (page: Page) => void;
}

const CurrencySelector: React.FC = () => (
    <div className="absolute top-0 right-0 z-20">
        <select className="bg-card-bg-solid border border-gray-700 rounded-md px-3 py-2 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option value="lkr">Rs. LKR</option>
            <option value="usd">$ USD</option>
        </select>
    </div>
);

const SimplePricingPlans: React.FC<SimplePricingPlansProps> = ({ setPage }) => {

    const plans = [
        {
            title: "Game Servers",
            price: "350.00",
            description: "High-performance game hosting for all popular games.",
            features: ["Instant deployment", "DDoS protection", "24/7 support", "Custom configurations", "Mod support"],
            buttonText: "View More",
            action: () => setPage('gameservers'),
            bgImage: "url('https://i.postimg.cc/G20fZTKC/image.png')",
            isPrimary: false
        },
        {
            title: "Discord Bot Hosting",
            price: "175.00",
            description: "Reliable and affordable scalable hosting with 24/7 uptime, blazingly support, and easy deployment.",
            features: ["SSD storage", "99.9% uptime", "24/7 support", "Advanced security", "Daily backups"],
            buttonText: "Order Now",
            action: () => window.open('https://discord.gg/codeon', '_blank'),
            bgImage: "url('https://i.postimg.cc/B6XzMKFZ/image-removebg-preview-(2).png')",
            isPrimary: false
        },
        {
            title: "VPS Hosting",
            price: "800.00",
            description: "Scalable virtual private servers for your applications.",
            features: ["Full root access", "SSD storage", "99.9% uptime", "Multiple OS options", "Backup included"],
            buttonText: "Order Now",
            action: () => window.open('https://discord.gg/codeon', '_blank'),
            bgImage: "url('https://i.imgur.com/3RwNKMVH.png')",
            isPrimary: true
        }
    ];

    const PlanCard: React.FC<{ plan: typeof plans[0] }> = ({ plan }) => (
        <div className="relative bg-card-bg-solid border border-white/10 rounded-2xl p-8 flex flex-col overflow-hidden group">
            <div className="absolute inset-0 bg-contain bg-no-repeat bg-right-bottom opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundImage: plan.bgImage }}></div>
            <div className="relative z-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
                <p className="text-gray-400 mt-2 min-h-[4rem]">{plan.description}</p>
                <p className="my-6">
                    <span className="text-sm text-gray-400">Starting at</span><br />
                    <span className="text-4xl font-extrabold text-white">Rs. {plan.price}</span>
                    <span className="text-gray-400">/month</span>
                </p>
                <ul className="space-y-3 text-gray-300 flex-grow mb-8">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-2">
                            <i className="fa-solid fa-check text-purple-400"></i>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={plan.action}
                    className={`w-full mt-auto py-3 px-6 font-bold rounded-lg transition-all duration-300 ${plan.isPrimary ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                    {plan.buttonText} <i className="fa-solid fa-arrow-right-long text-xs ml-2"></i>
                </button>
            </div>
        </div>
    );

    return (
        <section className="py-16 md:py-24 relative">
            <CurrencySelector />
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                    Simple Pricing <span className="relative inline-block">
                        <span className="text-accent-purple">Plans</span>
                        <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 6" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M1 4.25s12.5-4.5 35.5-2.5 30 4 58 0" stroke="#A755F7" strokeWidth="2" fill="none" strokeLinecap="round" />
                        </svg>
                    </span>
                </h2>
                <p className="text-lg text-gray-300">
                    Choose the perfect plan for your needs. All plans include our core features with no hidden fees.
                </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan, i) => (
                    <PlanCard key={i} plan={plan} />
                ))}
            </div>
             <p className="text-center mt-8 text-gray-400">
                Need a custom solution? <a href="#" className="text-purple-400 font-semibold hover:underline">Contact our sales team</a>
            </p>
        </section>
    );
};

export default SimplePricingPlans;
