
import React, { useState } from 'react';
import { Zap, X, MessageSquare, Send } from 'lucide-react';

const FloatingAction: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* Pop-up Box */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-blue-600 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Zap size={20} fill="white" />
              <span className="font-bold">AI Support</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto space-y-4">
            <div className="bg-slate-800 p-3 rounded-lg text-sm text-slate-300">
              Hi! I'm your AI host assistant. How can I help you pick a server today?
            </div>
          </div>
          <div className="p-4 border-t border-white/10">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask anything..." 
                className="w-full bg-slate-800 border border-white/10 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-blue-500"
              />
              <button className="absolute right-2 top-1.5 text-blue-500">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/40 hover:scale-110 active:scale-95 transition-all group"
      >
        {isOpen ? <X size={28} className="text-white" /> : <Zap size={28} fill="white" className="text-white group-hover:animate-pulse" />}
      </button>
    </div>
  );
};

export default FloatingAction;
