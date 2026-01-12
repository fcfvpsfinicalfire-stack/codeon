import React, { useState, useEffect } from 'react';
import {
  Shield, Zap, Globe, Cpu, ArrowRight,
  Server, Users, Terminal, HardDrive,
  ChevronDown, Star, Box, Hammer, Download, Activity,
  X, AlertTriangle, Layers, Radio, Skull, Construction,
  Timer, Gauge, Siren, Flame
} from 'lucide-react';
import GlobalNetwork from '../components/GlobalNetwork';
import TestimonialsSection from '../components/TestimonialsSection';
import DiscordBanner from '../components/DiscordBanner';
import { motion } from 'framer-motion';

interface RustHostingPageProps {
  onOrderPlan?: (plan: any) => void;
}

export default function RustHostingPage({ onOrderPlan }: RustHostingPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const plans = [
    { name: 'Naked', ram: '8GB', slots: '50 Slots', price: '1200.00', cpu: 'Ryzen 9 5950X', features: ['Oxide Support', 'DDoS Protection', 'Free Subdomain'], icon: Skull },
    { name: 'Raider', ram: '16GB', slots: '150 Slots', price: '2500.00', cpu: 'Ryzen 9 7950X3D', recommended: true, features: ['Priority Support', ' NVMe SSD', 'Automated Wipes', 'Daily Backups'], icon: Flame },
    { name: 'Zerg', ram: '32GB', slots: '500 Slots', price: '5000.00', cpu: 'Ryzen 9 7950X3D (OC)', features: ['Dedicated IP', 'Extreme Performance', 'Unlimited NVMe', 'White Glove Migration'], icon: Siren },
  ];

  return (
    <div className="min-h-screen bg-[#0a0505] font-sans text-slate-300 overflow-x-hidden selection:bg-orange-600/30 selection:text-orange-500">

      {/* 1. HAZARD HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://files.facepunch.com/paddy/20230228/1.jpg')] bg-cover bg-center opacity-30 filter grayscale-[0.3] contrast-125 scale-105 animate-[pulse_10s_ease-in-out_infinite]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0505] via-[#0a0505]/60 to-transparent"></div>
          {/* Dust/Sparks Particles */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 hover:opacity-30 transition-opacity"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-none clip-path-polygon bg-orange-900/30 border-l-4 border-orange-600 text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-8 backdrop-blur-md animate-pulse">
              <Radio size={12} className="animate-ping" /> Radiation Detected
            </div>

            <h1 className="text-8xl md:text-[10rem] font-black italic tracking-tighter text-white mb-6 leading-[0.8] drop-shadow-2xl">
              SURVIVE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-red-800 relative">
                THE WIPE.
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-slate-400 max-w-xl leading-relaxed font-medium">
              Dominate the island with <span className="text-orange-500 font-bold">Ryzen 9 7950X3D</span> hardware.
              Zero lag during massive raids and heli fights.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-12 py-6 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest text-sm clip-path-polygon shadow-[0_0_40px_rgba(234,88,12,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <span className="relative flex items-center gap-3">Deploy Server <ArrowRight size={18} strokeWidth={3} /></span>
              </button>
              <button className="px-12 py-6 bg-[#1a0f0f] border border-orange-500/30 text-orange-500 font-black uppercase tracking-widest text-sm hover:scale-105 transition-all flex items-center gap-3 backdrop-blur-md clip-path-polygon">
                <Activity size={18} /> Benchmarks
              </button>
            </div>
          </div>

          {/* 3D Visual - Radiation Barrel / C4 Theme */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-orange-600/20 blur-[100px] rounded-full animate-pulse"></div>
              {/* Placeholder for 3D Rust visual */}
              <div className="relative z-10 w-96 h-96 mx-auto bg-[#1a0f0f] border-2 border-orange-600/50 rounded-full flex items-center justify-center p-4">
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-orange-600/30 animate-[spin_20s_linear_infinite]"></div>
                <div className="text-center space-y-2">
                  <AlertTriangle size={80} className="text-orange-600 mx-auto animate-bounce" />
                  <div className="text-4xl font-black text-white italic tracking-tighter">WIPE HYPE</div>
                  <div className="text-orange-500 font-mono text-xl">04:20:00</div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Time Until Wipe</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INDUSTRIAL STATS */}
      <div className="border-y border-orange-600/20 bg-[#110505] relative z-20 overflow-hidden">
        {/* Hazard Stripes Background */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#1a0f0f_10px,#1a0f0f_20px)] opacity-20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-orange-600/20">
          {[
            { l: "Map Gen", v: "< 30s", i: Layers, c: "text-green-500" },
            { l: "FPS", v: "250+", i: Gauge, c: "text-orange-500" },
            { l: "Entities", v: "250K+", i: Box, c: "text-red-500" },
            { l: "DDOS Shield", v: "Active", i: Shield, c: "text-blue-500" }
          ].map((s, i) => (
            <div key={i} className="py-10 flex flex-col items-center justify-center group hover:bg-orange-600/10 transition-colors cursor-crosshair">
              <div className={`text-4xl font-black italic flex items-center gap-3 mb-2 ${s.c}`}>
                <s.i size={28} /> {s.v}
              </div>
              <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. WORKBENCH HARDWARE */}
      <section className="py-32 bg-[#0a0505] relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-6xl font-black italic tracking-tighter text-white mb-4">INDUSTRIAL <span className="text-orange-600">GRADE.</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Rusty hardware belongs in the scrapper. We run the bleeding edge.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#110505] border-2 border-orange-600/20 p-8 clip-path-polygon group hover:border-orange-600 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Cpu size={100} />
              </div>
              <div className="w-12 h-12 bg-orange-600/10 flex items-center justify-center text-orange-600 mb-6 border border-orange-600/30">
                <Cpu size={24} />
              </div>
              <h3 className="text-2xl font-black text-white italic uppercase mb-2">Ryzen 9 7950X3D</h3>
              <p className="text-slate-500 text-sm mb-4">Unity engine loves L3 Cache. We give it 144MB of it.</p>
              <div className="bg-black/30 p-2 rounded text-xs font-mono text-orange-500 border border-orange-600/10">
                &gt; benchmark_score: 99.8%
              </div>
            </div>

            <div className="bg-[#110505] border-2 border-orange-600/20 p-8 clip-path-polygon group hover:border-orange-600 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <HardDrive size={100} />
              </div>
              <div className="w-12 h-12 bg-red-600/10 flex items-center justify-center text-red-600 mb-6 border border-red-600/30">
                <HardDrive size={24} />
              </div>
              <h3 className="text-2xl font-black text-white italic uppercase mb-2">Gen4 NVMe</h3>
              <p className="text-slate-500 text-sm mb-4">Generate 4K maps in under 30 seconds.</p>
              <div className="w-full bg-slate-800 h-1 mt-auto">
                <div className="bg-red-600 h-full w-[95%] shadow-[0_0_10px_red]"></div>
              </div>
            </div>

            <div className="bg-[#110505] border-2 border-orange-600/20 p-8 clip-path-polygon group hover:border-orange-600 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap size={100} />
              </div>
              <div className="w-12 h-12 bg-yellow-600/10 flex items-center justify-center text-yellow-600 mb-6 border border-yellow-600/30">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-black text-white italic uppercase mb-2">DDR5 ECC</h3>
              <p className="text-slate-500 text-sm mb-4">Zero garbage collection stutters. Pure performance.</p>
              <div className="flex gap-1 mt-auto">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="flex-1 h-2 bg-yellow-600/20 border border-yellow-600/40"></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MODDING SECTION */}
      <section className="py-24 bg-[#0a0505] border-t border-orange-600/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-blue-600/10 text-blue-500 border border-blue-600/20 text-xs font-black uppercase tracking-widest mb-4">uMod / Oxide Supported</div>
            <h2 className="text-5xl font-black text-white italic tracking-tighter mb-6">CUSTOMIZE <span className="text-blue-500">EVERYTHING.</span></h2>
            <p className="text-slate-400 text-lg mb-8">
              Install plugins in one click. From 2x Resource rates to Teleportation and Kits. We support Oxide (uMod) and Carbon out of the box.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {['BetterLoot', 'Kits', 'NTeleportation', 'GatherManager', 'QuickSmelt', 'StackSizeController'].map((plugin, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#110505] p-3 border border-white/5 hover:border-blue-500/50 transition-colors">
                  <div className="w-2 h-2 bg-blue-500 rotate-45"></div>
                  <span className="text-sm font-bold text-white font-mono">{plugin}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-600/10 blur-[80px] rounded-full"></div>
            <div className="relative bg-[#050505] border border-white/10 p-1 rounded-none shadow-2xl">
              {/* Pseudo-Code Editor Visual */}
              <div className="bg-[#0a0a0a] p-4 font-mono text-xs text-slate-400 overflow-hidden">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <p><span className="text-purple-400">class</span> <span className="text-yellow-400">OxidePlugin</span> <span className="text-white">{`{`}</span></p>
                <p className="pl-4"><span className="text-blue-400">void</span> <span className="text-yellow-400">Loaded</span>() <span className="text-white">{`{`}</span></p>
                <p className="pl-8 text-green-400">// Automatically injected by Codeon Panel</p>
                <p className="pl-8"><span className="text-white">Puts</span>(<span className="text-orange-400">"Plugin Loaded Successfully!"</span>);</p>
                <p className="pl-4"><span className="text-white">{`}`}</span></p>
                <p><span className="text-white">{`}`}</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING TIERS */}
      <section id="plans" className="py-32 px-6 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[#0a0505] opacity-90">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter">
              CHOOSE YOUR <span className="text-orange-600">LOADOUT.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((p, i) => (
              <div key={i} className={`relative bg-[#110505] border ${p.recommended ? 'border-orange-600 shadow-[0_0_60px_rgba(234,88,12,0.15)] scale-105 z-10' : 'border-white/5'} p-10 flex flex-col group transition-transform hover:-translate-y-2 clip-path-polygon`}>

                {p.recommended && (
                  <div className="absolute top-0 right-0 bg-orange-600 text-black px-4 py-1 text-[10px] font-black uppercase tracking-widest clip-path-polygon">
                    Clan Standard
                  </div>
                )}

                <div className="mb-8 border-b border-white/5 pb-8 text-center">
                  <p.icon size={42} className={`mx-auto mb-4 ${p.recommended ? 'text-orange-500' : 'text-slate-600'}`} />
                  <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">{p.name}</h3>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-5xl font-black text-white italic tracking-tighter">Rs.{p.price}</span>
                    <span className="text-xs text-slate-500 font-bold uppercase">/Mo</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {[p.ram, p.cpu, p.slots, ...p.features].map((f, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 ${p.recommended ? 'bg-orange-500' : 'bg-slate-500'} rotate-45`}></div>
                      <span className="text-sm font-bold text-slate-400 uppercase">{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onOrderPlan?.(p)}
                  className={`w-full py-5 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all clip-path-polygon ${p.recommended ? 'bg-orange-600 hover:bg-orange-500 text-white' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}
                >
                  Deploy <ChevronDown className="-rotate-90" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AUTOMATED WIPES */}
      <section className="py-24 bg-[#110505] border-t border-orange-600/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-600/10 blur-[80px] rounded-full"></div>
            <div className="relative bg-[#0a0505] border border-orange-600/30 p-8 clip-path-polygon shadow-2xl">
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <span className="text-orange-500 font-black uppercase tracking-widest text-xs">Scheduler.exe</span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </div>
              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">TASK_ID</span>
                  <span className="text-white">WIPE_MAP_01</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">EXEC_TIME</span>
                  <span className="text-orange-400">THURSDAY @ 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">BLUEPRINTS</span>
                  <span className="text-red-500">WIPE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SEED</span>
                  <span className="text-blue-400">AUTO_GENERATE</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-5xl font-black text-white italic tracking-tighter mb-6">AUTOMATED <span className="text-orange-600">WIPES.</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Sleep through the force wipe. Our system automatically stops your server, updates Rust, changes the seed, wipes the map, and brings it back online.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <Timer className="text-orange-600" size={32} />
                <div>
                  <h4 className="font-black text-white uppercase">Scheduled</h4>
                  <p className="text-xs text-slate-500">Set it and forget it.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Globe className="text-blue-600" size={32} />
                <div>
                  <h4 className="font-black text-white uppercase">Seed Picker</h4>
                  <p className="text-xs text-slate-500">Auto-finds best maps.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GLOBAL NETWORK - REUSED */}
      <GlobalNetwork theme="orange" />

      {/* 8. FAQ */}
      <section className="py-24 bg-[#0a0505] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter text-center mb-16">
            SURVIVOR <span className="text-slate-600">INTEL.</span>
          </h2>

          <div className="space-y-4">
            {[
              { q: "Do you protect against DDoS?", a: "Yes. Our Pathfinder protection handles 12Tbps+, specifically tuned for RakNet (Rust's protocol)." },
              { q: "Can I upgrade my RAM mid-wipe?", a: "Yes. Upgrades are instant and require only a quick server restart. No data is lost." },
              { q: "Is Rust+ supported?", a: "Yes. You just need to pair the app with the server IP and port." }
            ].map((faq, i) => (
              <div key={i} className="bg-[#110505] border border-white/5 p-6 hover:bg-[#1a0f0f] transition-colors cursor-pointer" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-200">{faq.q}</span>
                  <ChevronDown className={`text-slate-500 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </div>
                {activeFaq === i && <p className="mt-4 text-slate-500 text-sm leading-relaxed border-t border-white/5 pt-4">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <DiscordBanner />
    </div>
  );
};


