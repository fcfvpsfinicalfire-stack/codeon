import React from 'react';

const minecraftFeatures = [
    {
        icon: 'fa-solid fa-download',
        title: 'Premium Plugins Marketplace',
        description: 'Instantly install from our library of 4,000+ premium plugins with just a single click, all at no additional cost.'
    },
    {
        icon: 'fa-solid fa-code',
        title: 'Advanced Plugins Manager',
        description: 'Our intuitive plugins manager allows you to install, configure, and update your Minecraft plugins with ease, all from within your control panel.'
    },
    {
        icon: 'fa-solid fa-arrows-rotate',
        title: 'One-Click Version Switching',
        description: 'Easily switch between Minecraft versions or server types like Spigot, Paper, and Forge without losing your world data or configurations.'
    }
];

const fiveMFeatures = [
    {
        icon: 'fa-solid fa-terminal',
        title: 'TxAdmin Integration',
        description: 'Seamlessly manage your FiveM server with TxAdmin integration, giving you complete control over your server settings and permissions.'
    },
    {
        icon: 'fa-solid fa-rocket',
        title: 'One-Click Version Switching',
        description: 'Switch between different FiveM artifact versions with a single click to keep your server up to date or roll back if needed.'
    },
    {
        icon: 'fa-solid fa-folder-tree',
        title: 'Resource & Script Management',
        description: 'Easily install, update and manage your FiveM resources and scripts through our intuitive control panel interface.'
    }
];

const FeatureItem: React.FC<{ feature: typeof minecraftFeatures[0], color: 'green' | 'blue' }> = ({ feature, color }) => (
    <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg text-2xl ${color === 'green' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'}`}>
            <i className={feature.icon}></i>
        </div>
        <div>
            <h4 className="font-bold text-lg text-white">{feature.title}</h4>
            <p className="mt-1 text-gray-400">{feature.description}</p>
        </div>
    </div>
);


const SpecializedSolutions: React.FC = () => {
    return (
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                    Specialized Solutions For <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-brand-cyan">Popular Games</span>
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                    We offer tailored features for the most popular game servers, enhancing your hosting experience with game-specific optimizations.
                </p>
            </div>

            <div className="mt-20 space-y-24">
                {/* Minecraft Section */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="relative p-2 bg-card-bg-solid/50 border border-green-500/30 rounded-xl">
                         <img src="https://i.postimg.cc/QxVJGCTT/image.png" alt="Minecraft Underwater Scene" className="rounded-lg w-full" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-8">
                            <span className="text-green-400">Minecraft</span> Special Features
                        </h3>
                        <div className="space-y-6">
                            {minecraftFeatures.map((feature, index) => (
                                <FeatureItem key={index} feature={feature} color="green" />
                            ))}
                        </div>
                        <a href="#" className="mt-10 inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-500 transition-colors duration-300 transform hover:scale-105">
                            Learn More About Minecraft Hosting
                        </a>
                    </div>
                </div>

                {/* FiveM Section */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="md:order-2 relative p-2 bg-card-bg-solid/50 border border-blue-500/30 rounded-xl">
                        <img src="https://i.postimg.cc/G3V3j3vL/image.png" alt="FiveM Vinewood Sign" className="rounded-lg w-full" />
                    </div>
                    <div className="md:order-1">
                        <h3 className="text-3xl font-bold text-white mb-8">
                            <span className="text-blue-400">FiveM</span> Special Features
                        </h3>
                        <div className="space-y-6">
                            {fiveMFeatures.map((feature, index) => (
                                <FeatureItem key={index} feature={feature} color="blue" />
                            ))}
                        </div>
                         <a href="#" className="mt-10 inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-500 transition-colors duration-300 transform hover:scale-105">
                            Learn More About FiveM Hosting
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecializedSolutions;