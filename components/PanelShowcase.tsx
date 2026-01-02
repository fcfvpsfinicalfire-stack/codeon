
import React from 'react';

const PanelShowcase: React.FC = () => {
  return (
    <section className="py-24 px-4 lg:px-24 bg-[#030712]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-purple-500 font-black text-[10px] uppercase tracking-[0.3em] bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
            Next-Gen Dashboard
          </span>
          <h2 className="text-5xl md:text-6xl font-black mt-6 mb-4 tracking-tighter text-white">
            Powerful <span className="text-purple-500">Control Panel</span>
          </h2>
          <p className="text-gray-500 font-bold max-w-2xl mx-auto leading-relaxed uppercase text-xs tracking-widest">
            Manage your servers with a sleek, intuitive, and feature-rich dashboard designed for performance.
          </p>
        </div>

        {/* Panel Mockup */}
        <div className="relative group">
          <div className="absolute inset-0 bg-purple-600/10 blur-[120px] rounded-full group-hover:bg-purple-600/20 transition-all duration-700" />
          
          <div className="relative glass rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
            {/* Top Bar Mockup */}
            <div className="bg-[#0b0e14] px-6 py-3 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded text-[10px] text-gray-500 font-bold">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  All Services are Back Again!
                </div>
              </div>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-bold text-gray-400">Status</div>
                <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-bold text-gray-400">Billing</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row h-[600px]">
              {/* Sidebar */}
              <div className="w-16 bg-[#090c10] border-r border-white/5 hidden md:flex flex-col items-center py-6 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-lg ${i === 0 ? 'bg-purple-600/20 text-purple-500' : 'text-gray-700'} flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                  </div>
                ))}
              </div>

              {/* Console Area */}
              <div className="flex-1 bg-[#05070a] p-8 flex flex-col gap-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black text-white flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-green-500" />
                       CodeOn ToP
                    </h3>
                    <div className="flex gap-2">
                       <button className="p-2 bg-green-600/20 text-green-500 rounded-lg"><IconPlay /></button>
                       <button className="p-2 bg-yellow-600/20 text-yellow-500 rounded-lg"><IconRefresh /></button>
                       <button className="p-2 bg-red-600/20 text-red-500 rounded-lg"><IconStop /></button>
                    </div>
                 </div>

                 <div className="flex-1 bg-[#0b0e14] rounded-2xl border border-white/5 p-4 font-mono text-[11px] text-gray-500 overflow-hidden relative">
                    <div className="space-y-1">
                      <div>[CodeOn] Initializing system...</div>
                      <div>[CodeOn] Loading plugins...</div>
                      <div>[CodeOn] Server started on port 25565</div>
                      <div className="text-green-500/50">[CodeOn] Ready for connections!</div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-gray-600 border-t border-white/5 pt-4">
                       <span className="text-xs">»</span>
                       <span className="animate-pulse">_</span>
                    </div>
                 </div>

                 <div className="grid grid-cols-3 gap-4">
                    <StatBox label="CPU Load" val="1.00%" sub="4500MiB" />
                    <StatBox label="Memory" val="2.25 GB" sub="of 16.00 GB" />
                    <StatBox label="Network" val="0.5 KB/s" sub="Inbound" />
                 </div>
              </div>

              {/* Stats Sidebar */}
              <div className="w-full md:w-64 bg-[#090c10] border-l border-white/5 p-6 flex flex-col gap-4">
                 <RightStat label="Address" val="test1.codeon.codes:25565" />
                 <RightStat label="Uptime" val="2h 15m 12s" />
                 <RightStat label="Players" val="12 / 100" />
                 <RightStat label="Disk" val="254.75 MiB / 9.77 GiB" />
                 <RightStat label="Network (Inbound)" val="Offline" />
                 <RightStat label="Network (Outbound)" val="Offline" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatBox = ({ label, val, sub }: any) => (
  <div className="bg-[#0b0e14] p-4 rounded-xl border border-white/5">
    <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">{label}</div>
    <div className="text-lg font-black text-white leading-tight">{val}</div>
    <div className="text-[10px] text-gray-700 font-bold">{sub}</div>
  </div>
);

const RightStat = ({ label, val }: any) => (
  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
    <div className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1">{label}</div>
    <div className="text-[11px] font-bold text-gray-300 break-all">{val}</div>
  </div>
);

const IconPlay = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>;
const IconRefresh = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m0 0H15" /></svg>;
const IconStop = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h12v12H6z" /></svg>;

export default PanelShowcase;
