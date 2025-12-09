import React from 'react';

const features = [
    { icon: 'fa-solid fa-bolt-lightning', title: 'Instant Setup', description: 'Get your server running in under 60 seconds' },
    { icon: 'fa-solid fa-shield-halved', title: 'DDoS Protection', description: 'Enterprise-grade security for your servers' },
    { icon: 'fa-solid fa-clock', title: '99.9% Uptime', description: 'Reliable hosting with guaranteed availability' },
    { icon: 'fa-solid fa-headset', title: '24/7 Support', description: 'Expert help whenever you need it' },
];

const MtaPage: React.FC = () => {
    return (
        <section className="relative text-white pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://i.imgur.com/pZ2a9i0.jpeg')"}}>
            <div className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm"></div>
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left side content */}
                    <div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                            Host your own <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Multi Theft Auto</span> Servers
                        </h1>
                        <p className="mt-6 text-lg text-gray-300">
                            Experience lightning-fast performance, unbeatable reliability, and 24/7 support for all your favorite games.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <a href="https://discord.gg/ZjJz8GKB" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105">
                                <span>Get started</span>
                                <i className="fa-solid fa-arrow-right"></i>
                            </a>
                            <a href="#" className="font-semibold hover:text-purple-300 transition-colors">
                                Learn More <i className="fa-solid fa-arrow-right-long text-xs ml-1"></i>
                            </a>
                        </div>
                         <p className="mt-4 text-xs text-gray-400">...Get started for free!</p>
                    </div>
                    {/* Right side features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-card-bg-solid/50 backdrop-blur-md border border-white/10 rounded-xl p-4 transition-all duration-300 hover:border-purple-500/50 hover:-translate-y-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <i className={`${feature.icon} text-purple-400 text-lg`}></i>
                                    <h3 className="font-bold text-white">{feature.title}</h3>
                                </div>
                                <p className="text-sm text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Partners section */}
                <div className="mt-20 md:mt-24">
                     <div className="flex items-center space-x-4 mb-6">
                        <div className="w-full h-px bg-white/10"></div>
                        <span className="text-gray-400 whitespace-nowrap text-sm font-semibold">We Work With</span>
                        <div className="w-full h-px bg-white/10"></div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-70">
                        <span className="font-bold text-gray-400 tracking-widest">RAYYA GAMING</span>
                        <span className="font-bold text-gray-400 tracking-widest">MINEOME MC</span>
                        <span className="font-bold text-gray-400 tracking-widest">PC KILLA</span>
                        <span className="font-bold text-gray-400 tracking-widest">SAOTERROR KING</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default MtaPage;