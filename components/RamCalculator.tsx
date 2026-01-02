
import React, { useState, useMemo } from 'react';
import { PLANS, DISCOUNT_PERCENT, LKR_TO_EUR } from '../constants';

const versionData = [
  { id: '1.21', label: "Minecraft version 1.21 or newer", minBase: 4 },
  { id: '1.20', label: "Minecraft version 1.20.x", minBase: 3.5 },
  { id: '1.19', label: "Minecraft version 1.19.x", minBase: 3 },
  { id: '1.18', label: "Minecraft version 1.18.x", minBase: 2.5 },
  { id: 'Legacy', label: "Legacy Versions (1.8 - 1.17)", minBase: 1.5 }
];

const RamCalculator: React.FC<{ onOrder: (plan: any) => void, currency: string }> = ({ onOrder, currency }) => {
  const [serverType, setServerType] = useState('Vanilla');
  const [players, setPlayers] = useState(2);
  const [mods, setMods] = useState(0);
  const [isOptimized, setIsOptimized] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState('1.21');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const serverTypes = [
    { id: 'Vanilla', icon: '📦', sub: 'Java Edition' },
    { id: 'Optimized', icon: '⚙️', sub: 'Paper, Purpur, Spigot' },
    { id: 'Modded', icon: '🧩', sub: 'Forge, Fabric, Quilt' },
    { id: 'Bedrock', icon: '📱', sub: 'Bedrock Edition' }
  ];

  const selectedVersion = versionData.find(v => v.id === selectedVersionId) || versionData[0];

  const recommendation = useMemo(() => {
    // Base RAM depends heavily on version
    let baseRam = selectedVersion.minBase;
    
    // Type multipliers
    if (serverType === 'Modded') baseRam += 2;
    if (serverType === 'Bedrock') baseRam = 1.5; // Bedrock is always lighter

    // Scaling factors
    const playerImpact = players * 0.12; // ~120MB per player
    const modImpact = mods * 0.08;     // ~80MB per mod
    
    // Optimization bonus (reduces total needed)
    const optimizationBonus = isOptimized ? 0.75 : 1.0;

    let targetRam = (baseRam + playerImpact + modImpact) * optimizationBonus;
    
    // Find closest plan from constants (we have 1, 2, 4, 6, 8, 12, 16, 24, 32, 48, 64)
    const mcPlans = PLANS.filter(p => p.category === 'MINECRAFT').sort((a,b) => a.ram - b.ram);
    const plan = mcPlans.find(p => p.ram >= targetRam) || mcPlans[mcPlans.length - 1];
    
    return plan;
  }, [serverType, players, mods, isOptimized, selectedVersionId]);

  const symbol = currency === 'LKR' ? '₨' : '€';
  const price = currency === 'LKR' 
    ? Math.floor(recommendation.price * (1 - DISCOUNT_PERCENT/100)).toLocaleString()
    : ((recommendation.price * (1 - DISCOUNT_PERCENT/100)) * LKR_TO_EUR).toFixed(2);

  return (
    <section id="calculator" className="py-24 px-4 bg-[#030712] relative overflow-hidden scroll-mt-32">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-2">Not sure which one to pick?</h2>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-[0.2em]">Use our RAM calculator to find the perfect server package for your needs.</p>
        </div>

        <div className="glass rounded-[2.5rem] border border-white/5 p-8 lg:p-12 flex flex-col lg:flex-row gap-12 bg-[#080b12]/50">
          {/* Inputs Section */}
          <div className="flex-1 space-y-10">
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                 <h3 className="text-xl font-black text-white">Minecraft Server RAM Calculator</h3>
                 
                 <div className="relative w-full sm:w-auto">
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full bg-[#0b0e14] px-5 py-2.5 rounded-xl text-[10px] font-black text-blue-400 uppercase tracking-widest border border-white/10 flex items-center justify-between gap-3 hover:border-blue-400/30 transition-all shadow-xl"
                    >
                       {selectedVersion.label} <span className={`text-[8px] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute top-full right-0 mt-2 w-full sm:w-64 glass bg-[#0b0e14] border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl animate-in fade-in slide-in-from-top-2">
                        {versionData.map(v => (
                          <div 
                            key={v.id}
                            onClick={() => { setSelectedVersionId(v.id); setIsDropdownOpen(false); }}
                            className={`px-5 py-3 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-blue-400/10 transition-colors ${selectedVersionId === v.id ? 'text-blue-400 bg-blue-400/5' : 'text-gray-500'}`}
                          >
                            {v.label}
                          </div>
                        ))}
                      </div>
                    )}
                 </div>
              </div>
              
              <p className="text-xs text-gray-500 font-bold uppercase mb-8">Select your configuration to get a package recommendation.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {serverTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setServerType(type.id)}
                    className={`p-4 rounded-2xl border transition-all text-left group ${
                      serverType === type.id 
                      ? 'bg-blue-500/10 border-blue-400 ring-2 ring-blue-400/20' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-xl mb-2">{type.icon}</div>
                    <div className={`text-xs font-black uppercase ${serverType === type.id ? 'text-blue-400' : 'text-white'}`}>{type.id}</div>
                    <div className="text-[8px] font-bold text-gray-500 uppercase tracking-tighter">{type.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2">Player Count <span className="text-gray-600 text-lg">ⓘ</span></span>
                  <span className="text-blue-400 font-black">{players}+</span>
               </div>
               <div className="relative py-4">
                  <input 
                    type="range" min="2" max="100" value={players} onChange={(e) => setPlayers(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-blue-900/40 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[9px] font-black text-gray-700 uppercase tracking-widest mt-4">
                    <span>2+</span><span>25+</span><span>50+</span><span>100+</span>
                  </div>
               </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-4">
                 <span className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2">Number of server mods <span className="text-gray-600 text-lg">ⓘ</span></span>
                 <div className="flex items-center gap-4 bg-[#0b0e14] border border-white/10 rounded-2xl p-2 w-fit shadow-inner">
                    <button onClick={() => setMods(Math.max(0, mods-1))} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-white transition-colors bg-white/5 rounded-xl">—</button>
                    <span className="w-12 text-center font-black text-white text-lg">{mods}</span>
                    <button onClick={() => setMods(mods+1)} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-white transition-colors bg-white/5 rounded-xl">+</button>
                 </div>
              </div>
              <div className="flex-1 space-y-4">
                 <span className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2">Using optimization mods? <span className="text-gray-600 text-lg">ⓘ</span></span>
                 <div 
                  onClick={() => setIsOptimized(!isOptimized)}
                  className={`relative w-full h-14 rounded-2xl border transition-all cursor-pointer flex items-center px-4 ${isOptimized ? 'bg-cyan-400/10 border-cyan-400/30' : 'bg-white/5 border-white/10'}`}
                 >
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isOptimized ? 'text-cyan-400' : 'text-gray-500'}`}>
                      {isOptimized ? 'Optimized Enabled' : 'Standard (No Mods)'}
                    </span>
                    <div className={`absolute right-4 w-10 h-6 rounded-full transition-all flex items-center px-1 ${isOptimized ? 'bg-cyan-400' : 'bg-gray-800'}`}>
                       <div className={`w-4 h-4 rounded-full bg-white transition-all transform ${isOptimized ? 'translate-x-4' : 'translate-x-0'} shadow-md`} />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Result Card styled to match image */}
          <div className="w-full lg:w-72">
             <div className="bg-[#0b0e14] rounded-3xl border border-cyan-400/30 overflow-hidden h-full flex flex-col relative group shadow-[0_0_50px_rgba(34,211,238,0.05)]">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 py-2 text-center text-[9px] font-black text-black uppercase tracking-[0.3em] shadow-lg">We Recommend</div>
                
                <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
                   <div className="w-20 h-20 mb-6 group-hover:scale-110 transition-transform duration-500">
                      <img src="https://image2url.com/r2/default/images/1767360297993-31645f26-2dd5-4bd1-a225-1565a07e9b8b.png" className="w-full h-full object-contain filter hue-rotate-[180deg] brightness-125 drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]" />
                   </div>
                   
                   <h4 className="text-2xl font-black text-cyan-400 mb-1 uppercase tracking-tighter">
                      {recommendation.ram <= 2 ? 'Grass' : recommendation.ram <= 4 ? 'Stone' : recommendation.ram <= 8 ? 'Iron' : recommendation.ram <= 16 ? 'Gold' : 'Diamond'}
                   </h4>
                   <div className="text-3xl font-black text-white mb-6">{recommendation.ram} GB <span className="text-gray-600 text-lg uppercase font-bold">RAM</span></div>
                   
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed mb-8 max-w-[180px]">
                      The best package for {serverType.toLowerCase()} on {selectedVersion.id === 'Legacy' ? 'older versions' : `version ${selectedVersion.id}`}.
                   </p>

                   <div className="mt-auto w-full">
                      <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Starting at</div>
                      <div className="text-3xl font-black text-cyan-400 mb-6">{symbol}{price}<span className="text-xs text-gray-500 lowercase ml-1">/mo</span></div>
                      <button 
                        onClick={() => onOrder(recommendation)}
                        className="w-full py-4 bg-transparent border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black text-cyan-400 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all active:scale-95 shadow-lg shadow-cyan-500/5"
                      >
                        Order Now
                      </button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RamCalculator;
