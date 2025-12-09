
import React from 'react';
import SpecializedSolutions from '../components/SpecializedSolutions';
import AdvancedFeatures from '../components/AdvancedFeatures';
import IncludedFeatures from '../components/IncludedFeatures';

// Data for the control panel features
const controlPanelFeatures = [
    { icon: 'fa-solid fa-download', title: '1-Click Installations', description: 'Install games, mods, and plugins with just a single click. Our intuitive interface makes server setup a breeze.' },
    { icon: 'fa-solid fa-folder-open', title: 'Advanced File Manager', description: 'Upload, download, and manage your files with our powerful file manager. Edit configurations directly in your browser.' },
    { icon: 'fa-solid fa-floppy-disk', title: 'Automated Backups', description: 'Schedule automatic backups of your server to ensure your data is always safe and recoverable.' },
    { icon: 'fa-solid fa-terminal', title: 'Live Console Access', description: 'Monitor and control your server with real-time console access. Execute commands and view logs instantly.' },
    { icon: 'fa-solid fa-bolt', title: 'Instant Scaling', description: 'Upgrade or downgrade your server resources with zero downtime as your community grows.' },
    { icon: 'fa-solid fa-link', title: 'Free Subdomain', description: 'Get a free custom subdomain for your server to make it easily accessible to your players.' }
];

// Data for DDoS stats
const ddosStats = [
    { value: '99.99%', label: 'Mitigation Rate' },
    { value: '1 Tbps+', label: 'Capacity' },
    { value: '<10ms', label: 'Response Time' },
    { value: '24/7', label: 'Protection' }
];

// Component for a feature in the grid below the control panel
const ControlPanelFeature: React.FC<{ feature: typeof controlPanelFeatures[0] }> = ({ feature }) => (
    <div className="bg-card-bg-solid/50 border border-white/10 rounded-xl p-6 flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-accent-purple/10 rounded-lg text-accent-purple text-2xl">
            <i className={feature.icon}></i>
        </div>
        <div>
            <h3 className="font-bold text-white text-lg">{feature.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
        </div>
    </div>
);

// Component for the animated DDoS shield
const DdosShield: React.FC = () => (
    <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Radiating circles */}
        <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-4 border-2 border-blue-500/20 rounded-full animate-spin-slower"></div>
        <div className="absolute inset-8 border-dashed border border-blue-500/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>

        {/* Central Icon */}
        <div className="relative w-24 h-24 bg-card-bg-solid rounded-full flex items-center justify-center border-2 border-blue-500/50 shadow-[0_0_20px_theme(colors.blue.500)]">
            <i className="fa-solid fa-shield-halved text-4xl text-blue-400"></i>
        </div>
    </div>
);


const GameServersPage: React.FC = () => {
    return (
        <>
            <SpecializedSolutions />
            <AdvancedFeatures />
            <IncludedFeatures />

            <div className="py-16 md:py-24 space-y-24 md:space-y-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section 1: The Ultimate Game Control Panel */}
                <section>
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center space-x-2 bg-accent-purple/20 text-accent-purple font-semibold px-4 py-2 rounded-full mb-4 text-sm">
                            <span>POWERFUL & INTUITIVE</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                            The Ultimate <span className="text-accent-purple">Game Control Panel</span>
                        </h1>
                        <p className="text-lg text-gray-300">
                            Our custom-built control panel puts you in complete control of your game server with an intuitive interface and powerful management tools.
                        </p>
                    </div>

                    <div className="mt-16 relative p-2 bg-card-bg-solid/50 border border-white/10 rounded-xl shadow-2xl shadow-black/50">
                        <img src="https://i.postimg.cc/vHXzjmtK/image.png" alt="Code On Hosting Game Control Panel" className="rounded-lg w-full" />
                        <div className="absolute -bottom-4 right-8 bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-md shadow-lg">
                            Powerful & User-Friendly
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {controlPanelFeatures.map((feature, index) => (
                            <ControlPanelFeature key={index} feature={feature} />
                        ))}
                    </div>
                </section>

                {/* Section 2: Advanced DDoS Protection */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-accent-purple/20 text-accent-purple font-semibold px-4 py-2 rounded-full mb-4 text-sm">
                            <span>DDOS PROTECTION</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                            Advanced <span className="text-accent-purple">DDoS Protection</span>
                        </h2>
                        <p className="text-lg text-gray-300">
                            Multi-layered security system that shields your game servers from attacks, ensuring uninterrupted gameplay with sub-10ms mitigation response.
                        </p>
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            {ddosStats.map((stat, index) => (
                                <div key={index} className="bg-card-bg-solid/50 border border-white/10 rounded-lg p-4 text-center">
                                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                                    <p className="text-sm text-gray-400">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <DdosShield />
                    </div>
                </section>
            </div>
        </>
    );
};

export default GameServersPage;
