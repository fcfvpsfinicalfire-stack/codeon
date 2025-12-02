

import React from 'react';

const partnershipFeatures = [
    { icon: 'fa-solid fa-ticket-simple', text: 'Exclusive deals & merch' },
    { icon: 'fa-solid fa-server', text: 'Free Minecraft server' },
    { icon: 'fa-solid fa-tag', text: 'Custom affiliate link and discount code' },
    { icon: 'fa-solid fa-face-smile', text: 'Personal partner manager' }
];

const FeatureItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
    <div className="flex items-center space-x-4">
        <i className={`${icon} text-2xl text-brand-cyan w-6 text-center`}></i>
        <span className="text-gray-300">{text}</span>
    </div>
);

const Partnerships: React.FC = () => {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-15">
                <img src="https://i.postimg.cc/N0VDGcZY/image.png" alt="Abstract geometric background" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 group">
                 <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-brand-cyan to-brand-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-border-chase" style={{ backgroundSize: '400% 400%'}}></div>
                <div className="relative bg-card-bg-solid rounded-2xl p-8 md:p-12 border border-brand-cyan/30">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Left side content */}
                        <div className="flex-1 w-full">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                                Partnerships & Affiliate
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                {partnershipFeatures.map((feature, index) => (
                                    <FeatureItem key={index} icon={feature.icon} text={feature.text} />
                                ))}
                            </div>
                        </div>

                        {/* Right side button */}
                        <div className="flex-shrink-0 mt-8 md:mt-0">
                            <button className="bg-gradient-to-br from-brand-cyan to-brand-magenta text-white font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-cyan/20">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partnerships;