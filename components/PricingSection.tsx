
import React, { useState, useEffect } from 'react';
import { PLANS, DISCOUNT_PERCENT, LKR_TO_EUR, DIRT_BLOCK_URL } from '../constants';
import { Plan, HostingCategory, BillingCycle } from '../types';

interface PricingSectionProps {
  onAddToCart: (plan: Plan) => void;
  forcedCategory?: HostingCategory;
  currency: 'LKR' | 'EUR';
  billingCycle: BillingCycle;
  setBillingCycle: (c: BillingCycle) => void;
}

type MainTab = 'GAME_PLANS' | 'CLOUD_SERVICES' | 'DEDICATED';

const PricingSection: React.FC<PricingSectionProps> = ({ 
  onAddToCart, 
  forcedCategory, 
  currency, 
  billingCycle, 
  setBillingCycle 
}) => {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('GAME_PLANS');
  const [activeCategory, setActiveCategory] = useState<HostingCategory>('MINECRAFT');

  useEffect(() => {
    if (forcedCategory) {
      setActiveCategory(forcedCategory);
      if (['MINECRAFT', 'ARK', 'RUST', 'MTA', 'NODEJS'].includes(forcedCategory)) {
        setActiveMainTab('GAME_PLANS');
      } else if (['CLOUD', 'VPS', 'V2RAY'].includes(forcedCategory)) {
        setActiveMainTab('CLOUD_SERVICES');
      } else {
        setActiveMainTab('DEDICATED');
      }
    }
  }, [forcedCategory]);

  const mainTabs = [
    { id: 'GAME_PLANS' as MainTab, label: 'Game Hosting', icon: '🎮' },
    { id: 'CLOUD_SERVICES' as MainTab, label: 'Cloud / VPS', icon: '☁️' },
    { id: 'DEDICATED' as MainTab, label: 'Dedicated', icon: '⚡' }
  ];

  const subCategories: Record<MainTab, { id: HostingCategory; icon: string; name: string }[]> = {
    GAME_PLANS: [
      { id: 'MINECRAFT', icon: '⛏️', name: 'Minecraft' },
      { id: 'ARK', icon: '🦕', name: 'ARK' },
      { id: 'RUST', icon: '☢️', name: 'Rust' },
      { id: 'MTA', icon: '🚗', name: 'MTA' },
      { id: 'NODEJS', icon: '📦', name: 'NodeJS' },
    ],
    CLOUD_SERVICES: [
      { id: 'VPS', icon: '🖥️', name: 'Standard VPS' },
      { id: 'CLOUD', icon: '☁️', name: 'Cloud VMs' },
      { id: 'V2RAY', icon: '🚀', name: 'V2Ray' },
    ],
    DEDICATED: [
      { id: 'DEDICATED', icon: '⚡', name: 'Bare Metal Ryzen' },
    ]
  };

  const filteredPlans = PLANS.filter(p => p.category === activeCategory);

  return (
    <div id="pricing" className="max-w-7xl mx-auto px-4 relative">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase text-white">
          {forcedCategory ? `${forcedCategory}` : 'PICK YOUR DREAM'}
        </h2>
        
        <div className="flex flex-col items-center mt-12 mb-8">
           <div className="flex gap-4 p-1.5 rounded-3xl bg-[#0b0e14]/80 border border-white/5 shadow-2xl">
              <button 
                onClick={() => setBillingCycle('MONTHLY')}
                className={`relative px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${billingCycle === 'MONTHLY' ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('QUARTERLY')}
                className={`relative px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${billingCycle === 'QUARTERLY' ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Quarterly
                <span className="absolute -top-3 -right-3 bg-green-500 text-black text-[8px] font-black px-2 py-1 rounded-lg transform rotate-6 border border-black/10">10% OFF</span>
              </button>
              <button 
                onClick={() => setBillingCycle('ANNUALLY')}
                className={`relative px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${billingCycle === 'ANNUALLY' ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Annually
                <span className="absolute -top-3 -right-3 bg-green-500 text-black text-[8px] font-black px-2 py-1 rounded-lg transform rotate-6 border border-black/10">20% OFF</span>
              </button>
           </div>
        </div>
      </div>

      {!forcedCategory && (
        <div className="flex flex-col items-center gap-10 mb-16 relative z-10">
          <div className="bg-white/5 p-1.5 rounded-[2rem] flex flex-wrap justify-center gap-1 border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveMainTab(tab.id); setActiveCategory(subCategories[tab.id][0].id); }}
                className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-xs uppercase transition-all ${
                  activeMainTab === tab.id
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {subCategories[activeMainTab].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-blue-500/10 border-blue-500/50 text-blue-400'
                    : 'glass border-transparent text-gray-600 hover:text-gray-400'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <PlanCard 
              key={plan.id} 
              plan={plan} 
              currency={currency}
              cycle={billingCycle}
              onAdd={() => onAddToCart({ ...plan, category: activeCategory })} 
            />
          ))
        ) : (
          <div className="col-span-full py-24 text-center glass rounded-[3rem] border border-white/5">
            <svg className="w-16 h-16 text-gray-800 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            <p className="text-gray-700 font-black uppercase tracking-[0.5em]">Inventory empty for this category.</p>
          </div>
        )}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-5 -z-10">
         <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="" />
      </div>
    </div>
  );
};

const PlanCard: React.FC<{ plan: Plan; onAdd: () => void; currency: 'LKR' | 'EUR'; cycle: BillingCycle }> = ({ plan, onAdd, currency, cycle }) => {
  const isDedicated = plan.category === 'DEDICATED';
  const isMinecraft = plan.category === 'MINECRAFT';
  
  let cycleDiscount = 0;
  let multiplier = 1;
  if (cycle === 'QUARTERLY') { cycleDiscount = 10; multiplier = 3; }
  if (cycle === 'ANNUALLY') { cycleDiscount = 20; multiplier = 12; }

  const totalDiscount = (isDedicated ? 0 : DISCOUNT_PERCENT) + cycleDiscount;
  const discountedMonthlyLKR = Math.floor(plan.price * (1 - totalDiscount / 100));
  const finalPriceLKR = discountedMonthlyLKR * multiplier;
  
  const finalPrice = currency === 'LKR' ? finalPriceLKR : (finalPriceLKR * LKR_TO_EUR).toFixed(2);
  const symbol = currency === 'LKR' ? '₨' : '€';

  return (
    <div className={`glass p-10 rounded-[3rem] flex flex-col hover:border-blue-500/50 transition-all hover:shadow-[0_0_80px_rgba(59,130,246,0.1)] group relative overflow-hidden border border-white/5 ${plan.isRecommended ? 'ring-2 ring-blue-500 ring-offset-4 ring-offset-[#030712] scale-105 z-20 shadow-2xl shadow-blue-500/10' : ''}`}>
      <div className={`absolute top-0 right-0 w-40 h-40 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:opacity-100 opacity-40 transition-opacity ${isDedicated ? 'bg-blue-600' : 'bg-blue-500'}`} />
      
      {plan.isRecommended && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-[0.2em] z-20 shadow-lg shadow-blue-600/20">Recommended</div>
      )}

      <div className="flex justify-between items-start mb-10 relative z-10">
        <div>
          <h3 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
            {plan.ram}GB
          </h3>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 leading-none">
            {isMinecraft ? 'Minecraft Node' : isDedicated ? 'Bare Metal' : 'VPS Instance'}
          </p>
        </div>
        {isMinecraft && (
          <img src={DIRT_BLOCK_URL} className="w-12 h-12 drop-shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" alt="Dirt Block" />
        )}
      </div>

      <div className="mb-10 relative z-10">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base text-gray-500 font-black">{symbol}</span>
            <span className="text-5xl font-black text-white tracking-tighter">
              {currency === 'LKR' ? Number(finalPrice).toLocaleString() : finalPrice}
            </span>
          </div>
          <p className="text-[10px] text-gray-600 font-bold uppercase mt-2 tracking-widest">
            {cycle === 'MONTHLY' ? 'Monthly' : cycle === 'QUARTERLY' ? 'Per Quarter' : 'Per Year'} renewal
          </p>
        </div>
      </div>

      <div className="space-y-5 mb-12 flex-grow relative z-10">
        <FeatureItem label={plan.cpu || `${plan.cores} Dedicated vCores`} />
        <FeatureItem label={`${plan.disk}GB NVMe Storage`} />
        <FeatureItem label="Advanced DDoS Protection" />
        <FeatureItem label="SGNS Singapore Node" />
      </div>

      <button
        onClick={onAdd}
        className="w-full py-5 bg-white/5 hover:bg-blue-600 text-blue-500 hover:text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] transition-all border border-blue-500/20 hover:border-blue-500 shadow-xl active:scale-95 flex items-center justify-center gap-2 group-hover:gap-4"
      >
        Order Now <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
      </button>
    </div>
  );
};

const FeatureItem = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4 text-[10px] text-gray-400 font-black uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
    <div className="w-5 h-5 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
      <svg className="w-3 h-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    {label}
  </div>
);

export default PricingSection;
