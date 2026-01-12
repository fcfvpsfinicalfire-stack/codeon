
import React, { useState } from 'react';
import {
    Server, Shield, Zap, Cpu, HardDrive, Network,
    CheckCircle2, ChevronRight, ArrowRight, Lock,
    Settings, Activity, Globe, Thermometer, Gauge,
    Power, Layers, Box, PlayCircle
} from 'lucide-react';

import GlobalNetwork from '../components/GlobalNetwork';
import DiscordBanner from '../components/DiscordBanner';
import { motion, useScroll, useTransform } from 'framer-motion';

interface DedicatedHostingPageProps {
    onOrderPlan?: (plan: any) => void;
}

export default function DedicatedHostingPage({ onOrderPlan }: DedicatedHostingPageProps) {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 200]);

    const servers = [
        {
            id: 'dedi-entry',
            name: 'Entry Metal',
            cpu: 'Intel Xeon E-2388G',
            cores: '8 Cores / 16 Threads',
            baseClock: '3.2 GHz',
            turboClock: '5.1 GHz',
            ram: '64GB DDR4 ECC',
            storage: '2x 1TB NVMe',
            bandwidth: '1Gbps Unmetered',
            price: '18500.00',
            color: 'text-orange-400',
            popular: false
        },
        {
            id: 'dedi-perf',
            name: 'Performance',
            cpu: 'AMD Ryzen 9 7950X',
            cores: '16 Cores / 32 Threads',
            baseClock: '4.5 GHz',
            turboClock: '5.7 GHz',
            ram: '128GB DDR5',
            storage: '2x 2TB NVMe Gen4',
            bandwidth: '2Gbps Unmetered',
            price: '32000.00',
            color: 'text-red-500',
            popular: true
        },
        {
            id: 'dedi-ent',
            name: 'Enterprise',
            cpu: 'AMD EPYC 9654',
            cores: '96 Cores / 192 Threads',
            baseClock: '2.4 GHz',
            turboClock: '3.7 GHz',
            ram: '512GB DDR5 ECC',
            storage: '4x 4TB NVMe Gen4',
            bandwidth: '10Gbps Unmetered',
            price: '85000.00',
            color: 'text-slate-200',
            popular: false
        },
    ];

    return (
        <div className="bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden selection:bg-red-500/30">

            {/* 1. HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 pb-40">
                {/* Industrial Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        style={{ y: heroY }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center space-x-2 border border-red-500/30 bg-red-500/5 rounded-none px-4 py-1 mb-8 backdrop-blur-md">
                            <Activity size={14} className="text-red-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">System Status: Online</span>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase italic drop-shadow-2xl mb-8">
                            Unleash <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-orange-600">Raw Power.</span>
                        </h1>

                        <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-bold font-mono uppercase tracking-wide mb-10 border-l-2 border-red-500 pl-4">
                            // 100% Dedicated Resources<br />
                            // No Virtualization Overhead<br />
                            // Full Root Access
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <button
                                onClick={() => document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-red-600 hover:bg-red-500 text-white px-10 py-5 font-black uppercase tracking-widest text-sm shadow-[0_0_50px_rgba(220,38,38,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group clip-path-slant"
                            >
                                Deploy Server <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="bg-transparent hover:bg-white/5 border border-white/10 text-white px-10 py-5 font-black uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 backdrop-blur-md">
                                View Datasheet
                            </button>
                        </div>
                    </motion.div>

                    {/* 3D Isometric Server Visualization using CSS */}
                    <div className="relative hidden lg:flex items-center justify-center perspective-1000">
                        <motion.div
                            initial={{ rotateX: 60, rotateZ: -45, scale: 0.8, opacity: 0 }}
                            animate={{ rotateX: 60, rotateZ: -45, scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="relative w-96 h-96 transform-style-3d"
                        >
                            {/* Stacking Server Blades */}
                            {[1, 2, 3, 4, 5].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ z: i * 200 }}
                                    animate={{ z: i * 60 }}
                                    transition={{ duration: 1, delay: i * 0.2 }}
                                    className="absolute inset-0 bg-[#111827] border border-red-500/30 shadow-[0_0_20px_rgba(220,38,38,0.2)] flex items-center justify-between px-8 py-4 "
                                    style={{
                                        transform: `translateZ(${i * 60}px)`,
                                        boxShadow: '0 0 50px rgba(0,0,0,0.5)'
                                    }}
                                >
                                    <div className="flex gap-4">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-75"></div>
                                        <div className="w-32 h-2 bg-white/10 rounded overflow-hidden">
                                            <div className="h-full bg-red-500/50 w-[70%] animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="font-mono text-[10px] text-red-500 font-bold">BLADE_0{i} // ONLINE</div>
                                </motion.div>
                            ))}

                            {/* Base */}
                            <div className="absolute inset-0 bg-red-900/10 transform translate-z-[-20px] filter blur-xl"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. STATS BAR (INDUSTRIAL STYLE) */}
            <section className="bg-[#0a0a0a] border-y border-white/5 relative z-20">
                <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8 divide-y md:divide-y-0 md:divide-x divide-white/5">
                    {[
                        { label: 'Network Uptime', value: '100%', sub: 'SLA Guaranteed', icon: <Network className="text-green-500" /> },
                        { label: 'Mitigation', value: '12 Tbps+', sub: 'Path.net Protection', icon: <Shield className="text-red-500" /> },
                        { label: 'Provisioning', value: '< 240 Mins', sub: 'Automated Setup', icon: <Zap className="text-yellow-500" /> },
                        { label: 'Power Feed', value: '2N + 1', sub: 'Redundant Power', icon: <Power className="text-blue-500" /> },
                    ].map((stat, i) => (
                        <div key={i} className="flex-1 flex items-center gap-6 px-8 py-4 w-full md:w-auto">
                            <div className="w-16 h-16 bg-[#111] rounded-none border border-white/5 flex items-center justify-center shadow-inner">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">{stat.label}</p>
                                <p className="text-3xl font-black text-white leading-none mb-1">{stat.value}</p>
                                <p className="text-xs font-mono text-slate-400">{stat.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. INVENTORY (SPEC SHEET STYLE) */}
            <section id="inventory" className="py-32 px-6 relative bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <div className="inline-block border-l-4 border-red-600 pl-4 mb-4">
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
                                Available <span className="text-red-600">Inventory</span>
                            </h2>
                        </div>
                        <p className="text-slate-400 text-lg max-w-2xl font-mono">High-performance configurations ready for instant deployment. Filter by workload type.</p>
                    </div>

                    <div className="space-y-4">
                        {/* Headers */}
                        <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-600 border-b border-white/5">
                            <div className="col-span-3">Configuration</div>
                            <div className="col-span-2">CPU Cores</div>
                            <div className="col-span-2">Memory</div>
                            <div className="col-span-2">Storage</div>
                            <div className="col-span-3 text-right">Pricing</div>
                        </div>

                        {servers.map((server, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                                className={`group relative bg-[#0a0a0a] border ${server.popular ? 'border-red-600' : 'border-white/5'} hover:border-red-500/50 transition-all duration-300`}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 p-8 items-center relative z-10">
                                    {/* Name & CPU */}
                                    <div className="col-span-3">
                                        {server.popular && (
                                            <span className="inline-block bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 mb-2">Best Value</span>
                                        )}
                                        <h3 className="text-xl font-black text-white uppercase italic tracking-wide">{server.name}</h3>
                                        <div className="flex items-center gap-2 mt-2 text-slate-400 font-mono text-xs">
                                            <Cpu size={14} />
                                            <span>{server.cpu}</span>
                                        </div>
                                    </div>

                                    {/* Specs Columns */}
                                    <div className="col-span-2">
                                        <p className="lg:hidden text-[10px] uppercase font-bold text-slate-500 mb-1">Cores</p>
                                        <p className="text-white font-bold">{server.cores}</p>
                                        <p className="text-xs text-slate-500 font-mono">{server.baseClock} / {server.turboClock}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="lg:hidden text-[10px] uppercase font-bold text-slate-500 mb-1">RAM</p>
                                        <p className="text-white font-bold">{server.ram}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="lg:hidden text-[10px] uppercase font-bold text-slate-500 mb-1">Storage</p>
                                        <p className="text-white font-bold">{server.storage}</p>
                                        <p className="text-xs text-slate-500 font-mono">NVMe Gen4</p>
                                    </div>

                                    {/* Price & Action */}
                                    <div className="col-span-3 flex flex-col items-end gap-3">
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-white inline-block mr-1">Rs. {server.price}</p>
                                            <span className="text-xs text-slate-500">/mo</span>
                                        </div>
                                        <button
                                            onClick={() => onOrderPlan?.(server)}
                                            className={`w-full lg:w-auto px-8 py-3 font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${server.popular ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20' : 'bg-white text-black hover:bg-slate-200'}`}
                                        >
                                            Configure <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Hover Effect: Scanline */}
                                <div className="absolute inset-0 bg-red-600/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 pointer-events-none"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. HARDWARE DEEP DIVE (NEW) */}
            <section className="py-24 bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-20 text-center">
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
                            Under the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Hood.</span>
                        </h2>
                        <p className="text-slate-400 text-xl max-w-2xl mx-auto">We don't cut corners. Every component is enterprise-grade.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* RAM */}
                        <div className="bg-[#050505] border border-white/5 p-8 rounded-3xl relative group overflow-hidden">
                            <div className="absolute top-0 right-0 -m-8 w-32 h-32 bg-red-600/20 blur-[60px] rounded-full group-hover:bg-red-600/40 transition-colors"></div>
                            <Layers size={48} className="text-red-500 mb-6 relative z-10" />
                            <h3 className="text-2xl font-black text-white uppercase italic mb-2 relative z-10">DDR5 ECC Memory</h3>
                            <p className="text-slate-400 text-sm mb-6 relative z-10">
                                Next-gen memory with 4800MHz+ speeds and Error Correction Code (ECC) to prevent data corruption during intensive recalculations.
                            </p>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden relative z-10">
                                <div className="h-full w-full bg-gradient-to-r from-red-600 to-orange-500"></div>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-2 relative z-10">
                                <span>DDR4</span>
                                <span className="text-white">DDR5 (2x Bandwidth)</span>
                            </div>
                        </div>

                        {/* NVMe */}
                        <div className="bg-[#050505] border border-white/5 p-8 rounded-3xl relative group overflow-hidden">
                            <div className="absolute top-0 right-0 -m-8 w-32 h-32 bg-orange-600/20 blur-[60px] rounded-full group-hover:bg-orange-600/40 transition-colors"></div>
                            <HardDrive size={48} className="text-orange-500 mb-6 relative z-10" />
                            <h3 className="text-2xl font-black text-white uppercase italic mb-2 relative z-10">NVMe Gen4 Storage</h3>
                            <p className="text-slate-400 text-sm mb-6 relative z-10">
                                7000MB/s+ Read/Write speeds. That's 14x faster than standard SATA SSDs. Load large datasets instantly.
                            </p>
                            <div className="space-y-2 relative z-10">
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="w-12 text-slate-500 font-bold">NVMe</span>
                                    <div className="flex-grow h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full w-full bg-orange-500"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs opacity-50">
                                    <span className="w-12 text-slate-500 font-bold">SSD</span>
                                    <div className="flex-grow h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full w-[15%] bg-slate-500"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Network */}
                        <div className="bg-[#050505] border border-white/5 p-8 rounded-3xl relative group overflow-hidden">
                            <div className="absolute top-0 right-0 -m-8 w-32 h-32 bg-red-600/20 blur-[60px] rounded-full group-hover:bg-red-600/40 transition-colors"></div>
                            <Network size={48} className="text-red-500 mb-6 relative z-10" />
                            <h3 className="text-2xl font-black text-white uppercase italic mb-2 relative z-10">10Gbps Uplinks</h3>
                            <p className="text-slate-400 text-sm mb-6 relative z-10">
                                Every chassis is connected via dual redundant 10Gbps uplinks to our core routers. Burst up to 40Gbps on demand.
                            </p>
                            <div className="flex items-center gap-2 text-xs font-mono text-red-400 border border-red-500/20 bg-red-500/10 p-2 rounded relative z-10">
                                <Activity size={12} className="animate-pulse" />
                                <span>LIVE: 1.2 GB/s THROUGHPUT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* 4. BENCHMARK COMPARISON */}
            <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-6">
                            Crush the <span className="text-red-500 text-stroke">Competition.</span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Stop sharing CPUs. Our bare metal servers consistently outperform virtualized cloud instances by eliminating the hypervisor overhead.
                        </p>

                        <div className="space-y-6">
                            {[
                                { name: 'CodeOn Ryzen 9 7950X', score: '38,400', width: '100%', color: 'from-red-500 to-orange-500' },
                                { name: 'AWS c6a.24xlarge', score: '29,100', width: '75%', color: 'from-slate-600 to-slate-700' },
                                { name: 'Legacy Xeon E5', score: '14,200', width: '35%', color: 'from-slate-700 to-slate-800' },
                            ].map((bench, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs font-bold text-white mb-2 uppercase tracking-wider">
                                        <span>{bench.name}</span>
                                        <span>{bench.score} pts</span>
                                    </div>
                                    <div className="h-4 bg-slate-900 w-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: bench.width }}
                                            transition={{ duration: 1.5, delay: i * 0.2 }}
                                            className={`h-full bg-gradient-to-r ${bench.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                            <p className="text-[10px] text-slate-600 font-mono mt-2">* Cinebench R23 Multi-Core Score</p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-red-600/20 blur-[100px] rounded-full"></div>
                        <div className="relative bg-[#111] border border-white/5 p-8 rounded-none">
                            <Gauge size={48} className="text-red-500 mb-6" />
                            <h3 className="text-2xl font-black text-white uppercase italic mb-4">No Noisy Neighbors</h3>
                            <p className="text-slate-400 text-sm mb-6">
                                In a shared cloud environment, your performance fluctuates based on other users. With bare metal, the entire chassis is yours.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#050505] p-4 border border-white/5">
                                    <p className="text-red-500 font-black text-xl">0%</p>
                                    <p className="text-[10px] uppercase text-slate-500 font-bold">Steal Time</p>
                                </div>
                                <div className="bg-[#050505] p-4 border border-white/5">
                                    <p className="text-red-500 font-black text-xl">100%</p>
                                    <p className="text-[10px] uppercase text-slate-500 font-bold">Consistency</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. ENTERPRISE FEATURES (BENTO) */}
            <section className="py-24 px-6 bg-[#050505] relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">Enterprise Grade</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Built for mission-critical deployments.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* IPMI */}
                        <div className="bg-[#0a0a0a] border border-white/5 p-8 hover:border-red-500/30 transition-colors group">
                            <Settings size={32} className="text-slate-200 mb-6 group-hover:rotate-90 transition-transform duration-500" />
                            <h3 className="text-xl font-bold text-white mb-2 uppercase">IPMI / KVM Access</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">bios-level access to your server. Mount ISOs, reboot, and troubleshoot as if you were physically there.</p>
                        </div>

                        {/* Private Net */}
                        <div className="bg-[#0a0a0a] border border-white/5 p-8 hover:border-red-500/30 transition-colors group">
                            <Network size={32} className="text-slate-200 mb-6" />
                            <h3 className="text-xl font-bold text-white mb-2 uppercase">Private Networking</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Connect multiple servers on a secure 10Gbps private VLAN. Unmetered traffic between your nodes.</p>
                        </div>

                        {/* Custom OS */}
                        <div className="bg-[#0a0a0a] border border-white/5 p-8 hover:border-red-500/30 transition-colors group">
                            <HardDrive size={32} className="text-slate-200 mb-6" />
                            <h3 className="text-xl font-bold text-white mb-2 uppercase">Custom OS Support</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Debian, Ubuntu, CentOS, Rocky Linux, Windows Server, Proxmox, or upload your own custom ISO.</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* 6. USE CASES (NEW) */}
            <section className="py-24 bg-[#050505] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">Built For <br /> Heavy Load.</h2>
                            <p className="text-slate-400">Whatever your workload, we have the metal.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Gaming Networks', desc: 'Perfect for Minecraft, Rust, and ARK networks. Single-core performance optimized for high tick rates.', icon: <Box className="text-red-500" /> },
                            { title: 'Video Streaming', desc: 'Unmetered 10Gbps bandwidth for buffer-free content delivery and high-bitrate encoding.', icon: <PlayCircle className="text-orange-500" /> },
                            { title: 'AI & ML Training', desc: 'Massive parallel processing power with EPYC processors for training datasets and inference.', icon: <Cpu className="text-red-500" /> },
                        ].map((use, i) => (
                            <div key={i} className="group bg-[#0a0a0a] border border-white/5 hover:border-red-500/50 p-8 transition-colors">
                                <div className="w-14 h-14 bg-white/5 rounded-none flex items-center justify-center mb-6 border border-white/5 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                    {use.icon}
                                </div>
                                <h3 className="text-xl font-black text-white uppercase italic tracking-wide mb-3">{use.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{use.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. CLUSTER SOLUTIONS (NEW) */}
            <section className="py-32 relative bg-[#050505] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <div className="inline-block border border-red-500/30 bg-red-500/5 px-3 py-1 mb-6">
                                <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Scale Without Limits</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
                                Multi-Server <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Structuring.</span>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Need more than one node? We specialize in complex, high-availability clusters. Connect web servers, database notes, and load balancers on a private 10Gbps VLAN.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-[#0a0a0a] p-4 border border-white/5 border-l-2 border-l-red-500">
                                    <div className="bg-red-500/10 p-2 rounded"><PlayCircle size={20} className="text-red-500" /></div>
                                    <div>
                                        <h4 className="font-bold text-white uppercase text-xs tracking-wider">Load Balancing</h4>
                                        <p className="text-slate-500 text-xs">Distribute traffic across multiple frontend nodes.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-[#0a0a0a] p-4 border border-white/5 border-l-2 border-l-red-500">
                                    <div className="bg-red-500/10 p-2 rounded"><Layers size={20} className="text-red-500" /></div>
                                    <div>
                                        <h4 className="font-bold text-white uppercase text-xs tracking-wider">Database Replication</h4>
                                        <p className="text-slate-500 text-xs">Master-Slave setup for zero data loss.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            {/* Abstract Cluster Visual */}
                            <div className="relative aspect-square max-w-md mx-auto">
                                <div className="absolute inset-0 bg-red-600/10 blur-[80px] rounded-full animate-pulse"></div>

                                {/* Nodes */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#111] border border-red-500 text-center p-4 w-40 z-20 shadow-[0_0_30px_rgba(220,38,38,0.2)]"
                                >
                                    <Activity className="mx-auto text-red-500 mb-2" size={20} />
                                    <div className="text-[10px] uppercase font-bold text-slate-500">Load Balancer</div>
                                    <div className="text-xs font-black text-white">HAProxy</div>
                                </motion.div>

                                <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-[#111] border border-white/10 text-center p-4 w-32 z-10">
                                    <Server className="mx-auto text-slate-400 mb-2" size={20} />
                                    <div className="text-[10px] uppercase font-bold text-slate-500">App Node 1</div>
                                </div>

                                <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-[#111] border border-white/10 text-center p-4 w-32 z-10">
                                    <Server className="mx-auto text-slate-400 mb-2" size={20} />
                                    <div className="text-[10px] uppercase font-bold text-slate-500">App Node 2</div>
                                </div>

                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#111] border border-orange-500/50 text-center p-4 w-40 z-20"
                                >
                                    <HardDrive className="mx-auto text-orange-500 mb-2" size={20} />
                                    <div className="text-[10px] uppercase font-bold text-slate-500">Database</div>
                                    <div className="text-xs font-black text-white">Cluster</div>
                                </motion.div>

                                {/* Connecting Lines */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                    <path d="M224 60 L 100 200" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                                    <path d="M224 60 L 350 200" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                                    <path d="M100 250 L 224 390" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                                    <path d="M350 250 L 224 390" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. FORTRESS SECURITY (NEW) */}
            <section className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <div className="mb-16">
                        <Shield size={64} className="text-red-600 mx-auto mb-6" />
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
                            Fortress <span className="text-red-600">Security.</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            We sit behind Path.net's 12Tbps DDoS filtration network. Your server stays online even during massive volumetric attacks.
                        </p>
                    </div>

                    <div className="relative max-w-3xl mx-auto aspect-[2/1] border-x border-t border-red-900/30 bg-gradient-to-b from-red-900/10 to-transparent rounded-t-[500px] overflow-hidden flex items-end justify-center">
                        {/* Radar Scan Effect */}
                        <div className="absolute inset-x-0 bottom-0 h-full w-full bg-[conic-gradient(from_0deg_at_50%_100%,transparent_45deg,rgba(220,38,38,0.2)_90deg,transparent_135deg)] animate-[radar_3s_linear_infinite] origin-bottom"></div>

                        <div className="absolute bottom-0 w-full h-px bg-red-600"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-full bg-red-600/30"></div>

                        {/* Blips */}
                        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-red-500 rounded-full animate-ping delay-700"></div>

                        <div className="relative z-10 mb-10 bg-black/80 backdrop-blur border border-red-500 px-6 py-2 rounded text-red-500 font-mono text-xs uppercase tracking-widest">
                            <Activity size={12} className="inline mr-2 animate-pulse" />
                            Threat Level: Low
                        </div>
                    </div>
                </div>
            </section>

            <GlobalNetwork theme="red" />

            <DiscordBanner />
        </div>
    );
}
