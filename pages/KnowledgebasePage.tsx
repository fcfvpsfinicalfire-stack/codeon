
import React from 'react';
// Added missing 'Clock' icon to imports from lucide-react
import { Search, Ticket, PlayCircle, HelpCircle, Newspaper, ChevronRight, Zap, Settings, Users, Database, CreditCard, ArrowRight, BookOpen, Star, Sparkles, Clock } from 'lucide-react';

const KnowledgebasePage: React.FC = () => {
  const games = [
    { name: 'Minecraft', count: 209, icon: '🟩', color: 'from-green-500/20' },
    { name: 'Bedrock Edition', count: 21, icon: '🧱', color: 'from-red-500/20' },
    { name: 'Rust', count: 44, icon: '🟧', color: 'from-orange-500/20' },
    { name: '7 Days to Die', count: 23, icon: '🧟', color: 'from-yellow-500/20' },
    { name: 'Abiotic Factor', count: 14, icon: '🧬', color: 'from-purple-500/20' },
    { name: 'ARK: Evolved', count: 24, icon: '⛰️', color: 'from-blue-500/20' },
    { name: 'Arma 3', count: 12, icon: '🪖', color: 'from-slate-500/20' },
    { name: 'Assetto Corsa', count: 11, icon: '🏎️', color: 'from-red-600/20' },
    { name: 'Astroneer', count: 10, icon: '🚀', color: 'from-cyan-500/20' },
  ];

  const categories = [
    { name: 'Shockbyte Panel', count: 20, icon: <Zap size={18} />, color: 'text-blue-500' },
    { name: 'General Support', count: 10, icon: <Settings size={18} />, color: 'text-orange-500' },
    { name: 'Quick Actions', count: 4, icon: <PlayCircle size={18} />, color: 'text-emerald-500' },
    { name: 'Partnerships', count: 1, icon: <Users size={18} />, color: 'text-purple-500' },
    { name: 'Databases', count: 4, icon: <Database size={18} />, color: 'text-blue-400' },
    { name: 'Billing', count: 18, icon: <CreditCard size={18} />, color: 'text-pink-500' },
  ];

  const featuredArticles = [
    { title: 'How to Connect to Your Server', category: 'Getting Started', time: '2 min read' },
    { title: 'Installing Custom Modpacks', category: 'Tutorial', time: '5 min read' },
    { title: 'Setting Up BungeeCord', category: 'Advanced', time: '10 min read' },
  ];

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen font-sans selection:bg-blue-500/30">
      
      {/* Premium Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden px-4">
        {/* Atmospheric Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8 animate-pulse">
            <Sparkles size={14} className="text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">AI-Powered Support Search</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase italic leading-[0.9]">
            HEY! HOW CAN WE <br />
            <span className="text-blue-500">HELP YOU TODAY?</span>
          </h1>
          
          {/* Enhanced Search Bar */}
          <div className="relative max-w-3xl mx-auto mb-12 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-[#1a2333]/80 backdrop-blur-xl border border-white/10 rounded-full py-2 px-2 flex items-center shadow-2xl">
              <div className="pl-6 text-slate-400">
                <Search size={22} />
              </div>
              <input 
                type="text" 
                placeholder="Search for articles, guides, or server types..." 
                className="w-full bg-transparent border-none py-4 px-6 text-white placeholder-slate-500 focus:outline-none text-base md:text-lg font-medium"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-full text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-600/20">
                SEARCH
              </button>
            </div>
          </div>

          {/* Floating Action Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Submit Ticket', icon: <Ticket size={18} />, color: 'hover:border-blue-500/50' },
              { label: 'Video Guides', icon: <PlayCircle size={18} />, color: 'hover:border-emerald-500/50' },
              { label: 'Live Status', icon: <Zap size={18} />, color: 'hover:border-orange-500/50' },
              { label: 'Our Blog', icon: <Newspaper size={18} />, color: 'hover:border-purple-500/50' },
            ].map((action, i) => (
              <button 
                key={i} 
                className={`flex items-center justify-between bg-[#111827]/40 backdrop-blur-md border border-white/5 rounded-2xl px-5 py-4 transition-all group hover:bg-[#1a2333] hover:-translate-y-1 ${action.color}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-slate-400 group-hover:text-white transition-colors">{action.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-white">{action.label}</span>
                </div>
                <ChevronRight size={14} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Guides Section - NEW */}
      <section className="py-12 px-4 border-y border-white/5 bg-[#0d121f]">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4">
                 <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">ESSENTIAL GUIDES</h2>
                 <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">New to hosting? Start here with our curated list of most-read articles to get your server online in minutes.</p>
                 <button className="flex items-center space-x-2 text-blue-500 font-black text-xs uppercase tracking-widest hover:text-blue-400 transition-colors group">
                    <span>Explore All Basics</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                 {featuredArticles.map((article, i) => (
                   <div key={i} className="bg-[#111827]/80 border border-white/5 p-6 rounded-[2rem] hover:border-blue-500/30 transition-all group cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-2xl rounded-full"></div>
                      <div className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mb-3">{article.category}</div>
                      <h3 className="text-white font-black text-sm mb-4 leading-tight group-hover:text-blue-400 transition-colors">{article.title}</h3>
                      <div className="flex items-center space-x-2 text-slate-500 text-[9px] font-bold uppercase tracking-tight">
                        <Clock size={12} />
                        <span>{article.time}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Browse By Game Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-2">BROWSE BY GAME</h2>
              <p className="text-slate-500 text-sm font-medium">Detailed configuration guides for every game in our library.</p>
            </div>
            <button className="bg-slate-800/80 hover:bg-slate-700 text-white font-black py-3 px-10 rounded-xl text-[10px] uppercase tracking-widest border border-white/10 transition-all shadow-xl active:scale-95">
              View All 60+ Games
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, i) => (
              <div 
                key={i} 
                className="bg-[#111827]/40 border border-white/5 rounded-[2.5rem] p-8 flex items-center space-x-6 hover:bg-[#1a2333] hover:border-blue-500/20 transition-all cursor-pointer group shadow-xl relative overflow-hidden"
              >
                {/* Background Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${game.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="w-16 h-16 bg-white/5 rounded-[1.25rem] flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-white/10 transition-all shadow-inner relative z-10">
                  {game.icon}
                </div>
                <div className="relative z-10">
                  <h3 className="text-white font-black text-lg tracking-tight group-hover:text-blue-400 transition-colors uppercase italic leading-none mb-2">
                    {game.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                     <BookOpen size={12} className="text-slate-600" />
                     <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                       {game.count} Articles
                     </p>
                  </div>
                </div>
                <ChevronRight size={18} className="ml-auto text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Categories Section */}
      <section className="py-24 px-4 bg-[#0d121f] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center md:text-left mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-2">SYSTEM CATEGORIES</h2>
            <p className="text-slate-500 text-sm font-medium">Non-game related articles regarding accounts, panel, and billing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <div 
                key={i} 
                className="bg-[#111827]/40 border border-white/5 rounded-3xl p-8 flex items-center space-x-6 hover:bg-slate-900/60 hover:border-white/10 transition-all cursor-pointer group"
              >
                <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-white font-black text-base tracking-tight group-hover:text-white transition-colors uppercase italic">
                    {cat.name}
                  </h3>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">
                    {cat.count} Articles
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-blue-600 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.2)]">
             <div className="absolute inset-0 opacity-10 pointer-events-none select-none text-white text-9xl font-black flex items-center justify-center italic">
                SUPPORT
             </div>
             <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">STILL NEED HELP?</h2>
                <p className="text-blue-100 max-w-lg mx-auto mb-10 font-bold uppercase tracking-tight text-sm">Our team of experts is online 24/7 to assist you with any server issues or questions you might have.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                   <button className="w-full sm:w-auto bg-white text-blue-600 font-black py-4 px-12 rounded-2xl text-xs uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 hover:bg-slate-100">
                      Open A Ticket
                   </button>
                   <a 
                    href="https://discord.gg/PE7HuAEA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-blue-700/50 backdrop-blur-md text-white border border-white/20 font-black py-4 px-12 rounded-2xl text-xs uppercase tracking-[0.2em] transition-all active:scale-95 hover:bg-blue-700/80 flex items-center justify-center"
                   >
                      Join Discord
                   </a>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Mini Footer Status */}
      <section className="bg-slate-950 py-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>All Systems Operational</span>
          </div>
          <div className="w-px h-3 bg-white/10"></div>
          <div className="flex items-center space-x-2">
             <Users size={12} className="text-blue-500" />
             <span>600+ Online Members</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default KnowledgebasePage;
