

import React from 'react';

// Data reordered for a more dynamic grid layout that matches the user's image.
const advancedFeaturesData = [
    {
        iconClass: 'fa-solid fa-microchip',
        title: 'High Performance',
        description: 'Powered by latest generation processors for performance',
    },
    {
        iconClass: 'fa-solid fa-bolt',
        title: 'Low Latency',
        description: 'Optimized network infrastructure for minimal lag and delay',
    },
    {
        iconClass: 'fa-solid fa-shield-halved',
        title: 'Advanced Security',
        description: 'Our system is protected by advanced, multi-layered security protocols designed to detect, isolate, and neutralize threats in real time — ensuring your data remains safe around the clock',
        spanClass: 'lg:col-span-2',
        isSpecial: true,
    },
     {
        iconClass: 'fa-solid fa-heart-pulse',
        title: 'Auto Recovery',
        description: 'Automatic server recovery and backup systems',
    },
    {
        iconClass: 'fa-solid fa-gear',
        title: 'Full Control',
        description: 'Complete server control panel with advanced configuration options',
    },
    {
        iconClass: 'fa-solid fa-chart-simple',
        title: 'Resource Scaling',
        description: 'Dynamic resource allocation based on server demands',
    },
];

const AdvancedFeatureCard: React.FC<{ feature: typeof advancedFeaturesData[0] }> = ({ feature }) => {
    const cardClasses = `
        bg-card-bg-solid border border-white/10 rounded-xl p-6 relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col
        ${feature.spanClass || ''}
        ${feature.isSpecial ? 'border-accent-purple bg-gradient-to-br from-card-bg-solid to-[#191428]' : 'hover:border-purple-500/50'}
    `;

    return (
        <div className={cardClasses}>
             <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <div className="text-2xl text-purple-400/80">
                    <i className={feature.iconClass}></i>
                </div>
            </div>
            <p className="text-gray-400">{feature.description}</p>
        </div>
    );
};

const AdvancedFeatures: React.FC = () => {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10">
                <img src="https://i.postimg.cc/RVGtKBxf/codeon.png" alt="Abstract tech circuit background" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-left">
                    <div className="inline-flex items-center space-x-2 bg-badge-bg text-badge-text font-semibold px-4 py-2 rounded-full mb-4">
                        <i className="fa-solid fa-rocket"></i>
                        <span>We Won't Disappoint</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
                        Advanced <span className="text-accent-purple">Features</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-300">
                        Everything you need for professional game server hosting
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {advancedFeaturesData.map((feature, index) => (
                         <div key={index} className={feature.spanClass || ''}>
                            <AdvancedFeatureCard feature={feature} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default AdvancedFeatures;