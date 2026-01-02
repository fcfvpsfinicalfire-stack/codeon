
import React, { useState } from 'react';
import { Star, Clock, Zap, Monitor, ShieldCheck, RefreshCcw, ShoppingCart, CheckCircle2, Gamepad2, Layers, Cpu, Database, ChevronDown, ChevronUp, MoveRight, Puzzle, User, Banknote, Sparkles, LayoutList } from 'lucide-react';
import DiscordBanner from '../components/DiscordBanner';
import TestimonialsSection from '../components/TestimonialsSection';

interface ArkHostingPageProps {
  onOrderPlan?: (plan: any) => void;
}

export default function ArkHostingPage({ onOrderPlan }: ArkHostingPageProps) {
  const [billingCycle, setBillingCycle] = useState('Monthly');
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const plans = [
    { 
      id: 'ark', 
      gameType: 'ark',
      name: 'ARK 8GB', 
      players: '12+Players', 
      ram: '8GB+ RAM', 
      price: 'Rs. 2000.00', 
      oldPrice: 'Rs. 3000.00',
      icon: '🦖'
    },
    { 
      id: 'ark', 
      gameType: 'ark',
      name: 'ARK 12GB', 
      players: '25+ Players', 
      ram: '12GB RAM', 
      price: 'Rs. 2800.00', 
      oldPrice: 'Rs. 3800.00',
      icon: '🦖',
      popular: true
    },
    { 
      id: 'ark', 
      gameType: 'ark',
      name: 'ARK 24GB', 
      players: '80+ Players', 
      ram: '24GB RAM', 
      price: 'Rs. 3800.00', 
      oldPrice: 'Rs. 6000.00',
      icon: '🦖'
    }
  ];

  const subFeatures = [
    { label: 'Instant Server Setup', icon: <Clock size={16} /> },
    { label: 'Instant Mod Installer', icon: <Layers size={16} /> },
    { label: 'PC Crossplay', icon: <Monitor size={16} /> },
    { label: '99.9% Uptime', icon: <Database size={16} /> },
    { label: 'DDoS Protection', icon: <ShieldCheck size={16} /> },
    { label: '72hr Self-Serve Refund', icon: <RefreshCcw size={16} /> },
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
      question: "What is an ARK dedicated server?",
      icon: <span className="text-emerald-500 font-bold text-lg">🦖</span>,
      answer: "An ARK dedicated server is a private game server for ARK: Survival Evolved. It lets you and your friends play together in your own world with your own rules. You can customize the game, add mods, and control who joins. It's more stable and has less lag than public servers, giving you a better and smoother gaming experience."
    },
    {
      id: 2,
      question: "How To Join An ARK Server By IP?",
      icon: <Monitor size={14} className="text-blue-400" />,
      answer: "In ARK, press the Tab key to open the console and type: 'open your-ip:port'. Alternatively, you can add it to your favorites in the Steam Server Browser under View > Servers > Favorites."
    },
    {
      id: 3,
      question: "How long does setup take?",
      icon: <Sparkles size={14} className="text-orange-400" />,
      answer: "Our automated system sets up your ARK server instantly after payment is confirmed. You'll receive your login details via email so you can start playing right away."
    },
    {
      id: 4,
      question: "Why should I choose Shockbyte as my server host?",
      icon: <Zap size={14} className="text-orange-500" />,
      answer: "We offer the lowest latency hardware, 24/7 expert support, and a specialized control panel that makes managing mods and settings effortless. Plus, we've been a trusted provider since 2013."
    },
    {
      id: 5,
      question: "Can I change my plan or upgrade my server later?",
      icon: <LayoutList size={14} className="text-blue-500" />,
      answer: "Yes! You can upgrade or downgrade your server plan at any time through our client area. The process is automatic and your files are completely preserved."
    },
    {
      id: 6,
      question: "Can I get my money back if I don't like my server?",
      icon: <Banknote size={14} className="text-green-500" />,
      answer: "We offer a 72-hour money-back guarantee. If you're not satisfied for any reason, we'll refund your payment, no questions asked."
    }
  ];

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden px-4">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://picsum.photos/seed/arkbackground/1920/1080" 
             alt="ARK Prehistoric Background" 
             className="w-full h-full object-cover opacity-10 filter grayscale brightness-50"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left z-20">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-slate-800/80 border border-white/10 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest flex items-center">
                  <Gamepad2 size={12} className="mr-1 text-blue-500" /> AVAILABLE ON STEAM
                </span>
                <span className="bg-slate-800/80 border border-white/10 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest flex items-center">
                  <Database size={12} className="mr-1 text-blue-500" /> AVAILABLE ON EPIC GAMES
                </span>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <div className="flex space-x-0.5">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-5 h-5 bg-green-500 flex items-center justify-center rounded-sm"><Star size={12} fill="white" /></div>)}
                </div>
                <span className="text-xs font-bold text-slate-400">5 out of 5 based on <span className="text-white">10000+ reviews</span> <span className="text-green-500 font-black uppercase tracking-widest text-[10px] ml-1">Trustpilot</span></span>
              </div>

              <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter uppercase italic drop-shadow-lg">
                ARK: SURVIVAL<br />
                <span className="text-blue-500 font-black">EVOLVED HOSTING</span>
              </h1>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-10 max-w-lg font-semibold opacity-90">
                Ready to tame dinosaurs and conquer the prehistoric world? Our <span className="text-white font-bold">ARK: Survival Evolved server hosting</span> is here to elevate your adventure.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-[11px] font-black text-slate-300 uppercase tracking-tight mb-12">
                  {subFeatures.map((f, i) => (
                    <div key={i} className="flex items-center space-x-2 group">
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
                <MoveRight size={18} className="inline ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative flex justify-center lg:justify-end">
               <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-600/20 blur-[130px] rounded-full animate-pulse"></div>
                  
                  {/* Character image */}
                  <div className="relative z-10 animate-float">
                    <img 
                      src="https://i.postimg.cc/nLyw7mcY/image-2026-01-01-122818241.png" 
                      alt="ARK Dinosaur and Character" 
                      className="w-full h-auto drop-shadow-[0_0_80px_rgba(0,0,0,0.6)] scale-110 lg:scale-125 transition-transform duration-700 hover:scale-[1.3]"
                    />
                  </div>

                  {/* Decorative badge */}
                  <div className="absolute -bottom-10 -right-4 bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl rotate-6 animate-pulse hidden md:block">
                     <h2 className="text-3xl font-black tracking-tighter uppercase italic leading-none mb-2 text-white">
                        EVOLVED<br />GAMING
                     </h2>
                     <div className="bg-emerald-600 px-4 py-1.5 rounded-lg font-black text-[9px] inline-block uppercase tracking-widest shadow-xl text-white">
                        INSTANT MOD INSTALLER
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Selector Header */}
      <section id="plans-grid" className="bg-slate-900/40 py-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <h3 className="text-xl font-black uppercase tracking-tighter italic text-white">Choose Your Plan</h3>
              <div className="flex flex-wrap justify-center gap-3 bg-[#111827] p-1.5 rounded-xl border border-white/5">
                 {cycles.map((cycle) => (
                   <button 
                     key={cycle.name}
                     onClick={() => setBillingCycle(cycle.name)}
                     className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all relative ${billingCycle === cycle.name ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
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
        </div>
      </section>

      {/* Holiday Sale Banner */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="bg-blue-600 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden border border-white/10">
           <div className="absolute inset-0 opacity-10 pointer-events-none text-white text-9xl font-black select-none">
             ❄️
           </div>
           <div className="absolute bottom-0 right-0 p-8 opacity-20 rotate-12">
             <Star size={120} fill="white" />
           </div>
           
           <div className="text-left mb-8 md:mb-0 relative z-10">
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">HOLIDAY SALE IS ON!</h3>
              <p className="text-white/80 text-sm max-w-sm font-bold uppercase tracking-tight">End the year the best way with a game server. Holiday discounts will wrap up when the timer hits zero!</p>
           </div>

           <div className="flex space-x-6 md:space-x-10 relative z-10">
              {[{v: '7', l: 'DAYS'}, {v: '7', l: 'HOURS'}, {v: '20', l: 'MINS'}, {v: '40', l: 'SEC'}].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="text-5xl font-black tabular-nums transition-transform group-hover:scale-110">{item.v}</div>
                  <div className="text-[10px] font-black text-white/60 tracking-widest uppercase">{item.l}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {plans.map((plan) => (
             <div key={plan.id + plan.ram} className={`bg-[#111827]/60 border-2 rounded-[2rem] p-10 flex flex-col items-center relative transition-all duration-300 group hover:translate-y-[-8px] ${plan.popular ? 'border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.1)]' : 'border-white/5'}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-6 py-1.5 rounded-bl-2xl shadow-xl z-20">
                    MOST POPULAR
                  </div>
                )}
                
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4 italic">{plan.name}</h4>
                
                <div className="flex flex-col items-center space-y-1 mb-6">
                   <span className="text-white font-black uppercase tracking-tighter text-2xl">{plan.players}</span>
                   <span className="text-white font-black uppercase tracking-tighter text-2xl">{plan.ram}</span>
                </div>

                <div className="bg-blue-600/10 text-blue-500 border border-blue-500/20 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase mb-10 tracking-widest">
                  30% OFF FIRST MONTH
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

        <div className="mt-12 flex flex-col items-center space-y-4">
           <div className="flex space-x-1.5">
             {[1,2,3,4,5].map(i => <div key={i} className="w-6 h-6 bg-green-500 flex items-center justify-center rounded-sm"><Star size={14} fill="white" /></div>)}
           </div>
           <p className="text-sm font-bold text-slate-400">
             5 out of 5 based on <span className="text-white">10000+ reviews</span> <span className="text-green-500 font-black uppercase tracking-widest text-xs italic ml-1">Trustpilot</span>
           </p>
        </div>
      </section>

      {/* Full Mod Support Section */}
      <section className="py-24 bg-[#0b0f19] px-4 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Side */}
            <div className="text-left">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter leading-none italic">
                FULL <span className="text-blue-500">MOD</span> SUPPORT
              </h2>
              <div className="space-y-6 text-slate-400 text-base md:text-lg font-medium leading-relaxed">
                <p>
                  Want to enhance your ARK experience? <span className="text-white font-bold">Our servers support all your favorite mods</span>, making it easy to customize and expand your gameplay.
                </p>
                <p>
                  Add new creatures, tweak game mechanics, or introduce entirely new content with our mod-friendly setup. Plus, we support popular tools like <span className="text-blue-500 font-bold uppercase tracking-tight">ARK Server Manager and Steam Workshop</span>, giving you even more control over your server.
                </p>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative group flex items-center justify-center">
               <div className="relative w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 hover:scale-[1.02] bg-slate-900/50">
                  <img 
                    src="https://i.postimg.cc/280cGMS6/image.png" 
                    alt="ARK Full Mod Support Grid" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent"></div>
               </div>
               
               {/* Atmospheric glow behind the image */}
               <div className="absolute inset-0 bg-blue-600/10 blur-[100px] -z-10 rounded-full scale-125"></div>
            </div>
          </div>
        </div>
      </section>

      {/* TestimonialsSection First */}
      <TestimonialsSection />

      {/* High-Fidelity FAQ Section */}
      <section className="py-24 bg-[#0b0f19] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Header Column */}
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
