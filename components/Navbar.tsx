import React, { useState, useEffect } from 'react';
import { Menu, X, Server, Shield, Globe, Cpu, ChevronDown, User, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onViewChange: (view: string) => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ onViewChange, currentView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gameLinks = [
    { id: 'minecraft', label: 'Minecraft', icon: <Cpu size={14} />, color: 'text-green-400' },
    { id: 'ark', label: 'Ark: Survival', icon: <Globe size={14} />, color: 'text-amber-400' },
    { id: 'rust', label: 'Rust', icon: <Server size={14} />, color: 'text-red-400' },
    { id: 'fivem', label: 'FiveM', icon: <Cpu size={14} />, color: 'text-purple-400' },
  ];

  const otherLinks = [
    { id: 'web', label: 'Web Hosting', icon: <Globe size={14} /> },
    { id: 'dedicated', label: 'Dedicated', icon: <Server size={14} /> },
    { id: 'company', label: 'Company' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* LOGO */}
        <div
          onClick={() => onViewChange('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform relative overflow-hidden">
            <Server className="text-white relative z-10" size={20} />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black italic tracking-tighter text-white leading-none">CODEON</span>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] leading-none">HOSTING</span>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center bg-white/5 rounded-full px-1.5 p-1.5 border border-white/5 backdrop-blur-md relative shadow-2xl">
          <button
            onClick={() => onViewChange('home')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all ${currentView === 'home' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            Home
          </button>

          {/* GAMES DROPDOWN */}
          <div className="relative" onMouseEnter={() => setGamesOpen(true)} onMouseLeave={() => setGamesOpen(false)}>
            <button
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all text-slate-400 hover:text-white hover:bg-white/5`}
            >
              <Cpu size={14} /> Games <ChevronDown size={12} className={`transition-transform duration-300 ${gamesOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {gamesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-4 w-60 bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2 flex flex-col gap-1 z-50"
                >
                  {gameLinks.map(game => (
                    <button
                      key={game.id}
                      onClick={() => { onViewChange(game.id); setGamesOpen(false); }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-left group"
                    >
                      <div className={`p-2 rounded-lg bg-white/5 ${game.color} group-hover:scale-110 transition-transform`}>{game.icon}</div>
                      <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{game.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {otherLinks.map(link => (
            <button
              key={link.id}
              onClick={() => onViewChange(link.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all ${currentView === link.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              {link.icon}
              {link.label}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="hidden lg:flex items-center space-x-3">
          <a
            href="https://control.codeon.codes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors mr-2 group"
          >
            <Cpu size={16} className="group-hover:text-blue-400 transition-colors" /> Game Panel
          </a>
          <div className="h-8 w-px bg-white/10 mx-2"></div>
          <button
            onClick={() => onViewChange('login')}
            className="text-white hover:text-blue-400 text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors px-2"
          >
            <LogIn size={14} /> Login
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewChange('order')}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2"
          >
            <Server size={14} /> Deploy Node
          </motion.button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#0f172a]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="p-6 flex flex-col space-y-4">
              <div className="pb-4 border-b border-white/5">
                <p className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Game Servers</p>
                {gameLinks.map(link => (
                  <button
                    key={link.id}
                    onClick={() => { onViewChange(link.id); setMobileMenuOpen(false); }}
                    className="w-full text-left py-3 px-4 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white font-bold uppercase tracking-normal text-sm flex items-center gap-3 transition-colors"
                  >
                    <div className={link.color}>{link.icon}</div>
                    {link.label}
                  </button>
                ))}
              </div>

              {otherLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => { onViewChange(link.id); setMobileMenuOpen(false); }}
                  className="text-left py-4 px-4 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white font-bold uppercase tracking-widest text-sm flex items-center gap-3 transition-colors"
                >
                  {link.icon || <ChevronDown className="-rotate-90" size={16} />}
                  {link.label}
                </button>
              ))}
              <a href="https://control.codeon.codes" target="_blank" rel="noopener noreferrer" className="text-left py-4 px-4 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white font-bold uppercase tracking-widest text-sm flex items-center gap-3 transition-colors">
                <Cpu size={16} /> Game Panel
              </a>
              <div className="grid grid-cols-2 gap-4 mt-4 border-t border-white/10 pt-4">
                <button onClick={() => { onViewChange('login'); setMobileMenuOpen(false); }} className="py-4 text-center rounded-xl bg-white/5 text-slate-300 font-bold uppercase text-xs hover:bg-white/10 transition-colors">Login</button>
                <button onClick={() => { onViewChange('register'); setMobileMenuOpen(false); }} className="py-4 text-center rounded-xl bg-blue-600 text-white font-bold uppercase text-xs hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">Sign Up</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
