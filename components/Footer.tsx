

import React from 'react';
import { Page } from '../App';

const FooterLink: React.FC<{ onClick: () => void; text: string }> = ({ onClick, text }) => (
    <li>
        <button onClick={onClick} className="text-gray-400 hover:text-brand-cyan transition-colors duration-300">{text}</button>
    </li>
);

const SocialIcon: React.FC<{ href: string; iconClass: string }> = ({ href, iconClass }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
        <i className={`fa-brands ${iconClass} text-xl`}></i>
    </a>
);

interface FooterProps {
    setPage: (page: Page) => void;
}


const Footer: React.FC<FooterProps> = ({ setPage }) => {
  return (
    <footer className="border-t border-white/10 mt-20 bg-card-bg-solid/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Column 1: Brand & Socials */}
                <div className="flex flex-col">
                     <div className="mb-4">
                        <button onClick={() => setPage('home')} className="flex items-center space-x-3">
                            <img src="https://i.postimg.cc/qMMj11z0/codeon.png" alt="Code On Hosting Logo" className="h-10" />
                            <span className="font-bold text-xl text-white tracking-wider">CODE ON HOSTING</span>
                        </button>
                    </div>
                    <p className="text-gray-400 mb-6 max-w-xs">High-performance hosting solutions for gamers, developers, and businesses.</p>
                    <div className="flex space-x-5">
                        <SocialIcon href="#" iconClass="fa-twitter" />
                        <SocialIcon href="#" iconClass="fa-discord" />
                        <SocialIcon href="#" iconClass="fa-youtube" />
                        <SocialIcon href="#" iconClass="fa-facebook" />
                    </div>
                </div>

                {/* Column 2: Services */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
                    <ul className="space-y-3">
                        <FooterLink onClick={() => setPage('gameservers')} text="Game Servers" />
                        <FooterLink onClick={() => setPage('vps')} text="Cloud VPS" />
                        <FooterLink onClick={() => setPage('dedicated')} text="Dedicated Servers" />
                        <FooterLink onClick={() => setPage('webhosting')} text="Web Hosting" />
                        <FooterLink onClick={() => setPage('discord')} text="Discord Bot Hosting" />
                        <FooterLink onClick={() => setPage('v2ray')} text="V2Ray Hosting" />
                    </ul>
                </div>

                {/* Column 3: Company & Legal */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors duration-300">About Us</a></li>
                        <li><button onClick={() => setPage('contact')} className="text-gray-400 hover:text-brand-cyan transition-colors duration-300">Contact</button></li>
                        <li><a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors duration-300">Partnerships</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors duration-300">Terms of Service</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors duration-300">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Column 4: Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
                    <p className="text-gray-400 mb-4">Get the latest news, updates, and special offers.</p>
                    <form>
                        <div className="flex">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="w-full bg-gray-900/50 border border-white/20 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all"
                            />
                            <button 
                                type="submit"
                                className="bg-brand-cyan text-black font-bold px-4 py-2 rounded-r-lg hover:opacity-90 transition-opacity"
                            >
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="border-t border-white/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Code On Hosting. All Rights Reserved. Built with passion.</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;