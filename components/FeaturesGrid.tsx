
import React from 'react';
import { FEATURES } from '../constants';

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-[#030712]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">The Infrastructure for Winners</h2>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">Technical specifications designed for 99.9% uptime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <div key={i} className="glass p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group hover:-translate-y-2">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                {feature.icon}
              </div>
              <h4 className="text-xl font-black text-white mb-3 uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h4>
              <p className="text-xs text-gray-500 font-bold leading-relaxed uppercase tracking-tight">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
