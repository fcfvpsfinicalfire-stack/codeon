
import React, { useState } from 'react';
import AdvancedFeatures from '../components/AdvancedFeatures';
import FAQ from '../components/FAQ';
import JoinDiscord from '../components/JoinDiscord';

// --- DATA ---
const sharedHostingPlans = [
    {
        name: 'Starter',
        isPopular: false,
        price: 450,
        description: 'Perfect for launching your first blog, portfolio, or personal website with essential features.',
        specs: {
            websites: '1 Website',
            storage: '10 GB NVMe',
            transfer: '100 GB',
            email: '5 Accounts'
        }
    },
    {
        name: 'Developer',
        isPopular: true,
        price: 900,
        description: 'Ideal for developers and freelancers managing multiple projects or a growing website.',
        specs: {
            websites: '5 Websites',
            storage: '25 GB NVMe',
            transfer: '250 GB',
            email: '20 Accounts'
        }
    },
    {
        name: 'Business',
        isPopular: false,
        price: 1800,
        description: 'The complete package for small businesses and agencies ready to scale without limits.',
        specs: {
            websites: 'Unlimited Websites',
            storage: '50 GB NVMe',
            transfer: '500 GB',
            email: 'Unlimited Accounts'
        }
    }
];

const businessHostingPlans = [
    {
        name: 'Business Starter',
        isPopular: false,
        price: 3600,
        description: 'A significant performance upgrade for growing businesses and high-traffic websites.',
        specs: {
            websites: 'Unlimited Websites',
            storage: '100 GB NVMe',
            transfer: '1 TB',
            email: 'Unlimited Accounts'
        }
    },
    {
        name: 'Business Pro',
        isPopular: true,
        price: 7200,
        description: 'Built for demanding e-commerce stores and applications requiring ultimate performance.',
        specs: {
            websites: 'Unlimited Websites',
            storage: '200 GB NVMe',
            transfer: 'Unlimited',
            email: 'Unlimited Accounts'
        }
    },
    {
        name: 'Business Elite',
        isPopular: false,
        price: 14400,
        description: 'Enterprise-level power for resource-intensive sites and agencies managing critical client projects.',
        specs: {
            websites: 'Unlimited Websites',
            storage: '400 GB NVMe',
            transfer: 'Unlimited',
            email: 'Unlimited Accounts'
        }
    }
];

const includedFeatures = [
    "Free SSL Certificates", "Blazing-Fast NVMe Storage", "Daily Automated Backups", 
    "cPanel / DirectAdmin", "24/7 Expert Support", "99.9% Uptime Guarantee", 
    "One-Click Installers", "Malware Scanner"
];

const techLogos = [
    { name: 'WordPress', icon: 'fa-brands fa-wordpress' },
    { name: 'Node.js', icon: 'fa-brands fa-node-js' },
    { name: 'Python', icon: 'fa-brands fa-python' },
    { name: 'PHP', icon: 'fa-brands fa-php' },
    { name: 'Laravel', icon: 'fa-brands fa-laravel' },
    { name: 'React', icon: 'fa-brands fa-react' },
    { name: 'Joomla', icon: 'fa-brands fa-joomla' },
    { name: 'Drupal', icon: 'fa-brands fa-drupal' },
];


// --- COMPONENTS ---
const PlanCard: React.FC<{ plan: typeof sharedHostingPlans[0] }> = ({ plan }) => {
    const SpecItem: React.FC<{ icon: string, value: string }> = ({ icon, value }) => (
        <li className="flex items-center space-x-3">
            <i className={`fa-solid ${icon} text-purple-400 w-5`}></i>
            <span className="text-gray-300">{value}</span>
        </li>
    );
    return (
        <div className={`relative bg-white/5 backdrop-blur-xl border rounded-2xl p-8 flex flex-col h-full transition-all duration-300 group hover:-translate-y-1 ${plan.isPopular ? 'border-2 border-accent-purple shadow-2xl shadow-purple-900/50' : 'border-white/10 hover:border-purple-500/50'}`}>
            {plan.isPopular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-accent-purple text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    POPULAR
                </div>
            )}
            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
            <p className="text-gray-400 min-h-[60px]">{plan.description}</p>
            
            <div className="my-6 border-t border-white/10 pt-6">
                <p className="text-5xl font-extrabold text-white">
                    LKR {plan.price}
                    <span className="text-lg font-medium text-gray-400">/mo</span>
                </p>
            </div>
            
            <ul className="space-y-4 text-gray-300 flex-grow mb-8">
                <SpecItem icon="fa-globe" value={plan.specs.websites} />
                <SpecItem icon="fa-hard-drive" value={plan.specs.storage} />
                <SpecItem icon="fa-arrow-right-arrow-left" value={`${plan.specs.transfer} Transfer`} />
                <SpecItem icon="fa-envelope" value={`${plan.specs.email}`} />
            </ul>

            <a href="https://discord.gg/codeon" target="_blank" rel="noopener noreferrer" className={`w-full text-center mt-auto py-3 px-6 font-bold rounded-lg transition-all duration-300 text-white ${plan.isPopular ? 'bg-gradient-to-r from-accent-purple to-indigo-600 hover:opacity-90' : 'bg-white/10 hover:bg-white/20'}`}>
              Order Now
            </a>
        </div>
    );
}

