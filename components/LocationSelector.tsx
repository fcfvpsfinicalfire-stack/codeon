
import React, { useState, useEffect } from 'react';
import { LOCATIONS } from '../constants';

const LocationSelector: React.FC = () => {
  const [nodes, setNodes] = useState(LOCATIONS);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(currentNodes => 
        currentNodes.map(node => {
          // Only jitter nodes that are not in maintenance
          if (node.status === 'Maintenance') return node;
          
          const currentPing = parseInt(node.ping);
          // Random jitter between -3 and +3ms
          const jitter = Math.floor(Math.random() * 7) - 3;
          const newPing = Math.max(1, currentPing + jitter);
          
          return {
            ...node,
            ping: `${newPing} ms`
          };
        })
      );
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const refreshPings = () => {
    // Manually trigger a slightly larger refresh
    setNodes(currentNodes => 
      currentNodes.map(node => {
        const basePing = node.id === 'SG' ? 42 : node.id === 'JP' ? 95 : node.id === 'UK' ? 184 : 240;
        const jitter = Math.floor(Math.random() * 11) - 5;
        return {
          ...node,
          ping: `${basePing + jitter} ms`
        };
      })
    );
    setLastUpdate(new Date());
  };

  return (
    <section className="py-24 px-4 lg:px-24 bg-[#030712]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white tracking-tighter mb-4 uppercase">Global Infrastructure</h2>
          <p className="text-gray-500 font-bold max-w-2xl mx-auto uppercase text-xs tracking-widest leading-relaxed">
            Strategically placed nodes for minimum latency. Your ping depends on your physical distance to our data centers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nodes.map((loc) => {
            const isOutOfStock = loc.stock === 0;
            const isSingapore = loc.id === 'SG';
            const showBest = isSingapore && loc.stock > 0;
            const pingValue = parseInt(loc.ping);
            
            // Determine status badge text and style
            let statusText = loc.status;
            let statusClass = "bg-blue-600/10 text-blue-400 border border-blue-500/20";
            
            if (isOutOfStock) {
              statusText = loc.status || "Out of Stock";
              statusClass = "bg-red-500/10 text-red-500 border border-red-500/20";
            } else if (showBest) {
              statusText = "Best Choice";
              statusClass = "bg-green-500/10 text-green-400 border border-green-500/20 animate-pulse";
            }

            return (
              <div 
                key={loc.id} 
                className={`relative glass p-8 rounded-[2.5rem] border transition-all duration-500 group ${
                  !isOutOfStock 
                  ? 'border-blue-500/20 hover:border-blue-500/50 cursor-pointer hover:bg-blue-500/5 hover:-translate-y-2' 
                  : 'border-white/5 opacity-40 grayscale pointer-events-none'
                }`}
              >
                {/* Background Glow */}
                {!isOutOfStock && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
                )}

                <div className="flex items-center gap-5 mb-6 relative z-10">
                   <div className="flex-1">
                      <h4 className="text-xl font-black text-white leading-tight uppercase tracking-tighter flex items-center gap-2">
                        {loc.name} <span className="text-2xl">{loc.flag}</span>
                      </h4>
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{loc.domain}</p>
                   </div>
                   {statusText && (
                      <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl whitespace-nowrap ${statusClass}`}>
                        {statusText}
                      </span>
                   )}
                </div>

                <div className="space-y-4 border-t border-white/5 pt-6 mt-2 relative z-10">
                   <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className={`text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all duration-700 ${pingValue < 100 ? 'text-green-400' : pingValue < 200 ? 'text-orange-400' : 'text-red-400'}`}>
                          <svg className={`w-3 h-3 ${!isOutOfStock ? 'animate-pulse' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          {loc.ping}
                        </div>
                        {loc.datacenter && (
                          <div className="text-[8px] font-black text-blue-400/50 uppercase tracking-[0.2em]">
                             {loc.datacenter}
                          </div>
                        )}
                      </div>

                      {!isOutOfStock ? (
                        <div className="text-right">
                           <div className="text-[11px] font-black text-white uppercase tracking-widest">{loc.stock} Units</div>
                           <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">In Stock</div>
                        </div>
                      ) : (
                        <div className="text-right">
                           <div className="text-[11px] font-black text-red-500/80 uppercase tracking-widest">Sold Out</div>
                           <div className="text-[8px] font-bold text-gray-700 uppercase tracking-widest">Restocking</div>
                        </div>
                      )}
                   </div>
                </div>

                {/* Hover Indicator */}
                {!isOutOfStock && (
                  <div className="mt-6 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em] flex items-center gap-1">
                      Deploy Here <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-center gap-6">
           <button 
            onClick={refreshPings}
            className="flex items-center gap-3 px-10 py-4 bg-white/5 border border-blue-500/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-blue-600 hover:border-blue-600 transition-all group shadow-xl active:scale-95"
           >
              <svg className="w-4 h-4 text-blue-500 group-hover:text-white group-active:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m0 0H15" /></svg>
              Refresh Latency Stats
           </button>
           <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Global routing auto-updated at {lastUpdate.toLocaleTimeString()}.</p>
        </div>
      </div>
    </section>
  );
};

export default LocationSelector;
