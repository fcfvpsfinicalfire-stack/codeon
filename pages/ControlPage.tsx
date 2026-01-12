
import React, { useState } from 'react';
import { Play, ArrowRight, Layers, FileText, Terminal, CheckCircle2, BarChart3, Box, Search, Download, Puzzle, Settings, Database, RefreshCw, Zap, Monitor, Clock, Banknote, ChevronUp, ChevronDown } from 'lucide-react';
import DiscordBanner from '../components/DiscordBanner';
import TestimonialsSection from '../components/TestimonialsSection';

const ControlPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('plugin');
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const tabs = [
    { 
      id: 'console', 
      name: 'Real-Time Console', 
      icon: <Terminal size={18} />,
      description: 'Monitor your server logs and send commands in real-time with zero latency.'
    },
    { 
      id: 'plugin', 
      name: 'Plugin Manager', 
      icon: <Puzzle size={18} />,
      description: "Manage and find the exact plugins you need with advanced category and version filtering with CODEON HOSTHING's Plugin Manager."
    },
    { 
      id: 'instances', 
      name: 'Server Instances', 
      icon: <Layers size={18} />,
      description: 'Create and manage multiple server instances under a single hosting plan easily.'
    },
    { 
      id: 'config', 
      name: 'Config Manager', 
      icon: <Settings size={18} />,
      description: 'Tweak every aspect of your server with our powerful, intuitive configuration editor.'
    },
    { 
      id: 'backups', 
      name: 'Backups', 
      icon: <Database size={18} />,
      description: 'Automated daily backups with one-click restore to keep your progress safe.'
    }
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
    <div className="bg-[#0b0f19] text-white min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden px-4">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block bg-blue-600 px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-lg shadow-blue-600/20">
            NEW PANEL
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-none tracking-tighter uppercase italic drop-shadow-2xl">
            INTRODUCING CODEON HOSTHING'S<br />NEW CONTROL PANEL
          </h1>
          
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto font-medium opacity-80">
            We have built a completely new game server hosting control panel. Get<br className="hidden md:block" /> a new server now and experience the unparalleled power of the new<br className="hidden md:block" /> CODEON HOSTHING Control Panel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-24">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-10 rounded-xl shadow-2xl shadow-blue-600/30 flex items-center group uppercase tracking-widest text-xs transition-all active:scale-95">
              Start A Server Now
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-black py-4 px-10 rounded-xl border border-white/10 uppercase tracking-widest text-xs transition-all active:scale-95">
              Read More
            </button>
          </div>

          {/* Main Video Mockup - UPDATED WITH USER IMAGE */}
          <div className="relative max-w-5xl mx-auto group cursor-pointer">
            <div className="absolute inset-0 bg-blue-500/10 blur-[150px] -z-10 rounded-full"></div>
            <div className="bg-[#1a2333]/40 backdrop-blur-md rounded-[2.5rem] p-3 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] relative transition-all duration-500 group-hover:border-blue-500/30">
               <div className="rounded-[2rem] overflow-hidden aspect-video relative">
                  <img 
                    src="https://i.postimg.cc/DfjMwM4R/image-2026-01-01-131445884.png" 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    alt="CODEON Control Panel Showcase"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-red-600/40">
                      <Play fill="white" className="text-white ml-1" size={32} />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speed & Innovation Section */}
      <section className="py-24 bg-[#0b0f19] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter leading-none italic">
                EXPERIENCE A NEW LEVEL OF<br />SPEED, POWER AND<br />INNOVATION.
              </h2>
            </div>
            <div className="text-left">
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                Built for both seasoned and novice server owners, the new CODEON HOSTHING Control Panel is designed to be the <span className="text-white font-bold underline decoration-blue-500 decoration-2 underline-offset-4">fastest & most powerful</span>, while also being easy to use — allowing for automation of many tasks that used to be manual & complex.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Feature Showcase */}
      <section className="py-24 bg-[#0b0f19] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter leading-none">
              EXPERIENCE THE NEW<br />
              CODEON HOSTHING CONTROL PANEL
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base font-medium opacity-80">
              Our new panel has all the features you need and more! Get a new server today and discover them all.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-4">
              {tabs.map((tab) => (
                <div 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group cursor-pointer p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                    activeTab === tab.id 
                      ? 'bg-[#1e2736] border-blue-500/50 shadow-2xl shadow-blue-600/10' 
                      : 'bg-[#141d2b]/50 border-white/5 hover:bg-[#1e2736]/50'
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-2">
                    <div className={`p-2.5 rounded-lg transition-colors ${activeTab === tab.id ? 'text-blue-500 bg-blue-500/10' : 'text-slate-500 group-hover:text-slate-300'}`}>
                      {tab.icon}
                    </div>
                    <h3 className={`font-bold text-sm md:text-base tracking-tight transition-colors ${activeTab === tab.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-400'}`}>
                      {tab.name}
                    </h3>
                  </div>
                  
                  {activeTab === tab.id && (
                    <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {tab.description}
                      </p>
                      <div className="absolute bottom-0 left-0 h-1 bg-blue-500 w-1/3 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="lg:col-span-8 relative">
              <div className="bg-[#1a2333]/40 rounded-[2.5rem] border border-white/10 p-4 shadow-2xl relative overflow-hidden aspect-[16/10] flex flex-col">
                <div className="bg-[#0b0f19] rounded-[2rem] flex-grow flex flex-col p-8 overflow-hidden">
                  
                  {activeTab === 'plugin' && (
                    <div className="animate-in fade-in duration-500 flex flex-col h-full">
                       <div className="flex items-center space-x-4 mb-8">
                         <div className="relative w-1/2">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                            <div className="w-full bg-[#1a2333]/50 border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-xs text-slate-500">
                              SEARCH
                            </div>
                         </div>
                         <div className="flex space-x-2">
                            <div className="h-8 w-16 bg-[#1a2333]/50 rounded-lg border border-white/5"></div>
                            <div className="h-8 w-16 bg-[#1a2333]/50 rounded-lg border border-white/5"></div>
                            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                               <div className="w-4 h-4 bg-white/20 rounded"></div>
                            </div>
                         </div>
                       </div>

                       <div className="grid grid-cols-2 gap-6 flex-grow">
                          {[1,2,3,4].map(i => (
                            <div key={i} className="bg-[#1a2333]/30 border border-white/5 rounded-2xl p-4 flex flex-col group/plugin hover:bg-[#1a2333]/50 transition-colors">
                               <div className="flex items-start space-x-4 mb-4">
                                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-slate-600">
                                     <Puzzle size={24} />
                                  </div>
                                  <div className="space-y-2 flex-grow">
                                     <div className="h-2.5 w-2/3 bg-slate-700 rounded-full"></div>
                                     <div className="h-2 w-full bg-slate-800 rounded-full"></div>
                                     <div className="h-2 w-1/2 bg-slate-800 rounded-full"></div>
                                  </div>
                               </div>
                               <div className="mt-auto flex space-x-3">
                                  <button className="flex-grow bg-[#0b0f19] text-[10px] font-black uppercase tracking-widest py-2 rounded-lg border border-white/5 hover:bg-white/5 transition-colors">SWITCH</button>
                                  <button className={`flex-grow bg-blue-600 text-[10px] font-black uppercase tracking-widest py-2 rounded-lg transition-colors ${i === 1 ? 'ring-2 ring-white/20' : ''}`}>INSTALL</button>
                               </div>
                            </div>
                          ))}
                       </div>

                       <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                          <div className="flex items-center space-x-3 text-blue-500 animate-pulse">
                             <RefreshCw size={14} className="animate-spin" />
                             <span className="text-[10px] font-black uppercase tracking-widest">Installing Plugin...</span>
                          </div>
                          <span className="text-[10px] font-black text-white/50">0%</span>
                       </div>
                    </div>
                  )}

                  {activeTab !== 'plugin' && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in duration-500">
                       <div className="p-8 bg-white/5 rounded-full text-blue-500">
                         {tabs.find(t => t.id === activeTab)?.icon}
                       </div>
                       <h3 className="text-2xl font-black uppercase italic tracking-tighter">
                         {tabs.find(t => t.id === activeTab)?.name} Mockup
                       </h3>
                       <p className="text-slate-400 max-w-sm text-sm">
                         Experience the detailed interface of the {tabs.find(t => t.id === activeTab)?.name} within our lightning-fast panel.
                       </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Blocks Section */}
      <section className="max-w-7xl mx-auto px-4 pb-32 space-y-12">
        <div className="bg-[#111827]/40 border border-white/5 rounded-[2.5rem] p-10 md:p-16 flex flex-col lg:flex-row items-center gap-12 group hover:bg-[#1a2333]/60 transition-colors">
          <div className="lg:w-1/2 text-left">
            <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter italic">MAXIMISE YOUR SERVER PERFORMANCE!</h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium mb-10">
              Our reimagined approach to server analytics allows you to track historical data and see super-accurate real-time performance metrics. Use this data to maximise the performance of your server!
            </p>
            <button className="bg-white/5 hover:bg-white/10 text-white font-black py-3 px-8 rounded-lg border border-white/10 uppercase tracking-widest text-[10px] transition-all">
              Read More
            </button>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="bg-slate-900 rounded-2xl border border-white/5 p-2 shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
              <div className="bg-[#1a2333] rounded-xl p-6 h-full font-sans">
                 <div className="flex items-center space-x-4 mb-8 border-b border-white/5 pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                   <span className="hover:text-white cursor-pointer">Usage</span>
                   <span className="hover:text-white cursor-pointer">CPU</span>
                   <span className="text-blue-500 border-b border-blue-500 pb-4 -mb-[17px]">RAM</span>
                   <span className="hover:text-white cursor-pointer">Storage</span>
                   <span className="ml-auto text-blue-400 cursor-pointer">Show Simple</span>
                 </div>
                 <div className="relative h-48 w-full mt-4">
                    <svg viewBox="0 0 400 150" className="w-full h-full">
                      <path 
                        d="M0,120 Q50,110 100,130 T200,80 T300,100 T400,60" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="3" 
                        className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                      />
                      <circle cx="200" cy="80" r="4" fill="#3b82f6" />
                    </svg>
                    <div className="absolute top-4 left-[180px] bg-[#111827] border border-blue-500/50 p-2 rounded-lg shadow-xl text-center">
                       <p className="text-[8px] text-slate-400 uppercase font-bold">RAM Usage</p>
                       <p className="text-xs font-black text-white">56%</p>
                       <p className="text-[8px] text-slate-500">1234MB / 2048MB</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#111827]/40 border border-white/5 rounded-[2.5rem] p-10 md:p-16 flex flex-col lg:flex-row items-center gap-12 group hover:bg-[#1a2333]/60 transition-colors">
          <div className="lg:w-1/2 w-full order-2 lg:order-1">
            <div className="bg-slate-900 rounded-2xl border border-white/5 p-2 shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
              <div className="bg-[#1a2333] rounded-xl p-6 h-full font-sans">
                 <div className="flex items-center justify-between mb-6">
                   <div className="relative w-2/3">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                      <div className="w-full bg-[#0b0f19] border border-white/5 rounded-lg py-2 pl-10 pr-4 text-[10px] text-slate-500">
                        SEARCH
                      </div>
                   </div>
                   <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                     <Download size={16} className="text-white" />
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-[#0b0f19] p-3 rounded-xl border border-white/5">
                      <div className="flex items-center space-x-3 mb-3">
                         <div className="w-8 h-8 bg-slate-800 rounded-md"></div>
                         <div>
                           <p className="text-[9px] font-black text-white">All The Mods 9</p>
                           <p className="text-[7px] text-slate-500">Forge • 1.20.1</p>
                         </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-grow bg-slate-800 text-[8px] py-1 rounded font-bold">SWITCH</button>
                        <button className="flex-grow bg-blue-600 text-[8px] py-1 rounded font-bold">INSTALL</button>
                      </div>
                    </div>
                    <div className="bg-[#0b0f19] p-3 rounded-xl border border-white/5">
                      <div className="flex items-center space-x-3 mb-3">
                         <div className="w-8 h-8 bg-slate-800 rounded-md"></div>
                         <div>
                           <p className="text-[9px] font-black text-white">DawnCraft</p>
                           <p className="text-[7px] text-slate-500">Forge • 1.18.2</p>
                         </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-grow bg-slate-800 text-[8px] py-1 rounded font-bold">SWITCH</button>
                        <button className="flex-grow bg-blue-600 text-[8px] py-1 rounded font-bold">INSTALL</button>
                      </div>
                    </div>
                 </div>
                 <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                       <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest animate-pulse">Installing Modpack...</p>
                       <p className="text-[8px] font-black text-white">30%</p>
                    </div>
                    <div className="h-1.5 w-full bg-[#0b0f19] rounded-full overflow-hidden border border-white/5">
                       <div className="h-full bg-blue-500 w-[30%] shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 text-left order-1 lg:order-2">
            <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter italic">INSTALL ANY MINECRAFT MODPACK IN JUST ONE CLICK!</h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium mb-10">
              Our new Modpack Installer not only makes it easier to install mods but will also update them for you! Additionally, we have the most easy-to-use interface, allowing you to find any modpack you want in seconds.
            </p>
            <button className="bg-white/5 hover:bg-white/10 text-white font-black py-3 px-8 rounded-lg border border-white/10 uppercase tracking-widest text-[10px] transition-all">
              Read More
            </button>
          </div>
        </div>
      </section>

      {/* Trustpilot Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
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
    </div>
  );
};

export default ControlPage;
