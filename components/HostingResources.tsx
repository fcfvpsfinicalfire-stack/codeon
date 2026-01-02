
import React from 'react';
import { BookOpen, HelpCircle, Server, Globe, ArrowRight } from 'lucide-react';

interface HostingResourcesProps {
  onViewChange?: (view: 'home' | 'minecraft' | 'rust' | 'ark' | 'fivem' | 'article' | 'faq') => void;
}

const resourceCards = [
  {
    id: 'kb',
    title: 'Knowledgebase',
    icon: <BookOpen size={24} className="text-white" />,
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600'
  },
  {
    id: 'faq',
    title: 'FAQ',
    icon: <HelpCircle size={24} className="text-white" />,
    color: 'bg-indigo-500',
    hoverColor: 'hover:bg-indigo-600'
  },
  {
    id: 'status',
    title: 'Server Status',
    icon: <Server size={24} className="text-white" />,
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600'
  },
  {
    id: 'subdomain',
    title: 'Subdomain Creator',
    icon: <Globe size={24} className="text-white" />,
    color: 'bg-emerald-500',
    hoverColor: 'hover:bg-emerald-600'
  }
];

const HostingResources: React.FC<HostingResourcesProps> = ({ onViewChange }) => {
  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Title Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
            SERVER HOSTING RESOURCES
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            We have many great resources to guide your game server hosting journey.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: 2x2 Resource Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {resourceCards.map((card, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  if (card.id === 'faq') onViewChange?.('faq');
                }}
                className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center transition-all hover:bg-slate-900 group cursor-pointer card-hover"
              >
                <div className={`${card.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-black/20 group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wide group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Right: Featured Card */}
          <div className="lg:col-span-7">
            <div 
              onClick={() => onViewChange?.('article')}
              className="h-full bg-slate-900 border border-white/5 rounded-3xl overflow-hidden flex flex-col group cursor-pointer shadow-2xl"
            >
              {/* Featured Card Top (Blue) */}
              <div className="bg-blue-600 p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute -right-10 -top-10 w-40 h-40 border-8 border-white rounded-full"></div>
                </div>

                <div className="text-left relative z-10 flex-grow pr-6">
                  <div className="flex items-center space-x-2 text-white/80 font-bold text-xs uppercase mb-6 tracking-widest">
                    <span className="italic">CODEON HOSTHING</span>
                  </div>
                  <h3 className="text-white font-black text-3xl md:text-4xl leading-tight mb-4 uppercase tracking-tighter">
                    Empower your<br />gameplay with<br />CODEON HOSTHING
                  </h3>
                </div>

                {/* Mini Panel Screenshot */}
                <div className="relative z-10 w-full md:w-64 mt-6 md:mt-0">
                  <div className="bg-slate-900/80 backdrop-blur rounded-xl border border-white/20 p-2 shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500">
                    <div className="bg-slate-800 rounded-lg aspect-video flex flex-col p-2 space-y-2">
                       <div className="h-2 w-1/2 bg-blue-500 rounded"></div>
                       <div className="h-2 w-full bg-slate-700 rounded"></div>
                       <div className="h-2 w-2/3 bg-slate-700 rounded"></div>
                       <div className="mt-auto flex justify-end">
                         <div className="h-4 w-8 bg-blue-600 rounded"></div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Card Bottom (Dark) */}
              <div className="p-8 text-left bg-slate-900 flex-grow flex flex-col justify-center">
                <h4 className="text-white font-bold text-lg mb-4 uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                  The latest trendsetter in multiplayer gaming
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Hosting your multiplayer server for games isn't supposed to detract from the gaming. We've taken steps to completely overhaul absolutely every aspect of the hosting experience...
                </p>
                <div className="mt-8 flex items-center text-blue-500 font-bold text-sm group-hover:translate-x-1 transition-transform">
                  READ ARTICLE <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HostingResources;
