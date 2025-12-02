import React from 'react';

const DynamicArt: React.FC = () => {
  return (
    <div className="relative w-full max-w-md h-80 md:h-96 flex items-center justify-center overflow-hidden rounded-2xl bg-card-bg-solid/30 border border-white/10">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 blur-3xl animate-slow-pan"></div>
      </div>
      
      {/* Floating Blobs */}
      <div className="absolute w-32 h-32 bg-purple-500 rounded-full blur-2xl opacity-50 animate-blob" style={{ animationDelay: '0s' }}></div>
      <div className="absolute w-48 h-48 bg-indigo-500 rounded-full blur-3xl opacity-40 animate-blob top-1/2 left-1/4" style={{ animationDelay: '2s' }}></div>
      <div className="absolute w-24 h-24 bg-sky-400 rounded-full blur-xl opacity-60 animate-blob bottom-1/4 right-1/4" style={{ animationDelay: '4s' }}></div>
      
      {/* Spinning Rings */}
      <div className="absolute w-64 h-64 border-2 border-purple-400/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
      <div className="absolute w-80 h-80 border-t-2 border-indigo-400/30 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
      
      {/* Central element - Glowing Core */}
      <div className="relative z-10 flex items-center justify-center w-16 h-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full animate-pulse-glow-purple"></div>
        <div className="w-8 h-8 bg-white/80 rounded-full blur-sm"></div>
      </div>
    </div>
  );
};

export default DynamicArt;
