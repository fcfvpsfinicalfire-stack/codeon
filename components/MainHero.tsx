
import React from 'react';
import { Page } from '../App';

interface MainHeroProps {
    setPage: (page: Page) => void;
}

const MainHero: React.FC<MainHeroProps> = ({ setPage }) => {
    return (
        <section className="relative text-center py-24 sm:py-32 md:py-40 flex items-center justify-center min-h-[70vh] sm:min-h-[80vh] overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('https://i.postimg.cc/QxVJGCTT/image.png')"}}>
                <div className="absolute inset-0 bg-dark-bg/60"></div>
            </div>
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="inline-flex items-center space-x-2 bg-badge-bg text-badge-text font-semibold px-4 py-2 rounded-full mb-6 animate-text-focus-in" style={{ animationDelay: '0s' }}>
                    <i className="fa-solid fa-bolt text-cyan-400"></i>
                    <span>NEXT-GENERATION HOSTING</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight animate-text-focus-in" style={{ textShadow: '0 0 20px rgba(0,0,0,0.5)', animationDelay: '0.2s' }}>
                    High-Performance Hosting, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-magenta">Simplified</span>
                </h1>
                <p 
                    className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 animate-text-focus-in" 
                    style={{ animationDelay: '0.5s' }}
                >
                    Experience elite-tier game server and web hosting, powered by next-gen hardware and a passion for performance. Your project deserves the best.
                </p>
                <div 
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-text-focus-in"
                    style={{ animationDelay: '0.8s' }}
                >
                    <button
                        onClick={() => setPage('pricing')}
                        className="w-full sm:w-auto bg-gradient-to-r from-brand-cyan to-brand-magenta text-white font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-cyan/20"
                    >
                        Explore Hosting Plans
                    </button>
                    <a
                        href="https://discord.gg/MGd8tERV"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto bg-card-bg-solid/80 backdrop-blur-sm border border-white/20 text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
                    >
                        <i className="fa-brands fa-discord"></i>
                        <span>Join Our Discord</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default MainHero;