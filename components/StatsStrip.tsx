
import React, { useEffect, useRef } from 'react';
import { Server, Zap, Globe, Shield } from 'lucide-react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.round(latest).toLocaleString() + suffix;
            }
        });
    }, [springValue, suffix]);

    return <span ref={ref} />;
};

const StatsStrip: React.FC = () => {
    const stats = [
        { label: 'Servers Deployed', value: 12400, suffix: '+', icon: <Server size={20} className="text-blue-400" />, glow: 'shadow-blue-500/20' },
        { label: 'Global Latency', value: 15, suffix: 'ms <', icon: <Globe size={20} className="text-emerald-400" />, glow: 'shadow-emerald-500/20' },
        { label: 'Support Response', value: 5, suffix: ' Mins', icon: <Zap size={20} className="text-yellow-400" />, glow: 'shadow-yellow-500/20' },
        { label: 'DDoS Capacity', value: 12, suffix: ' Tbps', icon: <Shield size={20} className="text-purple-400" />, glow: 'shadow-purple-500/20' },
    ];

    return (
        <div className="bg-[#05080f] border-y border-white/5 relative z-20 overflow-hidden">
            {/* Background glow for the strip */}
            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm"></div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="py-10 flex flex-col items-center justify-center text-center group hover:bg-white/[0.03] transition-colors cursor-default relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className={`flex items-center gap-2 mb-3 bg-white/5 rounded-full px-3 py-1 border border-white/5 group-hover:border-white/10 transition-colors ${stat.glow} shadow-lg`}>
                                {stat.icon}
                                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 group-hover:text-white transition-colors">{stat.label}</span>
                            </div>

                            <span className="text-4xl md:text-5xl font-black text-white italic tracking-tighter group-hover:scale-105 transition-transform duration-300 drop-shadow-2xl">
                                {typeof stat.value === 'number' ? <Counter value={stat.value} suffix={stat.suffix} /> : stat.value}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatsStrip;
