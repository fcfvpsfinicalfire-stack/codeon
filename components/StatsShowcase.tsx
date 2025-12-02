import React, { useState, useEffect, useRef } from 'react';

const stats = [
    { 
        icon: 'fa-solid fa-server', 
        endValue: 10000, 
        label: 'Servers Deployed',
        suffix: '+'
    },
    { 
        icon: 'fa-solid fa-shield-halved', 
        endValue: 99.9, 
        label: 'Guaranteed Uptime',
        suffix: '%',
        decimals: 1
    },
    { 
        icon: 'fa-solid fa-headset', 
        endValue: 24, 
        label: 'Expert Support',
        suffix: '/7'
    },
    { 
        icon: 'fa-solid fa-globe', 
        endValue: 15, 
        label: 'Global Locations',
        suffix: '+'
    },
];

const StatItem: React.FC<{ stat: typeof stats[0], isVisible: boolean }> = ({ stat, isVisible }) => {
    const [count, setCount] = useState(0);
    const duration = 2000; // 2 seconds

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const startTime = performance.now();

        const animateCount = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime > duration) {
                setCount(stat.endValue);
                return;
            }
            const progress = elapsedTime / duration;
            const currentCount = start + (stat.endValue - start) * progress;
            setCount(currentCount);
            requestAnimationFrame(animateCount);
        };

        requestAnimationFrame(animateCount);
    }, [isVisible, stat.endValue]);

    return (
        <div className="relative group transition-all duration-300 transform hover:-translate-y-1 h-full">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-brand-cyan to-brand-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-border-chase" style={{ backgroundSize: '400% 400%'}}></div>
            <div className="relative bg-card-bg-solid/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center flex flex-col items-center justify-center h-full animate-logo-pulse">
                <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-xl text-brand-cyan text-3xl border border-white/10 mb-4 group-hover:border-brand-cyan/50 group-hover:text-white transition-all">
                    <i className={stat.icon}></i>
                </div>
                <p className="text-4xl md:text-5xl font-extrabold text-white">
                    {count.toFixed(stat.decimals || 0)}
                    <span className="text-brand-cyan">{stat.suffix}</span>
                </p>
                <p className="text-gray-400 mt-2">{stat.label}</p>
            </div>
        </div>
    );
};

const StatsShowcase: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                rootMargin: '0px',
                threshold: 0.5
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);


    return (
        <section ref={ref} className="py-16 md:py-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <StatItem key={index} stat={stat} isVisible={isVisible} />
                ))}
            </div>
        </section>
    );
};

export default StatsShowcase;