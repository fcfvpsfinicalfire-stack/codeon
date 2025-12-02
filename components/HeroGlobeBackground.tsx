import React from 'react';

const HeroGlobeBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Grid Pattern Overlay */}
            <div 
                className="absolute inset-0 opacity-10" 
                style={{
                    backgroundImage: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '2rem 2rem',
                }}
            ></div>
            
            {/* Globe */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[900px] sm:h-[900px]">
                <div 
                    className="absolute inset-0 rounded-full animate-rotate-globe opacity-30" 
                    style={{
                        backgroundImage: `url('https://i.imgur.com/G4f5S0g.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transformStyle: 'preserve-3d',
                    }}
                ></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-dark-bg via-transparent to-dark-bg"></div>
            </div>

            {/* Shooting Stars */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div 
                    className="absolute w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_10px_theme(colors.cyan.300)] animate-shooting-star"
                    style={{ top: '20%', left: '0%', animationDelay: '0s', animationDuration: '5s' }}
                ></div>
                <div 
                    className="absolute w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_10px_theme(colors.cyan.300)] animate-shooting-star"
                    style={{ top: '40%', left: '0%', animationDelay: '2s', animationDuration: '4s' }}
                ></div>
                 <div 
                    className="absolute w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_10px_theme(colors.cyan.300)] animate-shooting-star"
                    style={{ top: '60%', left: '0%', animationDelay: '4.5s', animationDuration: '6s' }}
                ></div>
            </div>
        </div>
    );
};

export default HeroGlobeBackground;
