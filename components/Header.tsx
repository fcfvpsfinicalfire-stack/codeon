

import React, { useState } from 'react';
import { Page } from '../App';

const NavLink: React.FC<{ href: string; iconClass: string; text: string }> = ({ href, iconClass, text }) => (
  <a href={href} className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm">
    <i className={iconClass}></i>
    <span>{text}</span>
  </a>
);

interface HeaderProps {
    setPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ setPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-dark-bg/80 backdrop-blur-xl z-50 border-b border-white/10">
      {/* Top bar */}
      <div className="bg-black/20 text-xs hidden lg:block">
        <div className="container mx-auto flex justify-between items-center px-8 py-1.5">
          <div className="flex items-center space-x-6">
             <NavLink href="#" iconClass="fa-solid fa-file-contract" text="Legal" />
          </div>
          <div className="flex items-center space-x-6">
             <button className="text-gray-400 hover:text-white flex items-center space-x-2 text-sm"><i className="fa-brands fa-discord"></i><span>Discord</span></button>
             <button className="text-gray-400 hover:text-white flex items-center space-x-2 text-sm"><i className="fa-solid fa-sun"></i><span>Theme</span></button>
             <button className="flex items-center space-x-1 text-gray-400 hover:text-white text-sm">
                <span role="img" aria-label="USA Flag">🇺🇸</span>
                <span>EN</span>
                <i className="fa-solid fa-chevron-down text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
        <button onClick={() => setPage('home')} className="flex items-center space-x-3">
          <img src="https://i.postimg.cc/qMMj11z0/codeon.png" alt="Code One Hosting Logo" className="h-10" />
          <span className="font-bold text-xl hidden sm:inline-block text-white tracking-wider">CODE ONE HOSTING</span>
        </button>

        <nav className="hidden lg:flex items-center space-x-8">
          <button onClick={() => setPage('gameservers')} className="font-medium text-gray-300 hover:text-white transition-colors duration-300">Game Servers</button>
          <button onClick={() => setPage('pricing')} className="font-medium text-gray-300 hover:text-white transition-colors duration-300">Pricing</button>
          <button onClick={() => setPage('vps')} className="font-medium text-gray-300 hover:text-white transition-colors duration-300">Cloud</button>
          <button onClick={() => setPage('dedicated')} className="font-medium text-gray-300 hover:text-white transition-colors duration-300">Dedicated</button>
          <button onClick={() => setPage('webhosting')} className="font-medium text-gray-300 hover:text-white transition-colors duration-300">WebHosting</button>
          <button onClick={() => setPage('automation')} className="font-medium text-gray-300 hover:text-white transition-colors duration-300">Automation</button>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <a href="https://control.codeon.codes" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-brand-cyan to-brand-magenta text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <i className="fa-solid fa-user"></i>
            <span>CLIENT SPACE</span>
          </a>
        </div>

        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <i className={isMenuOpen ? "fa-solid fa-times text-2xl" : "fa-solid fa-bars text-2xl"}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-2 px-4 pb-4 space-y-4 bg-dark-bg/90">
          <button onClick={() => { setPage('gameservers'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-300 hover:text-white">Game Servers</button>
          <button onClick={() => { setPage('pricing'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-300 hover:text-white">Pricing</button>
          <button onClick={() => { setPage('vps'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-300 hover:text-white">Cloud</button>
          <button onClick={() => { setPage('dedicated'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-300 hover:text-white">Dedicated</button>
          <button onClick={() => { setPage('discord'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-300 hover:text-white">Discord Bot</button>
          <button onClick={() => { setPage('webhosting'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-300 hover:text-white">WebHosting</button>
          <button onClick={() => { setPage('automation'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-300 hover:text-white">Automation</button>
          <div className="border-t border-white/10 pt-4 mt-4">
             <a href="https://control.codeon.codes" target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-brand-cyan to-brand-magenta text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity">
                <i className="fa-solid fa-user"></i>
                <span>CLIENT SPACE</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;