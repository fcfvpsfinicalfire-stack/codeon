import React from 'react';
import { HelpCircle, Server, Globe, ArrowRight, Sparkles, BookCopy } from 'lucide-react';
import { motion } from 'framer-motion';

interface HostingResourcesProps {
  onViewChange?: (view: 'home' | 'minecraft' | 'rust' | 'ark' | 'fivem' | 'article' | 'faq') => void;
}

const resourceCards = [
  {
    id: 'kb',
    title: 'Knowledgebase',
    icon: <BookCopy size={24} className="text-white" />,
    color: 'bg-gradient-to-br from-red-500 to-orange-600',
    glow: 'shadow-[0_0_30px_rgba(239,68,68,0.3)]'
  },
  {
    id: 'faq',
    title: 'FAQ',
    icon: <HelpCircle size={24} className="text-white" />,
    color: 'bg-gradient-to-br from-indigo-500 to-blue-600',
    glow: 'shadow-[0_0_30px_rgba(99,102,241,0.3)]'
  },
  {
    id: 'status',
    title: 'Server Status',
    icon: <Server size={24} className="text-white" />,
    color: 'bg-gradient-to-br from-orange-500 to-yellow-600',
    glow: 'shadow-[0_0_30px_rgba(249,115,22,0.3)]'
  },
  {
    id: 'subdomain',
    title: 'Subdomain Creator',
    icon: <Globe size={24} className="text-white" />,
    color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]'
  }
];

const HostingResources: React.FC<HostingResourcesProps> = ({ onViewChange }) => {
  return (
    <section className="py-24 bg-[#0b0f19] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Title Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] font-black uppercase tracking-widest mb-4"
          >
            <Sparkles size={12} className="text-yellow-400" /> Community & Support
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter italic"
          >
            SERVER HOSTING <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">RESOURCES</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto text-lg font-medium"
          >
            We have many great resources to guide your game server hosting journey.
          </motion.p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left: 2x2 Resource Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {resourceCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => {
                  if (card.id === 'faq') onViewChange?.('faq');
                }}
                className="group bg-[#111827] border border-white/5 rounded-[2rem] p-8 flex flex-col items-center justify-center transition-colors hover:bg-[#1a2333] hover:border-white/10 cursor-pointer relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 ${card.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}></div>

                <div className={`${card.color} ${card.glow} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  {card.icon}
                </div>
                <h3 className="text-white font-black text-sm uppercase tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-colors relative z-10">
                  {card.title}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* Right: Featured Card - Ultra Max Design */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              onClick={() => onViewChange?.('article')}
              className="h-full bg-[#111827] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col group cursor-pointer shadow-2xl relative transition-colors hover:border-blue-500/20 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]"
            >
              {/* Featured Card Top (Blue Gradient) */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 blur-3xl rounded-full animate-pulse"></div>

                <div className="text-left relative z-10 flex-grow pr-6">
                  <div className="flex items-center space-x-2 text-white/90 font-black text-[10px] uppercase mb-6 tracking-[0.2em] border border-white/20 inline-block px-3 py-1 rounded-lg backdrop-blur-sm">
                    CODEON HOSTHING
                  </div>
                  <h3 className="text-white font-black text-3xl md:text-5xl leading-[0.9] mb-4 uppercase tracking-tighter italic drop-shadow-lg">
                    Empower your<br />gameplay with<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">CODEON</span>
                  </h3>
                </div>

                {/* Mini Panel Screenshot - 3D Effect */}
                <div className="relative z-10 w-full md:w-64 mt-8 md:mt-0 perspective-1000">
                  <motion.div
                    initial={{ rotateY: 12, rotateX: 6 }}
                    whileHover={{ rotateY: 0, rotateX: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="bg-[#0b0f19] rounded-xl border border-white/20 p-2 shadow-2xl"
                  >
                    <div className="bg-[#151e2e] rounded-lg aspect-video flex flex-col p-3 space-y-2 overflow-hidden">
                      <div className="flex gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-1/4 h-full bg-blue-500/10 rounded"></div>
                        <div className="w-3/4 space-y-2">
                          <div className="h-2 w-full bg-slate-700 rounded animate-pulse"></div>
                          <div className="h-2 w-2/3 bg-slate-700 rounded animate-pulse delay-75"></div>
                          <div className="h-16 w-full bg-[#0b0f19] rounded border border-white/5 mt-2"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Featured Card Bottom (Dark) */}
              <div className="p-10 text-left bg-[#111827] flex-grow flex flex-col justify-center relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <h4 className="text-white font-black text-xl md:text-2xl mb-4 uppercase italic tracking-tight group-hover:text-blue-400 transition-colors">
                  The latest trendsetter in multiplayer gaming
                </h4>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                  Hosting your multiplayer server for games isn't supposed to detract from the gaming. We've taken steps to completely overhaul absolutely every aspect of the hosting experience...
                </p>
                <div className="mt-8 flex items-center text-blue-400 font-black text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  READ ARTICLE <ArrowRight size={14} className="ml-2 group-hover:text-white transition-colors" />
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HostingResources;
