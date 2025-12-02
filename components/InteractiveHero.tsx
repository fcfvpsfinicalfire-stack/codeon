import React from 'react';
import { Page } from '../App';

interface HeroProps {
  setPage: (page: Page) => void;
}

const services = [
  { name: 'Minecraft', page: 'pricing' as Page, icon: 'fa-solid fa-cube' },
  { name: 'VPS', page: 'vps' as Page, icon: 'fa-solid fa-cloud' },
  { name: 'Discord Bot', page: 'discord' as Page, icon: 'fa-brands fa-discord' },
  { name: 'Web', page: 'webhosting' as Page, icon: 'fa-solid fa-globe' },
  { name: 'Dedicated', page: 'dedicated' as Page, icon: 'fa-solid fa-server' },
];

const InteractiveHero: React.FC<HeroProps> = ({ setPage }) => {
  return (
    <section className="bg-[#111222] py-4 border-b border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 md:gap-x-10">
          {services.map(service => (
            <button
              key={service.name}
              onClick={() => setPage(service.page)}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 text-sm md:text-base group"
            >
              <i className={`${service.icon} transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-300 group-hover:[text-shadow:0_0_10px_theme(colors.cyan.400)]`}></i>
              <span className="font-semibold transition-all duration-300 group-hover:[text-shadow:0_0_8px_rgba(255,255,255,0.7)]">{service.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default InteractiveHero;
