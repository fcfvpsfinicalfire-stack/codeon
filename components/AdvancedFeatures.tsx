
import React from 'react';

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
     {
        iconClass: 'fa-solid fa-globe',
        title: 'Global Network',
        description: 'Worldwide server locations for optimal connectivity',
    },
];

const AdvancedFeatureCard: React.FC<{ feature: typeof advancedFeaturesData[0] }> = ({ feature }) => {
    const baseCardClasses = "bg-card-bg-solid/90 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 group hover:-translate-y-1 h-full";
    const specialClasses = "border-2 border-accent-purple/80 shadow-lg shadow-accent-purple/20";
    const normalClasses = "border border-white/10 hover:border-accent-purple/50";

    return (
        <div className={`${baseCardClasses} ${feature.isSpecial ? specialClasses : normalClasses}`}>
            {feature.isSpecial && (
                 <>
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 via-transparent to-transparent opacity-30"></div>
                    <img src="https://i.imgur.com/S6Q2R4m.png" alt="Decoration" className="absolute -top-4 -right-4 w-10 h-10 pointer-events-none" />
                    <img src="https://i.imgur.com/S6Q2R4m.png" alt="Decoration" className="absolute -bottom-4 -right-4 w-10 h-10 pointer-events-none" />
                </>
            )}
            <div className="relative flex h-full">
                <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                </div>
                <div className={`flex-shrink-0 w-20 flex items-center justify-center text-3xl border-l transition-colors duration-300 ${feature.isSpecial ? 'border-accent-purple/30 text-accent-purple' : 'border-white/10 text-purple-400/70 group-hover:text-accent-purple'}`}>
                    <i className={feature.iconClass}></i>
                </div>
            </div>
        </div>
    );
};

const AdvancedFeatures: React.FC = () => {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden bg-dark-bg">
            <div className="absolute inset-0 z-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 1px)',
                backgroundSize: '2rem 2rem'
            }}></div>
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center space-x-2 bg-accent-purple/20 text-accent-purple font-semibold px-4 py-2 rounded-full mb-4">
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
                         <div key={index}>
                            <AdvancedFeatureCard feature={feature} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default AdvancedFeatures;
