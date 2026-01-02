
import React from 'react';

const UpdateBanner: React.FC = () => {
  const scrollToCalculator = () => {
    const calcSection = document.getElementById('calculator');
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mb-20">
      <div className="relative group overflow-hidden rounded-[2rem] border border-blue-500/30 bg-gradient-to-r from-blue-900/40 to-blue-600/10 p-1 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Minecraft Camel Image placeholder area */}
        <div className="relative w-48 h-32 md:h-40 flex-shrink-0 flex items-center justify-center p-4">
          <img 
            src="https://image2url.com/r2/default/images/1767360297993-31645f26-2dd5-4bd1-a225-1565a07e9b8b.png" 
            className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-float"
            alt="Minecraft Update"
          />
        </div>

        <div className="flex-1 text-center md:text-left py-6">
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
            Minecraft <span className="text-blue-400">1.21.11</span> is now available!
          </h3>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-tight">
            The <span className="text-blue-400 underline underline-offset-4 decoration-blue-500/50">Mounts of Mayhem</span> Minecraft update is available! Start a server today to play the new update with your friends.
          </p>
        </div>

        <div className="pr-8 pb-8 md:pb-0">
          <button 
            onClick={scrollToCalculator}
            className="px-10 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-cyan-500/20 transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Create Server
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBanner;
