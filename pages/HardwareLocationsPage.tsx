
import React, { useState } from 'react';
import { Cpu, ShieldCheck, Globe, Zap, Database, Layers, Monitor, HardDrive, Droplet, Leaf, ChevronRight, ChevronLeft, Search, ChevronDown, ChevronUp, TrendingUp, BarChart3, CheckCircle2, ZapOff, Puzzle, Banknote, Clock, Settings, Server, Network, Activity, MapPin } from 'lucide-react';
import DiscordBanner from '../components/DiscordBanner';
import TestimonialsSection from '../components/TestimonialsSection';

const HardwareLocationsPage: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);
  const [activeRegion, setActiveRegion] = useState('All');

  const regions = [
    {
      id: 'netherlands',
      name: 'Netherlands, Europe',
      continent: 'Europe',
      flag: '🇳🇱',
      ping: '120ms',
      status: 'High Stock',
      specs: [
        { label: 'CPU', value: 'Intel Xeon E-2378G @ 4.80 GHz', icon: <Cpu size={14} /> },
        { label: 'Network', value: '1 Gbps Uplink', icon: <Network size={14} /> },
        { label: 'Storage', value: 'NVMe Gen4 SSD', icon: <HardDrive size={14} /> },
        { label: 'RAM', value: 'DDR4 ECC', icon: <Database size={14} /> },
      ]
    },
    {
      id: 'poland',
      name: 'Poland, Europe',
      continent: 'Europe',
      flag: '🇵🇱',
      ping: '148ms',
      status: 'Available',
      specs: [
        { label: 'CPU', value: 'AMD EPYC 4244P @ 5.10 GHz', icon: <Cpu size={14} /> },
        { label: 'Network', value: '1 Gbps Uplink', icon: <Network size={14} /> },
        { label: 'Storage', value: 'NVMe Gen4 SSD', icon: <HardDrive size={14} /> },
        { label: 'RAM', value: 'DDR5 ECC', icon: <Database size={14} /> },
      ]
    },
    {
      id: 'singapore',
      name: 'Singapore, Asia',
      continent: 'Asia-Pacific',
      flag: '🇸🇬',
      ping: '48ms',
      status: 'Low Stock',
      specs: [
        { label: 'CPU', value: 'AMD Ryzen 9 5950X', icon: <Cpu size={14} /> },
        { label: 'Network', value: '1 Gbps Uplink', icon: <Network size={14} /> },
        { label: 'Storage', value: 'NVMe Gen4 SSD', icon: <HardDrive size={14} /> },
        { label: 'RAM', value: 'DDR4 ECC', icon: <Database size={14} /> },
      ]
    },
    {
      id: 'usa-east',
      name: 'New York, USA',
      continent: 'North America',
      flag: '🇺🇸',
      ping: '180ms',
      status: 'Available',
      specs: [
        { label: 'CPU', value: 'Intel Xeon E-2388G @ 5.1GHz', icon: <Cpu size={14} /> },
        { label: 'Network', value: '10 Gbps Uplink', icon: <Network size={14} /> },
        { label: 'Storage', value: 'NVMe Gen4 SSD', icon: <HardDrive size={14} /> },
        { label: 'RAM', value: 'DDR4 ECC', icon: <Database size={14} /> },
      ]
    }
  ];

  const filteredRegions = activeRegion === 'All' 
    ? regions 
    : regions.filter(r => r.continent === activeRegion);

  const faqs = [
    {
      id: 1,
      question: "Why should I choose CODEON as my server host?",
      icon: <TrendingUp size={14} className="text-blue-400" />,
      answer: "We use exclusively high-end server hardware, not consumer-grade components. Our AMD EPYC and Ryzen processors provide the highest single-thread performance necessary for demanding game servers like Minecraft, Rust, and ARK."
    },
    {
      id: 2,
      question: "Can I change my server location later?",
      icon: <Globe size={14} className="text-orange-400" />,
      answer: "Yes, you can request a location change via support ticket. Our team will handle the file migration free of charge to ensure you get the lowest possible ping for your players."
    },
    {
      id: 3,
      question: "What kind of DDoS protection do you provide?",
      icon: <ShieldCheck size={14} className="text-emerald-400" />,
      answer: "We provide multi-layered enterprise DDoS protection that filters up to 12Tbps of malicious traffic, ensuring your server stays online even during the heaviest attacks."
    }
  ];

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen font-sans selection:bg-blue-500/30">
      
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-40 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-blue-600/10 blur-[150px] rounded-full -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="text-left relative z-10">
              <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
                <Activity size={14} className="text-blue-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">Global Network Status: Operational</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase italic leading-[0.85]">
                ELITE<br />
                <span className="text-blue-500">HARDWARE</span>
              </h1>
              
              <p className="text-slate-400 text-base md:text-xl leading-relaxed mb-12 max-w-lg font-medium">
                We don't compromise on performance. Every CODEON node is equipped with enterprise-grade CPUs and NVMe Gen4 storage to ensure your community enjoys a <span className="text-white font-bold">lag-free experience.</span>
              </p>
              
              <div className="flex flex-wrap gap-6 mb-16">
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-12 rounded-2xl text-xs uppercase tracking-widest shadow-2xl shadow-blue-600/30 transition-all active:scale-95 group">
                  <span>View All Nodes</span>
                  <ChevronRight size={16} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center space-x-4 border-l border-white/10 pl-6">
                   <div className="text-left">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Average Ping</p>
                      <p className="text-xl font-black text-white italic">24ms</p>
                   </div>
                   <div className="text-left">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Uptime</p>
                      <p className="text-xl font-black text-green-500 italic">99.9%</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
               <div className="relative w-full max-w-lg group">
                  {/* Decorative Rack Background */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/20 to-transparent blur-3xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
                  
                  <div className="relative bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-4 shadow-2xl overflow-hidden">
                     <div className="bg-[#0b0f19] rounded-[2rem] p-8">
                        <div className="flex items-center justify-between mb-8">
                           <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                           </div>
                           <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Node: US-EAST-01</span>
                        </div>
                        
                        <div className="space-y-8">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                 <Cpu className="text-blue-500" size={24} />
                                 <div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Processor Load</p>
                                    <p className="text-sm font-bold text-white">AMD EPYC™ 4464P</p>
                                 </div>
                              </div>
                              <span className="text-blue-500 font-black italic">14%</span>
                           </div>
                           
                           <div className="space-y-2">
                              <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase tracking-widest">
                                 <span>Memory Usage</span>
                                 <span>64GB / 128GB</span>
                              </div>
                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                 <div className="h-full bg-blue-600 w-1/2 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                              </div>
                           </div>

                           <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                 <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Disk Speed</p>
                                 <p className="text-xs font-black text-white">7,000 MB/s</p>
                              </div>
                              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                 <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Uplink</p>
                                 <p className="text-xs font-black text-white">10 Gbps</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Spotlight Section */}
      <section className="py-24 bg-[#0d121f] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'DDR5 Memory', icon: <Database />, desc: 'Ultra-fast ECC memory for data integrity.' },
                { label: 'NVMe Gen4', icon: <HardDrive />, desc: 'Near-instant world and mod loading.' },
                { label: '10Gbps Uplink', icon: <Zap />, desc: 'Minimum network congestion at peak times.' },
                { label: 'AMD Zen 4', icon: <Cpu />, desc: 'The highest single-thread performance.' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                   <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-300">
                      {item.icon}
                   </div>
                   <h3 className="text-sm font-black text-white uppercase tracking-tight mb-2 italic">{item.label}</h3>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Hardware Benchmark Section */}
      <section className="py-32 px-4 relative overflow-hidden">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
               <div className="lg:col-span-5 text-left">
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter leading-[0.9] italic">
                     BEYOND<br />
                     <span className="text-blue-500">STANDARDS</span>
                  </h2>
                  <p className="text-slate-400 text-sm md:text-lg leading-relaxed mb-10 font-medium">
                     We benchmark our hardware against the industry average to ensure we are always ahead. CODEON servers consistently deliver <span className="text-white font-bold">40% better performance</span> in single-threaded tasks.
                  </p>
                  
                  <div className="space-y-6">
                     <div className="p-6 bg-[#111827]/40 border border-white/5 rounded-2xl flex items-center space-x-6">
                        <div className="text-blue-500 text-4xl font-black italic tracking-tighter">4.1k</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-tight">
                           SINGLE-THREAD<br />PASSMARK SCORE
                        </div>
                     </div>
                     <div className="p-6 bg-[#111827]/40 border border-white/5 rounded-2xl flex items-center space-x-6">
                        <div className="text-emerald-500 text-4xl font-black italic tracking-tighter">0%</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-tight">
                           THROTTLING<br />DURING PEAK LOAD
                        </div>
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-7">
                  <div className="bg-[#111827]/60 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full"></div>
                     
                     <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-10 flex items-center">
                        <BarChart3 size={14} className="mr-2" />
                        CPU Performance Comparison
                     </h3>

                     <div className="space-y-12">
                        {/* Bench 1 */}
                        <div className="space-y-4">
                           <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white">
                              <span>Single-Core Speed (GHz)</span>
                              <span className="text-blue-500">5.40 GHz</span>
                           </div>
                           <div className="space-y-2">
                              <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative">
                                 <div className="h-full bg-gradient-to-r from-blue-700 to-blue-500 w-[95%] shadow-[0_0_15px_rgba(59,130,246,0.3)]"></div>
                                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase">CODEON Elite Node</span>
                              </div>
                              <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative opacity-50">
                                 <div className="h-full bg-slate-600 w-[60%]"></div>
                                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase">Industry Average</span>
                              </div>
                           </div>
                        </div>

                        {/* Bench 2 */}
                        <div className="space-y-4">
                           <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white">
                              <span>I/O Speed (NVMe Gen4)</span>
                              <span className="text-blue-500">7.5 GB/s</span>
                           </div>
                           <div className="space-y-2">
                              <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative">
                                 <div className="h-full bg-gradient-to-r from-blue-700 to-blue-500 w-[98%] shadow-[0_0_15px_rgba(59,130,246,0.3)]"></div>
                                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase">CODEON Gen4 Storage</span>
                              </div>
                              <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative opacity-50">
                                 <div className="h-full bg-slate-600 w-[45%]"></div>
                                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase">Standard SATA SSD</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="mt-12 flex items-center justify-between text-[9px] font-black text-slate-600 uppercase tracking-widest border-t border-white/5 pt-8">
                        <div className="flex items-center space-x-2">
                           <CheckCircle2 size={12} className="text-green-500" />
                           <span>Verified Independent Benchmarks</span>
                        </div>
                        <span>Updated Weekly</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Global Locations Grid */}
      <section className="py-32 px-4 bg-[#0d121f] border-t border-white/5">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-none italic">
                  GLOBAL NETWORK
               </h2>
               <p className="text-slate-500 text-sm font-medium mb-12">Select a region to view detailed node specifications.</p>
               
               {/* Region Filters */}
               <div className="flex flex-wrap justify-center gap-2 mb-16">
                  {['All', 'North America', 'Europe', 'Asia-Pacific'].map((reg) => (
                    <button 
                      key={reg}
                      onClick={() => setActiveRegion(reg)}
                      className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeRegion === reg ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white/5 text-slate-500 hover:text-white border border-white/5'}`}
                    >
                      {reg}
                    </button>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
               {filteredRegions.map((region) => (
                 <div key={region.id} className="bg-[#111827]/40 border border-white/5 rounded-[2.5rem] p-10 hover:bg-[#1a2333]/60 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/5 blur-3xl rounded-full"></div>
                    
                    <div className="flex items-start justify-between mb-10 relative z-10">
                       <div className="flex items-center space-x-4">
                          <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{region.flag}</span>
                          <div>
                             <h3 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none">{region.name}</h3>
                             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{region.continent}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="flex items-center space-x-2 text-blue-500 mb-1">
                             <Zap size={12} className="fill-blue-500" />
                             <span className="text-[10px] font-black uppercase tracking-widest">{region.ping} Ping</span>
                          </div>
                          <span className="text-[8px] font-black px-2 py-0.5 rounded bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-widest">{region.status}</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-8 gap-x-12 relative z-10">
                       {region.specs.map((spec, i) => (
                         <div key={i} className="space-y-2">
                            <div className="flex items-center space-x-2 text-slate-500">
                               {spec.icon}
                               <span className="text-[9px] font-black uppercase tracking-widest">{spec.label}</span>
                            </div>
                            <p className="text-xs font-bold text-white leading-snug">{spec.value}</p>
                         </div>
                       ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                       <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors flex items-center space-x-2 group/btn">
                          <span>Test Network Speed</span>
                          <Activity size={12} className="group-hover/btn:scale-125 transition-transform" />
                       </button>
                       <button className="bg-white/5 hover:bg-white/10 text-white font-black py-2.5 px-6 rounded-xl text-[10px] uppercase tracking-widest border border-white/5 transition-all">
                          Configure Node
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <TestimonialsSection />

      {/* FAQ Section */}
      <section className="py-32 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Header Column */}
            <div className="lg:col-span-5 text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight italic">
                FREQUENTLY ASKED<br />QUESTIONS
              </h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-10 max-w-md font-medium opacity-80">
                Technical details and location-specific questions answered by our experts.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 px-10 rounded-xl text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-95">
                  View Full FAQ
                </button>
                <button className="bg-[#1a2333] hover:bg-slate-800 text-white font-black py-3.5 px-10 rounded-xl text-xs uppercase tracking-widest border border-white/10 transition-all">
                  Knowledgebase
                </button>
              </div>
            </div>

            {/* Right Accordion Column */}
            <div className="lg:col-span-7 space-y-4">
              {faqs.map((faq) => (
                <div 
                  key={faq.id}
                  className={`bg-[#111827]/40 border border-white/5 rounded-2xl transition-all duration-300 ${openFaqId === faq.id ? 'bg-[#1a2333]/80 border-white/10 shadow-2xl' : ''}`}
                >
                  <button 
                    onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 flex items-center justify-center bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors ${openFaqId === faq.id ? 'bg-slate-700' : ''}`}>
                        {faq.icon}
                      </div>
                      <span className={`font-bold text-sm md:text-base tracking-tight transition-colors ${openFaqId === faq.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {faq.question}
                      </span>
                    </div>
                    <div className="text-slate-500">
                      {openFaqId === faq.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>
                  
                  {openFaqId === faq.id && (
                    <div className="px-6 pb-6 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="pl-12 border-t border-white/5 pt-4">
                        <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DiscordBanner />
    </div>
  );
};

export default HardwareLocationsPage;
