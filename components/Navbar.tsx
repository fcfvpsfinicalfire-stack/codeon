
import React, { useState } from 'react';
import { Menu, X, ChevronDown, Globe, ShoppingCart, User, LayoutGrid, Book, BookOpen, Newspaper, Settings, Cpu, Users } from 'lucide-react';

interface NavbarProps {
  onViewChange: (view: 'home' | 'minecraft' | 'rust' | 'ark' | 'fivem' | 'article' | 'faq' | 'control' | 'hardware' | 'partners' | 'knowledgebase' | 'blog') => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ onViewChange, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const gamesList = [
    { name: 'Minecraft', price: '$2.79', icon: '🟩', bgColor: 'bg-emerald-500/20', borderColor: 'border-emerald-500/30' },
    { name: 'Rust', price: '$11.24', icon: '🟧', bgColor: 'bg-orange-500/20', borderColor: 'border-orange-500/30' },
    { name: 'ARK Survival Evolved', price: '$11.24', icon: '⛰️', bgColor: 'bg-amber-700/20', borderColor: 'border-amber-700/30' },
    { name: 'FiveM', price: '$6.74', icon: '🅰️', bgColor: 'bg-pink-600/20', borderColor: 'border-pink-600/30' },
    { name: 'RedM', price: '$8.99', icon: '🟥', bgColor: 'bg-red-600/20', borderColor: 'border-red-600/30' },
    { name: 'Palworld', price: '$8.99', icon: '🦕', bgColor: 'bg-cyan-500/20', borderColor: 'border-cyan-500/30' },
    { name: 'Terraria', price: '$3.74', icon: '🌳', bgColor: 'bg-green-600/20', borderColor: 'border-green-600/30' },
    { name: 'Stardew Valley', price: '$5.99', icon: '🐔', bgColor: 'bg-purple-500/20', borderColor: 'border-purple-500/30' },
  ];

  const moreLinks = [
    { name: 'Knowledgebase', icon: <Book size={18} />, color: 'text-slate-400', view: 'knowledgebase' },
    { name: 'Multicraft Knowledgebase', icon: <BookOpen size={18} />, color: 'text-blue-500', view: null },
    { name: 'Blog', icon: <Newspaper size={18} />, color: 'text-slate-400', view: 'blog' },
    { name: 'Subdomain Creator', icon: <Settings size={18} />, color: 'text-slate-400', view: null },
    { name: 'Hardware & Locations', icon: <Cpu size={18} />, color: 'text-slate-400', view: 'hardware' },
    { name: 'Partners', icon: <Users size={18} />, color: 'text-slate-400', view: 'partners' },
  ];

