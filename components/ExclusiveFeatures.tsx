
import React from 'react';
import { Shield, Cpu, Clock, HardDrive, Globe, Zap, ArrowUpRight } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative border border-white/5 bg-slate-900/40 backdrop-blur-xl rounded-[2rem] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      <div className="p-8 h-full flex flex-col relative z-10">
        <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl ${feature.glow}`}>
          <feature.icon size={30} className={feature.color} />
        </div>

        <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-4 group-hover:text-blue-400 transition-colors">
          {feature.title}
        </h3>

        <p className="text-slate-400 text-sm font-medium leading-relaxed flex-grow">
          {feature.desc}
        </p>

        <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-white transition-colors">
          <span className="w-8 h-px bg-slate-700 group-hover:bg-blue-500 transition-colors"></span>
          Included
        </div>
      </div>
    </motion.div>
  );
};

const ExclusiveFeatures: React.FC = () => {
  const features = [
    { title: 'DDoS Protection', desc: '480Gbps automated mitigation included with every plan. We filter attacks instantly.', icon: Shield, color: 'text-blue-400', glow: 'shadow-blue-500/20' },
    { title: 'NVMe SSD Storage', desc: '6x faster than standard SSDs for instant load times and zero lag.', icon: HardDrive, color: 'text-purple-400', glow: 'shadow-purple-500/20' },
    { title: 'Ryzen Processors', desc: 'Powered by Ryzen 9 7950X for unmatched single-core performance.', icon: Cpu, color: 'text-red-400', glow: 'shadow-red-500/20' },
    { title: '99.99% Uptime', desc: 'Guaranteed availability with our SLA backing. We never sleep so you can.', icon: Clock, color: 'text-green-400', glow: 'shadow-green-500/20' },
    { title: 'Global Locations', desc: 'Servers strategically placed in NA, EU, and Asia for ultra-low latency.', icon: Globe, color: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
    { title: 'Instant Setup', desc: 'Your server is online and ready under 60 seconds after payment.', icon: Zap, color: 'text-yellow-400', glow: 'shadow-yellow-500/20' },
  ];

  return (
    <section className="py-32 bg-[#0b0f19] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md"
            >
              <Cpu size={12} className="text-blue-400" /> Infrastructure
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-6 uppercase"
            >
              BUILT FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x">SPEED</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl"
            >
              We don't cut corners on hardware. Experience the raw power of enterprise-grade infrastructure optimized specifically for high-performance gaming.
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-4 md:mb-0"
          >
            Data Center Specs <ArrowUpRight size={16} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} feature={f} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExclusiveFeatures;
