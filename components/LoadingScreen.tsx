
import React from 'react';
import { BrandLogo } from './Icons';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#030712] z-[500] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at center, #1e3a8a 0%, transparent 70%)`
      }} />
      
      <div className="relative flex flex-col items-center">
        <div className="animate-float mb-8">
          <BrandLogo className="w-32 h-32" />
        </div>
        
        <h1 className="text-3xl font-black text-white uppercase tracking-[0.4em] mb-4">
          CodeOn<span className="text-blue-500">Hostings</span>
        </h1>
        
        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 animate-loading-bar" />
        </div>
        
        <p className="mt-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] animate-pulse">
          Initializing Infrastructure...
        </p>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
