import React, { useState, useEffect } from 'react';
import {
  Star, Zap, Shield, Clock, RefreshCcw,
  ShoppingCart, ArrowRight, Cpu, ShieldCheck,
  ChevronUp, ChevronDown, Monitor, Puzzle,
  Settings, Banknote, HardDrive, Database,
  ChevronRight, Users, CheckCircle2, Server,
  Gamepad2, Layers, Command, PlayCircle, Terminal,
  Box, Flame, Sliders, Activity, Wifi
} from 'lucide-react';
import GlobalNetwork from '../components/GlobalNetwork';
import DiscordBanner from '../components/DiscordBanner';
import MinecraftControlPanelSection from '../components/MinecraftControlPanelSection';
import { motion, AnimatePresence } from 'framer-motion';

interface MinecraftHostingPageProps {
  onOrderPlan?: (plan: any) => void;
}

export default function MinecraftHostingPage({ onOrderPlan }: MinecraftHostingPageProps) {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(2); // Default to 4GB

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Comprehensive Plan List based on user request
  const plans = [
    { ram: '1GB', cpu: '0.5 Core', ssd: '10GB NVMe', price: '300.00', slots: 'Unlimited', icon: '🌱' },
    { ram: '2GB', cpu: '1 Core', ssd: '10GB NVMe', price: '600.00', slots: 'Unlimited', icon: '🪵' },
    { ram: '4GB', cpu: '1 Core', ssd: '10GB NVMe', price: '1000.00', slots: 'Unlimited', popular: true, icon: '⛏️' },
    { ram: '6GB', cpu: '1.5 Cores', ssd: '20GB NVMe', price: '1600.00', slots: 'Unlimited', icon: '🧱' },
    { ram: '8GB', cpu: '2 Cores', ssd: '30GB NVMe', price: '1800.00', slots: 'Unlimited', icon: '🛡️' },
    { ram: '10GB', cpu: '2.5 Cores', ssd: '30GB NVMe', price: '2400.00', slots: 'Unlimited', icon: '⚔️' },
    { ram: '12GB', cpu: '3 Cores', ssd: '30GB NVMe', price: '2800.00', slots: 'Unlimited', icon: '👑' },
    { ram: '16GB', cpu: '4 Cores', ssd: '40GB NVMe', price: '3200.00', slots: 'Unlimited', icon: '💎' },
    { ram: '20GB', cpu: '5 Cores', ssd: '40GB NVMe', price: '4200.00', slots: 'Unlimited', icon: '🔮' },
    { ram: '24GB', cpu: '6 Cores', ssd: '40GB NVMe', price: '6600.00', slots: 'Unlimited', icon: '🐲' },
    { ram: '32GB', cpu: '8 Cores', ssd: '40GB NVMe', price: '7800.00', slots: 'Unlimited', icon: '🌟' },
    { ram: '64GB', cpu: '10 Cores', ssd: '50GB NVMe', price: '12000.00', slots: 'Unlimited', icon: '🌌' },
  ];

  const features = [
    {
      title: 'Ryzen™ 9 7950X',
      desc: 'Powered by the fastest single-core performance CPUs on the market. 5.7GHz clock speeds.',
      icon: <Cpu />,
      col: 'md:col-span-2',
      bg: 'bg-gradient-to-br from-green-900/20 to-black',
      border: 'border-green-500/20'
    },
    {
      title: 'DDR5 Memory',
      desc: 'Next-gen RAM speeds ensuring zero lag for large modpacks.',
      icon: <Database />,
      col: 'md:col-span-1',
      bg: 'bg-[#0a0f0a]',
      border: 'border-white/5'
    },
    {
      title: 'NVMe Gen4 SSD',
      desc: 'Instant chunk loading and lightning-fast server startups.',
      icon: <HardDrive />,
      col: 'md:col-span-1',
      bg: 'bg-[#0a0f0a]',
      border: 'border-white/5'
    },
    {
      title: 'DDoS Shield™',
      desc: 'Proprietary 12TBps protection against all attack vectors.',
      icon: <ShieldCheck />,
      col: 'md:col-span-2',
      bg: 'bg-gradient-to-br from-blue-900/20 to-black',
      border: 'border-blue-500/20'
    },
  ];

  const gamemodes = [
    { name: 'Survival SMP', icon: '🌲', desc: 'Optimized for high entity counts and large world generation.' },
    { name: 'SkyBlock', icon: '🏝️', desc: 'Zero lag with thousands of island calculations per second.' },
    { name: 'BedWars', icon: '⚔️', desc: 'Instant hit-registration and ultra-low latency for PvP.' },
    { name: 'Creative', icon: '🎨', desc: 'Unlimited WorldEdit power with high RAM allocation.' },
  ];

  return (
    <div className="bg-[#020402] text-white min-h-screen font-sans overflow-x-hidden selection:bg-green-500/30">

      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://wallpapers.com/images/hd/minecraft-shaders-background-1920-x-1080-8s5q3q3q3q3q3q3q.jpg')] bg-cover bg-center opacity-20 filter brightness-[0.3] contrast-125 scale-105 animate-[pulse_10s_ease-in-out_infinite]"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#020402] via-[#020402]/80 to-green-900/10"></div>

          {/* Floating Cubes (Particles) */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 border border-green-500/20 bg-green-500/5 animate-[float_15s_linear_infinite]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-green-400">Java & Bedrock Supported</span>
            </div>

            <h1 className="text-7xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase italic drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]">
              CRAFT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 animate-gradient-x">LIMITLESS.</span>
            </h1>

            <p className="text-xl text-slate-400 max-w-xl leading-relaxed font-medium">
              The world's most advanced Minecraft hosting. Powered by <span className="text-white font-bold border-b-2 border-green-500">Ryzen™ 9 7950X</span> and our proprietary <span className="text-white font-bold">TitanGuard™</span> DDoS protection.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-10 py-5 bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-widest text-sm rounded-xl overflow-hidden shadow-[0_0_40px_rgba(22,163,74,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 transform skew-y-12"></div>
                <span className="relative flex items-center gap-3">
                  Deploy Server <ArrowRight size={18} />
                </span>
              </button>

              <button className="px-10 py-5 bg-[#0a0f0a]/80 hover:bg-[#1a231a] border border-green-500/30 text-green-400 font-black uppercase tracking-widest text-sm rounded-xl transition-all hover:scale-105 active:scale-95 backdrop-blur-md flex items-center gap-3 shadow-lg shadow-green-900/20">
                <PlayCircle size={18} /> View Performance
              </button>
            </div>
          </div>

          {/* 3D Floating Block Visual */}
          <div className="relative hidden lg:block perspective-[2000px]">
            <motion.div
              animate={{ rotateY: 360, rotateX: 10 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative w-96 h-96 mx-auto preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-green-500/30 blur-[100px] rounded-full animate-pulse"></div>

              {/* 3D CUBE REPRESENTATION */}
              <div className="relative w-full h-full transform-style-3d">
                <div className="absolute inset-0 border-4 border-green-500/50 bg-black/40 backdrop-blur-md rounded-3xl translate-z-10 shadow-[0_0_50px_rgba(34,197,94,0.2)] flex items-center justify-center">
                  <Box size={120} className="text-green-500" />
                </div>
              </div>

              {/* Floating Stats - Glassmorphism */}
              <motion.div
                animate={{ y: [0, -20, 0], rotateY: -360 }} // Counter rotate to face front
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 bg-[#0a0f0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-green-500/30 shadow-2xl glass-panel translate-z-20"
              >
                <Cpu size={32} className="text-green-500 mb-2" />
                <div className="text-3xl font-black text-white font-mono glitch-text" data-text="5.7 GHz">5.7 GHz</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Clock Speed</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0], rotateY: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 bg-[#0a0f0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-blue-500/30 shadow-2xl glass-panel translate-z-20"
              >
                <Users size={32} className="text-blue-500 mb-2" />
                <div className="text-3xl font-black text-white font-mono">150+</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Players w/o Lag</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <div className="border-y border-white/5 bg-[#030603] relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5 leading-none">
          {[
            { l: "Uptime", v: "100%", c: "text-green-500", i: Activity },
            { l: "Setup Time", v: "60s", c: "text-blue-500", i: Clock },
            { l: "DDoS Protection", v: "12Tbps", c: "text-red-500", i: Shield },
            { l: "Support", v: "24/7", c: "text-yellow-500", i: Users }
          ].map((s, i) => (
            <div key={i} className="py-12 text-center group hover:bg-white/5 transition-colors cursor-crosshair relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className={`text-4xl md:text-5xl font-black italic tracking-tighter ${s.c} mb-3 flex items-center justify-center gap-3`}>
                <s.i size={32} className="opacity-50" /> {s.v}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. ENGINEERED FOR PERFORMANCE (BENTO) */}
      <section className="py-32 px-6 relative bg-[#020402]">
        <div className="max-w-7xl mx-auto z-10 relative">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white mb-6">
              ENGINEERED FOR <span className="text-green-600 block md:inline">PERFORMANCE.</span>
            </h2>
            <div className="h-2 w-32 bg-green-600 skew-x-[-20deg]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(280px,auto)]">
            {features.map((f, i) => (
              <div key={i} className={`${f.col} ${f.bg} border ${f.border} p-10 rounded-[2.5rem] relative overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-900/10`}>
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
                  {React.cloneElement(f.icon as any, { size: 150 })}
                </div>
                {/* Decoration Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-md group-hover:bg-green-600 group-hover:border-green-500 transition-colors duration-300 shadow-lg">
                    {React.cloneElement(f.icon as any, { size: 32 })}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tight mb-4">{f.title}</h3>
                    <p className="text-slate-400 font-medium leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GAME MODES */}
      <section className="py-24 bg-[#050805] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-center text-slate-500 mb-16">Optimized For All Gameplay</h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {gamemodes.map((mode, i) => (
              <div key={i} className="bg-[#0a0f0a] border border-white/5 p-8 rounded-3xl text-center group hover:border-green-500/30 transition-all cursor-crosshair">
                <div className="text-5xl mb-6 transform group-hover:scale-125 transition-transform duration-300">{mode.icon}</div>
                <h4 className="text-xl font-black text-white uppercase italic tracking-wider mb-3">{mode.name}</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{mode.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRICING TIERS (HOLOGRAPHIC SLIDER) */}
      <section id="plans" className="py-32 px-6 bg-[#030603] relative border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-green-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block border border-green-500/20 inline-block px-4 py-2 rounded-full bg-green-900/10">Instant Provisioning • No Setup Fees</span>
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter">
              Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Tier.</span>
            </h2>
          </div>

          {/* PLAN SELECTOR UI */}
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">

            {/* LEFT: PLAN LIST */}
            <div className="w-full lg:w-1/3 space-y-2 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {plans.map((p, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPlanIndex(i)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between group ${selectedPlanIndex === i ? 'bg-green-600 border-green-500 shadow-lg shadow-green-500/20 translate-x-2' : 'bg-[#0a0f0a] border-white/5 hover:bg-[#1a231a]'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all">{p.icon}</span>
                    <div>
                      <h4 className={`font-black uppercase tracking-wider text-sm ${selectedPlanIndex === i ? 'text-white' : 'text-slate-300'}`}>{p.ram} Allocation</h4>
                      {p.popular && <span className="text-[9px] bg-yellow-400 text-black px-1.5 py-0.5 rounded font-bold uppercase">Popular</span>}
                    </div>
                  </div>
                  <div className={`text-right ${selectedPlanIndex === i ? 'text-white' : 'text-slate-500'}`}>
                    <div className="font-black italic">Rs.{p.price}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: HOLOGRAPHIC PREVIEW CARD */}
            <div className="w-full lg:w-1/2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPlanIndex}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-[#0a0a0a] border border-green-500/30 p-10 rounded-[3rem] shadow-[0_0_100px_rgba(22,163,74,0.1)] overflow-hidden"
                >
                  {/* Scanline */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(34,197,94,0.05)_50%,transparent_100%)] h-[200%] w-full animate-[scan_4s_linear_infinite] pointer-events-none"></div>

                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 mx-auto bg-green-500/10 rounded-3xl flex items-center justify-center border border-green-500/20 mb-8 shadow-lg shadow-green-500/20">
                      <span className="text-6xl filter drop-shadow-[0_0_20px_rgba(22,163,74,0.5)]">{plans[selectedPlanIndex].icon}</span>
                    </div>

                    <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">{plans[selectedPlanIndex].ram} Plan</h3>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-8">Optimized For {parseInt(plans[selectedPlanIndex].ram) >= 8 ? 'Large Modpacks' : 'Vanilla SMP'}</p>

                    <div className="grid grid-cols-2 gap-4 mb-8 text-left">
                      <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1"><Cpu size={12} /> Alloc. Cores</div>
                        <div className="text-2xl font-black text-white">{plans[selectedPlanIndex].cpu}</div>
                      </div>
                      <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1"><HardDrive size={12} /> Fast Storage</div>
                        <div className="text-2xl font-black text-white">{plans[selectedPlanIndex].ssd}</div>
                      </div>
                      <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1"><Database size={12} /> Database</div>
                        <div className="text-lg font-black text-white">Free MySQL</div>
                      </div>
                      <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1"><Wifi size={12} /> Bandwidth</div>
                        <div className="text-lg font-black text-white">Unmetered</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-green-900/10 p-6 rounded-2xl border border-green-500/20 mb-6">
                      <div className="text-left">
                        <span className="text-[10px] uppercase font-bold text-green-400 tracking-widest block">Monthly Total</span>
                        <span className="text-4xl font-black text-white italic tracking-tighter">Rs.{plans[selectedPlanIndex].price}</span>
                      </div>
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black">
                        <ShoppingCart size={24} />
                      </div>
                    </div>

                    <button
                      onClick={() => onOrderPlan?.(plans[selectedPlanIndex])}
                      className="w-full py-5 bg-green-600 hover:bg-green-500 text-white rounded-xl font-black uppercase tracking-widest text-sm shadow-xl shadow-green-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      Deploy server
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTROL PANEL PREVIEW */}
      <MinecraftControlPanelSection />

      {/* 7. FAQ SECTION */}
      <section className="py-24 px-6 bg-[#020402] border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter text-center mb-16">
            COMMON <span className="text-slate-700">QUESTIONS.</span>
          </h2>
          <div className="space-y-4">
            {[
              { q: "Which plan is best for a small SMP?", a: "For a vanilla SMP with 5-10 friends, the 4GB RAM plan is perfect. If you plan to add heavy mods like 'Better Minecraft', we recommend 8GB." },
              { q: "Do you support Modpacks?", a: "Yes. Our 1-Click Installer supports over 2,000 packs from CurseForge, Modrinth, and FTB." },
              { q: "Is setup instant?", a: "Instant Setup. Your server is automatically deployed and configured within 60 seconds of payment." },
              { q: "Can I upgrade later?", a: "Instantly. Just click 'Upgrade' in your billing area, pay the difference, and restart your server. No data loss." }
            ].map((faq, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-green-500/30 transition-colors">
                <button onClick={() => setOpenFaqId(openFaqId === i ? null : i)} className="w-full flex items-center justify-between p-8 text-left hover:bg-white/5 transition-colors">
                  <span className="font-bold text-white text-lg tracking-tight">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-300 ${openFaqId === i ? 'bg-green-600 rotate-180 border-green-500' : ''}`}>
                    <ChevronDown size={16} className={`${openFaqId === i ? 'text-white' : 'text-slate-400'}`} />
                  </div>
                </button>
                {openFaqId === i && (
                  <div className="px-8 pb-8 pt-0 text-slate-400 text-base leading-relaxed">
                    <p className="border-l-2 border-green-500 pl-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <GlobalNetwork theme="green" />
      <DiscordBanner />
    </div>
  );
}
