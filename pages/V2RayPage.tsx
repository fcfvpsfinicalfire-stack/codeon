
import React, { useState } from 'react';
import AdvancedFeatures from '../components/AdvancedFeatures';
import FAQ from '../components/FAQ';
import JoinDiscord from '../components/JoinDiscord';

// --- DATA ---
const v2rayPlans = [
    {
        name: 'Personal VPN',
        isPopular: false,
        price: 500,
        description: 'Perfect for secure browsing and bypassing geo-restrictions for a single user.',
        specs: {
            transfer: '500 GB/month',
            connections: '5 Devices',
            speed: '100 Mbps',
            locations: '3 Locations'
        }
    },
    {
        name: 'Family Shield',
        isPopular: true,
        price: 950,
        description: 'Ideal for families or small groups needing secure internet access across multiple devices.',
        specs: {
            transfer: '2 TB/month',
            connections: '15 Devices',
            speed: '500 Mbps',
            locations: '10 Locations'
        }
    },
    {
        name: 'Business Secure',
        isPopular: false,
        price: 2500,
        description: 'Robust solution for small businesses requiring dedicated IPs and priority support.',
        specs: {
            transfer: '10 TB/month',
            connections: 'Unlimited Devices',
            speed: '1 Gbps',
            locations: 'All Locations'
        }
    }
];

const v2rayFeatures = [
    { icon: 'fa-solid fa-globe', title: 'Global Server Network', description: 'Access servers in multiple countries to bypass geo-restrictions and ensure low latency.' },
    { icon: 'fa-solid fa-user-secret', title: 'Strict No-Logs Policy', description: 'We never track or store your online activity, ensuring your privacy is always protected.' },
    { icon: 'fa-solid fa-shield-halved', title: 'Advanced Encryption', description: 'Utilizes state-of-the-art encryption standards to secure your internet traffic from prying eyes.' },
    { icon: 'fa-solid fa-bolt', title: 'High-Speed Connections', description: 'Our network is optimized for speed, allowing for smooth streaming, gaming, and browsing.' },
    { icon: 'fa-solid fa-layer-group', title: 'Multiple Protocols', description: 'Supports various protocols like VMess, VLESS, and Trojan for maximum flexibility and obfuscation.' },
    { icon: 'fa-solid fa-mobile-screen-button', title: 'Multi-Device Support', description: 'Use your V2Ray subscription on all your devices, including Windows, macOS, iOS, Android, and Linux.' },
];

const howItWorksSteps = [
    { icon: 'fa-solid fa-file-invoice-dollar', title: 'Choose Your Plan', description: 'Select the plan that best fits your needs and complete the simple checkout process.' },
    { icon: 'fa-solid fa-qrcode', title: 'Get Your Config', description: 'Receive your unique configuration details instantly in your client area after payment.' },
    { icon: 'fa-solid fa-rocket', title: 'Connect Securely', description: 'Import the configuration into your favorite V2Ray client and enjoy a free, secure internet.' }
];

const comparisonData = [
    { feature: 'Top-Tier Speed', us: true, freeVpn: false },
    { feature: 'Strict No-Logs Policy', us: true, freeVpn: false },
    { feature: 'Advanced Obfuscation', us: true, freeVpn: false },
    { feature: 'Ad & Malware Blocking', us: true, freeVpn: false },
    { feature: 'Unlimited Bandwidth', us: true, freeVpn: 'Limited' },
    { feature: '24/7 Expert Support', us: true, freeVpn: false },
    { feature: 'Sells Your Data', us: false, freeVpn: true },
];


