
import React, { useState } from 'react';
import { Star, Zap, Shield, Clock, RefreshCcw, ShoppingCart, ArrowRight, CheckCircle2, Cloud, Globe, Headphones, Gamepad2, Database, ShieldCheck, ZapOff, HardDrive, Settings, Hammer, Flame, Trees, ChevronDown, ChevronUp, Puzzle, User, Banknote, Home, MoveRight, Users, ChevronRight } from 'lucide-react';
import DiscordBanner from '../components/DiscordBanner';
import TestimonialsSection from '../components/TestimonialsSection';

interface RustHostingPageProps {
  onOrderPlan?: (plan: any) => void;
}

export default function RustHostingPage({ onOrderPlan }: RustHostingPageProps) {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const plans = [
    { 
      id: 'RUST', 
      gameType: 'rust',
      name: 'RUST 8GB', 
      players: '20 Players', 
      ram: '8GB RAM', 
      oldPrice: 'Rs. 3600.00', 
      price: 'Rs. 2000.00', 
      icon: <Hammer size={24} className="text-slate-400" />,
      buttonText: 'Customize Plan'
    },
    { 
      id: 'RUST', 
      gameType: 'rust',
      name: 'RUST 12GB', 
      players: '32 Players', 
      ram: '12GB RAM', 
      oldPrice: 'Rs. 4000.00', 
      price: 'Rs. 2800.00', 
      icon: <Flame size={24} className="text-orange-500" />,
      popular: true,
      buttonText: 'Order Now'
    },
    { 
      id: 'RUST', 
      gameType: 'rust',
      name: 'RUST 16GB', 
      players: '40 Players', 
      ram: '16GB RAM', 
      oldPrice: 'Rs. 4800.00', 
      price: 'Rs. 3000.00', 
      icon: <Trees size={24} className="text-yellow-700" />,
      buttonText: 'Order Now'
    },
  ];

  const subFeatures = [
    { label: 'Instant Server Setup', icon: <Clock size={16} /> },
    { label: 'Auto-Wipe Support', icon: <RefreshCcw size={16} /> },
    { label: 'Auto-Install Oxide', icon: <Database size={16} /> },
    { label: 'Rust+ Support', icon: <Zap size={16} /> },
    { label: 'Custom Maps', icon: <Globe size={16} /> },
    { label: 'DDoS Protection', icon: <ShieldCheck size={16} /> },
  ];

  const faqs = [
    {
      id: 1,
      question: "How can I make a Rust server?",
      icon: <span className="text-yellow-500 font-bold text-lg">☢</span>,
      answer: "Creating a Rust server is easy with CODEON HOSTHING. Simply select a plan, complete the checkout, and your server will be set up instantly. You can then manage it through our custom control panel."
    },
    {
      id: 2,
      question: "How to join a Rust server with an IP",
      icon: <MoveRight size={16} className="text-white" />,
      answer: "In Rust, press F1 to open the console and type: 'client.connect your-ip:port'. Alternatively, you can add it to your favorites in the Steam Server Browser."
    },
    {
      id: 3,
      question: "Do you support mods and plugins?",
      icon: <Puzzle size={16} className="text-emerald-500" />,
      answer: "Yes! We have full support for Oxide and uMod. You can install thousands of plugins with just a few clicks through our Plugin Manager."
    },
    {
      id: 4,
      question: "This is my first game server, can you help me if I get stuck?",
      icon: <User size={16} className="text-blue-400" />,
      answer: "Absolutely. Our 24/7 support team is always ready to help. We also have an extensive knowledgebase with step-by-step tutorials for beginners."
    }
  ];

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen font-sans">
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
      <section className="relative pt-24 pb-20 overflow-hidden px-4">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://picsum.photos/seed/rustbg/1920/1080" 
             alt="Rust Background" 
             className="w-full h-full object-cover opacity-10 filter grayscale brightness-50"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="z-20">
               <div className="flex items-center space-x-2 mb-6">
                 <div className="flex space-x-0.5">
                   {[1,2,3,4,5].map(i => <div key={i} className="w-5 h-5 bg-green-500 flex items-center justify-center rounded-sm"><Star size={12} fill="white" /></div>)}
                 </div>
                 <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                   OUR DISCORD IS <span className="text-white">600+ RATED!</span>
                 </span>
               </div>

               <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter uppercase italic">
                 RUST SERVER<br />
                 <span className="text-blue-500">HOSTING</span>
               </h1>

               <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10 max-w-xl font-semibold opacity-90">
                 Ready to dive into the wild world of Rust? Our <span className="text-white">Rust server hosting</span> is here to make sure your adventures are epic.
               </p>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 text-xs font-black text-slate-200 mb-12 uppercase tracking-widest">
                  {subFeatures.map((f, i) => (
                    <div key={i} className="flex items-center space-x-4 group">
                       <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-all group-hover:scale-110">
                         <span className="text-blue-500">{f.icon}</span>
                       </div>
                       <span className="group-hover:text-blue-400 transition-colors">{f.label}</span>
                    </div>
                  ))}
               </div>

               <button 
                 onClick={() => document.getElementById('plans-grid')?.scrollIntoView({ behavior: 'smooth' })}
                 className="bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-12 rounded-xl shadow-[0_0_50px_rgba(37,99,235,0.3)] transition-all uppercase tracking-[0.2em] text-sm active:scale-95 group"
               >
                 View Pricing Plans
                 <ArrowRight size={18} className="inline ml-3 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>

            <div className="relative flex justify-center lg:justify-end py-12 lg:py-0">
               <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-600/15 blur-[130px] rounded-full animate-pulse"></div>
                  
                  {/* Character Illustration */}
                  <div className="relative z-10 animate-float">
                    <img 
                      src="https://i.postimg.cc/RhYLw5vp/image-removebg-preview.png" 
                      alt="Rust Character" 
                      className="w-full h-auto drop-shadow-[0_0_100px_rgba(0,0,0,0.7)] scale-110 lg:scale-125 transition-transform duration-700 hover:scale-[1.3]"
                    />
                  </div>

                  {/* Decorative badge */}
                  <div className="absolute -bottom-10 -left-10 bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl -rotate-6 animate-pulse hidden md:block">
                     <h2 className="text-3xl font-black tracking-tighter uppercase italic leading-none mb-2 text-white">
                        WIPE<br />READY!
                     </h2>
                     <div className="bg-orange-600 px-4 py-1.5 rounded-lg font-black text-[9px] inline-block uppercase tracking-widest shadow-xl text-white">
                        AUTO-INSTALL OXIDE
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section id="plans-grid" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div key={i} className={`bg-[#111827]/40 border border-white/5 rounded-3xl p-10 flex flex-col group hover:bg-[#1a2333]/80 transition-all duration-300 shadow-xl ${plan.popular ? 'border-blue-500 shadow-blue-500/10 scale-105 z-10' : ''}`}>
                 {plan.popular && (
                   <div className="bg-blue-600 px-4 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-widest inline-block self-start mb-6">
                     MOST POPULAR
                   </div>
                 )}
                 
                 <div className="mb-8">{plan.icon}</div>
                 <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 italic">{plan.name}</h3>
                 
                 <div className="flex flex-col space-y-1 mb-8">
                   <span className="text-3xl font-black text-white tracking-tighter uppercase">{plan.players}</span>
                   <span className="text-3xl font-black text-white tracking-tighter uppercase">{plan.ram}</span>
                 </div>

                 <div className="bg-blue-600/10 text-blue-500 border border-blue-500/20 px-4 py-1.5 rounded-xl text-[11px] font-black uppercase mb-10 tracking-widest inline-block self-start">
                   30% OFF FIRST MONTH
                 </div>

                 <div className="mt-auto">
                    <div className="flex items-baseline space-x-2 mb-8">
                      <span className="text-slate-600 line-through text-base font-bold italic">{plan.oldPrice}</span>
                      <span className="text-4xl font-black text-white">{plan.price}</span>
                      <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">/mo</span>
                    </div>

                    <button 
                      onClick={() => onOrderPlan?.(plan)}
                      className={`w-full py-4 rounded-xl font-black flex items-center justify-center space-x-2 uppercase tracking-widest text-xs transition-all active:scale-95 ${plan.popular ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20' : 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10'}`}
                    >
                      <ShoppingCart size={16} />
                      <span>{plan.buttonText}</span>
                    </button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL MOD SUPPORT SECTION */}
      <section className="py-24 bg-[#0b0f19] px-4 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Side */}
            <div className="text-left">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter leading-none italic">
                FULL MOD SUPPORT
              </h2>
              <div className="space-y-6 text-slate-400 text-base md:text-lg font-medium leading-relaxed">
                <p>
                  Want to mix things up? <span className="text-white font-bold">Our servers support all your favorite mods</span>, making it super easy to customize your Rust experience.
                </p>
                <p>
                  Add cool new features, tweak the gameplay, or create something totally unique. With our mod-friendly setup, the possibilities are endless. Plus, we've got full support for <span className="text-blue-500 font-bold uppercase tracking-tight">Oxide and uMod</span>, so you can add plugins and fine-tune your server just the way you like it.
                </p>
              </div>
            </div>

            {/* Visual Side */}
            <div className="relative group flex items-center justify-center">
               <div className="relative w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 hover:scale-[1.02] bg-slate-900/50">
                  <img 
                    src="https://i.postimg.cc/2jdqvf8P/image.png" 
                    alt="Full Mod Support Grid" 
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
                Here are some answers to frequently asked questions about our Rust hosting services.
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
