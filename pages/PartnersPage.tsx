
import React, { useState } from 'react';
import { Users, Zap, Link as LinkIcon, Server, Palette, Sliders, MessageSquare, ExternalLink, PenSquare, Share2, Rocket, ChevronUp, ChevronDown, Clock, Sparkles, Target, HelpCircle, Trophy, BarChart, CheckCircle } from 'lucide-react';
import DiscordBanner from '../components/DiscordBanner';

const PartnersPage: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);
  const partnerFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSe2vpaITn73VHya2BxpISd3mS94UQk23G5C17P_qrTso21htw/viewform?usp=publish_form";

  const handleApplyClick = () => {
    window.open(partnerFormUrl, '_blank');
  };

  const stats = [
    { label: 'Active Partners', value: '150+', icon: <Users className="text-blue-500" size={16} /> },
    { label: 'Total Reach', value: '25M+', icon: <Zap className="text-yellow-500" size={16} /> },
    { label: 'Servers Hosted', value: '2,000+', icon: <Server className="text-emerald-500" size={16} /> },
    { label: 'Countries', value: '45+', icon: <Target className="text-purple-500" size={16} /> },
  ];

  const benefits = [
    {
      title: 'Priority Support',
      desc: 'Skip the queue with a private Discord channel and direct access to senior technical staff.',
      icon: <MessageSquare size={24} />,
      color: 'border-blue-500/30 text-blue-500 shadow-blue-500/10',
    },
    {
      title: 'Affiliate Earnings',
      desc: 'Industry-leading commission rates with a custom dashboard to track your performance.',
      icon: <LinkIcon size={24} />,
      color: 'border-orange-500/30 text-orange-500 shadow-orange-500/10',
    },
    {
      title: 'Free Infrastructure',
      desc: 'Complimentary high-performance servers for your community, testing, and content creation.',
      icon: <Server size={24} />,
      color: 'border-emerald-500/30 text-emerald-500 shadow-emerald-500/10',
    },
    {
      title: 'Brand Integration',
      desc: 'Professional overlays, panels, and custom graphics tailored to your specific brand identity.',
      icon: <Palette size={24} />,
      color: 'border-purple-500/30 text-purple-500 shadow-purple-500/10',
    },
    {
      title: 'Early Access',
      desc: 'Be the first to test our new control panel features and upcoming global hardware nodes.',
      icon: <Rocket size={24} />,
      color: 'border-cyan-500/30 text-cyan-500 shadow-cyan-500/10',
    },
    {
      title: 'Exclusive Giveaways',
      desc: 'Regular access to server codes and hardware prizes to give back to your loyal followers.',
      icon: <Trophy size={24} />,
      color: 'border-red-500/30 text-red-500 shadow-red-500/10',
    },
  ];

  const spotlights = [
    {
      name: 'RasMnare',
      category: 'CONTENT CREATOR',
      desc: 'The master of Minecraft experiments and unique technical content, keeping millions engaged weekly.',
      image: 'https://i.postimg.cc/L6rcTbTT/channels4-profile.jpg',
      accent: 'bg-yellow-500',
    },
    {
      name: 'Cryingcraft',
      category: 'CONTENT CREATOR',
      desc: 'Creating immersive multiplayer experiences and high-energy roleplay that brings communities together.',
      image: 'https://i.postimg.cc/Fssy6rPb/IMG-20251212-WA0235.jpg',
      accent: 'bg-blue-500',
    },
    {
      name: 'DR MAX WAVE',
      category: 'STREAMER',
      desc: "Dedicated to showcasing the very best of Minecraft server culture and hosting excellence.",
      image: 'https://i.postimg.cc/G3ySF8dt/my-new-logo-upscayl-3x-realesrgan-x4plus-anime.png',
      accent: 'bg-emerald-500',
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I apply for the CODEON partnership program?",
      icon: <Zap size={14} className="text-orange-400" />,
      answer: "Applying is simple! Just click the 'Apply Now' button. You'll fill out a form about your community reach and why you'd be a great fit. Our team reviews every application manually."
    },
    {
      id: 2,
      question: "What are the minimum requirements?",
      icon: <Target size={14} className="text-blue-400" />,
      answer: "We look for active engagement rather than just high numbers. Whether you have 1,000 or 1,000,000 followers, if your community is passionate, we want to hear from you."
    },
    {
      id: 3,
      question: "Can I partner as a Mod Developer?",
      icon: <Rocket size={14} className="text-purple-400" />,
      answer: "Absolutely! We love supporting the modding community. We provide dedicated hardware for development, testing, and hosting your official project servers."
    }
  ];

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen font-sans selection:bg-blue-500/30">
      
      {/* Dynamic Hero Section */}
      <section className="relative pt-32 pb-48 px-4 overflow-hidden">
        {/* Animated Background Atmosphere */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/10 blur-[150px] rounded-full -z-10"></div>
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-purple-600/5 blur-[100px] rounded-full -z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-5 py-2 mb-10">
            <Sparkles size={14} className="text-blue-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">Partner Status: RECRUITING NOW</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase italic leading-[0.85] drop-shadow-2xl">
            JOIN THE <br />
            <span className="text-blue-500">ELITE NETWORK</span>
          </h1>
          
          <p className="text-slate-400 text-base md:text-xl leading-relaxed mb-14 max-w-2xl mx-auto font-medium">
            We don't just host servers; we fuel dreams. Partner with CODEON and get access to the hardware and support you need to scale your community to <span className="text-white font-bold">new heights.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={handleApplyClick}
              className="bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-14 rounded-2xl shadow-2xl shadow-blue-600/30 flex items-center group uppercase tracking-widest text-xs transition-all active:scale-95"
            >
              <PenSquare size={16} className="mr-3" />
              Start Your Application
            </button>
            <button 
              onClick={() => document.getElementById('benefits-grid')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/5 hover:bg-white/10 text-white font-black py-5 px-14 rounded-2xl border border-white/10 uppercase tracking-widest text-xs transition-all active:scale-95"
            >
              View Benefits
            </button>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="max-w-7xl mx-auto px-4 -mt-20 mb-32 relative z-20">
         <div className="bg-[#111827]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-3xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
               {stats.map((stat, i) => (
                 <div key={i} className="flex flex-col items-center text-center space-y-3 group">
                    <div className="bg-white/5 p-3 rounded-xl group-hover:bg-white/10 transition-colors">
                       {stat.icon}
                    </div>
                    <p className="text-3xl md:text-4xl font-black italic tracking-tighter text-white">{stat.value}</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Partnership Perks Grid */}
      <section id="benefits-grid" className="py-24 px-4 bg-[#0b0f19]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic leading-none">
              WHY PARTNER <span className="text-blue-500">WITH US?</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-medium max-w-xl mx-auto uppercase tracking-wide">
              We provide the tools, you provide the talent. Here's how we help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div 
                key={i} 
                className={`group bg-[#111827]/40 border-2 rounded-[2.5rem] p-10 transition-all duration-500 hover:bg-[#1a2333]/80 hover:-translate-y-2 flex flex-col items-center text-center ${benefit.color}`}
              >
                 <div className="mb-8 p-6 bg-white/5 rounded-3xl group-hover:scale-110 group-hover:bg-white/10 transition-all">
                    {benefit.icon}
                 </div>
                 <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4">{benefit.title}</h3>
                 <p className="text-slate-400 text-sm font-medium leading-relaxed">
                   {benefit.desc}
                 </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hall of Fame Spotlight Section */}
      <section className="py-32 px-4 bg-[#0d121f] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
            <div className="text-left">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter italic leading-none">
                PARTNER <span className="text-blue-500">HALL OF FAME</span>
              </h2>
              <p className="text-slate-500 text-sm md:text-base font-medium uppercase tracking-widest">Celebrating the creators who drive our platform forward.</p>
            </div>
            <button className="bg-slate-800 hover:bg-slate-700 text-white font-black py-4 px-10 rounded-xl text-[10px] uppercase tracking-widest border border-white/10 transition-all active:scale-95">
               View All Partners
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {spotlights.map((spot, i) => (
              <div key={i} className="group relative bg-[#111827] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-blue-500/40 transition-all duration-500 shadow-2xl">
                 <div className="aspect-[4/5] relative overflow-hidden">
                    <img 
                      src={spot.image} 
                      alt={spot.name} 
                      className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/40 to-transparent"></div>
                    
                    <div className="absolute top-6 left-6">
                       <span className={`${spot.accent} text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg shadow-xl`}>
                         {spot.category}
                       </span>
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 text-left">
                       <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-3 leading-none">{spot.name}</h3>
                       <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                         {spot.desc}
                       </p>
                       <button className="flex items-center space-x-2 text-blue-500 text-[10px] font-black uppercase tracking-widest group/btn">
                          <span>Visit Channel</span>
                          <ExternalLink size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                       </button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Tiers / Process Section */}
      <section className="py-32 px-4 bg-[#0b0f19]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">THE JOURNEY</h2>
             <p className="text-slate-500 text-sm font-medium">Simple steps to join our global network.</p>
          </div>

          <div className="relative">
             {/* Connector Line */}
             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 hidden md:block"></div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                {[
                  { step: '01', title: 'Apply', desc: 'Tell us about your content and community goals.' },
                  { step: '02', title: 'Review', desc: 'Our team evaluates your fit for the network.' },
                  { step: '03', title: 'Launch', desc: 'Get your servers and start scaling your community.' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center group">
                     <div className="w-20 h-20 bg-[#111827] border-2 border-white/5 rounded-full flex items-center justify-center text-2xl font-black text-blue-500 mb-6 group-hover:border-blue-500 group-hover:scale-110 transition-all shadow-2xl">
                        {item.step}
                     </div>
                     <h3 className="text-xl font-black text-white uppercase italic mb-3">{item.title}</h3>
                     <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-32 bg-[#0b0f19] px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Header Column */}
            <div className="lg:col-span-5 text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight italic">
                QUESTIONS &<br />ANSWERS
              </h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-10 max-w-md font-medium opacity-80">
                Everything you need to know about our partnership program before applying.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleApplyClick}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 px-10 rounded-xl text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-95"
                >
                  Apply Now
                </button>
                <button className="bg-[#1a2333] hover:bg-slate-800 text-white font-black py-3.5 px-10 rounded-xl text-xs uppercase tracking-widest border border-white/10 transition-all">
                  Support Chat
                </button>
              </div>
            </div>

            {/* Right Accordion Column */}
            <div className="lg:col-span-7 space-y-4">
              {faqs.map((faq) => (
                <div 
                  key={faq.id}
                  className={`bg-[#111827]/40 border border-white/5 rounded-3xl transition-all duration-300 ${openFaqId === faq.id ? 'bg-[#1a2333]/80 border-white/10 shadow-2xl' : ''}`}
                >
                  <button 
                    onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-8 text-left focus:outline-none group"
                  >
                    <div className="flex items-center space-x-6">
                      <div className={`w-10 h-10 flex items-center justify-center bg-slate-800 rounded-xl group-hover:bg-slate-700 transition-colors ${openFaqId === faq.id ? 'bg-slate-700' : ''}`}>
                        {faq.icon}
                      </div>
                      <span className={`font-bold text-sm md:text-base tracking-tight transition-colors ${openFaqId === faq.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {faq.question}
                      </span>
                    </div>
                    <div className="text-slate-500">
                      {openFaqId === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>
                  
                  {openFaqId === faq.id && (
                    <div className="px-8 pb-8 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="pl-16 border-t border-white/5 pt-6">
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

export default PartnersPage;