// --- COMPONENTS ---
const PlanCard: React.FC<{ plan: typeof v2rayPlans[0], billingCycle: 'monthly' | 'annually' }> = ({ plan, billingCycle }) => {
    const isAnnual = billingCycle === 'annually';
    const price = isAnnual ? plan.price * 10 : plan.price; // 2 months free for annual

    const SpecItem: React.FC<{ icon: string, value: string }> = ({ icon, value }) => (
        <li className="flex items-center space-x-3">
            <i className={`fa-solid ${icon} text-cyan-400 w-5`}></i>
            <span className="text-gray-300">{value}</span>
        </li>
    );
    return (
        <div className={`relative bg-card-bg-solid border rounded-2xl p-8 flex flex-col h-full transition-all duration-300 group hover:-translate-y-1 ${plan.isPopular ? 'border-2 border-brand-cyan shadow-2xl shadow-cyan-900/50' : 'border-white/10 hover:border-cyan-500/50'}`}>
            {plan.isPopular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-brand-cyan text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    POPULAR
                </div>
            )}
            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
            <p className="text-gray-400 min-h-[60px]">{plan.description}</p>
            
            <div className="my-6 border-t border-white/10 pt-6">
                <p className="text-5xl font-extrabold text-white">
                    LKR {price}
                    <span className="text-lg font-medium text-gray-400">/{isAnnual ? 'yr' : 'mo'}</span>
                </p>
            </div>
            
            <ul className="space-y-4 text-gray-300 flex-grow mb-8">
                <SpecItem icon="fa-arrow-right-arrow-left" value={plan.specs.transfer} />
                <SpecItem icon="fa-link" value={plan.specs.connections} />
                <SpecItem icon="fa-gauge-high" value={plan.specs.speed} />
                <SpecItem icon="fa-map-location-dot" value={plan.specs.locations} />
            </ul>

            <a href="https://discord.gg/codeon" target="_blank" rel="noopener noreferrer" className={`w-full text-center mt-auto py-3 px-6 font-bold rounded-lg transition-all duration-300 text-white ${plan.isPopular ? 'bg-gradient-to-r from-brand-cyan to-sky-600 hover:opacity-90' : 'bg-white/10 hover:bg-white/20'}`}>
              Get Started
            </a>
        </div>
    );
}

const FeatureCard: React.FC<{ feature: typeof v2rayFeatures[0] }> = ({ feature }) => (
    <div className="bg-card-bg-solid/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1 hover:border-brand-cyan/50">
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-brand-cyan/10 rounded-lg text-brand-cyan text-2xl">
                <i className={feature.icon}></i>
            </div>
            <div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-gray-400">{feature.description}</p>
            </div>
        </div>
    </div>
);


