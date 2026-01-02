
import React, { useState } from 'react';
import { BrandLogo } from './Icons';
import { Page } from '../App';
import { SiteNotification } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  setPage: (page: Page) => void;
  currentPage: string;
  currency: 'LKR' | 'EUR';
  setCurrency: (c: 'LKR' | 'EUR') => void;
  notifications: SiteNotification[];
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, setPage, currentPage, currency, setCurrency, notifications }) => {
  const [showGamesDropdown, setShowGamesDropdown] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);

  const gameItems = [
    { id: 'minecraft' as Page, name: 'Minecraft', desc: 'Host your own minecraft server', img: 'https://th.bing.com/th/id/R.43044c72cad8f7df64263a043e656351?rik=W1KkaG5cWFqzUg&pid=ImgRaw&r=0' },
    { id: 'rust' as Page, name: 'Rust', desc: 'Host your own rust server', img: 'https://tse4.mm.bing.net/th/id/OIP.QuFijeTJqP2X1YSXxX_fjAHaEo?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 'ark' as Page, name: 'ARK', desc: 'Host your own ark: survival...', img: 'https://tse3.mm.bing.net/th/id/OIP.wxavt8M6nfuJLu9rmRaeQwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 'mta' as Page, name: 'Multi Theft Auto', desc: 'Host your own multi theft auto...', img: 'https://tse4.mm.bing.net/th/id/OIP.XZ-p6486XJkKHLlfcINR4gHaEK?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 'nodejs' as Page, name: 'NodeJS Apps', desc: 'Host your own discord (node.js)...', img: 'https://tse4.mm.bing.net/th/id/OIP.4KFhVONFQiqqnuXBMu8wCAHaEo?rs=1&pid=ImgDetMain&o=7&rm=3' }
  ];

  const handleNav = (p: Page) => {
    setPage(p);
    setShowGamesDropdown(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[150] bg-[#030712]/60 backdrop-blur-2xl border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNav('home')}>
          <BrandLogo className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          <span className="text-xl font-black tracking-tighter text-white hidden lg:block uppercase">
            CodeOn<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"> Hosting (Pvt) LTD</span>
          </span>
        </div>

        <div className="hidden xl:flex items-center gap-8 text-[10px] font-black text-gray-500 uppercase tracking-[0.25em]">
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setShowGamesDropdown(true)}
            onMouseLeave={() => setShowGamesDropdown(false)}
          >
            <button className={`flex items-center gap-2 hover:text-white transition-colors py-2 ${['minecraft', 'rust', 'ark', 'mta', 'nodejs'].includes(currentPage) ? 'text-white' : ''}`}>
              <IconGames /> Games
            </button>
            
            {showGamesDropdown && (
              <div className="absolute top-full left-[-20px] pt-4 w-[600px] animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="glass bg-[#080b12]/98 border-t-2 border-purple-500 p-5 rounded-2xl shadow-2xl grid grid-cols-3 gap-4 border border-white/5">
                  {gameItems.map((game) => (
                    <div 
                      key={game.id}
                      onClick={() => handleNav(game.id)}
                      className="group relative h-32 rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-purple-500/50 transition-all"
                    >
                      <img src={game.img} alt={game.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute inset-0 p-3 flex flex-col justify-end">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-white text-[11px] font-black tracking-tighter uppercase">{game.name}</h4>
                          <svg className="w-2.5 h-2.5 text-white/50 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                        </div>
                        <p className="text-[8px] text-gray-400 font-bold lowercase leading-tight">{game.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button onClick={() => handleNav('cloud')} className={`flex items-center gap-2 hover:text-white transition-colors ${currentPage === 'cloud' ? 'text-white underline underline-offset-8' : ''}`}>
            <IconCloud /> Cloud
          </button>
          <button onClick={() => handleNav('dedicated')} className={`flex items-center gap-2 hover:text-white transition-colors ${currentPage === 'dedicated' ? 'text-white underline underline-offset-8' : ''}`}>
            <IconDedicated /> Dedicated
          </button>
          <button onClick={() => handleNav('team')} className={`flex items-center gap-2 hover:text-white transition-colors ${currentPage === 'team' ? 'text-white underline underline-offset-8' : ''}`}>
            <IconTeam /> Team
          </button>
          <button onClick={() => handleNav('partners')} className={`flex items-center gap-2 hover:text-white transition-colors ${currentPage === 'partners' ? 'text-white underline underline-offset-8' : ''}`}>
            <IconPartners /> Partners
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-5 mr-4 text-gray-500">
           {/* Unified Currency Switcher */}
           <div className="flex bg-white/5 rounded-lg border border-white/5 p-1">
             {(['LKR', 'EUR'] as const).map(c => (
               <button 
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-3 py-1 text-[9px] font-black rounded-md transition-all ${currency === c ? 'bg-blue-600 text-white shadow-lg' : 'hover:text-white'}`}
               >
                 {c}
               </button>
             ))}
           </div>

           {/* Notifications */}
           <div className="relative cursor-pointer hover:text-white transition-colors" onClick={() => setShowNotifPanel(!showNotifPanel)}>
              <IconBell />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping shadow-lg shadow-red-500/50" />
              )}
              
              {showNotifPanel && (
                <div className="absolute top-full right-0 mt-4 w-72 glass bg-[#080b12]/98 border border-white/10 p-5 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Activity</h5>
                    <span className="text-[8px] text-gray-600 font-bold">Auto-clears in 30d</span>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-[9px] text-gray-600 font-bold uppercase py-6 text-center italic">No recent activity</p>
                  ) : (
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                      {notifications.map(n => (
                        <div key={n.id} className="bg-white/5 p-3 rounded-xl border border-white/5 group hover:border-blue-500/30 transition-all">
                           <p className="text-[10px] font-bold text-gray-300 leading-relaxed mb-1">{n.message}</p>
                           <span className="text-[8px] font-black text-blue-500/50 uppercase">{new Date(n.timestamp).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
           </div>

           <a href="https://discord.gg/codeon" target="_blank" className="hover:text-blue-400 transition-colors">
             <IconDiscord />
           </a>
        </div>

        <button 
          onClick={onOpenCart}
          className="relative p-2.5 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-br from-blue-500 to-purple-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#030712] animate-bounce">
              {cartCount}
            </span>
          )}
        </button>

        <a 
          href="https://control.codeon.codes" 
          target="_blank"
          className="bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-purple-900/40 flex items-center gap-2 active:scale-95"
        >
          <IconUser /> Control
        </a>
      </div>
    </nav>
  );
};

const IconGames = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const IconCloud = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>;
const IconDedicated = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
const IconTeam = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconPartners = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const IconDiscord = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.069.069 0 00-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.862-1.297 1.197-1.99a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.863-.886.077.077 0 01-.003-.129c.125-.094.252-.192.372-.293a.074.074 0 01.077-.01c3.927 1.8 8.18 1.8 12.067 0a.074.074 0 01.078.01c.12.101.246.199.373.293a.077.077 0 01-.002.129 12.817 12.817 0 01-1.863.886.076.076 0 00-.041.106c.333.693.733 1.36 1.195 1.99a.077.077 0 00.084.028 19.831 19.831 0 005.993-3.03.076.076 0 00.032-.057c.489-5.279-.851-9.76-3.411-13.66a.066.066 0 00-.032-.027z"/></svg>;
const IconBell = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const IconUser = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

export default Navbar;
