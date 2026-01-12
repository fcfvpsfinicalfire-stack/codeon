
import React from 'react';
import { ExternalLink, ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

const partners = [
  {
    name: 'ESCLIPC MC NETHWORK',
    description: 'A premier Minecraft network focused on competitive gameplay and unique custom game modes for a global audience.',
    color: 'text-purple-400',
    gradient: 'from-purple-500 to-indigo-600',
    icon: <Zap size={24} />,
    glow: 'shadow-[0_0_40px_rgba(168,85,247,0.2)]'
  },
  {
    name: 'VOID SMP',
    description: 'An immersive survival multiplayer experience with a deep focus on community-driven storytelling and exploration.',
    color: 'text-slate-200',
    gradient: 'from-slate-400 to-white',
    icon: <Globe size={24} />,
    glow: 'shadow-[0_0_40px_rgba(255,255,255,0.1)]'
  },
  {
    name: 'FITH CLUB MC NETHWORK',
    description: 'The ultimate high-energy Minecraft network featuring intense PvP challenges and a robust survival economy.',
    color: 'text-red-500',
    gradient: 'from-red-500 to-orange-600',
    icon: <ShieldCheck size={24} />,
    glow: 'shadow-[0_0_40px_rgba(239,68,68,0.2)]'
  },
  {
    name: 'TRBOXY CLUB',
    description: 'An innovative sandbox community enabling players to build, share, and interact in a creative digital playground.',
    color: 'text-blue-400',
    gradient: 'from-blue-500 to-cyan-400',
    icon: <Cpu size={24} />,
    glow: 'shadow-[0_0_40px_rgba(59,130,246,0.2)]'
  }
];

const PartnerCard = ({ partner, index }: { partner: any, index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative border border-white/5 bg-[#111827] rounded-[2.5rem] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.05),
                transparent 80%
              )
            `,
        }}
      />

      <div className="h-full bg-[#0d121f] rounded-[2.3rem] p-8 flex flex-col relative overflow-hidden group">
        {/* Gradient Glow */}
        <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${partner.gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500 text-white`}></div>

        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${partner.gradient} p-[1px] mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500 self-start relative z-10`}>
          <div className="w-full h-full bg-[#151e2e] rounded-2xl flex items-center justify-center text-white">
            {partner.icon}
          </div>
        </div>

        <h3 className={`text-2xl font-black uppercase italic tracking-tight mb-4 ${partner.color} group-hover:scale-105 transition-transform origin-left relative z-10`}>
          {partner.name}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow font-medium relative z-10">
          {partner.description}
        </p>

        <button className="flex items-center justify-between w-full text-white bg-white/5 hover:bg-white/10 border border-white/5 py-4 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all group/btn relative z-10">
          <span>Visit Website</span>
          <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform text-slate-400 group-hover/btn:text-white" />
        </button>
      </div>
    </motion.div>
  );
};

const Partners: React.FC = () => {
  return (
    <div className="py-32 bg-[#0b0f19] relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-on-scroll">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md"
          >
            <Globe size={12} className="text-blue-400" /> Global Community
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter"
          >
            OUR TRUSTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 animate-gradient-x">PARTNERS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed"
          >
            At CODEON HOSTHING, we work with top gaming brands to deliver unbeatable hosting experiences and exclusive content for our community.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, i) => (
            <PartnerCard key={i} partner={partner} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
