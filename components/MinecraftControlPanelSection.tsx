
import React, { useState } from 'react';
import { Terminal, Box, Layers, Settings, Database, Check, Play, Square, RefreshCw, Bell, ChevronDown } from 'lucide-react';

const features = [
  { 
    id: 'console', 
    name: 'Real-Time Console', 
    icon: <Terminal size={20} />,
    description: 'The console now feels smooth and instant, with a beautiful new design and brand new, reimagined features like message highlighting, filtering & log sharing.',
    active: true
  },
  { 
    id: 'modpack', 
    name: 'Modpack Installer', 
    icon: <Box size={20} />,
    description: 'Manage and find the exact modpacks you need with advanced category and version filtering.'
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

const MinecraftControlPanelSection: React.FC = () => {
  const [activeId, setActiveId] = useState('console');

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
            EXPERIENCE THE NEW <br />
            CODEON HOSTHING CONTROL PANEL
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base font-medium">
            Our new panel has all the features you need and more! Get a new server today and discover them all.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Feature List */}
          <div className="lg:col-span-4 space-y-4">
            {features.map((feature) => (
              <div 
                key={feature.id}
                onClick={() => setActiveId(feature.id)}
                className={`group cursor-pointer p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                  activeId === feature.id 
                    ? 'bg-[#1e2736] border-blue-500/50 shadow-2xl shadow-blue-500/10' 
                    : 'bg-[#141d2b]/50 border-white/5 hover:bg-[#1e2736]/50'
                }`}
              >
                <div className="flex items-center space-x-4 mb-2">
                  <div className={`p-2.5 rounded-lg ${activeId === feature.id ? 'text-blue-500 bg-blue-500/10' : 'text-slate-500'}`}>
                    {feature.icon}
                  </div>
                  <h3 className={`font-bold text-sm md:text-base tracking-tight ${activeId === feature.id ? 'text-white' : 'text-slate-400'}`}>
                    {feature.name}
                  </h3>
                </div>
                
                {activeId === feature.id && (
                  <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="absolute bottom-0 left-0 h-1 bg-blue-500 w-1/3"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Mockup Image/UI Focused on Console */}
          <div className="lg:col-span-8 relative">
            <div className="bg-slate-900/50 rounded-3xl border border-white/10 p-2 shadow-2xl relative">
              <div className="bg-[#0f172a] rounded-2xl overflow-hidden border border-white/5 aspect-[16/10] flex flex-col font-sans">
                
                {/* Panel Header */}
                <div className="bg-[#1e293b] px-6 py-4 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center space-x-4">
                    <div className="text-slate-400 text-xs hover:text-white cursor-pointer flex items-center">
                      <RefreshCw size={12} className="mr-1" /> Go back
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base">My Server</h4>
                      <div className="flex items-center space-x-3 text-[10px] text-slate-500">
                        <span className="flex items-center">⛏️ Minecraft</span>
                        <span>👥 32 total players</span>
                        <span>📦 1.19.2</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                       <Bell size={18} className="text-slate-400" />
                       <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-[#1e293b] rounded-full flex items-center justify-center text-[8px] font-bold">1</span>
                    </div>
                    <div className="flex items-center bg-red-500 rounded-md overflow-hidden">
                       <button className="text-white text-[10px] px-3 py-1.5 font-bold flex items-center">
                         Shut Down
                       </button>
                       <div className="w-px h-4 bg-white/20 self-center"></div>
                       <button className="px-1 text-white">
                         <ChevronDown size={14} />
                       </button>
                    </div>
                  </div>
                </div>

                {/* Subnav Tabs */}
                <div className="bg-[#1e293b]/30 px-6 py-1 flex space-x-6 text-[10px] font-bold text-slate-400 border-b border-white/5 uppercase tracking-wider">
                   <span className="cursor-pointer hover:text-white py-2">Overview</span>
                   <span className="text-blue-500 border-b-2 border-blue-500 py-2">Console</span>
                   <span className="cursor-pointer hover:text-white py-2">Files</span>
                   <span className="cursor-pointer hover:text-white py-2">Config</span>
                   <span className="cursor-pointer hover:text-white py-2">Plugins</span>
                   <span className="cursor-pointer hover:text-white py-2">Modpacks</span>
                </div>

                {/* Console Main Content Area */}
                <div className="flex-grow flex flex-col bg-[#0b0f19] p-0">
                  {/* Console Controls */}
                  <div className="flex items-center justify-between px-6 py-2 border-b border-white/5 bg-[#0b0f19]">
                    <div className="flex space-x-4 text-[10px] font-bold uppercase">
                      <span className="text-white border-b border-white pb-1">Console</span>
                      <span className="text-blue-500 hover:text-blue-400 cursor-pointer">View all 99+</span>
                      <span className="text-red-400 hover:text-red-300 cursor-pointer">Errors 2</span>
                      <span className="text-slate-500 hover:text-slate-400 cursor-pointer">Chat 36</span>
                      <span className="text-slate-500 hover:text-slate-400 cursor-pointer">Debug 24</span>
                    </div>
                    <div className="flex items-center space-x-3 text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                       <span className="cursor-pointer">Commands</span>
                       <span className="text-slate-600">...</span>
                    </div>
                  </div>

                  {/* Log Output Area ... (rest remains same) */}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MinecraftControlPanelSection;