const V2RayPage: React.FC = () => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

    return (
        <>
            {/* Hero Section */}
            <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-dark-bg z-0">
                    <div className="absolute inset-0 animate-aurora opacity-50" style={{
                        background: 'linear-gradient(125deg, rgba(34, 211, 238, 0.1) 0%, rgba(13, 14, 27, 0) 25%, rgba(99, 102, 241, 0.1) 50%, rgba(13, 14, 27, 0) 75%, rgba(34, 211, 238, 0.1) 100%)',
                        backgroundSize: '400% 400%',
                    }}></div>
                </div>
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center md:text-left">
                        <div className="inline-flex items-center space-x-2 bg-card-bg-solid border border-brand-cyan/50 text-cyan-300 font-semibold px-4 py-2 rounded-full mb-6">
                           <i className="fa-solid fa-user-shield"></i>
                           <span>Secure & Private Connections</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                            V2Ray Hosting for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-sky-400">Total Freedom</span>
                        </h1>
                        <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto md:mx-0">
                            Bypass internet censorship and browse securely with our high-speed, reliable V2Ray hosting. Your privacy, guaranteed.
                        </p>
                        <a href="#plans" className="mt-10 inline-block bg-brand-cyan text-black font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-cyan/20">
                            View Plans
                        </a>
                    </div>
                     <div className="relative h-64 md:h-full flex items-center justify-center min-h-[300px]">
                        <img 
                            src="https://i.postimg.cc/Pq8kBsK7/image.png"
                            alt="Abstract secure data tunnel"
                            className="w-full max-w-md animate-float-cube"
                        />
                    </div>
                </div>
            </div>

             {/* How it works Section */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Get Connected in 3 Simple Steps</h2>
                    <p className="mt-4 text-gray-300">
                        Our streamlined process makes it easy to get started with a secure, private connection.
                    </p>
                </div>
                <div className="mt-16 relative grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent hidden md:block"></div>
                    {howItWorksSteps.map((step, index) => (
                        <div key={index} className="relative bg-card-bg-solid border border-white/10 rounded-xl p-8 text-center flex flex-col items-center">
                            <div className="absolute -top-8 w-16 h-16 flex items-center justify-center bg-brand-cyan text-dark-bg font-bold text-2xl rounded-full border-4 border-dark-bg">
                                {index + 1}
                            </div>
                            <div className="mt-8 w-20 h-20 flex items-center justify-center bg-brand-cyan/10 text-brand-cyan text-4xl rounded-2xl mb-6">
                                <i className={step.icon}></i>
                            </div>
                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                            <p className="mt-2 text-gray-400 flex-grow">{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>


            {/* Features Section */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl text-center mx-auto">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
                        Why Choose Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-sky-400">V2Ray Service?</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-300">
                        We provide a feature-rich, secure, and high-performance platform for all your private browsing needs.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {v2rayFeatures.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
            </section>
            
            {/* Global Network Section */}
             <section className="py-16 md:py-24 bg-dark-bg/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative flex items-center justify-center">
                         <img src="https://i.postimg.cc/LsSfwHPj/image.png" alt="Glowing globe showing network locations" className="w-full max-w-lg animate-[pulse-glow-cyan_5s_ease-in-out_infinite]" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-extrabold text-white">Access a Global Network of Servers</h2>
                        <p className="mt-4 text-lg text-gray-300">
                           Our strategically located servers ensure you get a fast and stable connection, no matter where you are. Bypass censorship and access content from around the world.
                        </p>
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {['USA', 'Germany', 'Singapore', 'Japan', 'UK', 'India'].map(loc => (
                                <div key={loc} className="bg-card-bg-solid border border-white/10 rounded-lg p-3 text-center">
                                    <p className="font-semibold text-white">{loc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
             </section>

            {/* Plans Section */}
            <div id="plans" className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold">Simple, Transparent Pricing</h2>
                        <p className="mt-4 text-lg text-gray-300">
                           Choose a plan that fits your usage. No hidden fees, no confusing tiers. Just pure speed and privacy.
                        </p>
                    </div>

                    <div className="mt-12 mb-16 flex justify-center p-1 rounded-lg bg-card-bg-solid border border-white/10 w-fit mx-auto">
                        <button 
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${billingCycle === 'monthly' ? 'bg-gradient-to-r from-brand-cyan to-sky-600 text-white' : 'text-gray-300 hover:bg-white/5'}`}
                        >
                            Monthly
                        </button>
                        <button 
                            onClick={() => setBillingCycle('annually')}
                            className={`relative px-6 py-2 rounded-md font-semibold transition-all duration-300 ${billingCycle === 'annually' ? 'bg-gradient-to-r from-brand-cyan to-sky-600 text-white' : 'text-gray-300 hover:bg-white/5'}`}
                        >
                            Annually
                            <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">SAVE 17%</span>
                        </button>
                    </div>

                    <div key={billingCycle} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                        {v2rayPlans.map(plan => <PlanCard key={plan.name} plan={plan} billingCycle={billingCycle} />)}
                    </div>
                </div>
            </div>
            
            {/* Comparison Section */}
            <section className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold text-white">Why We're Different</h2>
                    <p className="mt-4 text-lg text-gray-300">
                        See how our premium V2Ray service stacks up against free VPNs that compromise on speed, privacy, and security.
                    </p>
                </div>
                 <div className="mt-12 bg-card-bg-solid border border-white/10 rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="p-4 font-semibold text-white">Feature</th>
                                <th className="p-4 font-semibold text-white text-center">Our V2Ray</th>
                                <th className="p-4 font-semibold text-white text-center">Free VPNs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((item, index) => (
                                <tr key={index} className="border-t border-white/10">
                                    <td className="p-4 text-gray-300">{item.feature}</td>
                                    <td className="p-4 text-center">
                                        {item.us ? <i className="fa-solid fa-check-circle text-green-400 text-xl"></i> : <i className="fa-solid fa-times-circle text-red-400 text-xl"></i>}
                                    </td>
                                     <td className="p-4 text-center">
                                         {typeof item.freeVpn === 'boolean' ? (
                                            item.freeVpn ? <i className="fa-solid fa-check-circle text-green-400 text-xl"></i> : <i className="fa-solid fa-times-circle text-red-400 text-xl"></i>
                                         ) : <span className="text-yellow-400">{item.freeVpn}</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

export default V2RayPage;
