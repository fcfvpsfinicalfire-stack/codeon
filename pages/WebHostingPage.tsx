
import React, { useState } from 'react';
import {
    Globe, Shield, Zap, Server, Database, Lock,
    CheckCircle2, ChevronRight, Layout, Mail, ArrowRight,
    ChevronUp, ChevronDown, Check, Rocket, BarChart3,
    Terminal, Code2, Cpu, Box
} from 'lucide-react';


import GlobalNetwork from '../components/GlobalNetwork';
import DiscordBanner from '../components/DiscordBanner';
import { motion, useScroll, useTransform } from 'framer-motion';

interface WebHostingPageProps {
    onOrderPlan?: (plan: any) => void;
}

export default function WebHostingPage({ onOrderPlan }: WebHostingPageProps) {
    const [openFaqId, setOpenFaqId] = useState<number | null>(1);
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 200]);

    const plans = [
        { id: 'web-starter', name: 'Starter', space: '10GB NVMe', bandwidth: 'Unmetered', domains: '1 Website', price: '450.00', color: 'text-blue-400', popular: false },
        { id: 'web-pro', name: 'Professional', space: '50GB NVMe', bandwidth: 'Unmetered', domains: '5 Websites', price: '850.00', color: 'text-purple-400', popular: true },
        { id: 'web-biz', name: 'Business', space: '100GB NVMe', bandwidth: 'Unmetered', domains: 'Unlimited', price: '1500.00', color: 'text-pink-400', popular: false },
    ];

    const features = [
        { title: 'LiteSpeed Server', desc: 'Up to 20x faster than standard Apache servers. Handle spiky traffic with ease.', icon: <Zap /> },
        { title: 'Free SSL Certificates', desc: 'Automatic SSL installation for all your domains to keep your users secure.', icon: <Lock /> },
        { title: 'Daily Backups', desc: 'Automated daily backups ensuring you never lose critical data.', icon: <Database /> },
        { title: 'Imunify360', desc: 'Advanced firewall and malware scanner running 24/7 to protect your site.', icon: <Shield /> },
    ];

    return (
        <div className="bg-[#0b0f19] text-white min-h-screen font-sans overflow-x-hidden">

            {/* 1. MASSIVE HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 pb-40">
                <div className="absolute inset-0 z-0">
                    {/* Animated Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                    {/* Gradient Blobs */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        style={{ y: heroY }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center space-x-3 bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-300">Next-Gen Hosting</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase italic drop-shadow-2xl">
                            Deploy with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 animate-gradient-x">Confidence.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 max-w-lg leading-relaxed font-medium">
                            Blazing fast <span className="text-white font-bold">NVMe</span> storage, unmetered bandwidth, and enterprise-grade security. The perfect home for your website.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group"
                            >
                                View Plans <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95 backdrop-blur-md">
                                Features
                            </button>
                        </div>

                        <div className="flex items-center gap-6 pt-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-blue-500" /> 99.99% Uptime
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-blue-500" /> Free SSL
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative hidden lg:block perspective-1000"
                    >
                        {/* 3D Browser Mockup */}
                        <div className="relative w-full aspect-square transform transition-transform duration-500 hover:rotate-y-0 hover:scale-105">
                            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full animate-pulse"></div>

                            <div className="relative z-10 bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl ring-1 ring-white/5">
                                {/* Fake Browser Window */}
                                <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <div className="flex-grow flex justify-center">
                                        <div className="bg-[#0b0f19] rounded-lg h-8 w-2/3 flex items-center px-4 text-xs text-slate-500 font-mono border border-white/5">
                                            <Lock size={10} className="mr-2 text-green-500" />
                                            https://your-business.com
                                        </div>
                                    </div>
                                </div>

                                {/* Mock Content */}
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl border border-blue-500/20 p-4">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/20 mb-2"></div>
                                            <div className="h-2 w-16 bg-blue-500/20 rounded mb-1"></div>
                                            <div className="h-2 w-24 bg-white/5 rounded"></div>
                                        </div>
                                        <div className="h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl border border-purple-500/20 p-4">
                                            <div className="w-8 h-8 rounded-lg bg-purple-500/20 mb-2"></div>
                                            <div className="h-2 w-16 bg-purple-500/20 rounded mb-1"></div>
                                            <div className="h-2 w-24 bg-white/5 rounded"></div>
                                        </div>
                                    </div>

                                    <div className="h-4 bg-white/5 rounded-full w-3/4"></div>
                                    <div className="h-4 bg-white/5 rounded-full w-1/2"></div>
                                    <div className="h-40 bg-white/5 rounded-2xl border border-white/5 w-full mt-4 flex items-center justify-center">
                                        <div className="text-center">
                                            <Rocket size={40} className="text-blue-500 mx-auto mb-2 animate-bounce" />
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Speed Optimized</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badges */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -right-8 top-1/4 bg-[#1e40af] text-white p-4 rounded-xl shadow-[0_0_30px_rgba(30,64,175,0.5)] flex items-center gap-3 border border-white/10"
                                >
                                    <Zap size={24} className="fill-white text-white" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase opacity-70">Speed Score</p>
                                        <p className="text-xl font-black">99/100</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute -left-6 bottom-20 bg-[#111827] text-white p-4 rounded-xl shadow-xl flex items-center gap-3 border border-white/10"
                                >
                                    <Shield size={24} className="text-green-500" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase opacity-70">Security</p>
                                        <p className="text-md font-bold text-green-400">Protected</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. SPEED COMPARISON SECTION (NEW) */}
            <section className="py-24 bg-[#0d121f] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-6">
                                LEAVE THEM IN THE <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">DIGITAL DUST.</span>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Our servers run on <span className="text-white font-bold">LiteSpeed Enterprise</span>, offering up to 20x faster performance compared to standard Apache hosting. Don't let a slow site cost you customers.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    'NVMe Gen4 Storage (7000MB/s+)',
                                    'Redis Object Caching Included',
                                    'PHP 8.2+ OPcache Enabled',
                                    'Quic.cloud CDN Integration'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                                            <Check size={14} strokeWidth={4} />
                                        </div>
                                        <span className="font-bold text-slate-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:w-1/2 w-full">
                            {/* Comparison Chart */}
                            <div className="bg-[#111827] border border-white/5 p-8 rounded-3xl relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <BarChart3 size={100} />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-8">Requests Per Second (Higher is Better)</h3>

                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-white mb-2">
                                            <span>CodeOn (LiteSpeed)</span>
                                            <span>5,200 req/s</span>
                                        </div>
                                        <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '100%' }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                                            <span>Competitor A (Nginx)</span>
                                            <span>1,400 req/s</span>
                                        </div>
                                        <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '25%' }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                                className="h-full bg-slate-600"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                                            <span>Standard (Apache)</span>
                                            <span>850 req/s</span>
                                        </div>
                                        <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '15%' }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                                                className="h-full bg-slate-700"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-500 mt-6 italic">*Benchmark based on WordPress Hello World load test.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* 3. PREMIUM BENTO GRID FEATURES */}
            <section className="py-32 px-6 relative bg-[#0b0f19] overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md mb-6"
                        >
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Included with all plans</span>
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-6">
                            Everything <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Supercharged.</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">We've packed every possible feature into our hosting platform so you don't have to compromise.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">

                        {/* 1. LiteSpeed (Large) */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="md:col-span-2 md:row-span-2 bg-[#111827]/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
                                        <Zap size={32} className="text-white fill-white" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tight mb-4">LiteSpeed Enterprise</h3>
                                    <p className="text-slate-400 text-lg leading-relaxed mb-6">Experience the fastest web server technology in the world. Drop-in replacement for Apache but 10x faster.</p>
                                    <ul className="space-y-2">
                                        {['LSCache Included', 'QUIC.cloud CDN', 'HTTP/3 Support'].map(i => (
                                            <li key={i} className="flex items-center gap-2 text-sm font-bold text-slate-300">
                                                <CheckCircle2 size={14} className="text-blue-500" /> {i}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Abstract Speed Visual */}
                                <div className="absolute -right-10 -bottom-10 opacity-30 group-hover:opacity-50 transition-opacity">
                                    <Rocket size={200} className="text-blue-500 rotate-45" />
                                </div>
                            </div>
                        </motion.div>

                        {/* 2. Security (Tall) */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="md:col-span-1 md:row-span-2 bg-[#111827]/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group flex flex-col"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 text-green-500">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mb-2">Imunify360</h3>
                            <p className="text-slate-400 text-sm mb-8">AI-driven security that detects and blocks threats in real-time.</p>

                            <div className="flex-grow relative bg-[#0b0f19] rounded-2xl border border-white/5 p-4 overflow-hidden">
                                {/* Fake Terminal */}
                                <div className="space-y-2 font-mono text-[10px]">
                                    <div className="text-green-500">$ scanning...</div>
                                    <div className="text-slate-500">check: /var/www/html</div>
                                    <div className="text-green-400">STATUS: CLEAN</div>
                                    <div className="text-slate-500">check: /etc/nginx</div>
                                    <div className="text-green-400">STATUS: CLEAN</div>
                                    <div className="text-red-500 animate-pulse">BLOCK: 192.168.1.55</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 3. Softaculous (Standard) */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="md:col-span-1 bg-[#111827]/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-purple-400">
                                <Box size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">1-Click Apps</h3>
                            <p className="text-slate-400 text-sm">Install WordPress, Joomla, and 400+ apps instantly.</p>
                        </motion.div>

                        {/* 4. NVMe (Standard) */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="md:col-span-1 bg-[#111827]/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4 text-red-400">
                                <Database size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">NVMe Storage</h3>
                            <p className="text-slate-400 text-sm">Enterprise NVMe drives for instant data access speeds.</p>
                        </motion.div>

                        {/* 5. cPanel (Wide) */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="md:col-span-2 bg-gradient-to-br from-[#1e3a8a] to-[#111827] border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden group text-white"
                        >
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                <div>
                                    <div className="inline-block bg-white/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase mb-4">Industry Standard</div>
                                    <h3 className="text-2xl font-black uppercase italic mb-2">Powered by cPanel</h3>
                                    <p className="text-blue-100 text-sm max-w-xs">The world's most popular hosting control panel. Manage your files, databases, and emails with a user-friendly interface.</p>
                                </div>
                                <div className="flex-grow">
                                    <div className="bg-white rounded-lg shadow-2xl p-2 transform rotate-3 group-hover:rotate-0 transition-transform duration-500 w-full h-32 opacity-90">
                                        <div className="bg-slate-100 w-full h-full rounded border border-slate-200"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>


            {/* 4. PRICING PLANS (UPDATED) */}
            <section id="plans" className="py-32 px-6 relative overflow-hidden">
                {/* Background noise */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4">Transparent <span className="text-blue-500">Pricing</span></h2>
                        <p className="text-slate-400 text-lg">No hidden fees. No renewal hikes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((p, i) => (
                            <div key={i} className={`relative bg-[#111827] border ${p.popular ? 'border-blue-500 shadow-[0_0_60px_rgba(59,130,246,0.15)] scale-105 z-20' : 'border-white/10 z-10'} rounded-[2.5rem] p-10 flex flex-col transition-transform hover:-translate-y-2 duration-300 group`}>
                                {p.popular && (
                                    <div className="absolute top-0 center py-1 w-full flex justify-center -mt-4">
                                        <div className="bg-blue-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg border border-blue-400">
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                {/* Hover Glow */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b ${p.popular ? 'from-blue-600/10' : 'from-white/5'} to-transparent pointer-events-none rounded-[2.5rem]`}></div>

                                <div className="mb-8 text-center border-b border-white/5 pb-8 relative z-10">
                                    <h3 className={`font-black uppercase tracking-widest text-sm mb-4 ${p.color}`}>{p.name}</h3>
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="text-lg text-slate-400 self-start mt-2">Rs.</span>
                                        <span className="text-6xl font-black text-white tracking-tight">{p.price}</span>
                                        <span className="text-xs text-slate-500 self-end mb-2">/mo</span>
                                    </div>
                                </div>

                                <div className="space-y-5 mb-10 flex-grow relative z-10">
                                    {[p.space, p.bandwidth, p.domains, 'Free SSL', 'cPanel Control Panel', 'Softaculous Installer', 'Daily Backups'].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${p.popular ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-800 text-slate-400'}`}>
                                                <Check size={12} strokeWidth={4} />
                                            </div>
                                            <span className={`text-sm font-bold ${idx < 3 ? 'text-white' : 'text-slate-400'}`}>{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => onOrderPlan?.(p)}
                                    className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 relative z-10 ${p.popular ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20' : 'bg-white/5 hover:bg-white/10 text-white border border-white/5'}`}
                                >
                                    Select Plan <ChevronRight size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* 6. GLOBAL INFRASTRUCTURE MAP */}
            <section className="py-32 relative bg-[#0b0f19] overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 backdrop-blur-md mb-8">
                        <Globe size={12} className="text-blue-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Global Network</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-6">
                        Deploy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Everywhere.</span>
                    </h2>
                    <p className="text-slate-400 mb-16 max-w-2xl mx-auto">Low latency is our promise. Choose from 5+ strategic locations worldwide.</p>
                </div>

                {/* Simulated Map Container */}
                <div className="relative max-w-6xl mx-auto aspect-[2/1] bg-[#111827]/50 rounded-[3rem] border border-white/5 backdrop-blur-sm overflow-hidden group">
                    {/* Map Background (Abstract) */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-contain bg-no-repeat bg-center grayscale invert"></div>

                    {/* Location Dots */}
                    {[
                        { top: '30%', left: '22%', name: 'New York', ping: 'bg-blue-500' },
                        { top: '35%', left: '18%', name: 'Los Angeles', ping: 'bg-purple-500' },
                        { top: '25%', left: '48%', name: 'London', ping: 'bg-green-500' },
                        { top: '28%', left: '52%', name: 'Frankfurt', ping: 'bg-yellow-500' },
                        { top: '45%', left: '78%', name: 'Singapore', ping: 'bg-red-500' },
                    ].map((loc, i) => (
                        <div key={i} className="absolute group-hover:scale-110 transition-transform duration-500" style={{ top: loc.top, left: loc.left }}>
                            <div className="relative flex items-center justify-center w-6 h-6">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${loc.ping}`}></span>
                                <span className={`relative inline-flex rounded-full h-3 w-3 ${loc.ping.replace('bg-', 'bg-')}`}></span>
                            </div>
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#0b0f19] border border-white/10 px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">{loc.name}</span>
                            </div>
                        </div>
                    ))}

                    {/* Connecting Lines (SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                        <path d="M250 150 Q 400 50 550 140" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                        <path d="M550 140 Q 700 250 850 250" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(59,130,246,0)" />
                                <stop offset="50%" stopColor="rgba(59,130,246,0.5)" />
                                <stop offset="100%" stopColor="rgba(59,130,246,0)" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </section>



            {/* Footer Banner */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-6">Ready to liftoff?</h2>
                    <p className="text-blue-100 text-lg mb-10 font-medium">Get started with our premium web hosting today and experience the difference.</p>
                    <button
                        onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-white text-blue-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-2xl"
                    >
                        Get Started Now
                    </button>
                </div>
            </section>

            <GlobalNetwork theme="blue" />
            <DiscordBanner />
        </div>
    );
}
