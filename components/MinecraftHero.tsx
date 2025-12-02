import React from 'react';
import { Page } from '../App';

interface MinecraftHeroProps {
    setPage: (page: Page) => void;
}

const MinecraftHero: React.FC<MinecraftHeroProps> = ({ setPage }) => {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden bg-dark-bg">
            <div className="absolute inset-0 z-0 opacity-5" style={{
                backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')`,
                backgroundRepeat: 'repeat',
            }}></div>
             <div className="absolute inset-0 z-0 opacity-25" style={{
                backgroundImage: 'radial-gradient(circle at 25% 30%, rgba(34, 197, 94, 0.2), transparent 40%), radial-gradient(circle at 75% 70%, rgba(139, 92, 246, 0.15), transparent 40%)',
            }}></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left side: Text content */}
                <div className="text-center md:text-left">
                     <div className="inline-flex items-center space-x-2 bg-badge-bg text-badge-text font-semibold px-4 py-2 rounded-full mb-6">
                        <i className="fa-solid fa-cube text-green-400"></i>
                        <span>Minecraft Hosting</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
                        Your World, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">Perfected</span>
                    </h2>
                    <p className="mt-6 text-lg text-gray-300 max-w-lg mx-auto md:mx-0">
                        Experience lag-free adventures with our high-performance Minecraft servers. Featuring instant setup, one-click modpack installations, and 24/7 support.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button
                            onClick={() => setPage('pricing')}
                            className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-900/50"
                        >
                            View Plans
                        </button>
                        <button
                            onClick={() => setPage('gameservers')}
                            className="bg-card-bg-solid/80 backdrop-blur-sm border border-white/20 text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            See All Games
                        </button>
                    </div>
                </div>

                {/* Right side: Image */}
                <div className="relative h-64 md:h-full flex items-center justify-center min-h-[300px]">
                    <img 
                        src="https://i.postimg.cc/gJBz7HFh/image.png" 
                        alt="Expansive Minecraft world with floating islands" 
                        className="w-full max-w-md animate-float-alt"
                    />
                </div>
            </div>
        </section>
    );
};

export default MinecraftHero;