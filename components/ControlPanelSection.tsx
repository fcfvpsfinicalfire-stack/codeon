
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Box, Layers, Settings, Database, Check, Square, RefreshCw, Cpu, Activity, Play, ChevronRight, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
  {
    id: 'console',
    name: 'Real-Time Console',
    icon: <Terminal size={18} />,
    description: 'Monitor your server logs and send commands in real-time with zero latency. Features auto-completion and color-coded output.',
    view: 'console'
  },
  {
    id: 'modpack',
    name: 'Modpack Installer',
    icon: <Box size={18} />,
    description: 'One-click installer for over 10,000 modpacks. Automatically handles dependencies and version matching.',
    active: true,
    view: 'modpacks'
  },
  {
    id: 'instances',
    name: 'Server Instances',
    icon: <Layers size={18} />,
    description: 'Create and manage multiple server instances under a single hosting plan. Switch between detailed game modes instantly.',
    view: 'console'
  },
  {
    id: 'config',
    name: 'Config Manager',
    icon: <Settings size={18} />,
    description: 'Tweak every aspect of your server with our powerful, intuitive visual configuration editor.',
    view: 'console'
  },
  {
    id: 'backups',
    name: 'Backups',
    icon: <Database size={18} />,
    description: 'Automated daily backups with one-click restore to keep your progress safe. Off-site storage included.',
    view: 'console'
  }
];


