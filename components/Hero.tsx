
import React, { useState, useEffect } from 'react';
import { GAMES, PLANS, DISCOUNT_PERCENT, DIRT_BLOCK_URL, NEW_YEAR_COUPON } from '../constants';
import { Plan } from '../types';

interface HeroProps {
  onAddToCart: (plan: Plan) => void;
}

const Hero: React.FC<HeroProps> = ({ onAddToCart }) => {
  const [gameIndex, setGameIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const recommendedPlan = PLANS.find(p => p.ram === 8 && p.category === 'MINECRAFT');

  useEffect(() => {
    const handleTyping = () => {
      const fullText = GAMES[gameIndex];
      setCurrentText(
        isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1)
      );

      setTypingSpeed(isDeleting ? 100 : 150);

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setGameIndex((prev) => (prev + 1) % GAMES.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, gameIndex, typingSpeed]);

  const handleSelect = () => {
    if (recommendedPlan) {
      onAddToCart(recommendedPlan);
    }
  };

  return (
    <section className="relative pt-40 pb-24 px-4 lg:px-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-blue-600/10 blur-[180px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[180px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-left">
          {/* Trustpilot Badge */}
          <div className="flex items-center gap-3 mb-8 bg-white/5 border border-white/10 w-fit px-4 py-2 rounded-2xl">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              ))}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white">4.9 Stars @ Trustpilot</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1] text-white tracking-tighter uppercase">
            Host your own <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 min-h-[1.2em] block">
              {currentText}<span className="text-white animate-pulse">|</span>
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-12 font-medium leading-relaxed uppercase tracking-tight opacity-80">
            Professional high-performance hosting for Minecraft, ARK, and VPS services. Singapore nodes with 99.9% uptime.
          </p>

          <div className="flex flex-col gap-6">
            {/* New Prominent Coupon Banner */}
            <div className="group relative flex items-center gap-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-2 border-blue-500/50 rounded-3xl px-8 py-5 w-fit shadow-[0_0_40px_rgba(59,130,246,0.2)] animate-float">
               <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
               <div className="relative flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] mb-1">Limited Offer</span>
                    <span className="text-white text-xl font-black uppercase tracking-widest">USE <span className="text-cyan-400 underline decoration-2 underline-offset-4">{NEW_YEAR_COUPON}</span></span>
                  </div>
                  <div className="w-[1px] h-10 bg-white/10 mx-2" />
                  <div className="flex flex-col items-center">
                    <span className="text-white text-3xl font-black">{DISCOUNT_PERCENT}%</span>
                    <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest">OFF NOW</span>
                  </div>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <a href="#pricing" className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-blue-600/30 transition-all flex items-center gap-3 transform active:scale-95">
                Deploy Now <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Recommended Package UI */}
        <div className="flex-1 w-full max-w-md">
           <div className="glass p-8 rounded-[3rem] border-2 border-blue-500/50 relative overflow-hidden shadow-2xl animate-float [animation-delay:1s]">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black px-6 py-2 rounded-bl-3xl uppercase tracking-widest z-20">TOP PICK</div>
              <div className="flex items-center gap-6 mb-8 relative z-10">
                 <img src={DIRT_BLOCK_URL} className="w-20 h-20 drop-shadow-2xl" alt="MC Dirt" />
                 <div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{recommendedPlan?.ram}GB RAM</h3>
                    <p className="text-blue-400 text-xs font-black uppercase tracking-widest">Recommended MC Package</p>
                 </div>
              </div>
              <div className="space-y-4 mb-8">
                 <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    <span>Cores</span>
                    <span className="text-white">{recommendedPlan?.cores} Dedicated</span>
                 </div>
                 <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    <span>Disk</span>
                    <span className="text-white">{recommendedPlan?.disk}GB NVMe</span>
                 </div>
                 <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    <span>Network</span>
                    <span className="text-white">10Gbps Uplink</span>
                 </div>
              </div>
              <div className="flex items-baseline gap-2">
                 <span className="text-4xl font-black text-white">₨ {Math.floor((recommendedPlan?.price || 0) * (1 - DISCOUNT_PERCENT/100)).toLocaleString()}</span>
                 <span className="text-xs text-gray-500 line-through">₨ {recommendedPlan?.price}</span>
              </div>
              <p className="text-[9px] text-gray-600 font-bold uppercase mt-1">Per Month with {DISCOUNT_PERCENT}% Discount Applied</p>
              
              <button 
                onClick={handleSelect}
                className="w-full py-4 mt-8 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
              >
                Select Package
              </button>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
