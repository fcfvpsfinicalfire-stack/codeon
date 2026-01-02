
import React, { useState, useEffect } from 'react';

const PartnerToast: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show after 3 seconds
    const timer = setTimeout(() => {
      if (!localStorage.getItem('partner-toast-dismissed')) {
        setIsVisible(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('partner-toast-dismissed', 'true');
  };

  const handleRedirect = () => {
    window.open('https://discord.gg/CHAR4ABVWz', '_blank');
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div 
      onClick={handleRedirect}
      className="fixed bottom-6 left-6 z-[200] group cursor-pointer animate-in slide-in-from-left-10 fade-in duration-700"
    >
      <div className="glass p-4 pr-12 rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-900/20 flex items-center gap-4 hover:border-purple-500 hover:bg-white/5 transition-all transform hover:-translate-y-1 active:scale-95">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
        </div>

        <div>
          <h4 className="text-[11px] font-black text-white uppercase tracking-tighter leading-none mb-1">
            Be a Partner?
          </h4>
          <p className="text-[9px] text-purple-400 font-black uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
            Click here to Join
          </p>
        </div>

        <button 
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1.5 text-gray-600 hover:text-white transition-colors"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PartnerToast;
