import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-dark-bg z-[200] flex flex-col items-center justify-center animate-fade-in">
            {/* Background Grids */}
            <div 
                className="absolute inset-[-50%] animate-drift"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 1px, transparent 1px)',
                    backgroundSize: '2.5rem 2.5rem',
                }}
            ></div>

            {/* Logo and Animation */}
            <div className="relative flex flex-col items-center justify-center">
                <img src="https://i.postimg.cc/qMMj11z0/codeon.png" alt="Code On Hosting Logo" className="h-12 animate-pulse" />
                <span className="font-bold text-2xl text-white tracking-wider mt-4 animate-pulse">CODE ON HOSTING</span>
                <p className="text-gray-400 mt-6 tracking-widest animate-pulse">INITIALIZING...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;