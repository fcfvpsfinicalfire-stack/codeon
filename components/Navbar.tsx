
import React, { useState } from 'react';
import { BrandLogo } from './Icons';
import { Page, Theme } from '../App';
import { SiteNotification, User } from '../types';
import { DISCORD_URL } from '../constants';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  setPage: (page: Page) => void;
  currentPage: string;
  currency: 'LKR' | 'EUR';
  setCurrency: (c: 'LKR' | 'EUR') => void;
  notifications: SiteNotification[];
  user: User | null;
  onLogout: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, onOpenCart, setPage, currentPage, currency, 
  setCurrency, notifications, user, onLogout, theme, onToggleTheme 
}) => {
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

  const navItemClass = (id: string) => `
    flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-300
    text-[13px] font-bold tracking-tight
    ${currentPage === id 
      ? (theme === 'dark' ? 'text-white bg-white/5 border border-white/10' : 'text-blue-600 bg-blue-50 border border-blue-100')
      : (theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50')}
  `;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[150] backdrop-blur-xl border-b px-4 md:px-12 py-5 flex items-center justify-between transition-colors duration-300 ${theme === 'dark' ? 'bg-[#030712]/80 border-white/5' : 'bg-white/80 border-gray-100 shadow-sm'}`}>
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNav('home')}>
          <BrandLogo className="w-9 h-9 group-hover:rotate-6 transition-transform duration-500" />
          <span className={`text-xl font-black tracking-tighter hidden xl:block uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            CodeOn<span className="text-blue-500"> Hosting</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          {/* Games Dropdown */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setShowGamesDropdown(true)}
            onMouseLeave={() => setShowGamesDropdown(false)}
          >
            <button className={navItemClass('minecraft')}>
              Games
            </button>
            
            {showGamesDropdown && (
              <div className="absolute top-full left-[-20px] pt-4 w-[600px] animate-in fade-in slide-in-from-top-2 duration-300">
                <div className={`glass border p-5 rounded-3xl shadow-2xl grid grid-cols-3 gap-4 ${theme === 'dark' ? 'bg-[#080b12]/98 border-white/10' : 'bg-white/98 border-gray-100'}`}>
                  {gameItems.map((game) => (
                    <div 
                      key={game.id}
                      onClick={() => handleNav(game.id)}
                      className="group relative h-32 rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-blue-500/50 transition-all"
                    >
                      <img src={game.img} alt={game.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute inset-0 p-3 flex flex-col justify-end">
                        <h4 className="text-white text-[11px] font-black tracking-tighter uppercase">{game.name}</h4>
                        <p className="text-[8px] text-gray-400 font-bold lowercase leading-tight">{game.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button onClick={() => handleNav('cloud')} className={navItemClass('cloud')}>Cloud</button>
          <button onClick={() => handleNav('dedicated')} className={navItemClass('dedicated')}>Dedicated</button>
          <button onClick={() => handleNav('team')} className={navItemClass('team')}>Team</button>
          <button onClick={() => handleNav('partners')} className={navItemClass('partners')}>Partners</button>
          <button onClick={() => handleNav('status')} className={`relative ${navItemClass('status')}`}>Status</button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-6 text-gray-500">
           {/* Theme Toggle */}
           <button onClick={onToggleTheme} className={`p-2 rounded-xl border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/5 text-yellow-400 hover:bg-white/10' : 'bg-gray-100 border-gray-200 text-blue-600 hover:bg-gray-200'}`}>
             {theme === 'dark' ? <IconSun /> : <IconMoon />}
           </button>

           <div className={`flex rounded-xl border p-1 ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-100 border-gray-200'}`}>
             {(['LKR', 'EUR'] as const).map(c => (
               <button 
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${currency === c ? 'bg-blue-600 text-white shadow-lg' : (theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900')}`}
               >
                 {c}
               </button>
             ))}
           </div>

           {/* Notification Bell */}
           <div className="relative">
              <button 
                onClick={() => setShowNotifPanel(!showNotifPanel)}
                className={`transition-colors flex items-center justify-center p-2 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/5 text-gray-400 hover:text-white' : 'bg-gray-100 border-gray-200 text-gray-600 hover:text-blue-600'}`}
              >
                <IconBell />
                {notifications.length > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping shadow-lg shadow-red-500/50" />
                )}
              </button>
              
              {showNotifPanel && (
                <div className={`absolute top-full right-0 mt-4 w-72 glass border p-5 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 ${theme === 'dark' ? 'bg-[#080b12]/98 border-white/10' : 'bg-white border-gray-100'}`}>
                  <div className={`flex items-center justify-between mb-4 border-b pb-2 ${theme === 'dark' ? 'border-white/5' : 'border-gray-100'}`}>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Activity</h5>
                    <span className="text-[8px] text-gray-600 font-bold">Recent Pulse</span>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-[9px] text-gray-600 font-bold uppercase py-6 text-center italic">No activity logs</p>
                  ) : (
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                      {notifications.map(n => (
                        <div key={n.id} className={`p-3 rounded-xl border group transition-all ${theme === 'dark' ? 'bg-white/5 border-white/5 hover:border-blue-500/30' : 'bg-gray-50 border-gray-100 hover:border-blue-200'}`}>
                           <p className={`text-[10px] font-bold leading-relaxed mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{n.message}</p>
                           <span className="text-[8px] font-black text-blue-500/50 uppercase">{new Date(n.timestamp).toLocaleTimeString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
           </div>

           <a href={DISCORD_URL} target="_blank" className={`transition-colors flex items-center justify-center p-2 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/5 text-gray-400 hover:text-blue-400' : 'bg-gray-100 border-gray-200 text-gray-600 hover:text-blue-600'}`}>
             <IconDiscord />
           </a>
        </div>

        <button onClick={onOpenCart} className={`relative p-2.5 rounded-xl border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/5 text-gray-400 hover:text-white' : 'bg-gray-100 border-gray-200 text-gray-600 hover:text-blue-600'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#030712] animate-bounce">{cartCount}</span>}
        </button>

        {user && !user.username.includes('Visitor') && (
           <button onClick={onLogout} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${theme === 'dark' ? 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500' : 'bg-red-50 border-red-100 text-red-600 hover:bg-red-600 hover:text-white'}`}>
              Logout
           </button>
        )}
      </div>
    </nav>
  );
};

const IconSun = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const IconMoon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const IconBell = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const IconDiscord = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.069.069 0 00-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.862-1.297 1.197-1.99a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.863-.886.077.077 0 01-.003-.129c.125-.094.252-.192.372-.293a.074.074 0 01.077-.01c3.927 1.8 8.18 1.8 12.067 0a.074.074 0 01.078.01c.12.101.246.199.373.293a.077.077 0 01-.002.129 12.817 12.817 0 01-1.863.886.076.076 0 00-.041.106c.333.693.733 1.36 1.195 1.99a.077.077 0 00.084.028 19.831 19.831 0 005.993-3.03.076.076 0 00.032-.057c.489-5.279-.851-9.76-3.411-13.66a.066.066 0 00-.032-.027z"/></svg>;

export default Navbar;
