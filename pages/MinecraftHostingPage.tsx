
import React, { useState } from 'react';
import { Star, Zap, Shield, Clock, RefreshCcw, ShoppingCart, ArrowRight, Cpu, ShieldCheck, ChevronUp, ChevronDown, Monitor, Puzzle, Settings, Banknote, HardDrive, Database, ChevronRight, Users, CheckCircle2 } from 'lucide-react';
import MinecraftControlPanelSection from '../components/MinecraftControlPanelSection';
import TestimonialsSection from '../components/TestimonialsSection';
import DiscordBanner from '../components/DiscordBanner';

interface MinecraftHostingPageProps {
  onOrderPlan?: (plan: any) => void;
}

export default function MinecraftHostingPage({ onOrderPlan }: MinecraftHostingPageProps) {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const plans = [
    { ram: '1GB', cpu: '1 Core', ssd: '10GB NVMe SSD', price: '300.00' },
    { ram: '2GB', cpu: '1.5 Core', ssd: '10GB NVMe SSD', price: '360.00' },
    { ram: '4GB', cpu: '1.5 Core', ssd: '20GB NVMe SSD', price: '400.00' },
    { ram: '6GB', cpu: '1.5 Cores', ssd: '20GB NVMe SSD', price: '600.00' },
    { ram: '8GB', cpu: '2 Cores', ssd: '30GB NVMe SSD', price: '800.00' },
    { ram: '10GB', cpu: '2 Cores', ssd: '30GB NVMe SSD', price: '1400.00' },
    { ram: '12GB', cpu: '2 Cores', ssd: '30GB NVMe SSD', price: '2000.00' },
    { ram: '16GB', cpu: '4 Cores', ssd: '40GB NVMe SSD', price: '2800.00' },
    { ram: '20GB', cpu: '4 Cores', ssd: '40GB NVMe SSD', price: '4000.00' },
    { ram: '24GB', cpu: '6 Cores', ssd: '40GB NVMe SSD', price: '5800.00' },
    { ram: '32GB', cpu: '8 Cores', ssd: '40GB NVMe SSD', price: '8000.00' },
    { ram: '64GB', cpu: '10 Cores', ssd: '50GB NVMe SSD', price: '18000.00' },
  ];

  const faqs = [
    {
      id: 1,
      question: "This is my first Minecraft server hosting experience, can you help me if I get stuck?",
      icon: <Zap size={14} className="text-orange-400" />,
      answer: "Our support team is available around the clock to assist you with whatever you may be struggling with on your Minecraft Server, whether it's installing a new mod that just won't work or if your server is crashing. You can rest easy knowing that no matter the time or day, we'll be here to help!"
    },
    {
      id: 2,
      question: "Can I change my plan or upgrade my server later?",
      icon: <Monitor size={14} className="text-blue-400" />,
      answer: "Yes, you can upgrade or downgrade your server plan at any time through our client area. The process is fully automated and your files will be preserved during the transition."
    },
    {
      id: 3,
      question: "How do I create a Minecraft Server?",
      icon: <Puzzle size={14} className="text-purple-400" />,
      answer: "Creating a server is instant. After purchase, you'll receive an email with your panel credentials. Simply log in, and your server will already be waiting for you to hit 'Start'!"
    },
    {
      id: 4,
      question: "Do you support mods and plugins?",
      icon: <Settings size={14} className="text-green-400" />,
      answer: "Absolutely! We support all versions of Forge, Fabric, Quilt, Spigot, Paper, and BungeeCord. Our one-click installer makes it easier than ever."
    },
    {
      id: 5,
      question: "How long does setup take?",
      icon: <Clock size={14} className="text-yellow-400" />,
      answer: "Your server is set up automatically as soon as your payment is processed. You can be in-game in less than 60 seconds!"
    },
    {
      id: 6,
      question: "Can I get my money back if I don't like my server?",
      icon: <Banknote size={14} className="text-emerald-500" />,
      answer: "We offer a 72-hour money-back guarantee for all new server orders. If you're not satisfied, we'll process your refund no questions asked."
    }
  ];

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen">
      {/* Top Rating Bar */}
      <div className="bg-slate-900/50 py-3 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center space-x-4">
          <div className="flex items-center space-x-2">
             <Users size={16} className="text-blue-500" />
             <p className="text-xs font-black text-slate-300 uppercase tracking-widest">
               JOIN <span className="text-white">2,000+ DISCORD MEMBERS</span> 
               <span className="text-green-500 ml-2 animate-pulse">● ONLINE</span>
             </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <h1 className="text-5xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase italic">
              MINECRAFT<br />
              <span className="text-blue-500">SERVER HOSTING</span>
            </h1>
            <p className="text-slate-400 text-base lg:text-lg mb-10 max-w-xl leading-relaxed font-semibold">
              Easily host your very own Minecraft server with <span className="text-white">CODEON HOSTHING</span>. Enjoy reliable, fully customizable and quick to set up servers, perfect for playing with friends or starting a community!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 text-xs font-black text-slate-200 mb-12 uppercase tracking-widest">
              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                  <RefreshCcw size={18} className="text-blue-500" />
                </div>
                <span>Refund Policy</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                  <Zap size={18} className="text-blue-500" />
                </div>
                <span>Instant Setup</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                  <Clock size={18} className="text-blue-500" />
                </div>
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                  <Shield size={18} className="text-blue-500" />
                </div>
                <span>DDoS Protected</span>
              </div>
            </div>

            <button 
              onClick={() => document.getElementById('plans-grid')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-12 rounded-xl shadow-[0_0_50px_rgba(37,99,235,0.3)] transition-all uppercase tracking-[0.2em] text-sm active:scale-95 group"
            >
              View Pricing Plans
              <ArrowRight size={18} className="inline ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative lg:h-[600px] flex items-center justify-center">
             <div className="absolute inset-0 bg-blue-600/15 blur-[120px] rounded-full"></div>
             <div className="relative z-10 w-full max-w-lg animate-float">
                <img 
                  src="https://i.postimg.cc/NMJhXMS7/image.png" 
                  alt="Minecraft Character" 
                  className="w-full h-auto drop-shadow-[0_0_80px_rgba(0,0,0,0.6)]"
                />
                <div className="absolute top-1/4 -right-10 bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl rotate-12 animate-pulse">
                   <h2 className="text-3xl font-black tracking-tighter uppercase italic leading-none mb-2 text-white">
                      HAPPY<br />HOLIDAYS!
                   </h2>
                   <div className="bg-red-600 px-4 py-1.5 rounded-lg font-black text-[9px] inline-block uppercase tracking-widest shadow-xl text-white">
                      50% OFF FIRST MONTH
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Main Pricing Grid */}
      <section id="plans-grid" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <div key={i} className="bg-[#111827]/40 border border-white/5 rounded-2xl p-6 flex flex-col group hover:bg-[#1a2333]/80 hover:border-green-500/20 transition-all duration-300 shadow-xl">
                 <div className="flex items-center space-x-2 mb-6">
                   <span className="text-lg">🇸🇬</span>
                   <h3 className="text-sm font-black text-white uppercase tracking-tight">Minecraft {plan.ram}</h3>
                 </div>
                 
                 <div className="space-y-4 mb-10">
                    <div className="flex items-center space-x-3 text-slate-400 group-hover:text-slate-300">
                      <Database size={16} className="text-green-500/70" />
                      <span className="text-[11px] font-bold uppercase tracking-wide">{plan.ram} RAM</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-400 group-hover:text-slate-300">
                      <Cpu size={16} className="text-green-500/70" />
                      <span className="text-[11px] font-bold uppercase tracking-wide">{plan.cpu}</span>
                    </div>
                    <div className="h-0.5 w-full bg-white/5"></div>
                    <div className="flex items-center space-x-3 text-slate-400 group-hover:text-slate-300">
                      <HardDrive size={16} className="text-green-500/70" />
                      <span className="text-[11px] font-bold uppercase tracking-wide">{plan.ssd}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-400 group-hover:text-slate-300">
                      <Shield size={16} className="text-green-500/70" />
                      <span className="text-[11px] font-bold uppercase tracking-wide">DDoS Protection</span>
                    </div>
                 </div>

                 <div className="mt-auto">
                    <div className="flex items-baseline space-x-1 mb-6">
                      <span className="text-2xl font-black text-green-500 tracking-tighter">Rs. {plan.price}</span>
                      <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">/mo</span>
                    </div>

                    <button 
                      onClick={() => onOrderPlan?.(plan)}
                      className="w-full bg-green-600/10 hover:bg-green-600 text-green-500 hover:text-white font-black py-3 rounded-lg flex items-center justify-center space-x-2 uppercase tracking-widest text-[10px] transition-all border border-green-600/20 active:scale-95"
                    >
                      <span>Order Now</span>
                      <ChevronRight size={14} />
                    </button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Need Something Cheaper? Budget Plans CTA Section */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
           <div className="bg-gradient-to-r from-[#14261f] to-[#0b0f19] border border-white/10 rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-12 group">
              {/* Background atmospheric details */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-600/5 blur-[120px] -z-10 rounded-full"></div>
              
              <div className="flex-grow text-left relative z-10">
                 <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic leading-none">
                    NEED SOMETHING <br />
                    <span className="text-emerald-500">CHEAPER?</span>
                 </h2>
                 <p className="text-slate-300 text-sm md:text-lg font-medium leading-relaxed mb-10 max-w-lg">
                    Check out our <span className="text-white font-bold italic">budget Minecraft server hosting plans</span> — great performance, smaller price tag.
                 </p>
                 <button 
                   onClick={() => window.location.href = '#'} 
                   className="bg-[#10b981] hover:bg-[#059669] text-white font-black py-4 px-10 rounded-xl text-xs uppercase tracking-widest shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all active:scale-95 flex items-center space-x-3 group"
                 >
                    <span>Explore Budget Plans</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>

              <div className="flex-shrink-0 relative">
                 <div className="relative w-full max-w-xs md:max-w-md animate-float">
                    <img 
                      src="https://i.postimg.cc/NMJhXMS7/image.png" 
                      alt="Budget Illustration" 
                      className="w-full h-auto drop-shadow-[0_0_80px_rgba(0,0,0,0.5)] scale-110 grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute -bottom-4 -left-10 bg-emerald-600/80 backdrop-blur-xl border border-emerald-500/20 px-6 py-3 rounded-2xl rotate-[-15deg] shadow-2xl">
                       <p className="text-[10px] font-black uppercase text-white tracking-widest">STARTING AT ONLY</p>
                       <p className="text-2xl font-black italic tracking-tighter text-white">Rs. 199.00</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
      
      <MinecraftControlPanelSection />
      
      {/* Hardware Comparison Section */}
      <section className="py-24 px-4 bg-[#0b0f19]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Text & Features */}
            <div className="text-left">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic leading-none">
                HARDWARE COMPARISON
              </h2>
              <p className="text-slate-400 text-sm md:text-lg leading-relaxed mb-10 max-w-lg font-medium">
                CODEON's hardware goes above and beyond. Faster, stronger, better performance for every server.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 text-blue-500 bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                    <Cpu size={18} />
                  </div>
                  <p className="text-white text-sm md:text-base font-bold leading-snug">
                    Up to AMD EPYC 4464P @ Max 5.40 GHz, optimised for high single-thread performance.
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="mt-1 text-blue-500 bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                    <HardDrive size={18} />
                  </div>
                  <p className="text-white text-sm md:text-base font-bold leading-snug">
                    NVMe SSD, 6x faster than SATA SSD
                  </p>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1 text-blue-500 bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                    <ShieldCheck size={18} />
                  </div>
                  <p className="text-white text-sm md:text-base font-bold leading-snug">
                    DDoS Protection, always on and always free
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Benchmark Chart Card */}
            <div className="relative">
              <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden">
                <h3 className="text-sm font-black text-white mb-4 uppercase tracking-tighter">
                   CPU Benchmark Performance <span className="text-slate-500 font-bold ml-2 text-[10px] uppercase tracking-widest">(Higher is better)</span>
                </h3>
                
                {/* Legend */}
                <div className="flex items-center space-x-6 mb-10">
                   <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CODEON CPU'S</span>
                   </div>
                   <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#334155] rounded-full"></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry average CPU'S</span>
                   </div>
                </div>

                {/* Bars Grid */}
                <div className="space-y-12">
                   {/* Single-thread score */}
                   <div className="flex items-center">
                      <span className="w-32 flex-shrink-0 text-[10px] font-black text-slate-400 uppercase tracking-widest">Single-thread score</span>
                      <div className="flex-grow space-y-2">
                         <div className="h-8 bg-blue-600 rounded-r-full relative flex items-center pr-4 shadow-[0_0_20px_rgba(37,99,235,0.3)]" style={{width: '90%'}}>
                            <Zap size={14} className="text-white fill-white ml-2" />
                            <span className="ml-auto text-xs font-black text-white">4183</span>
                         </div>
                         <div className="h-6 bg-slate-700/50 rounded-r-full relative flex items-center pr-4" style={{width: '65%'}}>
                            <span className="ml-auto text-[10px] font-black text-slate-300">3275</span>
                         </div>
                      </div>
                   </div>

                   {/* Multi-thread score */}
                   <div className="flex items-center">
                      <span className="w-32 flex-shrink-0 text-[10px] font-black text-slate-400 uppercase tracking-widest">Multi-thread score</span>
                      <div className="flex-grow space-y-2">
                         <div className="h-8 bg-blue-500 rounded-r-full relative flex items-center pr-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]" style={{width: '100%'}}>
                            <Zap size={14} className="text-white fill-white ml-2" />
                            <span className="ml-auto text-xs font-black text-white">47337</span>
                         </div>
                         <div className="h-6 bg-slate-700/50 rounded-r-full relative flex items-center pr-4" style={{width: '58%'}}>
                            <span className="ml-auto text-[10px] font-black text-slate-300">27793</span>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Scale Axis */}
                <div className="mt-8 flex justify-between px-32 text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] border-t border-white/5 pt-4">
                   <span>0</span>
                   <span>2000</span>
                   <span>5000</span>
                   <span>15000</span>
                   <span>30000</span>
                   <span>45000</span>
                </div>
              </div>
              
              {/* Decoration */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 blur-3xl -z-10 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* FAQ Section */}
      <section className="py-24 bg-[#0b0f19] px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-5 text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight italic">
                FREQUENTLY ASKED<br />QUESTIONS
              </h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-10 max-w-md font-medium opacity-80">
                Here are some of our new customers' frequently asked questions. If you still need help, you can check out our Knowledgebase articles or contact support.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 px-10 rounded-xl text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-95">
                  View FAQ
                </button>
                <button className="bg-[#1a2333] hover:bg-slate-800 text-white font-black py-3.5 px-10 rounded-xl text-xs uppercase tracking-widest border border-white/10 transition-all">
                  View Knowledgebase
                </button>
              </div>
            </div>

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

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
