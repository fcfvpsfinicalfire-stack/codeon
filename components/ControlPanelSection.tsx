
import React, { useState } from 'react';
import { Terminal, Box, Layers, Settings, Database, Check, Play, Square, RefreshCw } from 'lucide-react';

const features = [
  { 
    id: 'console', 
    name: 'Real-Time Console', 
    icon: <Terminal size={20} />,
    description: 'Monitor your server logs and send commands in real-time with zero latency.'
  },
  { 
    id: 'modpack', 
    name: 'Modpack Installer', 
    icon: <Box size={20} />,
    description: 'Manage and find the exact modpacks you need with advanced category and version filtering with CODEON HOSTHING\'s Modpack Installer.',
    active: true
  },
  { 
    id: 'instances', 
    name: 'Server Instances', 
    icon: <Layers size={20} />,
    description: 'Create and manage multiple server instances under a single hosting plan easily.'
  },
  { 
    id: 'config', 
    name: 'Config Manager', 
    icon: <Settings size={20} />,
    description: 'Tweak every aspect of your server with our powerful, intuitive configuration editor.'
  },
  { 
    id: 'backups', 
    name: 'Backups', 
    icon: <Database size={20} />,
    description: 'Automated daily backups with one-click restore to keep your progress safe.'
  }
];

const ControlPanelSection: React.FC = () => {
  const [activeId, setActiveId] = useState('modpack');

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
            Experience the new <br />
            <span className="text-blue-500">CODEON HOSTHING Control Panel</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base font-medium">
            Our new panel has all the features you need and more! Get a new server today and discover them all.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Feature List */}
          <div className="lg:col-span-4 space-y-3">
            {features.map((feature) => (
              <div 
                key={feature.id}
                onClick={() => setActiveId(feature.id)}
                className={`group cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                  activeId === feature.id 
                    ? 'bg-slate-900/80 border-blue-500/50 shadow-lg shadow-blue-500/5' 
                    : 'bg-transparent border-white/5 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${activeId === feature.id ? 'text-blue-500 bg-blue-500/10' : 'text-slate-500 group-hover:text-slate-300'}`}>
                    {feature.icon}
                  </div>
                  <h3 className={`font-bold text-sm uppercase tracking-wide ${activeId === feature.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-400'}`}>
                    {feature.name}
                  </h3>
                </div>
                
                {activeId === feature.id && (
                  <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="h-0.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-2/3 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Mockup Image/UI */}
          <div className="lg:col-span-8 relative">
            <div className="bg-slate-900 rounded-3xl border border-white/10 p-2 shadow-2xl relative">
              {/* Inner Panel Mockup UI */}
              <div className="bg-[#121a2b] rounded-2xl overflow-hidden border border-white/5 aspect-[16/10] flex flex-col">
                {/* Panel Header */}
                <div className="bg-[#1a2333] px-6 py-4 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 text-slate-400 text-xs">
                       <span className="hover:text-white cursor-pointer flex items-center"><RefreshCw size={12} className="mr-1" /> Go back</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">My Server</h4>
                      <div className="flex items-center space-x-3 text-[10px] text-slate-500">
                        <span className="flex items-center"><Check size={10} className="mr-1 text-green-500" /> Minecraft</span>
                        <span>👥 32 total players</span>
                        <span>📦 1.19.2</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500/10 text-green-500 text-[10px] px-2 py-1 rounded-md border border-green-500/20 flex items-center">
                      <Check size={10} className="mr-1" /> Modpack installed on new instance
                    </div>
                    <button className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded font-bold flex items-center">
                      <Square size={10} className="mr-1 fill-white" /> SHUT DOWN
                    </button>
                  </div>
                </div>

                {/* Subnav */}
                <div className="bg-[#1a2333]/50 px-6 py-2 flex space-x-6 text-[11px] font-bold text-slate-400 border-b border-white/5">
                   <span className="cursor-pointer hover:text-white">OVERVIEW</span>
                   <span className="cursor-pointer hover:text-white">CONSOLE</span>
                   <span className="cursor-pointer hover:text-white">FILES</span>
                   <span className="cursor-pointer hover:text-white">CONFIG</span>
                   <span className="cursor-pointer hover:text-white">PLUGINS</span>
                   <span className="text-blue-500 border-b border-blue-500 pb-2 -mb-[9px]">MODPACKS</span>
                </div>

                {/* Main Content Area */}
                <div className="flex-grow p-6 space-y-6 overflow-hidden">
                  {/* Active Modpack Banner */}
                  <div className="relative rounded-xl overflow-hidden h-28 bg-slate-800 border border-white/5 group">
                    <img 
                      src="https://picsum.photos/seed/modpack1/1000/200" 
                      className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                      alt="Current Modpack"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
                    <div className="absolute inset-0 p-4 flex items-center justify-between">
                       <div className="flex items-center space-x-4">
                         <div className="w-16 h-16 rounded bg-slate-700 border border-white/10 shadow-lg overflow-hidden">
                           <img src="https://picsum.photos/seed/box/100/100" alt="icon" />
                         </div>
                         <div>
                            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Currently Installed</span>
                            <h5 className="text-white font-black text-lg">RLCraft <span className="text-slate-500 font-medium text-xs italic">by Shivaxi</span></h5>
                            <p className="text-[10px] text-slate-400">MMO-Item 1.0.0 - (Release)</p>
                         </div>
                       </div>
                       <button className="bg-blue-600 px-4 py-2 rounded text-[11px] font-bold text-white shadow-xl shadow-blue-600/20">UPDATE</button>
                    </div>
                  </div>

                  {/* Grid of modpacks */}
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-slate-800/50 border border-white/5 rounded-xl p-3">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center">
                             <Box size={16} className="text-blue-500" />
                          </div>
                          <div>
                            <h6 className="text-[10px] font-bold text-white">All The Mods 8</h6>
                            <p className="text-[8px] text-slate-500">Bukkit • 2434 downloads</p>
                          </div>
                        </div>
                        <p className="text-[9px] text-slate-500 leading-tight mb-4">
                          Haven'tLyra is a versatile plugin designed to enhance your Minecraft gameplay...
                        </p>
                        <button className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 text-[10px] font-bold py-1.5 rounded border border-blue-500/20 transition-colors">INSTALL</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Glows */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[80px] -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 blur-[80px] -z-10"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ControlPanelSection;
