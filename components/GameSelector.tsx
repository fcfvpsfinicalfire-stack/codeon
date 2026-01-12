
import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Box, Cpu, Globe, Server, Check, Zap, Sparkles } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

interface GameSelectorProps {
  onViewChange?: (view: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-white/10 bg-[#111827] overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
};

const GameSelector: React.FC<GameSelectorProps> = ({ onViewChange }) => {
  const games = [
    {
      id: 'minecraft',
      title: 'Minecraft',
      price: '1.00',
      icon: Box,
      color: 'text-green-400',
      gradient: 'from-green-500 to-emerald-600',
      features: ['Ryzen 9 7950X', 'DDoS Protection', 'Instant Setup'],
      popular: true
    },
    {
      id: 'web',
      title: 'Web Hosting',
      price: '2.50',
      icon: Globe,
      color: 'text-blue-400',
      gradient: 'from-blue-500 to-indigo-600',
      features: ['cPanel Included', 'Free SSL', 'NVMe Storage'],
      popular: false
    },
    {
      id: 'dedicated',
      title: 'Dedicated',
      price: '49.99',
      icon: Server,
      color: 'text-purple-400',
      gradient: 'from-purple-500 to-fuchsia-600',
      features: ['Root Access', 'Unmetered 1Gbps', '24/7 Priority'],
      popular: false
    },
    {
      id: 'bots',
      title: 'Discord Bots',
      price: '0.50',
      icon: Cpu,
      color: 'text-indigo-400',
      gradient: 'from-indigo-500 to-violet-600',
      features: ['Node.js / Python', '24/7 Uptime', 'Easy Dashboard'],
      popular: false
    },
  ];

  return (
    <section className="py-32 bg-[#0b0f19] relative overflow-hidden" id="games">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-on-scroll">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] font-black uppercase tracking-widest mb-6"
          >
            <Zap size={12} className="text-yellow-400 fill-yellow-400" /> High Performance Cloud
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-6 uppercase"
          >
            CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x">PLATFORM</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed"
          >
            Select from our wide range of tailored hosting solutions. <br className="hidden md:block" />
            Engineered for speed, security, and scalability.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {games.map((game) => (
            <motion.div key={game.id} variants={item} className="h-full">
              <SpotlightCard className="h-full rounded-[2.5rem] p-1.5 hover:border-white/20 transition-colors">
                <div className="h-full bg-[#0d121f] rounded-[2.2rem] p-8 flex flex-col relative overflow-hidden group">

                  {/* Popular Badge */}
                  {game.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-600 to-transparent text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-bl-3xl z-20">
                      Popular
                    </div>
                  )}

                  {/* Gradient Glow */}
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${game.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-3xl pointer-events-none`}></div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.gradient} p-[1px] mb-6 shadow-2xl group-hover:scale-105 transition-transform duration-500`}>
                    <div className="w-full h-full bg-[#151e2e] rounded-2xl flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <game.icon size={28} className="text-white relative z-10" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-2 group-hover:text-blue-400 transition-colors">{game.title}</h3>
                  <div className="flex items-baseline gap-1 mb-8 border-b border-white/5 pb-6">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">From</span>
                    <span className={`text-4xl font-black italic tracking-tighter text-white`}>${game.price}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">/mo</span>
                  </div>

                  <div className="space-y-3 mb-8 flex-grow">
                    {game.features.map((feat, j) => (
                      <div key={j} className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-wide group-hover:text-slate-300 transition-colors">
                        <Check size={12} className={game.color} />
                        {feat}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onViewChange?.(game.id)}
                    className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 overflow-hidden relative transition-all active:scale-95 group/btn bg-white/5 hover:bg-white text-white hover:text-black border border-white/5 shadow-lg shadow-black/20`}
                  >
                    <span className="relative z-10">Deploy Now</span>
                    <ArrowRight size={14} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GameSelector;
