
import React, { useState } from 'react';
import { Play, ArrowRight, Check, Search, Download, Clock, Info, RefreshCw, Terminal, Puzzle, Layers, Settings, Database, ChevronDown, ChevronUp, Zap, Banknote, Sparkles } from 'lucide-react';
import DiscordBanner from '../components/DiscordBanner';
import TestimonialsSection from '../components/TestimonialsSection';

export default function ControlPanelPage() {
  const [activeFeature, setActiveFeature] = useState('console');
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const handlePurchase = () => {
    window.location.href = 'https://billing.codeon.codes';
  };

  const panelFeatures = [
    { 
      id: 'console', 
      name: 'Real-Time Console', 
      icon: <Terminal size={18} />, 
      description: 'The console now feels smooth and instant, with a beautiful new design and brand new, reimagined features like message highlighting, filtering & log sharing.' 
    },
    { id: 'plugin', name: 'Plugin Manager', icon: <Puzzle size={18} />, description: 'Easily browse, install and manage thousands of plugins with our integrated manager.' },
    { id: 'instances', name: 'Server Instances', icon: <Layers size={18} />, description: 'Run multiple versions or different server types simultaneously on your plan.' },
    { id: 'config', name: 'Config Manager', icon: <Settings size={18} />, description: 'Edit your server files directly in your browser with syntax highlighting.' },
    { id: 'backups', name: 'Backups', icon: <Database size={18} />, description: 'Never lose progress with our automated daily backup system.' },
  ];

  const faqs = [
    {
      id: 1,
      question: "Why should I choose CODEON HOSTHING as my server host?",
      icon: <Zap size={14} className="text-orange-500" />,
      answer: "We're one of the longest running server hosts in the world; we've been providing our customers with **high-quality game server hosting at affordable prices** since the very beginning in 2013. We offer **24/7 customer support** in case you run into any issues, and recently developed a **brand-new control panel**. The CODEON HOSTHING Control Panel is the **fastest and easiest to use** in the market, so even if you're a newbie to server hosting, we're sure you'll find it very easy with us! With over 7,000 5-star reviews, locations all across the globe and a 3-day money back guarantee, we firmly believe that CODEON HOSTHING is the best option for your game server hosting needs."
    },
    {
      id: 2,
      question: "Can I change my plan or upgrade my server later?",
      icon: <Layers size={14} className="text-blue-400" />,
      answer: "Yes, you can upgrade or downgrade your server plan at any time through our client area. The process is fully automated and your files will be preserved during the transition."
    },
    {
      id: 3,
      question: "Can I get my money back if I don't like my server?",
      icon: <Banknote size={14} className="text-emerald-500" />,
      answer: "We offer a 72-hour money-back guarantee for all new server orders. If you're not satisfied, simply open a ticket and our billing team will process your refund immediately."
    },
    {
      id: 4,
      question: "Do you support mods and plugins?",
      icon: <Puzzle size={14} className="text-green-400" />,
      answer: "Yes! All of our servers come with full support for mods, plugins, and custom jars. Our one-click installer makes it easy to set up popular modpacks and plugin sets in seconds."
    }
  ];

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden px-4">
        {/* Background Silhouettes */}
        <div className="absolute inset-0 z-0">
           <img 
             src="https://picsum.photos/seed/mc-landscape/1920/1080" 
             alt="Minecraft Landscape" 
             className="w-full h-full object-cover opacity-20 filter grayscale blur-sm"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/40 to-slate-950"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block bg-blue-600 px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-lg shadow-blue-600/20">
            NEW PANEL
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-none tracking-tighter uppercase italic drop-shadow-2xl">
            INTRODUCING CODEON HOSTHING'S<br />NEW CONTROL PANEL
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-12 max-w-2xl mx-auto font-medium opacity-80">
            We have built a completely new game server hosting control panel. Get<br className="hidden md:block" /> a new server now and experience the unparalleled power of the new<br className="hidden md:block" /> CODEON HOSTHING Control Panel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-24">
            <button 
              onClick={handlePurchase}
              className="bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-10 rounded-xl shadow-2xl shadow-blue-600/30 flex items-center group uppercase tracking-widest text-xs transition-all active:scale-95"
            >
              Start A Server Now
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-black py-4 px-10 rounded-xl border border-white/10 uppercase tracking-widest text-xs transition-all active:scale-95">
              Read More
            </button>
          </div>

          {/* ... (rest of the file remains basically same, updating specific strings if needed) ... */}
        </div>
      </section>

      {/* Feature Section Below Hero */}
      <section className="py-24 bg-[#0b0f19] px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter leading-none italic">
                EXPERIENCE A NEW LEVEL OF<br />SPEED, POWER AND<br />INNOVATION.
              </h2>
            </div>
            <div className="text-left">
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                Built for both seasoned and novice server owners, the new CODEON HOSTHING Control Panel is designed to be the <span className="text-white font-bold underline decoration-blue-500 decoration-2 underline-offset-4">fastest & most powerful</span>, while also being easy to use - allowing for automation of many tasks that used to be manual & complex.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ... (rest of the file remains same) ... */}
      <TestimonialsSection />
      <DiscordBanner />
    </div>
  );
}
