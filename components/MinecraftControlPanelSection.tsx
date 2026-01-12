import React, { useEffect, useState, useRef } from 'react';
import { Terminal, Box, Layers, Settings, Database, Check, Play, Square, RefreshCw, Bell, ChevronDown, Cpu, HardDrive, Wifi, Command, MoreHorizontal, X, Minus, Maximize2, Download, Search, FileText, ToggleLeft, ToggleRight, Save, Clock, RotateCcw } from 'lucide-react';

const features = [
  {
    id: 'console',
    name: 'Real-Time Console',
    icon: <Terminal size={20} />,
    description: 'The console now feels smooth and instant, with a beautiful new design and brand new, reimagined features like message highlighting, filtering & log sharing.',
  },
  {
    id: 'modpack',
    name: 'Modpack Installer',
    icon: <Box size={20} />,
    description: 'Manage and find the exact modpacks you need with advanced category and version filtering.',
  },
  {
    id: 'instances',
    name: 'Server Instances',
    icon: <Layers size={20} />,
    description: 'Create and manage multiple server instances under a single hosting plan easily.',
  },
  {
    id: 'config',
    name: 'Config Manager',
    icon: <Settings size={20} />,
    description: 'Tweak every aspect of your server with our powerful, intuitive configuration editor.',
  },
  {
    id: 'backups',
    name: 'Backups',
    icon: <Database size={20} />,
    description: 'Automated daily backups with one-click restore to keep your progress safe.',
  }
];

