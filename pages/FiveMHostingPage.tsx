import React, { useState, useEffect } from 'react';
import {
  Shield, Zap, Globe, Cpu, ArrowRight,
  Server, Users, Terminal, HardDrive,
  ChevronDown, Star, Box, Hammer, Download, Activity,
  X, HelpCircle, MessageSquare, Car, Radio, Database,
  Navigation, Lock, Siren, Skull, Briefcase, MapPin,
  Smartphone, CreditCard, DollarSign
} from 'lucide-react';
import GlobalNetwork from '../components/GlobalNetwork';
import TestimonialsSection from '../components/TestimonialsSection';
import DiscordBanner from '../components/DiscordBanner';
import { motion } from 'framer-motion';

interface FiveMHostingPageProps {
  onOrderPlan?: (plan: any) => void;
}

export default function FiveMHostingPage({ onOrderPlan }: FiveMHostingPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(1);
  const [activeDistrict, setActiveDistrict] = useState('downtown');

  const plans = [
    { name: 'Street Thug', ram: '8GB', slots: '32 Slots', price: '1000.00', cpu: 'Ryzen 9 5900X', features: ['TxAdmin Included', 'DDoS Protection', 'Free Subdomain'], icon: Skull },
    { name: 'Boss', ram: '16GB', slots: '128 Slots', price: '2000.00', cpu: 'Ryzen 9 7950X', recommended: true, features: ['Priority Support', 'MySQL Database', 'OneSync Ready', 'Daily Backups'], icon: Briefcase },
    { name: 'Kingpin', ram: '32GB', slots: '2048 Slots', price: '4500.00', cpu: 'Ryzen 9 7950X (OC)', features: ['Dedicated Thread', 'Extreme Performance', 'Unlimited NVMe', 'White Glove Migration'], icon: Star },
  ];

  return (
    <div className="min-h-screen bg-[#05020a] font-sans text-slate-300 overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-400">

      {/* 1. VICE CITY HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.hdqwalls.com/wallpapers/gta-5-4k-pic.jpg')] bg-cover bg-center opacity-30 filter contrast-125 brightness-50 saturate-150 transform scale-105 animate-[pulse_10s_ease-in-out_infinite]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#05020a] via-[#05020a]/60 to-purple-900/10"></div>
          {/* Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-lg bg-pink-900/30 border border-pink-500/30 text-pink-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.2)]">
              <Siren size={12} className="animate-pulse" /> Wanted Level: ★★★★★
            </div>

            <h1 className="text-8xl md:text-[10rem] font-black italic tracking-tighter text-white mb-6 leading-[0.8] drop-shadow-[0_4px_0_rgba(147,51,234,0.5)]">
              <span className="fill-transparent stroke-white stroke-2">YOUR</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 relative">
                EMPIRE
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-slate-300 max-w-xl leading-relaxed font-medium">
              Run the streets with <span className="text-purple-400 font-bold">OneSync Infinity</span> optimized hardware.
              Zero texture loss. Instant asset streaming.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black uppercase tracking-widest text-sm rounded-xl shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] hover:scale-105 transition-all flex items-center gap-3 transform skew-x-[-10deg]"
              >
                <span className="skew-x-[10deg] flex items-center gap-3">Start Heist <ArrowRight size={18} strokeWidth={3} /></span>
              </button>
              <button className="px-12 py-6 bg-[#0f0a1a]/80 border border-pink-500/30 text-pink-500 font-black uppercase tracking-widest text-sm rounded-xl hover:scale-105 transition-all flex items-center gap-3 backdrop-blur-md transform skew-x-[-10deg]">
                <span className="skew-x-[10deg] flex items-center gap-3"><Car size={18} /> Test Drive</span>
              </button>
            </div>
          </div>

          {/* 3D Visual - Urban/Map Theme */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square perspective-1000">
              <div className="absolute inset-0 bg-purple-600/20 blur-[100px] rounded-full animate-pulse"></div>
              <div className="relative z-10 w-full h-full bg-[#0f0a1a] border border-purple-500/30 rounded-3xl p-6 transform rotate-y-12 rotate-x-6 shadow-2xl">
                {/* Mock GPS / Map UI */}
                <div className="h-full w-full bg-[#05020a] rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Map_of_Los_Santos%2C_San_Andreas_%28GTA_V%29.svg/1200px-Map_of_Los_Santos%2C_San_Andreas_%28GTA_V%29.svg.png')] bg-cover bg-center opacity-40"></div>
                  {/* Player Blips */}
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse" style={{ top: `${20 + Math.random() * 60}%`, left: `${20 + Math.random() * 60}%` }}></div>
                  ))}
                  {/* Police Blips */}
                  {[1, 2, 3].map(i => (
                    <div key={i} className="absolute w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_red] animate-ping" style={{ top: `${20 + Math.random() * 60}%`, left: `${20 + Math.random() * 60}%` }}></div>
                  ))}

                  {/* HUD */}
                  <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 flex gap-6">
                    <div>
                      <div className="text-[10px] text-zinc-400 font-black uppercase">Players</div>
                      <div className="text-xl text-white font-black italic">1,024</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-400 font-black uppercase">Ping</div>
                      <div className="text-xl text-green-400 font-black italic">12ms</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR (HUD STYLE) */}
      <div className="border-y border-purple-500/20 bg-[#0a0514] relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-purple-500/20">
          {[
            { l: "Uptime", v: "100%", i: Activity, c: "text-green-500" },
            { l: "Population", v: "High", i: Users, c: "text-purple-500" },
            { l: "OneSync", v: "Infinity", i: Globe, c: "text-pink-500" },
            { l: "DDoS", v: "Shielded", i: Shield, c: "text-blue-500" }
          ].map((s, i) => (
            <div key={i} className="py-8 flex flex-col items-center justify-center group hover:bg-purple-600/10 transition-colors cursor-pointer">
              <div className={`text-4xl font-black italic flex items-center gap-3 mb-2 ${s.c}`}>
                <s.i size={24} /> {s.v}
              </div>
              <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. HEIST SETUP (FEATURES) */}
      <section className="py-32 bg-[#05020a] relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black italic tracking-tighter text-white mb-4">THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">SETUP</span></h2>
            <div className="h-1 w-32 bg-purple-600 mx-auto transform skew-x-[-20deg]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#0a0514] border border-purple-500/20 p-8 rounded-3xl relative overflow-hidden group hover:border-purple-500/50 transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu size={120} />
              </div>
              <div className="w-14 h-14 bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-400 mb-6 border border-purple-500/20">
                <Cpu size={28} />
              </div>
              <h3 className="text-2xl font-black text-white italic uppercase mb-3">Ryzen 9 7950X</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                The muscle. Single-core speeds that chew through unoptimized scripts and high-poly cars.
              </p>
              <div className="flex gap-2">
                <div className="bg-purple-500/10 px-3 py-1 rounded text-xs font-bold text-purple-400 border border-purple-500/20">5.7 GHz</div>
                <div className="bg-purple-500/10 px-3 py-1 rounded text-xs font-bold text-purple-400 border border-purple-500/20">16 Cores</div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0a0514] border border-pink-500/20 p-8 rounded-3xl relative overflow-hidden group hover:border-pink-500/50 transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Database size={120} />
              </div>
              <div className="w-14 h-14 bg-pink-900/20 rounded-2xl flex items-center justify-center text-pink-400 mb-6 border border-pink-500/20">
                <Database size={28} />
              </div>
              <h3 className="text-2xl font-black text-white italic uppercase mb-3">OneSync Infinity</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                The connect. Host 2048+ players with advanced entity state management and distance culling.
              </p>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[90%]"></div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0a0514] border border-cyan-500/20 p-8 rounded-3xl relative overflow-hidden group hover:border-cyan-500/50 transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Shield size={120} />
              </div>
              <div className="w-14 h-14 bg-cyan-900/20 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 border border-cyan-500/20">
                <Shield size={28} />
              </div>
              <h3 className="text-2xl font-black text-white italic uppercase mb-3">L7 DDoS Guard</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                The enforcement. Filters malicious traffic without dropping legitimate player connections.
              </p>
              <div className="flex items-center gap-2 text-cyan-500 text-xs font-bold uppercase">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div> Active Shielding
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TXADMIN INTEGRATION */}
      <section className="py-24 bg-[#080410] border-t border-purple-500/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-orange-500/10 text-orange-400 font-bold uppercase tracking-widest text-xs mb-6 border border-orange-500/20">
              Pre-Installed Software
            </div>
            <h2 className="text-5xl font-black text-white italic tracking-tighter mb-8">TXADMIN <span className="text-orange-500">CONTROL</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Every server comes with TxAdmin ready to go. Manage bans, whitelist players, restart the server, and monitor performance from a beautiful web interface.
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
              {['Discord Integration', 'Live Console', 'Player Manager', 'Scheduled Restarts', 'Performance Monitor', 'Recipe Installer'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-white font-bold text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rotate-45"></div> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/10 blur-[80px] rounded-full"></div>
            <div className="relative bg-[#0f0a1a] rounded-xl border border-white/10 p-2 shadow-2xl skew-y-[-2deg] hover:skew-y-0 transition-transform duration-500">
              <img src="https://raw.githubusercontent.com/tabarra/txAdmin/master/.github/assets/txadmin_dashboard.png" alt="TxAdmin" className="rounded-lg opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a1a] to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <div className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Status</div>
                <div className="text-2xl font-black text-white italic">OPERATIONAL</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING PLANS */}
      <section id="plans" className="py-32 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter">
              CHOOSE YOUR <span className="text-purple-500">HUSTLE</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((p, i) => (
              <div key={i} className={`relative bg-[#0a0514] border ${p.recommended ? 'border-purple-500 shadow-[0_0_60px_rgba(168,85,247,0.15)] scale-105 z-10' : 'border-white/5'} p-10 flex flex-col group transition-transform hover:-translate-y-2 rounded-3xl`}>

                {p.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs shadow-lg">
                    Boss Choice
                  </div>
                )}

                <div className="mb-8 border-b border-white/5 pb-8 text-center">
                  <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 text-purple-500 group-hover:text-pink-500 transition-colors">
                    <p.icon size={32} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">{p.name}</h3>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-5xl font-black text-white italic tracking-tighter">Rs.{p.price}</span>
                    <span className="text-xs text-slate-500 font-bold uppercase">/Mo</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {[p.ram, p.cpu, p.slots, ...p.features].map((f, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 ${p.recommended ? 'bg-purple-500' : 'bg-slate-500'} rounded-full`}></div>
                      <span className="text-sm font-bold text-slate-400 uppercase">{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onOrderPlan?.(p)}
                  className={`w-full py-5 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 rounded-xl transition-all ${p.recommended ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}
                >
                  Start Business <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GLOBAL NETWORK */}
      <GlobalNetwork theme="purple" />

      {/* 7. FAQ */}
      <section className="py-24 bg-[#0a0514] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter text-center mb-16">
            STREET <span className="text-slate-600">KNOWLEDGE</span>
          </h2>

          <div className="space-y-4">
            {[
              { q: "Is a database included?", a: "Yes. Every plan includes a free, high-performance MariaDB database hosted locally for minimal latency." },
              { q: "Can I use custom frameworks?", a: "Absolutely. We support QBCore, ESX, vRP, and standard CFX default servers." },
              { q: "How many players can I hold?", a: "With OneSync Infinity enabled (included), you can support 2048+ players, provided you have the Patreon key." }
            ].map((faq, i) => (
              <div key={i} className="bg-[#05020a] border border-white/5 p-6 rounded-2xl hover:bg-[#0f0a1a] transition-colors cursor-pointer" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
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


