
import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ChevronDown, Play, Server, Shield, Zap, CircleDashed, Hexagon } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Mouse Parallax State
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.05); // Small parallax factor
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.05);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#05080f] pt-20 perspective-1000">

      {/* 1. ULTRA-MAX BACKGROUND (AURORA & VOID) */}
      <motion.div
        style={{ x: springX, y: springY }} // Parallax effect on entire background container
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >

        {/* Deep Space Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-[#05080f] to-[#0b0f19]"></div>

        {/* Animated Aurora - Keeping CSS animation for complex gradient flow */}
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-purple-900/10 rotate-12 animate-[aurora_20s_linear_infinite] blur-3xl"></div>

        {/* Pulsing Orbs */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/20 blur-[150px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-blue-600/10 blur-[200px] rounded-full mix-blend-screen"
        />

        {/* Dynamic Hex Grid Floor */}
        <div
          className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-overlay"
        ></div>

        {/* Computing Grid Lines */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
            maskImage: 'linear-gradient(to bottom, transparent, black 40%, black 90%, transparent)'
          }}
        ></div>

        {/* Shooting Stars / Data Streams */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ top: -100, left: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ top: '120%', opacity: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute w-[1px] h-[150px] bg-gradient-to-b from-transparent via-blue-400 to-transparent"
          />
        ))}

      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center transform-style-3d">

        {/* Holographic Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 rounded-full pl-2 pr-6 py-2 backdrop-blur-xl mb-12 hover:bg-white/10 transition-all cursor-pointer group shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
        >
          <div className="bg-green-500/20 p-1.5 rounded-full relative">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full relative z-10 shadow-[0_0_10px_#22c55e]"></div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 group-hover:text-white transition-colors">
            System Online • v4.2.0 • Region: Global
          </span>
        </motion.div>

        {/* MASSIVE HERO TITLE */}
        <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase italic mb-8 relative z-20">
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="block text-slate-200 drop-shadow-xl"
          >
            Premium
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 animate-[textShimmer_5s_linear_infinite] bg-[length:200%_auto] drop-shadow-[0_0_50px_rgba(59,130,246,0.4)]"
          >
            Performance
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="block text-slate-600 mix-blend-overlay"
          >
            Hosting
          </motion.span>
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium mb-12 drop-shadow-md"
        >
          The next generation of game hosting is here. Powered by <span className="text-white font-bold tracking-tight shadow-[0_0_20px_rgba(255,255,255,0.2)]">Ryzen 9 7950X</span> and <span className="text-white font-bold tracking-tight shadow-[0_0_20px_rgba(255,255,255,0.2)]">NVMe Gen4</span> infrastructure.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-20"
        >
          <button
            onClick={() => document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-blue-600 hover:bg-blue-500 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_0_60px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-[shine_1.5s_infinite]"></div>
            <span>Deploy Server</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="group bg-white/5 hover:bg-white/10 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm border border-white/5 hover:border-white/20 transition-all hover:scale-105 active:scale-95 backdrop-blur-md flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors border border-white/5">
              <Play size={10} fill="currentColor" />
            </div>
            <span>Watch Trailer</span>
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">Scroll</span>
          <ChevronDown size={14} />
        </motion.div>
      </div>

      {/* 3D FLOATING GEOMETRY (MOTION) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cube 1 (Left) */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }} // Parallax scroll
          animate={{ rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[5%] hidden xl:block z-0"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full"></div>
            <div className="bg-[#0f172a]/80 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.1)] skew-y-6 rotate-12 relative z-10">
              <Server className="text-blue-500 w-20 h-20 drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]" />
            </div>
          </div>
        </motion.div>

        {/* Cube 2 (Right) */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }} // Parallax scroll faster
          animate={{ rotate: [0, -10, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] right-[5%] hidden xl:block z-0"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 blur-[60px] rounded-full"></div>
            <div className="bg-[#0f172a]/80 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(16,185,129,0.1)] -skew-y-6 -rotate-12 relative z-10">
              <Shield className="text-green-500 w-20 h-20 drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]" />
            </div>
          </div>
        </motion.div>

        {/* Tiny Particles */}
        <motion.div animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-[15%] right-[25%]"><Hexagon size={24} className="text-purple-500/30 rotate-12" /></motion.div>
        <motion.div animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -30, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute bottom-[15%] left-[25%]"><Zap size={20} className="text-yellow-500/30 -rotate-12" /></motion.div>
      </div>

      <style>{`
        @keyframes aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes textShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
