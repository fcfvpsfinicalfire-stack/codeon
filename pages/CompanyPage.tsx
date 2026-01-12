import React, { useRef } from 'react';
import {
   Building2, Globe, Users, ShieldCheck,
   History, Target, Award, MapPin,
   Cpu, Zap, HeartHandshake, Mail, ArrowRight, Check,
   TrendingUp, Server, Search, Code, Rocket
} from 'lucide-react';
import GlobalNetwork from '../components/GlobalNetwork';
import DiscordBanner from '../components/DiscordBanner';
import { motion } from 'framer-motion';

const CompanyPage: React.FC = () => {
   return (
      <div className="bg-[#0b0f19] text-white min-h-screen font-sans overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">

         {/* 1. CINEMATIC HERO */}
         <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
            {/* Background FX */}
            <div className="absolute inset-0 z-0">
               <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
               <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
               {/* Grid Pattern */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>
            </div>

            <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
               <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-top-8 duration-700">
                  <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200">Established 2013 • Global Infrastructure</span>
               </div>

               <h1 className="text-7xl md:text-[8rem] font-black text-white mb-8 tracking-tighter uppercase italic leading-[0.85] animate-in zoom-in-90 duration-700 delay-100 drop-shadow-2xl">
                  ARCHITECTING <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">THE FUTURE.</span>
               </h1>

               <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                  We bridge the gap between <span className="text-white border-b border-blue-500/50">enterprise bare-metal</span> and <span className="text-white border-b border-blue-500/50">consumer accessibility</span>.
                  Powering 150,000+ communities with proprietary low-latency infrastructure.
               </p>
            </div>
         </section>

         {/* 2. STATS STRIP */}
         <div className="border-y border-white/5 bg-black/20 backdrop-blur-sm relative z-20">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
               {[
                  { l: 'Servers Deployed', v: '125,000+', i: Server },
                  { l: 'Global POPs', v: '12 Regions', i: Globe },
                  { l: 'Network Capacity', v: '15 Tbps', i: Zap },
                  { l: 'Uptime Record', v: '99.99%', i: TrendingUp },
               ].map((s, i) => (
                  <div key={i} className="py-12 flex flex-col items-center justify-center group cursor-crosshair hover:bg-white/5 transition-colors">
                     <div className="text-4xl font-black italic text-white mb-2 flex items-center gap-3 group-hover:scale-105 transition-transform">
                        <s.i size={28} className="text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" /> {s.v}
                     </div>
                     <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-blue-400 transition-colors">{s.l}</div>
                  </div>
               ))}
            </div>
         </div>

         {/* 3. TIMELINE OF INNOVATION */}
         <section className="py-32 px-6 relative overflow-hidden">
            <div className="max-w-5xl mx-auto relative z-10">
               <div className="text-center mb-24">
                  <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4">TIMELINE OF <span className="text-blue-500">INNOVATION</span></h2>
                  <p className="text-slate-400">A decade of pushing boundaries.</p>
               </div>

               <div className="relative border-l-2 border-white/10 ml-4 md:ml-1/2 space-y-16">
                  {[
                     { year: "2025", title: "The Foundation", desc: "Started in a garage with 2 racks and a dream to fix game hosting." },
                     { year: "2025", title: "Global Expansion", desc: "Launched first overseas POPs in Frankfurt and Singapore. Latency dropped by 60%." },
                     { year: "2025", title: "The Titan Era", desc: "Introduced the Titan series with Ryzen 3000 chips, revolutionizing IPC performance." },
                     { year: "2025", title: "AI Defense", desc: "Deployed proprietary AI-driven DDoS mitigation 'IronWall' across all nodes." },
                     { year: "2026", title: "Codeon Next", desc: "Achieved 100% renewable energy usage for our primary datacenters." }
                  ].map((item, i) => (
                     <div key={i} className="relative pl-12 md:pl-0">
                        {/* Dot */}
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-[#0b0f19] shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>

                        <div className={`md:flex items-start justify-between gap-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                           <div className="hidden md:block w-1/2"></div> {/* Spacer */}
                           <div className="w-full md:w-1/2 bg-[#111827] border border-white/5 p-8 rounded-2xl hover:border-blue-500/30 transition-colors group">
                              <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-black uppercase tracking-widest rounded mb-4">{item.year}</div>
                              <h3 className="text-2xl font-black text-white italic mb-2 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                              <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 4. VALUES GRID (MISSION) */}
         <section className="py-32 px-6 bg-[#0d121f]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-10">
                  <div>
                     <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-6">
                        PERFORMANCE <br /> <span className="text-blue-500">WITHOUT COMPROMISE.</span>
                     </h2>
                     <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
                  </div>

                  <div className="space-y-6 text-lg text-slate-400 leading-relaxed font-medium">
                     <p>
                        We founded Codeon with a singular vision: to destroy the "budget hosting" stigma. We believe that affordable pricing shouldn't mean second-rate hardware or overcrowded nodes.
                     </p>
                     <p>
                        While others oversell resources to boost margins, we invest in <span className="text-white font-bold">NVMe Gen4 storage</span> and <span className="text-white font-bold">Ryzen 9 processors</span>. We don't just host servers; we engineer the environment they live in.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {['Own Hardware, No Reselling', '24/7 In-House Engineering', 'DDoS Protection Included', 'Instant Provisioning'].map((f, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">
                           <Check className="text-green-400 shrink-0" size={18} />
                           <span className="text-xs font-bold uppercase tracking-wider text-white">{f}</span>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-[100px] animate-pulse"></div>
                  <div className="relative bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 shadow-2xl overflow-hidden group hover:border-blue-500/30 transition-colors">
                     <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-9xl text-white select-none pointer-events-none -mr-10 -mt-10">XP</div>

                     <div className="grid grid-cols-2 gap-6 relative z-10">
                        <div className="bg-[#0b0f19] p-6 rounded-2xl border border-white/5 hover:-translate-y-1 transition-transform">
                           <Cpu className="text-blue-500 mb-4" size={32} />
                           <h4 className="text-white font-bold mb-2">Flagship S1</h4>
                           <p className="text-xs text-slate-500">Custom tracked hardware for max IPC.</p>
                        </div>
                        <div className="bg-[#0b0f19] p-6 rounded-2xl border border-white/5 hover:-translate-y-1 transition-transform mt-8">
                           <ShieldCheck className="text-purple-500 mb-4" size={32} />
                           <h4 className="text-white font-bold mb-2">IronWall™</h4>
                           <p className="text-xs text-slate-500">Proprietary AI firewall filtering 2TB/s.</p>
                        </div>
                        <div className="bg-[#0b0f19] p-6 rounded-2xl border border-white/5 hover:-translate-y-1 transition-transform">
                           <Zap className="text-yellow-500 mb-4" size={32} />
                           <h4 className="text-white font-bold mb-2">Zero-Lag</h4>
                           <p className="text-xs text-slate-500">Optimized routing for UDP packets.</p>
                        </div>
                        <div className="bg-[#0b0f19] p-6 rounded-2xl border border-white/5 hover:-translate-y-1 transition-transform mt-8">
                           <Globe className="text-emerald-500 mb-4" size={32} />
                           <h4 className="text-white font-bold mb-2">Anycast DNS</h4>
                           <p className="text-xs text-slate-500">Ultra-fast global resolution.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 5. GLOBAL NETWORK (Reused Component) */}
         <GlobalNetwork theme="blue" />

         {/* 6. TEAM SECTION (HOLOGRAPHIC STYLE) */}
         <section className="py-32 px-6 bg-[#0b0f19]">
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-20 animate-on-scroll">
                  <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4">THE <span className="text-indigo-500">ARCHITECTS</span></h2>
                  <p className="text-slate-400">The human element behind the hardware.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     { name: 'MrBlaze', role: 'CEO and founder', img: 'https://i.postimg.cc/9Mj8PFFz/cddf93216327fc55faeb63a1a32cb1a3.png', badge: "Visionary" },
                     { name: 'Finicalfire', role: 'CEO and founder', img: 'https://i.postimg.cc/pT4dc749/3f0edc672aa22048893c6b1c2c0380c7.png', badge: "Architect" },
                     { name: 'Sikka', role: 'CEO and founder', img: 'https://i.postimg.cc/pV6Qx6fS/a-f38c4ec3fcdf4d536b6a6016495c754d.gif', badge: "Support" },
                  ].map((member, i) => (
                     <div key={i} className="group relative h-[500px] rounded-[2rem] overflow-hidden cursor-pointer border border-white/5 hover:border-indigo-500/50 transition-all duration-500 shadow-2xl hover:shadow-indigo-500/20">
                        {/* Image */}
                        <img src={member.img} alt={member.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0" />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>

                        {/* Holographic Scanline */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(99,102,241,0.1)_50%,transparent_100%)] h-[200%] w-full animate-[scan_4s_linear_infinite] pointer-events-none opacity-0 group-hover:opacity-100"></div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full">
                           <div className="flex justify-between items-end mb-6">
                              <div className="bg-indigo-600 w-12 h-1 rounded-full group-hover:w-20 transition-all"></div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 border border-indigo-500/30 px-2 py-1 rounded bg-indigo-500/10 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">{member.badge}</span>
                           </div>

                           <h3 className="text-3xl font-black text-white uppercase italic mb-2 leading-none">{member.name}</h3>
                           <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                              {member.role} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 7. CTA */}
         <section className="py-32 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19] to-indigo-900/10"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-6">
               <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase italic">READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">SCALE?</span></h2>
               <p className="text-xl text-slate-400 mb-12">Join 15,000+ communities powered by Codeon.</p>
               <button className="bg-white text-black hover:bg-slate-200 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95 group flex items-center gap-3 mx-auto">
                  <Rocket size={18} className="text-black" /> Deploy Infrastructure
               </button>
            </div>
         </section>

         <DiscordBanner />
      </div>
   );
};

export default CompanyPage;
