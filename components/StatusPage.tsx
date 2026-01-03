
import React, { useState, useEffect, useRef } from 'react';
import { LOCATIONS, DISCORD_URL } from '../constants';

const services = [
  { id: 'mc-cluster', name: 'Minecraft Node Cluster', type: 'Gaming', uptime: '99.98%' },
  { id: 'rust-nodes', name: 'Rust Server Group', type: 'Gaming', uptime: '99.95%' },
  { id: 'vps-hv', name: 'VPS Hypervisors', type: 'Infrastructure', uptime: '100%' },
  { id: 'v2ray-gw', name: 'V2Ray Gateway', type: 'Network', uptime: '99.99%' },
  { id: 'cloud-db', name: 'Cloud Databases', type: 'Storage', uptime: '100%' },
  { id: 'api-gate', name: 'Public API', type: 'API', uptime: '99.99%' },
];

const incidents = [
  { date: 'Oct 24, 2024', title: 'Scheduled Maintenance: SGNS Data Center', status: 'Resolved', desc: 'Hardware upgrades performed on Singapore Node-01. Completed without unexpected downtime.' },
  { date: 'Sep 12, 2024', title: 'Network Congestion: London Uplink', status: 'Resolved', desc: 'Routing issues identified with upstream provider in UK region. Mitigation applied via Level3 rerouting.' },
  { date: 'Aug 01, 2024', title: 'DDoS Attack Mitigation', status: 'Resolved', desc: 'Detected 450Gbps UDP flood targeting Rust Node-04. Automatically filtered by CodeOn Shield.' },
];

const MAX_HISTORY = 20;

const Sparkline: React.FC<{ data: number[]; color: string; min: number; max: number }> = ({ data, color, min, max }) => {
  if (data.length < 2) return null;
  
  const width = 200;
  const height = 40;
  const padding = 2;
  
  const range = max - min || 1;
  const points = data.map((val, i) => {
    const x = (i / (MAX_HISTORY - 1)) * width;
    const y = height - ((val - min) / range) * (height - padding * 2) - padding;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`M 0,${height} L ${points} L ${width},${height} Z`}
        fill={`url(#gradient-${color})`}
      />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        className="drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]"
      />
    </svg>
  );
};

