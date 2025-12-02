import React from 'react';

const platformFeatures = [
    {
        iconClass: 'fa-solid fa-microchip',
        title: 'Next-Gen CPUs',
        description: 'AMD Ryzen & Intel Xeon for raw power.',
        // Positioned to align with SVG endpoints on a 4:3 canvas
        position: 'top-[5%] left-1/2 -translate-x-1/2 -translate-y-1/2',
    },
    {
        iconClass: 'fa-solid fa-memory',
        title: 'DDR5 RAM',
        description: 'Lightning-fast memory access.',
        position: 'top-[29.17%] left-[81.25%] -translate-x-1/2 -translate-y-1/2',
    },
    {
        iconClass: 'fa-solid fa-shield-halved',
        title: 'DDoS Protection',
        description: 'Enterprise-grade attack mitigation.',
        position: 'top-[70.83%] left-[81.25%] -translate-x-1/2 -translate-y-1/2',
    },
    {
        iconClass: 'fa-solid fa-hard-drive',
        title: 'NVMe SSDs',
        description: 'Up to 10x faster storage speeds.',
        position: 'top-[95%] left-1/2 -translate-x-1/2 -translate-y-1/2',
    },
    {
        iconClass: 'fa-solid fa-network-wired',
        title: 'Gigabit Network',
        description: 'Low-latency, high-speed connectivity.',
        position: 'top-[70.83%] left-[18.75%] -translate-x-1/2 -translate-y-1/2',
    },
    {
        iconClass: 'fa-solid fa-headset',
        title: '24/7 Support',
        description: 'Expert help whenever you need it.',
        position: 'top-[29.17%] left-[18.75%] -translate-x-1/2 -translate-y-1/2',
    },
];

const FeatureNode: React.FC<{ feature: typeof platformFeatures[0], index: number }> = ({ feature, index }) => (
    <div className={`absolute ${feature.position} w-48 text-center flex flex-col items-center group transition-transform duration-300 hover:scale-110`}>
        <div 
            className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-card-bg-solid border-2 border-brand-cyan/30 rounded-full text-brand-cyan text-3xl transition-all duration-300 group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan group-hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] shadow-lg shadow-brand-cyan/10 animate-fade-in"
            style={{ animationDelay: `${index * 150}ms`}}
        >
            <i className={feature.iconClass}></i>
        </div>
        <h3 className="mt-3 font-bold text-white text-sm sm:text-base">{feature.title}</h3>
        <p className="text-xs sm:text-sm text-gray-400">{feature.description}</p>
    </div>
);


const OurPlatform: React.FC = () => {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-dark-bg via-[#101123] to-dark-bg"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-magenta">Code One</span> Platform</h2>
                    <p className="mt-4 text-lg text-gray-300">
                        Our entire infrastructure is built from the ground up with performance, reliability, and security as our top priorities.
                    </p>
                </div>

                <div className="mt-24 md:mt-32 relative w-full max-w-4xl mx-auto aspect-[4/3]">
                    {/* Central Core */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-2 border-brand-cyan/30 animate-core-ring-pulse"></div>
                        <div className="absolute inset-0 rounded-full border-2 border-brand-cyan/30 animate-core-ring-pulse" style={{ animationDelay: '1.25s' }}></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/30 to-brand-magenta/30 rounded-full blur-2xl animate-pulse-glow-cyan"></div>
                        <div className="absolute inset-0 rounded-full bg-card-bg-solid border-2 border-brand-cyan/50 animate-spin-slow"></div>
                        <div className="absolute inset-2 rounded-full bg-dark-bg"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                             <div className="bg-gradient-to-br from-brand-cyan to-brand-magenta p-3 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold mt-2">CORE</span>
                        </div>
                    </div>
                    
                    {/* Connection lines */}
                    <svg className="absolute w-full h-full top-0 left-0 z-0 opacity-40 pointer-events-none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 800 600">
                        <defs>
                            <linearGradient id="line-gradient-platform" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#22D3EE" />
                                <stop offset="100%" stopColor="#E11D48" />
                            </linearGradient>
                        </defs>
                        {[
                            { d: "M 400 300 L 400 30" },
                            { d: "M 400 300 L 650 175" },
                            { d: "M 400 300 L 650 425" },
                            { d: "M 400 300 L 400 570" },
                            { d: "M 400 300 L 150 425" },
                            { d: "M 400 300 L 150 175" },
                        ].map((path, index) => (
                             <path 
                                key={index}
                                d={path.d}
                                stroke="url(#line-gradient-platform)" 
                                strokeWidth="2" 
                                fill="none" 
                                strokeDasharray="15 25" 
                                className="animate-line-pulse"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            />
                        ))}
                    </svg>

                    {/* Feature Nodes */}
                    {platformFeatures.map((feature, index) => (
                        <FeatureNode key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurPlatform;
