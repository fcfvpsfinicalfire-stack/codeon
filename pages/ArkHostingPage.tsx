import React, { useState, useEffect } from 'react';
import {
  Shield, Zap, Globe, Cpu, ArrowRight,
  Map, Server, Settings, Users, Terminal, HardDrive,
  ChevronDown, Star, Box, Hammer, Download, Activity,
  X, HelpCircle, MessageSquare, Anchor, Crosshair,
  Database, Layers, Wifi
} from 'lucide-react';
import GlobalNetwork from '../components/GlobalNetwork';
import TestimonialsSection from '../components/TestimonialsSection';
import DiscordBanner from '../components/DiscordBanner';
import { motion } from 'framer-motion';

interface ArkHostingPageProps {
  onOrderPlan?: (plan: any) => void;
}

export default function ArkHostingPage({ onOrderPlan }: ArkHostingPageProps) {
  const [activeMap, setActiveMap] = useState('island');
  const [activeFaq, setActiveFaq] = useState<number | null>(1);

  const plans = [
    { name: 'Survivor', ram: '8GB', slots: '30 Slots', price: '1200.00', cpu: 'Ryzen 9 5950X', features: ['24/7 Support', 'DDoS Protection', 'Free Subdomain'] },
    { name: 'Tribe', ram: '16GB', slots: '100 Slots', price: '2200.00', cpu: 'Ryzen 9 5950X', recommended: true, features: ['Priority Support', ' NVMe SSD', 'Cluster Ready', 'Automatic Backups'] },
    { name: 'Alpha', ram: '32GB', slots: 'Unlimited', price: '4000.00', cpu: 'Ryzen 9 7950X3D', features: ['Dedicated IP', 'Extreme Performance', 'Unlimited NVMe', 'White Glove Migration'] },
  ];

  const maps = [
    { id: 'island', name: 'The Island', img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2070&auto=format&fit=crop' },
    { id: 'rag', name: 'Ragnarok', img: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2159&auto=format&fit=crop' },
    { id: 'gen2', name: 'Genesis II', img: 'https://images.unsplash.com/photo-1541460613271-e94119842a27?q=80&w=2070&auto=format&fit=crop' },
    { id: 'lost', name: 'Lost Island', img: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1976&auto=format&fit=crop' },
    { id: 'fjordur', name: 'Fjordur', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop' },
    { id: 'asa', name: 'Ascended', img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-[#05080f] font-sans text-slate-300 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-400">

      {/* 1. TEK HERO */}
      <section className="relative h-[120vh] flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.hdqwalls.com/wallpapers/ark-survival-evolved-4k-game-cl.jpg')] bg-cover bg-center opacity-30 filter brightness-[0.4]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#05080f]/90 via-transparent to-[#05080f]"></div>
          {/* Hexagon Grid Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-12 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)] animate-pulse">
            <Activity size={12} /> Systems Online
          </div>

          <h1 className="text-8xl md:text-[10rem] font-black italic tracking-tighter text-white mb-6 leading-[0.8] drop-shadow-2xl">
            EVOLVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-500 to-green-500 relative">
              YOUR ARK.
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-slate-400 max-w-4xl mx-auto mb-16 font-medium leading-relaxed">
            Experience the ultimate survival hosting. <br className="hidden md:block" />
            <span className="text-cyan-400 font-bold">Tek-Tier Performance</span> for mega-tribes and massive clusters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-6 bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-widest text-sm rounded-xl shadow-[0_0_40px_rgba(8,145,178,0.4)] hover:shadow-[0_0_60px_rgba(8,145,178,0.6)] hover:scale-105 transition-all flex items-center gap-3 clip-path-polygon"
            >
              Start Cluster <ArrowRight size={18} strokeWidth={3} />
            </button>
            <button className="px-12 py-6 bg-[#0a0f1a]/80 hover:bg-[#1a2333] border border-cyan-500/30 text-cyan-400 font-black uppercase tracking-widest text-sm rounded-xl hover:scale-105 transition-all flex items-center gap-3 backdrop-blur-md">
              <Terminal size={18} /> View Specs
            </button>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR (Tek Style) */}
      <div className="border-y border-cyan-500/10 bg-[#080c14] relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-cyan-500/10">
          {[
            { l: "Uptime", v: "100%", i: Activity },
            { l: "Total Players", v: "145K+", i: Users },
            { l: "Active Clusters", v: "840+", i: Server },
            { l: "DDoS Defense", v: "Active", i: Shield }
          ].map((s, i) => (
            <div key={i} className="py-8 flex flex-col items-center justify-center group hover:bg-cyan-500/5 transition-colors cursor-crosshair">
              <div className="text-4xl font-black italic text-white flex items-center gap-3 mb-2 group-hover:text-cyan-400 transition-colors">
                <s.i size={24} className="text-cyan-600" /> {s.v}
              </div>
              <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. HARDWARE BENTO GRID */}
      <section className="py-32 bg-[#05080f] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-6xl font-black italic tracking-tighter text-white mb-4">TEK-TIER <span className="text-cyan-500">HARDWARE</span></h2>
            <div className="h-1 w-32 bg-cyan-500 mx-auto opacity-50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main CPU Card */}
            <div className="md:col-span-2 bg-[#0a0f1a] border border-cyan-500/20 rounded-[2rem] p-10 relative overflow-hidden group hover:border-cyan-500/50 transition-all">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                  <div className="w-16 h-16 bg-cyan-900/20 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 border border-cyan-500/20">
                    <Cpu size={32} />
                  </div>
                  <h3 className="text-3xl font-black text-white italic uppercase mb-4">Ryzen 9 7950X3D</h3>
                  <p className="text-slate-400 text-lg mb-6">
                    The undisputed king of Ark performance. High clock speeds combined with massive 3D V-Cache eliminates simulation lag, even on mega-bases.
                  </p>
                  <div className="flex gap-4">
                    <div className="bg-black/40 px-4 py-2 rounded-lg border border-cyan-500/10">
                      <span className="text-cyan-400 font-black text-xl">5.7 GHz</span>
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Boost</span>
                    </div>
                    <div className="bg-black/40 px-4 py-2 rounded-lg border border-cyan-500/10">
                      <span className="text-cyan-400 font-black text-xl">16 Core</span>
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Processing</span>
                    </div>
                  </div>
                </div>
                {/* Visual element representing a chip or structure */}
                <div className="w-full md:w-1/3 aspect-square bg-cyan-500/10 rounded-full border border-cyan-500/30 flex items-center justify-center relative animate-[spin_10s_linear_infinite]">
                  <div className="absolute inset-0 border-2 border-dashed border-cyan-500/30 rounded-full"></div>
                  <Cpu size={64} className="text-cyan-400 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Storage Card */}
            <div className="bg-[#0a0f1a] border border-cyan-500/20 rounded-[2rem] p-10 flex flex-col relative overflow-hidden group hover:border-cyan-500/50 transition-all">
              <div className="w-16 h-16 bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-400 mb-6 border border-purple-500/20">
                <HardDrive size={32} />
              </div>
              <h3 className="text-2xl font-black text-white italic uppercase mb-2">Gen4 NVMe</h3>
              <p className="text-slate-400 mb-8">Load huge maps like Ragnarok in seconds, not minutes.</p>
              <div className="mt-auto">
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 w-[95%]"></div>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase mt-2 text-slate-500">
                  <span>Read Speed</span>
                  <span className="text-white">7000 MB/s</span>
                </div>
              </div>
            </div>

            {/* Network Card */}
            <div className="bg-[#0a0f1a] border border-cyan-500/20 rounded-[2rem] p-10 flex flex-col relative overflow-hidden group hover:border-cyan-500/50 transition-all">
              <div className="w-16 h-16 bg-green-900/20 rounded-2xl flex items-center justify-center text-green-400 mb-6 border border-green-500/20">
                <Wifi size={32} />
              </div>
              <h3 className="text-2xl font-black text-white italic uppercase mb-2">Low Latency</h3>
              <p className="text-slate-400">Optimized routing for PvP. Your hits register when they should.</p>
            </div>

            {/* RAM Card */}
            <div className="md:col-span-2 bg-[#0a0f1a] border border-cyan-500/20 rounded-[2rem] p-10 relative overflow-hidden group hover:border-cyan-500/50 transition-all flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-16 h-16 bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-400 mb-6 border border-orange-500/20">
                  <Database size={32} />
                </div>
                <h3 className="text-3xl font-black text-white italic uppercase mb-4">DDR5 ECC RAM</h3>
                <p className="text-slate-400 text-lg">
                  Massive memory bandwidth to handle thousands of dinos and structures without garbage collection pauses.
                </p>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-4 h-24 bg-orange-500/20 border border-orange-500/40 rounded-sm relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-orange-500 animate-[bounce_2s_infinite]" style={{ height: `${40 + Math.random() * 40}%`, animationDelay: `${i * 0.2}s` }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE MAP SELECTOR (Obelisk Theme) */}
      <section className="py-24 bg-[#080c14] border-t border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-5xl font-black italic tracking-tighter text-white mb-2">TRAVEL THE <span className="text-cyan-500">ARK</span></h2>
              <p className="text-slate-400">One-click map switching and cluster generation.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {maps.map((m, i) => (
              <div
                key={i}
                onClick={() => setActiveMap(m.id)}
                className={`group cursor-pointer relative h-80 rounded-[2rem] overflow-hidden border-2 transition-all duration-300 ${activeMap === m.id ? 'border-cyan-500 scale-105 z-10 shadow-[0_0_30px_rgba(6,182,212,0.3)]' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-[1.02]'}`}
              >
                <img src={m.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={m.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-transparent to-transparent"></div>
                <div className="absolute bottom-0 p-6">
                  <div className={`w-2 h-2 rounded-full mb-2 ${activeMap === m.id ? 'bg-cyan-400 shadow-[0_0_10px_cyan]' : 'bg-slate-500'}`}></div>
                  <h3 className="text-lg font-black italic text-white uppercase leading-none">{m.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRICING PLANS */}
      <section id="plans" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4">SURVIVAL <span className="text-cyan-500">KITS</span></h2>
            <p className="text-slate-400">Choose your resource allocation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((p, i) => (
              <div key={i} className={`relative bg-[#0d121f] rounded-[2.5rem] p-10 border ${p.recommended ? 'border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.15)] scale-105 z-10' : 'border-white/5'} flex flex-col transition-all hover:-translate-y-2`}>
                {p.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-600 text-white px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs shadow-lg">
                    Alpha Choice
                  </div>
                )}

                <div className="text-center border-b border-white/5 pb-8 mb-8">
                  <h3 className="text-cyan-500 font-extrabold uppercase tracking-[0.2em] text-sm mb-4">{p.name}</h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-5xl font-black text-white italic tracking-tighter">Rs.{p.price}</span>
                  </div>
                  <span className="text-slate-500 text-xs font-bold uppercase">Per Month</span>
                </div>

                <div className="space-y-6 mb-10 flex-grow">
                  {[p.ram, p.cpu, p.slots, ...p.features].map((f, fi) => (
                    <div key={fi} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                        <Crosshair size={14} />
                      </div>
                      <span className="text-sm font-bold text-slate-300 uppercase">{f}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-5 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${p.recommended ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
                  {p.recommended ? 'Start Alpha Cluster' : 'Deploy Server'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CLUSTER & FEATURES (Existing enhanced) */}
      <section className="py-24 bg-[#0a0f1a] relative border-t border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-black text-white italic tracking-tighter mb-8">CLUSTER <span className="text-cyan-500">READY</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Link servers together instantly. Travel between The Island, Ragnarok, and Genesis with full inventory and dino transfer support.
            </p>
            <ul className="space-y-4">
              {[
                "One-Click Grid Generation",
                "Sync Chat Across Maps",
                "Shared Whitelists & Bans",
                "Automated Cross-Ark Backups"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white font-bold">
                  <div className="w-2 h-2 bg-cyan-500 rotate-45"></div> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full"></div>
            <div className="relative bg-[#05080f] p-8 rounded-[2rem] border border-cyan-500/30 shadow-2xl">
              {/* Abstract Cluster Visual */}
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-[#0a0f1a] p-4 rounded-xl border border-white/5 flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-green-500 animate-pulse' : 'bg-cyan-500'}`}></div>
                    <div className="h-2 w-20 bg-white/10 rounded-full"></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <div className="h-10 w-1 bg-cyan-500/50"></div>
              </div>
              <div className="bg-[#0a0f1a] p-4 rounded-xl border border-white/5 text-center mt-0">
                <span className="text-xs font-bold uppercase text-cyan-500">Cluster Controller</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GlobalNetwork theme="cyan" />
      <DiscordBanner />

    </div>
  );
}