const StatusPage: React.FC = () => {
  const [livePings, setLivePings] = useState<Record<string, number>>({});
  const [loadValues, setLoadValues] = useState<Record<string, number>>({});
  const [pingHistory, setPingHistory] = useState<Record<string, number[]>>({});
  const [loadHistory, setLoadHistory] = useState<Record<string, number[]>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Subscription state
  const [selectedSubs, setSelectedSubs] = useState<string[]>(['mc-cluster', 'SG']);

  useEffect(() => {
    const generateStats = () => {
      const pings: Record<string, number> = {};
      const loads: Record<string, number> = {};
      
      LOCATIONS.forEach(loc => {
        pings[loc.id] = parseInt(loc.ping) + (Math.random() * 6 - 3);
      });
      
      services.forEach(s => {
        loads[s.id] = 10 + Math.random() * 45;
      });
      
      setLivePings(pings);
      setLoadValues(loads);

      setPingHistory(prev => {
        const next = { ...prev };
        LOCATIONS.forEach(loc => {
          const current = next[loc.id] || Array(MAX_HISTORY).fill(parseInt(loc.ping));
          next[loc.id] = [...current.slice(1), pings[loc.id]];
        });
        return next;
      });

      setLoadHistory(prev => {
        const next = { ...prev };
        services.forEach(s => {
          const current = next[s.id] || Array(MAX_HISTORY).fill(25);
          next[s.id] = [...current.slice(1), loads[s.id]];
        });
        return next;
      });
    };

    generateStats();
    const interval = setInterval(generateStats, 3000);
    return () => clearInterval(interval);
  }, []);

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const toggleSub = (id: string) => {
    setSelectedSubs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="pt-32 pb-40 px-4 lg:px-24 min-h-screen bg-[#030712] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/5 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-[3rem] p-12 border border-green-500/20 mb-16 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] -mr-32 -mt-32 animate-pulse" />
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex items-center gap-8">
                 <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                    <svg className="w-12 h-12 text-green-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                 </div>
                 <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">All Systems Operational</h1>
                    <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">CodeOn Infrastructure is performing at peak capacity.</p>
                 </div>
              </div>
              <div className="flex flex-col items-center md:items-end gap-3">
                 <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-green-400">
                    Average Uptime: 99.99%
                 </div>
                 <button 
                  onClick={triggerRefresh}
                  className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
                 >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m0 0H15" /></svg>
                    Refresh Pulse
                 </button>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
           {services.map(service => (
             <div key={service.id} className="glass p-8 rounded-[2.5rem] border border-white/5 group hover:border-blue-500/30 transition-all flex flex-col">
                <div className="flex justify-between items-start mb-6">
                   <div>
                      <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">{service.name}</h3>
                      <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{service.type}</span>
                   </div>
                   <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)] animate-pulse" />
                </div>
                
                <div className="flex-1 space-y-4">
                   <div className="flex justify-between items-end">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Load History</span>
                      <span className="text-sm font-black text-white">{(loadValues[service.id] || 0).toFixed(1)}%</span>
                   </div>
                   
                   <div className="h-12 flex items-end">
                      <Sparkline 
                        data={loadHistory[service.id] || []} 
                        color="#3b82f6" 
                        min={0} 
                        max={100} 
                      />
                   </div>

                   <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">30d Uptime</span>
                      <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{service.uptime}</span>
                   </div>
                </div>
             </div>
           ))}
        </div>

        <div className="mb-24">
           <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-10 flex items-center gap-4">
              <span className="w-8 h-1 bg-blue-500 rounded-full" />
              Infrastructure Nodes
           </h2>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {LOCATIONS.map(loc => (
                <div key={loc.id} className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center gap-8 group">
                   <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-4xl shadow-inner border border-white/5 group-hover:scale-110 transition-transform flex-shrink-0">
                      {loc.flag}
                   </div>
                   <div className="flex-1 text-center md:text-left min-w-0">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <h4 className="text-xl font-black text-white uppercase tracking-tighter">{loc.name}</h4>
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[8px] font-black rounded-lg border border-green-500/20 uppercase">Online</span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 truncate">{loc.datacenter}</p>
                      
                      <div className="h-10">
                        <Sparkline 
                          data={pingHistory[loc.id] || []} 
                          color="#22d3ee" 
                          min={Math.max(0, parseInt(loc.ping) - 10)} 
                          max={parseInt(loc.ping) + 10} 
                        />
                      </div>
                   </div>
                   <div className="text-center md:text-right flex-shrink-0">
                      <div className="text-2xl font-black text-white tracking-tighter">{(livePings[loc.id] || 0).toFixed(0)} ms</div>
                      <div className="text-[9px] font-black text-gray-700 uppercase tracking-widest">Avg Latency</div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="max-w-4xl mx-auto mb-32">
           <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-10 flex items-center gap-4">
              <span className="w-8 h-1 bg-purple-500 rounded-full" />
              Past Incidents
           </h2>
           <div className="space-y-8 relative before:absolute before:left-8 before:top-2 before:bottom-0 before:w-px before:bg-white/5">
              {incidents.map((incident, i) => (
                <div key={i} className="relative pl-20 group">
                   <div className="absolute left-[30px] top-2 w-4 h-4 rounded-full bg-[#030712] border-2 border-green-500 z-10 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                   <div className="glass p-8 rounded-[2rem] border border-white/5 group-hover:border-white/10 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                         <h4 className="text-lg font-black text-white uppercase tracking-tight">{incident.title}</h4>
                         <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{incident.date}</span>
                      </div>
                      <p className="text-xs text-gray-400 font-bold leading-relaxed uppercase tracking-tight mb-4">{incident.desc}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-lg text-green-500 text-[9px] font-black uppercase tracking-widest border border-green-500/20">
                         <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                         {incident.status}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Subscription / Notification Section */}
        <div className="glass p-12 rounded-[3.5rem] border border-blue-500/20 text-center relative overflow-hidden">
           <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
           <div className="relative z-10">
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Stay Informed</h3>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed mb-12 max-w-xl mx-auto">
                Configure your alerts below and subscribe to receive real-time notifications via email or Discord for specific services and regions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 text-left">
                {/* Service Selection */}
                <div>
                   <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Target Services</h5>
                   <div className="flex flex-wrap gap-2">
                      {services.map(s => (
                        <button 
                          key={s.id} 
                          onClick={() => toggleSub(s.id)}
                          className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${selectedSubs.includes(s.id) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/20'}`}
                        >
                          {s.name.split(' ')[0]}
                        </button>
                      ))}
                   </div>
                </div>
                
                {/* Region Selection */}
                <div>
                   <h5 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] mb-4">Node Regions</h5>
                   <div className="flex flex-wrap gap-2">
                      {LOCATIONS.map(l => (
                        <button 
                          key={l.id} 
                          onClick={() => toggleSub(l.id)}
                          className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${selectedSubs.includes(l.id) ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/20'}`}
                        >
                          {l.name}
                        </button>
                      ))}
                   </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                 <a 
                   href="https://status.codeon.codes" 
                   target="_blank" 
                   className="px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-600/30 active:scale-95 flex items-center gap-3 group"
                 >
                    Subscribe to Alerts
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                 </a>
                 <a 
                   href={DISCORD_URL} 
                   target="_blank" 
                   className="px-12 py-5 glass hover:bg-white/10 text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] transition-all border border-white/10 active:scale-95 flex items-center justify-center gap-3"
                 >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.069.069 0 00-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.862-1.297 1.197-1.99a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.863-.886.077.077 0 01-.003-.129c.125-.094.252-.192.372-.293a.074.074 0 01.077-.01c3.927 1.8 8.18 1.8 12.067 0a.074.074 0 01.078.01c.12.101.246.199.373.293a.077.077 0 01-.002.129 12.817 12.817 0 01-1.863.886.076.076 0 00-.041.106c.333.693.733 1.36 1.195 1.99a.077.077 0 00.084.028 19.831 19.831 0 005.993-3.03.076.076 0 00.032-.057c.489-5.279-.851-9.76-3.411-13.66a.066.066 0 00-.032-.027z"/></svg>
                    Join Discord
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
