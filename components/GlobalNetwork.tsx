import React, { useState, useEffect } from 'react';
import { Server, Activity, Shield, Globe, Terminal, Wifi } from 'lucide-react';

interface GlobalNetworkProps {
    theme?: 'amber' | 'red' | 'purple' | 'green';
}

const GlobalNetwork: React.FC<GlobalNetworkProps> = ({ theme = 'blue' }) => {
    // Theme configuration
    const themes = {
        amber: { color: 'text-amber-500', bg: 'bg-amber-500', border: 'border-amber-500', shadow: 'shadow-amber-500', gradient: 'from-amber-500 to-orange-600', hue: 'hue-rotate-15' },
        red: { color: 'text-red-600', bg: 'bg-red-600', border: 'border-red-600', shadow: 'shadow-red-600', gradient: 'from-red-600 to-orange-600', hue: 'hue-rotate-0' },
        purple: { color: 'text-purple-500', bg: 'bg-purple-500', border: 'border-purple-500', shadow: 'shadow-purple-500', gradient: 'from-purple-500 to-pink-500', hue: 'hue-rotate-[270deg]' },
        green: { color: 'text-green-500', bg: 'bg-green-500', border: 'border-green-500', shadow: 'shadow-green-500', gradient: 'from-green-500 to-emerald-500', hue: 'hue-rotate-90' },
    };

    const t = themes[theme] || themes.amber;

    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const lines = [
            "Optimizing routes to FRA-09...",
            "DDoS Attack Mitigated (480Gbps)",
            "Syncing Cluster Nodes...",
            "Latency Check: NYC < 12ms",
            "Packet Loss: 0.00%",
            "Backend Service: Healthy",
            "New Node Online: SIN-02"
        ];
        let i = 0;
        const interval = setInterval(() => {
            setLogs(prev => [lines[Math.floor(Math.random() * lines.length)], ...prev].slice(0, 5));
            i++;
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-40 bg-[#05080f] border-t border-white/5 relative overflow-hidden">
            {/* Background Decor */}
            <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-${t.bg.replace('bg-', '')} to-transparent opacity-30`}></div>

            <div className="max-w-[90rem] mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${t.bg}/10 border ${t.border}/20 ${t.color} font-bold uppercase tracking-widest text-[10px] mb-6 animate-pulse`}>
                        <div className={`w-2 h-2 rounded-full ${t.bg}`}></div> Network Operational
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white">
                        GLOBAL <span className={`text-transparent bg-clip-text bg-gradient-to-r ${t.gradient}`}>PRESENCE</span>
                    </h2>
                    <p className="text-slate-400 text-xl mt-6 max-w-2xl mx-auto">
                        Low latency is a feature, not a goal. We operate 8 datacenter regions optimized for gaming traffic.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[800px]">
                    {/* LEFT PANEL: STATS & LOGS */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Status Card */}
                        <div className="bg-[#0a0f1a] border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
                            <div className={`absolute top-0 left-0 w-1 h-full ${t.bg} opacity-50`}></div>
                            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                <Activity size={18} className={t.color} /> Network Status
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Global Uptime</span>
                                    <span className="text-green-500 font-mono font-bold">100.00%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Total Capacity</span>
                                    <span className="text-white font-mono font-bold">12 Tbps</span>
                                </div>
                                <div className="w-full bg-white/5 rounded-full h-1.5 mt-2 overflow-hidden">
                                    <div className={`h-full ${t.bg} animate-[pulse_3s_infinite]`} style={{ width: '42%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Log Terminal */}
                        <div className="bg-black/50 border border-white/10 rounded-3xl p-6 font-mono text-xs h-96 overflow-hidden relative backdrop-blur-md">
                            <div className="flex items-center gap-2 text-slate-500 border-b border-white/5 pb-4 mb-4 uppercase tracking-widest font-bold">
                                <Terminal size={12} /> System Logs_
                            </div>
                            <div className="space-y-3">
                                {logs.map((log, i) => (
                                    <div key={i} className="flex gap-3 text-slate-300 animate-in slide-in-from-left-4 fade-in duration-300">
                                        <span className={t.color}>{new Date().toLocaleTimeString()}</span>
                                        <span>{log}</span>
                                    </div>
                                ))}
                            </div>
                            <div className={`absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none`}></div>
                        </div>
                    </div>

                    {/* CENTER: MAP (HIGH VISIBILITY MODE) */}
                    <div className="lg:col-span-3 bg-[#0a0f1a] rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group flex items-center justify-center p-8 min-h-[500px]">

                        {/* Map Container - Simple & Robust */}
                        <div className="relative w-full max-w-5xl aspect-[1.8/1] flex items-center justify-center select-none">

                            {/* 1. Underlying Map Image (Direct, No Masks) */}
                            <div
                                className={`absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-contain bg-center bg-no-repeat opacity-40 mix-blend-lighten invert`}
                            ></div>

                            {/* 2. Theme Tint Overlay */}
                            <div className={`absolute inset-0 bg-${t.bg.replace('bg-', '')}-500/20 mix-blend-overlay`}></div>

                            {/* 3. Tech Grid Overlay */}
                            <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30`}></div>

                            {/* 4. Scanner Beam */}
                            <div className={`absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-${t.bg.replace('bg-', '')}/40 to-transparent w-[2px] h-full translate-x-[-100%] animate-[scanline_3s_linear_infinite]`}></div>
                            <style>{`
                                @keyframes scanline {
                                    0% { left: 0%; opacity: 0; }
                                    10% { opacity: 1; }
                                    90% { opacity: 1; }
                                    100% { left: 100%; opacity: 0; }
                                }
                            `}</style>

                            {/* Locations */}
                            {[
                                { x: '29%', y: '32%', name: 'New York', code: 'US-East' },
                                { x: '22%', y: '40%', name: 'Dallas', code: 'US-Central' },
                                { x: '13%', y: '38%', name: 'Los Angeles', code: 'US-West' },
                                { x: '49%', y: '23%', name: 'London', code: 'EU-West' },
                                { x: '53%', y: '26%', name: 'Frankfurt', code: 'EU-Central' },
                                { x: '80%', y: '58%', name: 'Singapore', code: 'AP-South' },
                                { x: '91%', y: '78%', name: 'Sydney', code: 'OC-East' },
                            ].map((loc, i) => (
                                <div key={i} className="absolute flex flex-col items-center group/marker cursor-pointer" style={{ left: loc.x, top: loc.y }}>
                                    <div className="relative -translate-x-1/2 -translate-y-1/2">
                                        <div className={`absolute -inset-4 border ${t.border}/30 rounded-full animate-[spin_3s_linear_infinite]`}></div>
                                        <div className={`absolute -inset-8 border ${t.border}/10 rounded-full animate-[spin_5s_linear_infinite_reverse]`}></div>

                                        <div className={`w-2 h-2 rounded-full ${t.bg} shadow-[0_0_20px_currentColor] relative z-10 group-hover/marker:scale-150 transition-transform`}>
                                            <div className={`absolute inset-0 rounded-full ${t.bg} animate-ping opacity-75`}></div>
                                        </div>
                                    </div>
                                    {/* Tooltip */}
                                    <div className={`absolute top-6 left-1/2 -translate-x-1/2 bg-[#05080f]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-white/10 opacity-0 group-hover/marker:opacity-100 transition-all transform translate-y-2 group-hover/marker:translate-y-0 whitespace-nowrap z-50 shadow-2xl`}>
                                        <span className="font-bold text-[10px] uppercase tracking-wider">{loc.name}</span>
                                    </div>
                                </div>
                            ))}

                            {/* Arcs */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50 overflow-visible">
                                <path d="M 280 140 Q 500 40 540 120" stroke={`url(#grad_${theme})`} strokeWidth="1" fill="none" className="animate-[dash_3s_linear_infinite]" strokeDasharray="4,4" />
                                <path d="M 540 120 Q 750 250 820 280" stroke={`url(#grad_${theme})`} strokeWidth="1" fill="none" className="animate-[dash_4s_linear_infinite]" strokeDasharray="4,4" />
                                <defs>
                                    <linearGradient id={`grad_${theme}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="transparent" />
                                        <stop offset="50%" stopColor="white" />
                                        <stop offset="100%" stopColor="transparent" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        {/* Stats Overlay */}
                        <div className="absolute bottom-6 left-8 flex gap-8 pointer-events-none">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Data Regions</span>
                                <span className="text-xl font-black text-white">07</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Latency</span>
                                <span className={`text-xl font-black ${t.color}`}>~24ms</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <style>{`
                @keyframes scanline {
                    0% { left: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 100%; opacity: 0; }
                }
                @keyframes movePath {
                    0% { offset-distance: 0%; }
                    100% { offset-distance: 100%; }
                }
            `}</style>
        </section>
    );
};

export default GlobalNetwork;
