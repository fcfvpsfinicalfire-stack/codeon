
import React, { useState } from 'react';
import { TEAM } from '../constants';
import { TeamMember } from '../types';

const TeamSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyDiscord = (discord: string) => {
    navigator.clipboard.writeText(discord);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="team" className="py-24 px-4 lg:px-24 bg-[#030712] border-t border-white/5 min-h-screen relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="bg-purple-600/20 text-purple-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-purple-500/20 mb-6 inline-block">
            Our Foundation
          </span>
          <h2 className="text-6xl font-black text-white tracking-tighter mb-4 uppercase">The <span className="text-purple-500">Dream Team</span></h2>
          <p className="text-gray-500 font-bold max-w-2xl mx-auto uppercase text-[10px] tracking-[0.25em] leading-relaxed">
            Click on a member to view their professional Discord contact.
          </p>
        </div>

        <div className="mb-24">
          <h3 className="text-center text-sm font-black text-purple-400 uppercase tracking-[0.5em] mb-12 opacity-50">Founders</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.founders.map((founder, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedMember(founder)}
                className="glass p-10 rounded-[3rem] border border-purple-500/20 text-center relative overflow-hidden group hover:bg-white/5 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer active:scale-95"
              >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[100px] -mr-16 -mt-16 group-hover:bg-purple-500/20 transition-all" />
                 <div className="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-purple-500/30 group-hover:scale-110 transition-transform overflow-hidden">
                    {founder.avatar ? (
                      <img src={founder.avatar} alt={founder.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <span className="text-3xl font-black text-purple-400">{founder.name[0]}</span>
                    )}
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
              <div 
                key={i} 
                onClick={() => setSelectedMember(member)}
                className="glass p-8 rounded-3xl border border-white/5 hover:bg-white/5 hover:border-purple-500/30 transition-all group cursor-pointer active:scale-95 flex flex-col items-center"
              >
                 <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-5 overflow-hidden group-hover:border-purple-500/30 transition-all flex items-center justify-center">
                   {member.avatar ? (
                     <img src={member.avatar} alt={member.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                   ) : (
                     <span className="text-xl font-black text-gray-600 group-hover:text-purple-400 transition-colors">{member.name[0]}</span>
                   )}
                 </div>
                 <h4 className="font-black text-white mb-3 text-lg group-hover:text-purple-400 transition-colors uppercase tracking-tight text-center">{member.name}</h4>
                 <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.15em] leading-relaxed text-center">
                    {member.role}
                 </p>
                 <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-[8px] font-black text-purple-500 uppercase tracking-widest">View Discord</span>
                    <svg className="w-3 h-3 text-purple-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.069.069 0 00-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.862-1.297 1.197-1.99a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.863-.886.077.077 0 01-.003-.129c.125-.094.252-.192.372-.293a.074.074 0 01.077-.01c3.927 1.8 8.18 1.8 12.067 0a.074.074 0 01.078.01c.12.101.246.199.373.293a.077.077 0 01-.002.129 12.817 12.817 0 01-1.863.886.076.076 0 00-.041.106c.333.693.733 1.36 1.195 1.99a.077.077 0 00.084.028 19.831 19.831 0 005.993-3.03.076.076 0 00.032-.057c.489-5.279-.851-9.76-3.411-13.66a.066.066 0 00-.032-.027z"/></svg>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Professional Member Discord Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300" 
            onClick={() => setSelectedMember(null)} 
          />
          <div className="relative w-full max-w-md glass rounded-[3.5rem] p-12 border border-purple-500/30 shadow-3xl animate-in zoom-in-95 duration-500 text-center">
             <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] -mr-32 -mt-32 rounded-full pointer-events-none" />
             
             <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full text-gray-500 hover:text-white transition-all"
             >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>

             <div className="w-32 h-32 bg-white/5 rounded-[2.5rem] border border-purple-500/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(88,101,242,0.1)] overflow-hidden relative">
                {selectedMember.avatar ? (
                  <img src={selectedMember.avatar} alt={selectedMember.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-16 h-16 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.862-1.297 1.197-1.99a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.863-.886.077.077 0 0 1-.003-.129c.125-.094.252-.192.372-.293a.074.074 0 0 1 .077-.01c3.927 1.8 8.18 1.8 12.067 0a.074.074 0 0 1 .078.01c.12.101.246.199.373.293a.077.077 0 0 1-.002.129 12.817 12.817 0 0 1-1.863.886.076.076 0 0 0-.041.106c.333.693.733 1.36 1.195 1.99a.077.077 0 0 0 .084.028 19.831 19.831 0 0 0 5.993-3.03.076.076 0 0 0 .032-.057c.489-5.279-.851-9.76-3.411-13.66a.066.066 0 0 0-.032-.027ZM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>
                  </svg>
                )}
                {/* Discord presence dot */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-[#0b0e14] shadow-lg shadow-green-500/20" title="Online on Discord" />
             </div>

             <h4 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">{selectedMember.name}</h4>
             <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] mb-10">{selectedMember.role}</p>

             <div className="bg-[#0b0e14] border border-white/5 p-6 rounded-[2rem] flex flex-col items-center gap-4 group relative overflow-hidden">
                <div className="absolute inset-0 bg-[#5865F2]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                   <svg className="w-3 h-3 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.862-1.297 1.197-1.99a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.863-.886.077.077 0 0 1-.003-.129c.125-.094.252-.192.372-.293a.074.074 0 0 1 .077-.01c3.927 1.8 8.18 1.8 12.067 0a.074.074 0 0 1 .078.01c.12.101.246.199.373.293a.077.077 0 0 1-.002.129 12.817 12.817 0 0 1-1.863.886.076.076 0 0 0-.041.106c.333.693.733 1.36 1.195 1.99a.077.077 0 0 0 .084.028 19.831 19.831 0 0 0 5.993-3.03.076.076 0 0 0 .032-.057c.489-5.279-.851-9.76-3.411-13.66a.066.066 0 0 0-.032-.027ZM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/></svg>
                   Discord Identity
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-black text-white selection:bg-[#5865F2]/30">{selectedMember.discord}</span>
                  <button 
                    onClick={() => handleCopyDiscord(selectedMember.discord)}
                    className={`p-2 rounded-xl transition-all ${copied ? 'bg-green-500/20 text-green-500' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-[#5865F2]/20 hover:border-[#5865F2]/50 border border-transparent'}`}
                  >
                    {copied ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    )}
                  </button>
                </div>
                {copied && <span className="text-[8px] font-black text-green-500 uppercase tracking-widest animate-in fade-in zoom-in-90">Copied to Clipboard!</span>}
             </div>

             <div className="mt-10 pt-10 border-t border-white/5">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
                  Join our Discord server to open a ticket and speak with {selectedMember.name} directly regarding your server configurations.
                </p>
             </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamSection;
