import React from 'react';
import { Page } from '../App';

const HeroAbstractBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Soft radial gradients */}
            <div className="absolute top-0 -left-1/4 w-full h-full bg-gradient-radial from-brand-cyan/10 to-transparent to-70% blur-3xl animate-drift"></div>
            <div className="absolute bottom-0 -right-1/4 w-full h-full bg-gradient-radial from-brand-magenta/10 to-transparent to-70% blur-3xl animate-drift" style={{animationDelay: '5s'}}></div>
        </div>
    );
};


interface MainHeroProps {
    setPage: (page: Page) => void;
}

const MainHero: React.FC<MainHeroProps> = ({ setPage }) => {
    return (
        <section className="relative text-center py-24 sm:py-32 md:py-40 flex items-center justify-center min-h-[70vh] sm:min-h-[80vh] overflow-hidden">
            <HeroAbstractBackground />
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight animate-text-focus-in" style={{ textShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
                    High-Performance Hosting, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-magenta">Simplified</span>
                </h1>
                <p 
                    className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 animate-text-focus-in" 
                    style={{ animationDelay: '0.3s' }}
                >
                    Experience elite-tier game server and web hosting, powered by next-gen hardware and a passion for performance. Your project deserves the best.
                </p>
                <div 
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-text-focus-in"
                    style={{ animationDelay: '0.6s' }}
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