const TechLogoMarquee: React.FC = () => (
    <div className="relative w-full overflow-hidden [mask-image:_linear_gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex animate-marquee-scroll">
            {[...techLogos, ...techLogos].map((tech, index) => (
                <div key={index} className="flex-shrink-0 w-48 h-24 mx-4 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:scale-105">
                    <i className={`${tech.icon} text-5xl text-gray-400 transition-colors duration-300 group-hover:text-white`}></i>
                </div>
            ))}
        </div>
    </div>
);

const PlatformFeatureCard: React.FC<{ icon: string; title: string; description: string; accentClasses: string }> = ({ icon, title, description, accentClasses }) => {
    return (
        <div className={`relative bg-card-bg-solid/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden`}>
            <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${accentClasses}`}></div>
            <div className="relative z-10">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 text-4xl text-purple-300">
                        <i className={`fa-solid ${icon}`}></i>
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-4">{title}</h3>
                <p className="text-gray-400 text-center">{description}</p>
            </div>
        </div>
    );
};


const WebHostingPage: React.FC = () => {
    const [planType, setPlanType] = useState<'shared' | 'business'>('shared');
    const plans = planType === 'shared' ? sharedHostingPlans : businessHostingPlans;

    return (
        <>
            <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-dark-bg"></div>
                    <div className="absolute inset-0 animate-aurora opacity-75" style={{
                        background: 'linear-gradient(125deg, rgba(138, 43, 226, 0.1) 0%, rgba(13, 14, 27, 0) 25%, rgba(99, 102, 241, 0.1) 50%, rgba(13, 14, 27, 0) 75%, rgba(138, 43, 226, 0.1) 100%)',
                        backgroundSize: '400% 400%',
                    }}></div>
                    <div 
                        className="absolute inset-0 animate-grid-pan"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                            `,
                            backgroundSize: '80px 80px',
                            maskImage: 'radial-gradient(ellipse 100% 60% at 50% 100%, black 30%, transparent 100%)'
                        }}
                    ></div>
                </div>

                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center space-x-2 bg-badge-bg border border-purple-500/50 text-purple-300 font-semibold px-4 py-2 rounded-full mb-6">
                           <i className="fa-solid fa-server"></i>
                           <span>Web Hosting Solutions</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                            Launch Your Website on a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Powerful Platform</span>
                        </h1>
                        <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto md:mx-0">
                           Ultra-fast, secure, and reliable hosting for projects of all sizes. Packed with essential features to help you succeed online.
                        </p>
                        <div className="mt-10 flex flex-col items-center md:items-start">
                            <a href="#plans" className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20">
                                Explore Plans
                            </a>
                            <p className="mt-4 text-sm text-gray-400">30-Day Money-Back Guarantee</p>
                        </div>
                    </div>
                    <div className="relative h-64 md:h-full flex items-center justify-center min-h-[300px]">
                        <img 
                            src="https://i.postimg.cc/LXtb9XYD/image.png" 
                            alt="Abstract representation of a modern web dashboard" 
                            className="w-full max-w-md animate-web-hero-float"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Included Features Section */}
                <section className="py-16 md:py-24">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold">Everything You Need is Included</h2>
                        <p className="mt-4 text-gray-300">
                           All our web hosting plans come packed with premium features to ensure your website is fast, secure, and always online.
                        </p>
                    </div>
                    <div className="mt-16 max-w-4xl mx-auto bg-card-bg-solid/50 border border-white/10 rounded-xl p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {includedFeatures.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <i className="fa-solid fa-check-circle text-brand-green"></i>
                                <span className="text-gray-200">{feature}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Plans Section */}
                <div id="plans" className="py-16 md:py-24">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold">Find the Perfect Plan</h2>
                        <p className="mt-4 text-lg text-gray-300">
                            Start with our affordable shared plans or power up with dedicated resources on our business tier.
                        </p>
                    </div>
                    
                    <div className="mt-12 mb-16 flex justify-center p-1 rounded-lg bg-card-bg-solid border border-white/10 w-fit mx-auto">
                        <button 
                            onClick={() => setPlanType('shared')}
                            className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${planType === 'shared' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'text-gray-300 hover:bg-white/5'}`}
                        >
                            Shared Hosting
                        </button>
                        <button 
                            onClick={() => setPlanType('business')}
                            className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${planType === 'business' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'text-gray-300 hover:bg-white/5'}`}
                        >
                            Business Hosting
                        </button>
                    </div>

                    <div key={planType} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                        {plans.map(plan => <PlanCard key={plan.name} plan={plan} />)}
                    </div>
                </div>

                {/* NEW "Engineered for Excellence" Section */}
                <section className="py-16 md:py-24">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center space-x-2 bg-badge-bg text-badge-text font-semibold px-4 py-2 rounded-full mb-6">
                            <i className="fa-solid fa-bolt"></i>
                            <span>Under The Hood</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold">Engineered for Excellence</h2>
                        <p className="mt-4 text-lg text-gray-300">
                           Our platform is built with cutting-edge technology to deliver an unparalleled hosting experience for speed, security, and development.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PlatformFeatureCard
                            icon="fa-rocket"
                            title="Blazing-Fast Speed"
                            description="Powered by LiteSpeed Web Server and NVMe SSDs, your websites load at lightning speed, improving user experience and SEO."
                            accentClasses="bg-gradient-to-br from-sky-500/20 via-transparent to-transparent"
                        />
                         <PlatformFeatureCard
                            icon="fa-shield-halved"
                            title="Ironclad Security"
                            description="With free SSL, Imunify360, and proactive monitoring, we protect your site from malware and attacks around the clock."
                            accentClasses="bg-gradient-to-br from-rose-500/20 via-transparent to-transparent"
                        />
                         <PlatformFeatureCard
                            icon="fa-code-branch"
                            title="Developer-Friendly"
                            description="Get Git integration, SSH access, WP-CLI, and support for multiple PHP versions. Everything you need to build and deploy."
                            accentClasses="bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent"
                        />
                    </div>
                </section>
                
                {/* Tech Showcase */}
                 <section className="py-16 md:py-24">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold">Compatible with Your Favorite Tech</h2>
                        <p className="mt-4 text-gray-300">
                           Our hosting platform supports a wide range of popular development tools and applications.
                        </p>
                    </div>
                    <div className="mt-16">
                        <TechLogoMarquee />
                    </div>
                </section>

                {/* Custom Website Section */}
                <section className="py-16 md:py-24">
                    <div className="relative bg-card-bg-solid border border-white/10 rounded-xl p-8 md:p-12 overflow-hidden group">
                        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-gradient-to-tr from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-125"></div>
                        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold">
                                    Need a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Custom Website?</span>
                                </h2>
                                <p className="text-gray-300 mt-4 max-w-lg">
                                    We don't just host websites, we build them too! Join our Discord and open a ticket to get a stunning, high-performance website tailored to your brand, bundled with our reliable hosting for a complete online solution.
                                </p>
                                <a 
                                    href="https://discord.gg/codeon" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="mt-8 inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity transform hover:scale-105"
                                >
                                    <span>Get a Quote on Discord</span>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </a>
                            </div>
                            <div className="hidden md:flex justify-center items-center">
                               <div className="relative w-60 h-60 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
                                   {/* Main Icon - Design */}
                                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-card-bg-solid/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl animate-subtle-bob" style={{ animationDelay: '0s' }}>
                                       <i className="fa-solid fa-palette text-7xl text-purple-300"></i>
                                   </div>
                                   {/* Satellite Icon - Code */}
                                   <div className="absolute top-0 left-0 p-4 bg-card-bg-solid rounded-xl border border-white/10 shadow-lg animate-subtle-bob" style={{ animationDelay: '0.5s' }}>
                                       <i className="fa-solid fa-code text-3xl text-indigo-300"></i>
                                   </div>
                                   {/* Satellite Icon - Server */}
                                   <div className="absolute top-8 right-0 p-4 bg-card-bg-solid rounded-xl border border-white/10 shadow-lg animate-subtle-bob" style={{ animationDelay: '1s' }}>
                                       <i className="fa-solid fa-server text-3xl text-teal-300"></i>
                                   </div>
                                   {/* Satellite Icon - Launch */}
                                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 bg-card-bg-solid rounded-xl border border-white/10 shadow-lg animate-subtle-bob" style={{ animationDelay: '1.5s' }}>
                                       <i className="fa-solid fa-rocket text-3xl text-amber-300"></i>
                                   </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </section>
                 <AdvancedFeatures />
                 <FAQ />
                 <JoinDiscord />
            </div>
        </>
    );
};

export default WebHostingPage;
