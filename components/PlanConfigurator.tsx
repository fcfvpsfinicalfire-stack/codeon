
import React, { useState, useMemo } from 'react';

const Slider: React.FC<{ label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; iconClass: string; }> = 
({ label, value, min, max, step, unit, onChange, iconClass }) => (
    <div className="space-y-3 p-4 bg-gray-900/50 border border-gray-700/50 rounded-lg transition-colors hover:border-gray-600">
        <div className="flex justify-between items-center">
            <label className="font-semibold text-gray-300 flex items-center space-x-3">
                <i className={`${iconClass} text-green-400 w-5 text-center`}></i>
                <span>{label}</span>
            </label>
            <span className="text-white font-bold text-lg bg-gray-900 px-2 py-1 rounded-md">{value}{unit}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className="w-full h-3 bg-gray-800 border border-green-900/50 rounded-full appearance-none cursor-pointer range-lg accent-brand-green"
        />
    </div>
);

const SectionHeader: React.FC<{ step: string; title: string; description: string; }> = ({ step, title, description }) => (
    <div className="mb-8">
        <div className="flex items-center space-x-4">
            <span className="text-brand-green font-mono text-2xl">{step}</span>
            <h2 className="text-3xl font-bold tracking-wider text-white">
                <span className="text-gray-500">[</span> {title} <span className="text-gray-500">]</span>
            </h2>
        </div>
        <p className="mt-2 ml-12 text-gray-400 max-w-3xl">{description}</p>
    </div>
);

const SummarySpecItem: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="bg-green-900/20 p-3 rounded-lg flex items-center space-x-3 border border-green-500/20">
        <i className={`fa-solid ${icon} text-green-400 w-6 text-xl text-center`}></i>
        <div>
            <p className="text-sm text-green-300/80">{label}</p>
            <p className="font-bold text-white text-md">{value}</p>
        </div>
    </div>
);

const PlanConfigurator: React.FC = () => {
    const [ram, setRam] = useState(4); // in GB
    const [cpu, setCpu] = useState(1); // in Cores
    const [storage, setStorage] = useState(20); // in GB

    const price = useMemo(() => {
        const ramPrice = ram * 350;
        const cpuPrice = cpu * 700;
        const storagePrice = storage * 5; 
        return ramPrice + cpuPrice + storagePrice;
    }, [ram, cpu, storage]);

    const recommendedSlots = useMemo(() => {
        if (ram <= 1) return '5-15';
        if (ram <= 2) return '15-30';
        if (ram <= 4) return '30-60';
        if (ram <= 6) return '60-100';
        if (ram <= 8) return '100-150';
        if (ram <= 12) return '150-200';
        return '200+';
    }, [ram]);

    return (
        <section>
            <SectionHeader step="04" title="Configure Resources" description="Fine-tune your server's resources. Adjust RAM, CPU, and Storage to match your player count and mod requirements." />
            <div className="bg-card-bg-solid border border-green-800/50 rounded-xl p-6 md:p-8 grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Sliders */}
                <div className="space-y-6">
                    <Slider 
                        label="Memory (RAM)"
                        value={ram}
                        min={1}
                        max={16}
                        step={1}
                        unit="GB"
                        onChange={(e) => setRam(parseInt(e.target.value))}
                        iconClass="fa-solid fa-memory"
                    />
                    <Slider 
                        label="CPU Cores"
                        value={cpu}
                        min={0.5}
                        max={4}
                        step={0.5}
                        unit=" vCore"
                        onChange={(e) => setCpu(parseFloat(e.target.value))}
                        iconClass="fa-solid fa-microchip"
                    />
                    <Slider 
                        label="NVMe SSD Storage"
                        value={storage}
                        min={10}
                        max={80}
                        step={10}
                        unit="GB"
                        onChange={(e) => setStorage(parseInt(e.target.value))}
                        iconClass="fa-solid fa-hard-drive"
                    />
                </div>

                {/* Summary & Price */}
                <div className="bg-gradient-to-br from-gray-900/80 to-brand-green-dark-bg/80 border-2 border-brand-green/50 rounded-lg p-6 h-full flex flex-col justify-between shadow-[0_0_35px_rgba(34,197,94,0.15)]">
                    <div>
                        <h3 className="font-bold text-white text-2xl text-left mb-4">Configuration Summary</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            <SummarySpecItem icon="fa-memory" label="Memory" value={`${ram} GB`} />
                            <SummarySpecItem icon="fa-microchip" label="CPU" value={`${cpu} vCore`} />
                            <SummarySpecItem icon="fa-hard-drive" label="Storage" value={`${storage} GB NVMe`} />
                            <SummarySpecItem icon="fa-users" label="Rec. Slots" value={recommendedSlots} />
                        </div>
                        
                        <div className="text-center mt-6 border-t border-green-500/20 pt-4">
                            <h4 className="font-semibold uppercase tracking-wider text-green-400/80 mb-2 text-sm">Included Features</h4>
                            <ul className="text-left space-y-2 text-gray-300 text-sm">
                                <li className="flex items-center space-x-2"><i className="fa-solid fa-check text-brand-green w-4 text-center"></i><span>High-Performance Hardware</span></li>
                                <li className="flex items-center space-x-2"><i className="fa-solid fa-check text-brand-green w-4 text-center"></i><span>DDoS Protection</span></li>
                                <li className="flex items-center space-x-2"><i className="fa-solid fa-check text-brand-green w-4 text-center"></i><span>24/7 Support & Instant Setup</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-6 text-center border-t border-green-500/20 pt-4">
                        <p className="text-gray-400 font-semibold uppercase tracking-wider text-sm">Total Cost</p>
                        <p className="text-5xl font-extrabold text-brand-green my-1" style={{textShadow: '0 0 15px rgba(34, 197, 94, 0.6)'}}>
                          LKR {price.toFixed(2)}
                        </p>
                        <p className="text-gray-400">per month</p>
                        <a href="https://discord.gg/codeon" target="_blank" rel="noopener noreferrer" className="w-full mt-6 bg-brand-green text-black font-bold py-3 rounded-lg text-lg flex items-center justify-center space-x-2 hover:bg-green-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-green/20">
                            <span>Deploy Server</span>
                            <i className="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlanConfigurator;
