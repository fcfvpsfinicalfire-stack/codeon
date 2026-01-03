import React, { useState, useEffect } from 'react';
import { PLANS, DISCOUNT_PERCENT, LKR_TO_EUR, DIRT_BLOCK_URL, NEW_YEAR_COUPON } from '../constants';
import { Plan, HostingCategory, BillingCycle } from '../types';

interface PricingSectionProps {
  onAddToCart: (plan: Plan) => void;
  forcedCategory?: HostingCategory;
  currency: 'LKR' | 'EUR';
  billingCycle: BillingCycle;
  setBillingCycle: (c: BillingCycle) => void;
}

type MainTab = 'GAME_PLANS' | 'CLOUD_SERVICES' | 'DEDICATED';

const CategoryIcons: Record<string, React.ReactNode> = {
  MINECRAFT: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
      <path d="M21 6V18M3 6V18" strokeLinecap="round" />
      <rect x="7" y="2" width="10" height="20" rx="1" />
    </svg>
  ),
  ARK: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L2 22h20L12 2zm0 4.5L18.5 20H5.5L12 6.5z" />
    </svg>
  ),
  RUST: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fillOpacity="0.2" />
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
    </svg>
  ),
  MTA: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
  ),
  NODEJS: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L1 7v10l11 5 11-5V7L12 2zm0 2.8L20 8.5v7l-8 3.7-8-3.7v-7l8-3.7z" />
    </svg>
  ),
  VPS: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  CLOUD: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.5 19c3.037 0 5.5-2.463 5.5-5.5 0-2.793-2.078-5.1-4.78-5.46a7 7 0 00-13.44 1.46c-2.31 0-4.18 1.87-4.18 4.18 0 2.31 1.87 4.18 4.18 4.18h12.72z" />
    </svg>
  ),
  DEDICATED: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm13-12H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1zM7 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm13-9H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
  )
};

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
      } else if (['CLOUD', 'VPS'].includes(forcedCategory)) {
        setActiveMainTab('CLOUD_SERVICES');
      } else {
        setActiveMainTab('DEDICATED');
      }
    }
  }, [forcedCategory]);

  const mainTabs = [
    { 
      id: 'GAME_PLANS' as MainTab, 
      label: 'Game Hosting', 
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg> 
    },
    { 
      id: 'CLOUD_SERVICES' as MainTab, 
      label: 'Cloud / VPS', 
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg> 
    },
    { 
      id: 'DEDICATED' as MainTab, 
      label: 'Dedicated', 
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.38.66l-5.88 10.34z"/></svg> 
    }
  ];

  const subCategories: Record<MainTab, { id: HostingCategory; name: string }[]> = {
    GAME_PLANS: [
      { id: 'MINECRAFT', name: 'Minecraft' },
      { id: 'ARK', name: 'ARK' },
      { id: 'RUST', name: 'Rust' },
      { id: 'MTA', name: 'Multi Theft Auto' },
      { id: 'NODEJS', name: 'NodeJS' },
    ],
    CLOUD_SERVICES: [
      { id: 'VPS', name: 'Standard VPS' },
      { id: 'CLOUD', name: 'Cloud VMs' },
    ],
    DEDICATED: [
      { id: 'DEDICATED', name: 'Bare Metal Ryzen' },
    ]
  };

  const filteredPlans = PLANS.filter(p => p.category === activeCategory);

  return (
    <div id="pricing" className="max-w-7xl mx-auto px-4 relative">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase text-white">
          {forcedCategory ? forcedCategory : 'PICK YOUR DREAM'}
        </h2>
        <p className="text-cyan-400 font-black text-xs uppercase tracking-[0.3em] mb-12">
          Use code <span className="text-white px-2 py-1 bg-cyan-400/20 rounded-lg">{NEW_YEAR_COUPON}</span> at checkout for an extra 26% discount!
        </p>

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
          <div className="bg-[#0b0e14]/90 p-1.5 rounded-[2rem] flex flex-wrap justify-center gap-1 border border-white/5 shadow-2xl overflow-hidden">
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
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {subCategories[activeMainTab].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-blue-500/10 border-blue-500/50 text-blue-400'
                    : 'glass border-transparent text-gray-600 hover:text-gray-400'
                }`}
              >
                <div className={`${activeCategory === cat.id ? 'text-blue-400' : 'text-gray-700'}`}>
                  {CategoryIcons[cat.id]}
                </div>
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
        className={`w-full py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] transition-all border shadow-xl active:scale-95 flex items-center justify-center gap-2 group-hover:gap-4 bg-white/5 hover:bg-blue-600 text-blue-500 hover:text-white border-blue-500/20 hover:border-blue-500`}
      >
        Deploy Now <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
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