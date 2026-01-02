
import React from 'react';
import { TEAM } from '../constants';

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-24 px-4 lg:px-24 bg-[#030712] border-t border-white/5 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="bg-purple-600/20 text-purple-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-purple-500/20 mb-6 inline-block">
            Our Foundation
          </span>
          <h2 className="text-6xl font-black text-white tracking-tighter mb-4 uppercase">The <span className="text-purple-500">Dream Team</span></h2>
          <p className="text-gray-500 font-bold max-w-2xl mx-auto uppercase text-[10px] tracking-[0.25em] leading-relaxed">
            The masterminds behind CodeOn's high-performance ecosystem.
          </p>
        </div>

        <div className="mb-24">
          <h3 className="text-center text-sm font-black text-purple-400 uppercase tracking-[0.5em] mb-12 opacity-50">Founders</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.founders.map((founder, i) => (
              <div key={i} className="glass p-10 rounded-[3rem] border border-purple-500/20 text-center relative overflow-hidden group hover:bg-white/5 transition-all duration-500 transform hover:-translate-y-2">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[100px] -mr-16 -mt-16 group-hover:bg-purple-500/20 transition-all" />
                 <div className="w-20 h-20 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-purple-500/30 group-hover:scale-110 transition-transform">
                    <span className="text-3xl font-black text-purple-400">{founder.name[0]}</span>
                 </div>
                 <h4 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">{founder.name}</h4>
                 <p className="text-xs font-bold text-gray-500 mb-6 uppercase tracking-widest">{founder.realName}</p>
                 <div className="inline-block px-5 py-2 bg-purple-600/10 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-purple-400 border border-purple-500/20">
                    {founder.role}
                 </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-center text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] mb-12 opacity-50">Operational Experts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.members.map((member, i) => (
              <div key={i} className="glass p-8 rounded-3xl border border-white/5 hover:bg-white/5 hover:border-purple-500/30 transition-all group">
                 <h4 className="font-black text-white mb-3 text-lg group-hover:text-purple-400 transition-colors uppercase tracking-tight">{member.name}</h4>
                 <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.15em] leading-relaxed">
                    {member.role}
                 </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
