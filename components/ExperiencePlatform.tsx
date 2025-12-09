
import React, { useState } from 'react';

const platformFeatures = [
    {
        id: 'shell',
        title: 'Shell Access',
        description: 'Manage your server directly via our own custom made Shell system, no need for any third-party tools!',
        icon: 'fa-solid fa-terminal'
    },
    {
        id: 'plugins',
        title: 'Plugin Manager',
        description: 'Our developers worked hard to bring you the best experience when hosting a minecraft server. Install plugins in a single click.',
        icon: 'fa-solid fa-puzzle-piece'
    },
    {
        id: 'mods',
        title: 'Mod Manager',
        description: 'Our developers worked hard to bring you the best experience when hosting a minecraft server. Install mods in a single click.',
        icon: 'fa-solid fa-box-archive'
    },
    {
        id: 'analytics',
        title: 'Analytics',
        description: 'View or server analytics in 1 minute, giving you detailed logs and charts.',
        icon: 'fa-solid fa-chart-line'
    }
];

const ExperiencePlatform: React.FC = () => {
    const [activeTab, setActiveTab] = useState('shell');

    const activeFeature = platformFeatures.find(f => f.id === activeTab);

    return (
        <section className="py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center space-x-2 bg-accent-purple/20 text-accent-purple font-semibold px-4 py-2 rounded-full mb-4">
                    <span>OUR PANEL</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                    Experience Our <span className="text-accent-purple">Platform</span>
                </h2>
                <p className="text-lg text-gray-300">
                    Discover the powerful features that make our platform the perfect choice for your needs.
                </p>
            </div>

            <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side: Feature list */}
                <div className="space-y-4">
                    {platformFeatures.map(feature => (
                        <button
                            key={feature.id}
                            onClick={() => setActiveTab(feature.id)}
                            className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                                activeTab === feature.id
                                    ? 'bg-accent-purple/10 border-accent-purple'
                                    : 'bg-card-bg-solid/50 border-gray-800 hover:border-gray-600'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <i className={`${feature.icon} text-2xl text-purple-300`}></i>
                                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                                </div>
                                <i className={`fa-solid fa-chevron-right text-gray-500 transition-transform duration-300 ${activeTab === feature.id ? 'rotate-90 text-purple-300' : ''}`}></i>
                            </div>
                            {activeTab === feature.id && (
                                <p className="mt-4 text-gray-400 pl-10 animate-fade-in">
                                    {feature.description}
                                </p>
                            )}
                        </button>
                    ))}
                </div>

                {/* Right side: Image */}
                <div className="relative p-2 bg-card-bg-solid/50 border border-white/10 rounded-xl">
                    <img src="https://i.imgur.com/kG5B224.png" alt="Control Panel Screenshot" className="rounded-lg w-full" />
                     <div className="absolute -bottom-4 -right-4 bg-accent-purple text-white text-sm font-bold px-4 py-2 rounded-md shadow-lg">
                        {activeFeature?.title || 'Shell Access'}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperiencePlatform;
