
import React, { useState } from 'react';
import { Star, Clock, Zap, ShieldCheck, RefreshCcw, ShoppingCart, Monitor, Settings, CheckCircle2, Play, ChevronDown, ChevronUp, Puzzle, User, Banknote, LayoutList } from 'lucide-react';
import TestimonialsSection from '../components/TestimonialsSection';
import DiscordBanner from '../components/DiscordBanner';

interface FiveMHostingPageProps {
  onOrderPlan?: (plan: any) => void;
}

export default function FiveMHostingPage({ onOrderPlan }: FiveMHostingPageProps) {
  const [billingCycle, setBillingCycle] = useState('Monthly');
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const plans = [
    { 
      id: 'FIVEM', 
      gameType: 'fivem',
      name: 'FIVEM 8GB', 
      players: '18 Players', 
      ram: '8GB RAM',
      price: 'Rs. 3200.00', 
      oldPrice: 'Rs. 4000.00', 
      icon: '🅰️' 
    },
    { 
      id: 'FIVEM', 
      gameType: 'fivem',
      name: 'FIVEM 12GB', 
      players: '24 Players', 
      ram: '12GB RAM',
      price: 'Rs. 5800.00', 
      oldPrice: 'Rs. 8000.00', 
      icon: '🅰️' 
    },
    { 
      id: 'FIVEM', 
      gameType: 'fivem',
      name: 'FIVEM 24GB', 
      players: '80+ Players', 
      ram: '24GB RAM',
      price: 'Rs. 15000.00', 
      oldPrice: 'Rs. 24000.00', 
      icon: '🅰️',
      popular: true,
      badge: 'BEST VALUE'
    },
  ];

  const features = [
    { label: 'txAdmin Integration', icon: <Settings size={14} className="text-blue-400" /> },
    { label: '99.9% Uptime', icon: <CheckCircle2 size={14} className="text-blue-500" /> },
    { label: 'DDoS Protection', icon: <ShieldCheck size={14} className="text-blue-500" /> },
    { label: 'Easy Configuration', icon: <Settings size={14} className="text-blue-400" /> },
    { label: 'Low Latency, No Lag', icon: <Zap size={14} className="text-blue-500" /> },
    { label: '72hr Self-Serve Refund', icon: <RefreshCcw size={14} className="text-blue-500" /> },
  ];

  const cycles = [
    { name: 'Monthly', discount: null },
    { name: 'Quarterly', discount: '-10% OFF' },
    { name: 'Semi-Annually', discount: '-20% OFF' },
    { name: 'Annually', discount: '-25% OFF' },
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I host a FiveM server?",
      icon: <span className="text-lg">🤔</span>,
      answer: "Hosting a FiveM server is simple with ShockHost. Just select your preferred plan, complete the checkout, and your server will be deployed instantly. You will receive an automated email with your credentials to access the Shockbyte Control Panel where you can manage your server, players, and mods."
    },
    {
      id: 2,
      question: "Do you support mods and plugins?",
      icon: <Puzzle size={14} className="text-emerald-500" />,
      answer: "Yes, we provide full support for custom mods, scripts (ESX, vRP, QBCore), and assets. Our specialized control panel allows you to easily upload and manage your server resources."
    },
    {
      id: 3,
      question: "This is my first game server, can you help me if I get stuck?",
      icon: <User size={14} className="text-blue-400" />,
      answer: "Absolutely! We have 24/7 technical support experts ready to assist you. We also provide a massive library of tutorials and documentation to help you navigate every aspect of server management."
    },
    {
      id: 4,
      question: "Why should I choose Shockbyte as my server host?",
      icon: <Zap size={14} className="text-orange-500" />,
      answer: "Shockbyte offers industry-leading hardware, guaranteed 99.9% uptime, and a custom-built control panel specifically optimized for FiveM. Our global network ensures the lowest latency possible."
    },
    {
      id: 5,
      question: "Can I get my money back if I don't like my server?",
      icon: <Banknote size={14} className="text-green-500" />,
      answer: "We offer a 72-hour money-back guarantee. If you're not completely satisfied with our service, you can request a full refund within the first 3 days of your order."
    },
    {
      id: 6,
      question: "Do you host RedM servers?",
      icon: <span className="text-lg">🐎</span>,
      answer: "Yes! We also offer high-performance hosting for RedM (Red Dead Redemption 2). You can find RedM plans in our game selection menu."
    }
  ];

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen font-sans">
      {/* Top Rating Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-0.5">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-5 h-5 bg-green-500 flex items-center justify-center rounded-sm"><Star size={12} fill="white" /></div>)}
          </div>
          <span className="text-[11px] font-bold text-slate-400">
            5 out of 5 based on <span className="text-white">10000+ reviews</span> 
            <span className="text-green-500 font-black uppercase tracking-widest text-[10px] ml-2 italic flex-inline items-center">
              <Star size={12} fill="currentColor" className="inline mr-1" /> Trustpilot
            </span>
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left z-20">
              <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter uppercase italic drop-shadow-lg">
                FIVEM SERVER<br />
                <span className="text-blue-500">HOSTING</span>
              </h1>
              <p className="text-slate-400 text-sm md:text-lg leading-relaxed mb-10 max-w-lg font-semibold opacity-90">
                Effortlessly host your own <span className="text-white">FiveM server</span> with ShockHost. Enjoy instant setup, full customization, reliable performance, and seamless gameplay.
              </p>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[11px] font-black text-slate-300 uppercase tracking-tight mb-12">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center space-x-2 group cursor-default">
                    <span className="text-blue-500 group-hover:scale-110 transition-transform">{f.icon}</span>
                    <span className="group-hover:text-blue-400 transition-colors">{f.label}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => document.getElementById('plans-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-12 rounded-xl shadow-[0_0_50px_rgba(37,99,235,0.3)] transition-all uppercase tracking-[0.2em] text-sm active:scale-95 group"
              >
                View Pricing Plans
                <Play size={18} className="inline ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative flex justify-center lg:justify-end py-12 lg:py-0">
               <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-600/15 blur-[130px] rounded-full animate-pulse"></div>
                  
                  {/* NEW REQUESTED RENDER IMAGE */}
                  <div className="relative z-10 animate-float">
                    <img 
                      src="https://i.postimg.cc/6pDDVgMG/image.png" 
                      alt="FiveM Character Render" 
                      className="w-full h-auto drop-shadow-[0_0_100px_rgba(0,0,0,0.7)] scale-110 lg:scale-125 transition-transform duration-700 hover:scale-[1.3]"
                    />
                  </div>

                  {/* Decorative badge */}
                  <div className="absolute -bottom-10 -left-4 bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl -rotate-6 animate-pulse hidden md:block">
                     <h2 className="text-3xl font-black tracking-tighter uppercase italic leading-none mb-2 text-white">
                        ULTIMATE<br />ROLEPLAY
                     </h2>
                     <div className="bg-blue-600 px-4 py-1.5 rounded-lg font-black text-[9px] inline-block uppercase tracking-widest shadow-xl text-white">
                        TXADMIN INTEGRATED
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Plan Section */}
      <section id="plans-grid" className="max-w-7xl mx-auto px-4 pb-20 pt-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <h3 className="text-xl font-black uppercase tracking-tighter italic text-white">Choose Your Plan</h3>
          <div className="flex flex-wrap justify-center gap-2 bg-[#111827] p-1.5 rounded-xl border border-white/5">
            {cycles.map((cycle) => (
              <button 
                key={cycle.name}
                onClick={() => setBillingCycle(cycle.name)}
                className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all relative ${billingCycle === cycle.name ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {cycle.name}
                {cycle.discount && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[8px] px-1.5 py-0.5 rounded font-black whitespace-nowrap shadow-md border border-white/10">
                    {cycle.discount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-600 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden border border-white/10 mb-16">
           <div className="absolute inset-0 opacity-10 pointer-events-none text-white text-9xl font-black select-none">❄️</div>
           <div className="text-left mb-8 md:mb-0 relative z-10">
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">HOLIDAY SALE IS ON!</h3>
              <p className="text-white/80 text-sm max-w-sm font-bold uppercase tracking-tight">End the year the best way with a game server. Holiday discounts will wrap up when the timer hits zero!</p>
           </div>
           <div className="flex space-x-6 md:space-x-10 relative z-10">
              {[{v: '7', l: 'DAYS'}, {v: '6', l: 'HOURS'}, {v: '6', l: 'MINS'}, {v: '13', l: 'SEC'}].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="text-5xl font-black tabular-nums transition-transform group-hover:scale-110">{item.v}</div>
                  <div className="text-[10px] font-black text-white/60 tracking-widest uppercase">{item.l}</div>
                </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {plans.map((plan) => (
             <div key={plan.id + plan.ram} className={`bg-[#111827]/60 border-2 rounded-[2rem] p-10 flex flex-col items-center relative transition-all duration-300 group hover:translate-y-[-8px] ${plan.popular ? 'border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.1)]' : 'border-white/5'}`}>
                {plan.badge && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-6 py-1.5 rounded-bl-2xl shadow-xl z-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    {plan.badge}
                  </div>
                )}
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-white font-black text-xl italic">{plan.icon}</span>
                </div>
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4 italic">{plan.name}</h4>
                <div className="flex flex-col items-center space-y-1 mb-6">
                   <span className="text-white font-black uppercase tracking-tighter text-3xl">{plan.players}</span>
                   <span className="text-white font-black uppercase tracking-tighter text-xl mt-1">{plan.ram}</span>
                </div>
                <div className="bg-blue-600/10 text-blue-500 border border-blue-500/20 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase mb-10 tracking-widest">
                  25% OFF FIRST MONTH
                </div>
                <div className="flex items-baseline space-x-2 mb-10">
                   <span className="text-slate-600 line-through text-base font-bold italic">{plan.oldPrice}</span>
                   <span className="text-5xl font-black text-white">{plan.price}</span>
                   <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">/monthly</span>
                </div>
                <button 
                  onClick={() => onOrderPlan?.(plan)}
                  className={`w-full py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center transition-all ${plan.popular ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30' : 'bg-slate-800/80 hover:bg-slate-700 text-white border border-white/10'}`}
                >
                   <ShoppingCart size={18} className="mr-2" />
                   Order Now
                </button>
             </div>
           ))}
        </div>

        <div className="mt-20 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-0.5">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-6 h-6 bg-green-500 flex items-center justify-center rounded-sm"><Star size={14} fill="white" /></div>)}
            </div>
            <span className="text-sm font-bold text-slate-400">
              5 out of 5 based on <span className="text-white">10000+ reviews</span> 
              <span className="text-green-500 font-black uppercase tracking-widest text-xs italic ml-2 flex-inline items-center">
                <Star size={14} fill="currentColor" className="inline mr-1" /> Trustpilot
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* PLAY FIVEM WITH FRIENDS Section */}
      <section className="py-24 bg-[#0b0f19] px-4 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter leading-none italic">
                PLAY FIVEM WITH<br />FRIENDS
              </h2>
              <div className="space-y-6 text-slate-400 text-sm md:text-base font-medium leading-relaxed">
                <p>
                  <span className="text-white font-bold">Dive into the world of FiveM:</span> Customize your gameplay with mods, build your dream roleplay scenarios, and craft unforgettable experiences in Los Santos.
                </p>
                <p>
                  With <span className="text-white font-bold">FiveM server hosting</span>, you can focus on enjoying the game instead of managing complicated setups. ShockHost gives you <span className="text-white font-bold">full access to server settings</span>, complete customization options, and reliable performance to ensure smooth gameplay every time.
                </p>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="aspect-video bg-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative">
                <img 
                  src="https://picsum.photos/seed/gtavtrailer/1280/720" 
                  alt="FiveM Trailer Thumbnail" 
                  className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110">
                      <Play fill="white" className="text-white ml-1" size={32} />
                   </div>
                   <span className="mt-4 text-white font-black uppercase tracking-widest text-lg drop-shadow-lg">TRAILER</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS FIVEM SERVER HOSTING? Section */}
      <section className="py-24 bg-[#0b0f19] px-4 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50 transition-all duration-700 hover:scale-[1.02]">
                <img 
                  src="https://i.postimg.cc/8k9BCGsS/image.png" 
                  alt="What is FiveM Hosting" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent"></div>
              </div>
              {/* Atmospheric glow behind the image */}
              <div className="absolute inset-0 bg-blue-600/10 blur-[100px] -z-10 rounded-full scale-110 group-hover:bg-blue-600/15 transition-colors"></div>
            </div>

            <div className="order-1 lg:order-2 text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter leading-none italic">
                WHAT IS FIVEM SERVER<br />HOSTING?
              </h2>
              <div className="space-y-6 text-slate-400 text-sm md:text-base font-medium leading-relaxed">
                <p>
                  <span className="text-white font-bold">FiveM server hosting</span> allows you to create a <span className="text-blue-400 font-bold">custom GTAV multiplayer experience</span> that's completely different from regular GTA Online.
                </p>
                <p>
                  FiveM gives you full control to modify the game with <span className="text-white font-bold">custom scripts, maps, and mods</span> — enabling unique game modes like roleplay, racing, or even entirely new scenarios.
                </p>
                <p>
                  With FiveM server hosting, you decide who joins, how the game is played, and what content is included. Your server is <span className="text-blue-400 font-bold">always online, ensuring smooth, lag-free gameplay</span> for you and your friends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#0b0f19] px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Header */}
            <div className="lg:col-span-5">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight italic">
                FREQUENTLY ASKED<br />QUESTIONS
              </h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-10 max-w-md font-medium">
                Here are some answers to frequently asked questions. If you still need help, you can check out our knowledgebase articles or contact support.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-95">
                  View FAQ
                </button>
                <button className="bg-slate-800/80 hover:bg-slate-700 text-white font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-widest border border-white/10 transition-all">
                  View Knowledgebase
                </button>
              </div>
            </div>

            {/* Accordion Right */}
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
                      <div className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
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
                        <p className="text-slate-400 text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
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

      <TestimonialsSection />
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
