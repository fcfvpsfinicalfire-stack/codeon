

import React from 'react';
import { Page } from '../App';

interface ControlPanelProps {
    setPage: (page: Page) => void;
}

const panelFeatures = [
    {
        iconClass: 'fa-solid fa-server',
        title: 'Server Overview',
        description: 'Monitor resources & status.',
    },
    {
        iconClass: 'fa-solid fa-puzzle-piece',
        title: 'Mod & Plugin Installer',
        description: 'One-click installs for mods.',
    },
    {
        iconClass: 'fa-solid fa-code-branch',
        title: 'Version Manager',
        description: 'Instantly switch versions.',
    },
    {
        iconClass: 'fa-solid fa-users',
        title: 'Player Manager',
        description: 'Monitor and manage players.',
    },
    {
        iconClass: 'fa-solid fa-box-archive',
        title: 'Modpack Installer',
        description: '15,000+ modpacks available.',
    },
    {
        iconClass: 'fa-solid fa-headset',
        title: '24/7 Support',
        description: 'Get expert help anytime.',
    },
];

const FeatureCard: React.FC<{ feature: typeof panelFeatures[0] }> = ({ feature }) => (
    <div className="relative group h-full transition-all duration-300 transform hover:-translate-y-1">
        <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-brand-cyan to-brand-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-border-chase" style={{ backgroundSize: '400% 400%'}}></div>
        <div className="relative bg-card-bg-solid/80 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center h-full flex flex-col items-center justify-center">
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-lg text-brand-cyan text-3xl transition-all duration-300 group-hover:bg-white/10 group-hover:text-white">
                    <i className={feature.iconClass}></i>
                </div>
            </div>
            <h3 className="text-md font-bold text-white">{feature.title}</h3>
            <p className="text-sm text-gray-400 mt-1 flex-grow">{feature.description}</p>
        </div>
    </div>
);


const ControlPanel: React.FC<ControlPanelProps> = ({ setPage }) => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-dark-bg">
        <div className="absolute inset-0 z-0 opacity-25" style={{
            backgroundImage: 'radial-gradient(circle at 50% 100%, rgba(34, 211, 238, 0.2) 0%, transparent 50%)',
        }}></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
              Meet the Code One Game Panel
            </h2>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              Manage, edit, and control everything about your server with our powerful, intuitive interface.
            </p>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {panelFeatures.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
            ))}
        </div>
        
        <div className="mt-16 relative group">
            <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-brand-cyan to-brand-magenta rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-black rounded-2xl p-2 md:p-4 border-2 border-white/10 shadow-2xl shadow-black/60 overflow-hidden">
                <div 
                    className="absolute inset-0 animate-grid-pan z-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                    }}
                ></div>
                <img src="https://i.imgur.com/kG5B224.png" alt="Code One Control Panel" className="rounded-xl relative z-10" />
            </div>
        </div>
        
        <div className="mt-12 text-center">
            <button
                onClick={() => setPage('pricing')}
                className="bg-gradient-to-r from-brand-cyan to-brand-magenta text-white font-bold py-3 px-8 rounded-lg text-lg flex items-center justify-center space-x-2 hover:opacity-90 transform transition-transform duration-300 mx-auto"
            >
                <span>Explore All Features</span>
                <i className="fa-solid fa-arrow-right"></i>
            </button>
        </div>
      </div>
    </section>
  );
};

export default ControlPanel;