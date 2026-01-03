
import React from 'react';
import { PARTNERS, DISCORD_URL } from '../constants';

const PartnersSection: React.FC = () => {
  return (
    <section id="partners" className="py-40 px-4 lg:px-24 bg-[#030712] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="bg-blue-600/20 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-blue-500/20 mb-6 inline-block">
            Our Alliances
          </span>
          <h2 className="text-6xl font-black text-white tracking-tighter mb-4 uppercase">Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Partners</span></h2>
          <p className="text-gray-500 font-bold max-w-2xl mx-auto uppercase text-[10px] tracking-[0.25em] leading-relaxed">
            Proudly supporting the creators and networks who power our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PARTNERS.map((partner, i) => (
            <a 
              key={i} 
              href={partner.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass p-10 rounded-[3rem] border border-white/5 text-center relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-8 ring-4 ring-white/5 group-hover:ring-blue-500/30 transition-all shadow-xl">
                  <img src={partner.img} alt={partner.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                <h4 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter leading-tight">{partner.name}</h4>
                <div className="inline-block px-4 py-1.5 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-blue-400 border border-white/10 mb-6">
                  {partner.type}
                </div>
                
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed mb-8">
                  {partner.name === 'Eclipse Minecraft Network' 
                    ? 'Official Minecraft Network running on high-performance CodeOn nodes. Join their vibrant community today!' 
                    : 'Official CodeOn creator partner helping us build the next generation of gaming communities.'}
                </p>

                <div className="flex items-center justify-center gap-2 text-white font-black uppercase text-[10px] tracking-widest group-hover:text-blue-400 transition-colors">
                  {partner.name === 'Eclipse Minecraft Network' ? 'Join Network' : 'Visit Channel'} <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-24 text-center">
           <div className="glass p-12 rounded-[4rem] border border-white/5 max-w-3xl mx-auto relative overflow-hidden group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[4rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Want to partner with us?</h3>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed mb-8">
                  If you are a content creator or community owner looking for a reliable hosting partner, we'd love to hear from you.
                </p>
                <a href={DISCORD_URL} target="_blank" className="inline-block px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl font-black text-sm uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                  Apply on Discord
                </a>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
