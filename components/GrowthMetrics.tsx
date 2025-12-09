
import React, { useState, useEffect, useRef } from 'react';

const metricsData = [
    {
        icon: 'fa-solid fa-check',
        endValue: 99,
        label: 'RELIABILITY',
        suffix: '%',
        color: 'text-blue-400',
        gradient: 'from-blue-500 to-cyan-400',
    },
    {
        icon: 'fa-solid fa-users',
        endValue: 250,
        label: 'HAPPY CLIENTS',
        suffix: '+',
        color: 'text-purple-400',
        gradient: 'from-purple-500 to-blue-500',
    },
    {
        icon: 'fa-solid fa-server',
        endValue: 15,
        label: 'CLOUD SERVERS',
        suffix: '+',
        color: 'text-fuchsia-400',
        gradient: 'from-fuchsia-500 to-purple-500',
    },
    {
        icon: 'fa-solid fa-bullseye',
        endValue: 15,
        label: 'RESPONSE TIME',
        suffix: 'Min',
        color: 'text-cyan-400',
        gradient: 'from-cyan-400 to-sky-500',
    },
];

const MetricCard: React.FC<{ metric: typeof metricsData[0], isVisible: boolean }> = ({ metric, isVisible }) => {
    const [count, setCount] = useState(0);
    const duration = 2000; // 2 seconds

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const startTime = performance.now();

        const animateCount = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime > duration) {
                setCount(metric.endValue);
                return;
            }
            const progress = elapsedTime / duration;
            const currentCount = start + (metric.endValue - start) * progress;
            setCount(currentCount);
            requestAnimationFrame(animateCount);
        };

        requestAnimationFrame(animateCount);
    }, [isVisible, metric.endValue]);

    return (
        <div className="bg-card-bg-solid/50 border border-white/10 rounded-2xl p-6 text-center flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-white/5 mb-6 text-3xl ${metric.color}`}>
                <i className={metric.icon}></i>
            </div>
            <p className="text-4xl md:text-5xl font-extrabold text-white">
                {Math.round(count)}
                <span className={metric.color}>{metric.suffix}</span>
            </p>
            <p className="mt-2 text-sm text-gray-400 uppercase tracking-widest">{metric.label}</p>
            <div className={`w-1/2 h-1 bg-gradient-to-r ${metric.gradient} rounded-full mt-6`}></div>
        </div>
    );
};

const GrowthMetrics: React.FC = () => {
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
                threshold: 0.3 // Trigger when 30% of the element is visible
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
        <section ref={ref} className="py-16 md:py-24 bg-dark-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-block bg-badge-bg text-badge-text px-4 py-1.5 rounded-md text-sm font-semibold mb-4 border border-white/10">
                        OUR GROWTH METRICS
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Excellence</span>
                    </h2>
                    <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
                </div>
                
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {metricsData.map((metric, index) => (
                        <MetricCard key={index} metric={metric} isVisible={isVisible} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GrowthMetrics;