const LiveConsole = () => {
  const [lines, setLines] = useState([
    { time: '14:20:01', type: 'INFO', msg: 'Server starting up...' },
    { time: '14:20:02', type: 'INFO', msg: 'Loading properties...' },
    { time: '14:20:02', type: 'INFO', msg: 'Default game type: SURVIVAL' },
    { time: '14:20:03', type: 'WARN', msg: 'Generating keypair' },
    { time: '14:20:03', type: 'INFO', msg: 'Starting Minecraft server on *:25565' },
  ]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLines(prev => {
        const newLines = [...prev];
        if (newLines.length > 8) newLines.shift();
        const msgs = [
          { type: 'INFO', msg: `Player joined: xX_Gamer_Xx [/${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.0.1]` },
          { type: 'INFO', msg: 'Saving chunks for level \'ServerLevel\'/minecraft:overworld' },
          { type: 'WARN', msg: 'Can\'t keep up! Is the server overloaded?' },
          { type: 'INFO', msg: 'Villager trade updated' },
          { type: 'INFO', msg: 'Async Chat Thread - message parsed' }
        ];
        const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
        const now = new Date();
        newLines.push({
          time: now.toLocaleTimeString('en-US', { hour12: false }),
          type: randomMsg.type,
          msg: randomMsg.msg
        });
        return newLines;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="bg-[#0d1117] font-mono text-xs overflow-hidden h-full flex flex-col p-4 rounded-xl border border-white/5 shadow-inner">
      <div
        className="flex-grow space-y-1 overflow-y-auto no-scrollbar"
        ref={scrollContainerRef}
      >
        {lines.map((l, i) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            key={i}
            className="flex gap-2"
          >
            <span className="text-slate-500">[{l.time}]</span>
            <span className={l.type === 'WARN' ? 'text-yellow-500' : 'text-blue-400'}>[{l.type}]</span>
            <span className="text-slate-300">{l.msg}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-2 flex gap-2 border-t border-white/10 pt-2">
        <span className="text-green-500">{'>'}</span>
        <span className="animate-pulse text-slate-500">_</span>
      </div>
    </div>
  );
}


const ControlPanelSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(features[1]); // Default to Modpack

  return (
    <section className="py-24 bg-[#05080f] relative overflow-hidden">
      {/* Ambient Background Lights */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter"
          >
            Experience the new <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">CodeOn Control Panel</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-lg mx-auto text-lg font-medium leading-relaxed"
          >
            Power meets simplicity. Manage your server with industry-leading tools designed for speed and ease of use.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Feature List */}
          <div className="lg:col-span-4 space-y-3">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                onClick={() => setActiveFeature(feature)}
                className={`group cursor-pointer p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${activeFeature.id === feature.id
                  ? 'bg-[#111827] border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                  : 'bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10'
                  }`}
              >
                {activeFeature.id === feature.id && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-blue-500/5"
                  />
                )}
                <div className="flex items-center space-x-4 relative z-10">
                  <div className={`p-2.5 rounded-xl transition-colors ${activeFeature.id === feature.id ? 'text-white bg-blue-500 shadow-lg shadow-blue-500/30' : 'text-slate-400 bg-white/5 group-hover:text-white'}`}>
                    {feature.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className={`font-bold text-sm uppercase tracking-wide transition-colors ${activeFeature.id === feature.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                      {feature.name}
                    </h3>
                    {activeFeature.id === feature.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-xs text-slate-400 mt-2 leading-relaxed font-medium"
                      >
                        {feature.description}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Mockup Image/UI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50 }}
            className="lg:col-span-8 relative perspective-1000"
          >
            <div className="bg-[#0b0f19] rounded-[2rem] border border-white/10 p-2 shadow-2xl relative transform rotate-y-[-5deg] hover:rotate-y-0 transition-transform duration-700 ease-out">

              {/* Inner Panel Mockup UI */}
              <div className="bg-[#0f1522] rounded-[1.5rem] overflow-hidden border border-white/5 aspect-[16/10] flex flex-col relative z-10">

                {/* Panel Header */}
                <div className="bg-[#131b2c] px-6 py-4 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-6 bg-white/5 rounded-md animate-pulse"></div>
                    <div>
                      <h4 className="text-white font-bold text-sm flex items-center gap-2">
                        My Server <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-500 text-[9px] uppercase tracking-widest border border-green-500/20">Online</span>
                      </h4>
                      <div className="flex items-center space-x-3 text-[10px] text-slate-500 mt-1">
                        <span className="flex items-center"><Cpu size={10} className="mr-1" /> 45% CPU</span>
                        <span className="flex items-center"><Activity size={10} className="mr-1" /> 3.2GB RAM</span>
                        <span className="flex items-center ml-2 border-l border-white/10 pl-2">👥 12/50 Players</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 text-[10px] px-3 py-1.5 rounded-lg font-bold border border-red-500/20 transition-colors uppercase tracking-wider">Stop</button>
                    <button className="bg-green-500 text-white text-[10px] px-4 py-1.5 rounded-lg font-bold shadow-lg shadow-green-500/20 hover:bg-green-400 transition-colors uppercase tracking-wider flex items-center gap-1"><RefreshCw size={10} /> Restart</button>
                  </div>
                </div>

                {/* Subnav */}
                <div className="bg-[#131b2c]/80 px-6 pt-2 flex space-x-6 text-[11px] font-bold text-slate-400 border-b border-white/5 overflow-x-auto no-scrollbar">
                  {['Overview', 'Console', 'Files', 'Networking', 'Modpacks', 'Backups', 'Startup'].map((tab) => (
                    <div
                      key={tab}
                      className={`pb-3 cursor-pointer transition-colors relative ${((activeFeature.view === 'console' && tab === 'Console') || (activeFeature.view === 'modpacks' && tab === 'Modpacks')) ? 'text-blue-400' : 'hover:text-white'}`}
                    >
                      {tab}
                      {((activeFeature.view === 'console' && tab === 'Console') || (activeFeature.view === 'modpacks' && tab === 'Modpacks')) && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-grow p-6 bg-[#0f1522] overflow-hidden relative">

                  <AnimatePresence mode="wait">
                    {activeFeature.view === 'modpacks' ? (
                      <motion.div
                        key="modpacks"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="space-y-6 h-full flex flex-col"
                      >
                        {/* Search Bar */}
                        <div className="flex gap-4 mb-2">
                          <div className="flex-grow bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-2 text-xs text-slate-400 flex items-center gap-2">
                            <Search size={14} /> Search 10,000+ modpacks...
                          </div>
                          <div className="bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-2 text-xs text-slate-400 flex items-center gap-2 cursor-pointer hover:border-white/20">
                            <Filter size={14} /> Categories
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto pr-2 no-scrollbar">
                          {/* Featured Modpack */}
                          <div className="col-span-full bg-gradient-to-r from-blue-900/20 to-[#0b0f19] border border-blue-500/20 rounded-xl p-5 relative group overflow-hidden cursor-pointer hover:border-blue-500/40 transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-50"><Box size={60} className="text-blue-500 rotate-12" /></div>
                            <div className="relative z-10">
                              <div className="mb-2 inline-block px-2 py-0.5 rounded bg-blue-500 text-white text-[9px] font-bold uppercase">Featured</div>
                              <h4 className="text-white font-black text-lg">Better Minecraft [FABRIC]</h4>
                              <p className="text-slate-400 text-[10px] mb-4 max-w-xs">Newest Version • 4M+ Downloads • v.1.19.2</p>
                              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-blue-600/20 transition-all">One-Click Install</button>
                            </div>
                          </div>

                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-[#0b0f19] border border-white/5 rounded-xl p-4 hover:border-white/20 transition-all cursor-pointer group hover:-translate-y-1">
                              <div className="w-10 h-10 rounded-lg bg-slate-800 mb-3 overflow-hidden">
                                <div className="w-full h-full bg-slate-700 animate-pulse"></div>
                              </div>
                              <h5 className="text-slate-200 font-bold text-xs mb-1 group-hover:text-blue-400 transition-colors">RLCraft</h5>
                              <p className="text-slate-500 text-[9px]">Shivaxi • 12M Downloads</p>
                            </div>
                          ))}
                        </div>

                      </motion.div>
                    ) : (
                      <motion.div
                        key="console"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="h-full flex flex-col"
                      >
                        <div className="mb-4 flex gap-4">
                          <div className="bg-[#131b2c] p-3 rounded-xl border border-white/5 flex-grow">
                            <p className="text-[10px] text-slate-500 uppercase font-bold">CPU Usage</p>
                            <div className="flex items-end gap-1 h-8 mt-2">
                              {[40, 60, 35, 80, 50, 70, 45, 60].map((h, i) => (
                                <div key={i} className="w-full bg-blue-500/20 rounded-t-sm relative overflow-hidden h-full">
                                  <motion.div
                                    initial={{ height: '0%' }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, repeatType: 'reverse', repeatDelay: Math.random() }}
                                    className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-[#131b2c] p-3 rounded-xl border border-white/5 flex-grow">
                            <p className="text-[10px] text-slate-500 uppercase font-bold">RAM Usage</p>
                            <p className="text-lg font-black text-white mt-1">3.2 <span className="text-xs text-slate-500 font-medium">/ 8 GB</span></p>
                          </div>
                        </div>

                        <LiveConsole />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ControlPanelSection;