const MinecraftControlPanelSection: React.FC = () => {
  const [activeId, setActiveId] = useState('console');
  const [logs, setLogs] = useState<string[]>([
    "[16:20:01] [Server thread/INFO]: Starting minecraft server version 1.19.2",
    "[16:20:01] [Server thread/INFO]: Loading properties",
    "[16:20:01] [Server thread/INFO]: Default game type: SURVIVAL",
    "[16:20:01] [Server thread/INFO]: Generating keypair",
    "[16:20:01] [Server thread/INFO]: Starting Minecraft server on *:25565",
    "[16:20:02] [Server thread/INFO]: Using default channel type",
    "[16:20:04] [Server thread/INFO]: Preparing level \"world\"",
    "[16:20:05] [Server thread/INFO]: Preparing start region for dimension minecraft:overworld",
    "[16:20:06] [Server thread/INFO]: Time elapsed: 1854 ms",
    "[16:20:06] [Server thread/INFO]: Done (4.892s)! For help, type \"help\"",
    "[16:20:08] [Server thread/INFO]: Codeon-Agent: Hooked into main thread",
    "[16:20:08] [Server thread/INFO]: Timings v2 enabled",
    "[16:21:42] [User Authenticator #1/INFO]: UUID of player Notch is 069a79f4-44e9-4726-a5be-fca90e38aaf5",
    "[16:21:42] [Server thread/INFO]: Notch[/127.0.0.1:54321] logged in with entity id 234 at (-142.5, 64.0, 230.1)",
    "[16:21:42] [Server thread/INFO]: Notch joined the game"
  ]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const newLogs = [
        "[User Authenticator/INFO]: Scanning for updates...",
        "[Server thread/WARN]: Can't keep up! Is the server overloaded?",
        "[Server thread/INFO]: Saving chunks for level 'ServerLevel'...",
        "[Server thread/INFO]: Alex joined the game",
        "[Server thread/INFO]: Steve joined the game",
        "[Async Chat Thread/INFO]: <Notch> Hello world!",
        "[Server thread/INFO]: Backup completed in 0.4s",
      ];
      const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)];
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

      setLogs(prev => [...prev.slice(-15), `[${timestamp}] ${randomLog}`]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const renderContent = () => {
    switch (activeId) {
      case 'modpack':
        return (
          <div className="h-[400px] bg-[#0b0f19] p-6 overflow-y-auto">
            {/* Currently Installed */}
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-green-500" /> Currently Installed
              </h3>
              <div className="bg-[#131b29] border border-green-500/20 rounded-xl p-4 flex items-center gap-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors"></div>
                <img src="https://media.forgecdn.net/avatars/233/468/637088730953930825.png" className="w-12 h-12 rounded-lg bg-slate-800 relative z-10" alt="RLCraft" />
                <div className="flex-grow relative z-10">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-bold text-sm">RLCraft</h4>
                    <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20 font-mono">v2.9.3</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">by Shivaxi • MMO-Item 1.0.0 (Release)</p>
                </div>
                <button className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-600/20 transition-all hover:scale-105 active:scale-95 relative z-10 flex items-center gap-2">
                  <RefreshCw size={12} className="animate-spin-slow" /> Update
                </button>
              </div>
            </div>

            {/* Modpack Browser */}
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-white font-bold text-xs uppercase tracking-widest text-slate-500">Available to Install</h3>
                <div className="h-px bg-white/5 flex-grow"></div>
                <div className="flex items-center gap-2 text-slate-500 bg-[#131b29] px-2 py-1 rounded border border-white/5">
                  <Search size={12} />
                  <span className="text-[10px] font-bold uppercase">Search</span>
                </div>
              </div>

              <div className="space-y-3">
                {/* All The Mods 8 */}
                <div className="bg-[#131b29] border border-white/5 p-4 rounded-xl flex items-center gap-4 group hover:border-blue-500/30 transition-colors hover:bg-[#1a2333]">
                  <img src="https://media.forgecdn.net/avatars/655/65/638069550953930825.png" className="w-12 h-12 rounded-lg bg-slate-800" alt="ATM8" />
                  <div className="flex-grow">
                    <h4 className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors">All The Mods 8</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Bukkit • 2434 downloads</p>
                  </div>
                  <button className="bg-white/5 hover:bg-blue-600 text-white border border-white/10 hover:border-blue-500 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                    Install
                  </button>
                </div>

                {/* Lyra Plugin */}
                <div className="bg-[#131b29] border border-white/5 p-4 rounded-xl flex items-center gap-4 group hover:border-purple-500/30 transition-colors hover:bg-[#1a2333]">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
                    <Box size={20} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-white font-bold text-sm group-hover:text-purple-400 transition-colors">Haven'tLyra</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1 max-w-[200px]">Versatile plugin designed to enhance gameplay...</p>
                  </div>
                  <button className="bg-white/5 hover:bg-purple-600 text-white border border-white/10 hover:border-purple-500 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                    Install
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'instances':
        return (
          <div className="h-[400px] bg-[#0b0f19] p-6 overflow-y-auto space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold text-sm">Active Instances (2/3)</h3>
              <button className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide">
                + New Instance
              </button>
            </div>

            {[
              { name: "Survival SMP", port: "25565", status: "online", players: "12/50", ram: "4GB" },
              { name: "Creative PlotWorld", port: "25566", status: "offline", players: "0/20", ram: "2GB" },
            ].map((server, i) => (
              <div key={i} className="bg-[#131b29] border border-white/5 rounded-xl p-4 flex items-center justify-between group hover:border-white/10">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${server.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{server.name}</h4>
                    <p className="text-[10px] text-slate-500 font-mono">192.168.1.1:{server.port} • {server.ram}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {server.status === 'online' ? (
                    <button className="bg-red-500/10 text-red-500 px-3 py-1.5 rounded text-xs font-bold hover:bg-red-500 hover:text-white transition-colors">Stop</button>
                  ) : (
                    <button className="bg-green-500/10 text-green-500 px-3 py-1.5 rounded text-xs font-bold hover:bg-green-500 hover:text-white transition-colors">Start</button>
                  )}
                  <button className="bg-slate-800 p-1.5 rounded text-slate-400 hover:text-white"><Settings size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'config':
        return (
          <div className="h-[400px] bg-[#0b0f19] p-6 overflow-y-auto font-mono text-sm">
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2 text-slate-400">
                <FileText size={16} />
                <span>server.properties</span>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-blue-500">
                <Save size={12} /> Save Changes
              </button>
            </div>

            <div className="space-y-4">
              {[
                { key: "allow-flight", value: false },
                { key: "difficulty", value: "hard" },
                { key: "gamemode", value: "survival" },
                { key: "max-players", value: "50" },
                { key: "pvp", value: true },
                { key: "spawn-protection", value: "16" },
                { key: "view-distance", value: "12" },
              ].map((prop, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <code className="text-blue-400">{prop.key}</code>
                  {typeof prop.value === 'boolean' ? (
                    <div className="cursor-pointer text-slate-500 hover:text-white">
                      {prop.value ? <ToggleRight size={24} className="text-green-500" /> : <ToggleLeft size={24} />}
                    </div>
                  ) : (
                    <input type="text" defaultValue={prop.value} className="bg-[#131b29] border border-white/10 rounded px-2 py-1 text-right text-slate-300 w-24 focus:border-blue-500 outline-none" />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'backups':
        return (
          <div className="h-[400px] bg-[#0b0f19] p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold text-sm">System Backups</h3>
              <button className="bg-blue-600/10 text-blue-500 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-blue-600 hover:text-white transition-colors">
                + Create Backup
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="grid grid-cols-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2">
                <span className="col-span-2">Backup Name</span>
                <span>Size</span>
                <span className="text-right">Action</span>
              </div>
              {[
                { name: "Daily-Backup-2023-10-24", size: "2.4 GB", time: "2 hours ago" },
                { name: "Pre-Update-v1.19", size: "2.1 GB", time: "1 day ago" },
                { name: "Weekly-Full-Dump", size: "4.8 GB", time: "7 days ago" },
              ].map((backup, i) => (
                <div key={i} className="grid grid-cols-4 items-center bg-[#131b29] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <Database size={16} />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-bold text-xs">{backup.name}</div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1"><Clock size={10} /> {backup.time}</div>
                    </div>
                  </div>
                  <div className="text-slate-400 font-mono text-xs">{backup.size}</div>
                  <div className="flex justify-end gap-2">
                    <button title="Restore" className="p-2 hover:bg-blue-500/20 text-slate-400 hover:text-blue-500 rounded transition-colors"><RotateCcw size={14} /></button>
                    <button title="Download" className="p-2 hover:bg-green-500/20 text-slate-400 hover:text-green-500 rounded transition-colors"><Download size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default: // Console
        return (
          <div className="h-[400px] flex flex-col relative font-mono text-xs bg-[#0b0f19]">
            {/* Console Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#131b29] border-b border-white/5">
              <div className="flex space-x-4">
                <span className="text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">Errors 2</span>
                <span className="text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Info 99+</span>
                <span className="text-yellow-400 font-bold opacity-50">Warn 0</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <RefreshCw size={12} className="cursor-pointer hover:text-white transition-colors hover:rotate-180 duration-500" />
                <MoreHorizontal size={12} className="cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>

            {/* Scrollable Logs */}
            <div
              ref={logContainerRef}
              className="flex-grow p-4 overflow-y-auto space-y-1 scrollbar-hide text-slate-300 font-medium"
              style={{ scrollBehavior: 'smooth' }}
            >
              {logs.map((log, i) => (
                <div key={i} className={`break-all font-mono leading-relaxed ${log.includes('WARN') ? 'text-yellow-400' : log.includes('ERROR') ? 'text-red-400' : log.includes('joined') ? 'text-green-400' : 'text-slate-300'}`}>
                  <span className="opacity-30 mr-3 select-none">{i + 1}</span>
                  {log}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-[#131b29] border-t border-white/5 flex items-center gap-3">
              <div className="text-slate-500"><Command size={14} /></div>
              <input
                type="text"
                placeholder="Type a command..."
                className="bg-transparent border-none outline-none text-white w-full font-mono placeholder-slate-600 text-sm"
              />
              <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-colors">
                Send
              </button>
            </div>

            {/* Gradient Fade for realism */}
            <div className="absolute top-8 left-0 w-full h-8 bg-gradient-to-b from-[#0b0f19] to-transparent pointer-events-none opacity-50"></div>
          </div>
        );
    }
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 animate-in slide-in-from-bottom-8 fade-in duration-700">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
            EXPERIENCE THE NEW <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">CODEON HOSTHING CONTROL PANEL</span>
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
                className={`group cursor-pointer p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${activeId === feature.id
                  ? 'bg-[#1e2736] border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]'
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
                    {/* Progress Bar Animation */}
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-1/3 animate-[loading_2s_ease-in-out_infinite]"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: LIVE Mockup UI */}
          <div className="lg:col-span-8 relative perspective-1000">
            <div className="bg-[#0f172a] rounded-xl border border-white/10 shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]">

              {/* 1. TOP BAR */}
              <div className="bg-[#1e293b] h-12 flex items-center justify-between px-4 border-b border-black">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center"><X size={8} className="text-red-500" /></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500 flex items-center justify-center"><Minus size={8} className="text-yellow-500" /></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center"><Maximize2 size={8} className="text-green-500" /></div>
                  </div>
                  <div className="h-6 w-px bg-white/10 mx-2"></div>
                  <div className="flex items-center space-x-2 text-slate-400 hover:text-white cursor-pointer transition-colors">
                    <RefreshCw size={12} className="text-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-wide">Go Back</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="hidden md:flex items-center space-x-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                    <span className="flex items-center text-slate-300"><Cpu size={10} className="mr-1 text-blue-500" /> 12% CPU</span>
                    <span className="flex items-center text-slate-300"><HardDrive size={10} className="mr-1 text-purple-500" /> 4.2GB RAM</span>
                    <span className="flex items-center text-slate-300"><Wifi size={10} className="mr-1 text-green-500" /> 12ms</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-600/20">
                    MH
                  </div>
                </div>
              </div>

              {/* 2. SERVER STATUS BAR */}
              <div className="bg-[#111827] px-6 py-6 border-b border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-white/10 shadow-inner">
                      <span className="text-2xl">⛏️</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#111827] rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-black text-lg">My Survival Server</h3>
                    <div className="flex items-center space-x-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                      <span>Minecraft 1.19.2</span>
                      <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                      <span className="text-green-400">32 Players Online</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="bg-red-500 hover:bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all active:scale-95 flex items-center gap-2 group">
                    <Square size={10} className="fill-white group-hover:animate-pulse" /> Shut Down
                  </button>
                  <button className="bg-[#1f2937] hover:bg-[#374151] text-white p-3 rounded-lg border border-white/5 transition-colors">
                    <Settings size={14} />
                  </button>
                </div>
              </div>

              {/* 3. NAVIGATION TABS */}
              <div className="bg-[#0f172a] px-6 flex items-center space-x-8 border-b border-white/5">
                {['Overview', 'Console', 'Files', 'Config', 'Plugins', 'Modpacks'].map((tab) => (
                  <div
                    key={tab}
                    onClick={() => {
                      // Simple mapping for standard tabs to feature IDs
                      const map: { [key: string]: string } = { 'Overview': 'console', 'Console': 'console', 'Files': 'config', 'Config': 'config', 'Plugins': 'modpack', 'Modpacks': 'modpack' };
                      if (map[tab]) setActiveId(map[tab]);
                    }}
                    className={`py-4 text-[11px] font-black uppercase tracking-widest cursor-pointer border-b-2 transition-colors ${(tab === 'Console' && activeId === 'console') || (tab === 'Modpacks' && activeId === 'modpack') || (tab === 'Config' && activeId === 'config')
                      ? 'text-blue-500 border-blue-500'
                      : 'text-slate-500 border-transparent hover:text-slate-300'
                      }`}
                  >
                    {tab}
                  </div>
                ))}
              </div>

              {/* 4. DYNAMIC CONTENT AREA */}
              {renderContent()}

            </div>
          </div>

        </div>
      </div>

      <style>{`
          @keyframes loading {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(300%); }
          }
      `}</style>
    </section>
  );
};

export default MinecraftControlPanelSection;