  return (
    <nav className="border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div 
              onClick={() => onViewChange('home')}
              className="flex-shrink-0 flex items-center group cursor-pointer"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-2 shadow-lg shadow-blue-500/20 group-hover:bg-blue-400 transition-colors">
                <span className="font-black text-white italic text-xl">C</span>
              </div>
              <span className="text-white font-black text-xl tracking-tight uppercase">CODEON HOSTHING</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6 text-sm font-semibold text-slate-300">
              <button 
                onClick={() => onViewChange('minecraft')}
                className={`hover:text-blue-400 transition-colors flex items-center ${currentView === 'minecraft' ? 'text-blue-400' : ''}`}
              >
                Minecraft Hosting
              </button>
              
              {/* Games Dropdown */}
              <div 
                className="relative group h-16 flex items-center"
                onMouseEnter={() => setIsGamesOpen(true)}
                onMouseLeave={() => setIsGamesOpen(false)}
              >
                <button className={`hover:text-blue-400 transition-colors flex items-center space-x-1 py-4 ${isGamesOpen ? 'text-blue-400' : ''}`}>
                  <span>Games</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isGamesOpen ? 'rotate-180' : ''}`} />
                </button>

                {isGamesOpen && (
                  <div className="absolute top-16 -left-12 w-[720px] bg-[#0b0f19] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 animate-in fade-in slide-in-from-top-2 duration-200 z-[60] backdrop-blur-xl">
                    <div className="grid grid-cols-3 gap-3">
                      {gamesList.map((game, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center space-x-3 bg-slate-800/20 border border-white/5 p-3 rounded-2xl cursor-pointer hover:bg-slate-800/40 hover:border-blue-500/30 transition-all duration-300 group/item hover:translate-y-[-2px]"
                          onClick={() => {
                            if (game.name === 'Minecraft') onViewChange('minecraft');
                            else if (game.name === 'Rust') onViewChange('rust');
                            else if (game.name === 'ARK Survival Evolved') onViewChange('ark');
                            else if (game.name === 'FiveM') onViewChange('fivem');
                            setIsGamesOpen(false);
                          }}
                        >
                          <div className={`w-11 h-11 ${game.bgColor} border ${game.borderColor} rounded-xl flex items-center justify-center text-xl shadow-inner group-hover/item:scale-105 transition-transform duration-300`}>
                            {game.icon}
                          </div>
                          <div className="flex flex-col">
                            <h4 className="text-white font-bold text-sm group-hover/item:text-blue-400 transition-colors leading-tight">{game.name}</h4>
                            <p className="text-slate-500 text-[10px] font-bold mt-0.5">
                              Starting at <span className="text-white">{game.price}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* View All Footer */}
                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                       <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors">
                         View All 60+ Games →
                       </button>
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => onViewChange('control')}
                className={`hover:text-blue-400 transition-colors ${currentView === 'control' ? 'text-blue-400' : ''}`}
              >
                Control
              </button>
              
              {/* More Dropdown */}
              <div 
                className="relative group h-16 flex items-center"
                onMouseEnter={() => setIsMoreOpen(true)}
                onMouseLeave={() => setIsMoreOpen(false)}
              >
                <button className={`hover:text-blue-400 transition-colors flex items-center space-x-1 py-4 ${isMoreOpen ? 'text-blue-400' : ''}`}>
                  <span>More</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMoreOpen && (
                  <div className="absolute top-16 left-0 w-64 bg-[#0b0f19] border border-white/10 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200 z-[60] backdrop-blur-xl">
                    <div className="flex flex-col space-y-0.5">
                      {moreLinks.map((link, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => {
                            if (link.view) onViewChange(link.view as any);
                            setIsMoreOpen(false);
                          }}
                          className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group/link cursor-pointer"
                        >
                          <div className={`${link.color} transition-colors group-hover/link:text-white`}>
                            {link.icon}
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover/link:text-white transition-colors">
                            {link.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center text-sm font-medium text-slate-400 cursor-pointer hover:text-white">
              <Globe size={16} className="mr-2" />
              English (USD)
            </div>
            <div className="flex items-center space-x-4 border-l border-white/10 pl-6">
              <button className="p-2 text-slate-400 hover:text-white">
                <ShoppingCart size={20} />
              </button>
              <button className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                <User size={16} />
                <span>Client Area</span>
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0b0f19] border-b border-white/5 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-base font-medium">
            <button 
              onClick={() => { onViewChange('minecraft'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 text-white hover:bg-slate-800 rounded-md font-black uppercase tracking-widest text-xs"
            >
              Minecraft Hosting
            </button>
            <button 
              onClick={() => { onViewChange('control'); setIsOpen(false); }}
              className="block w-full text-left px-3 py-2 text-white hover:bg-slate-800 rounded-md font-black uppercase tracking-widest text-xs"
            >
              Control
            </button>
            <div className="px-3 py-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Games Selection</div>
            {gamesList.slice(0, 5).map((game, i) => (
               <button 
                key={i}
                onClick={() => { 
                  if(game.name === 'Minecraft') onViewChange('minecraft'); 
                  else if(game.name === 'Rust') onViewChange('rust');
                  else if(game.name === 'ARK Survival Evolved') onViewChange('ark');
                  else if(game.name === 'FiveM') onViewChange('fivem');
                  setIsOpen(false); 
                }}
                className="block w-full text-left px-6 py-2 text-slate-300 hover:bg-slate-800 rounded-md text-xs font-bold"
               >
                 {game.icon} {game.name} — <span className="text-blue-500">{game.price}</span>
               </button>
            ))}
            <div className="px-3 py-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Resources</div>
            {moreLinks.map((link, i) => (
              <button 
                key={i} 
                onClick={() => {
                  if (link.view) onViewChange(link.view as any);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-6 py-2 text-slate-300 hover:bg-slate-800 rounded-md text-xs font-bold uppercase tracking-widest"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
