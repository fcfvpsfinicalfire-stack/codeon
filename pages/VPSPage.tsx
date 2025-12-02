
import React, { useState, useMemo } from 'react';
import OperatingSystems from '../components/OperatingSystems';
import FAQ from '../components/FAQ';
import AdvancedFeatures from '../components/AdvancedFeatures';
import JoinDiscord from '../components/JoinDiscord';

// --- DATA ---
const locations = [
    { id: 'usa', name: 'USA', flag: '🇺🇸' },
    { id: 'germany', name: 'Germany', flag: '🇩🇪' },
    { id: 'singapore', name: 'Singapore', flag: '🇸🇬' },
];

const cpuTypes = [
    { id: 'ryzen7', name: 'AMD Ryzen 7', logo: 'https://i.imgur.com/2Y05ea7.png' },
    { id: 'ryzen9', name: 'AMD Ryzen 9', logo: 'https://i.imgur.com/PaoV5B6.png' },
];

const vpsPlans = [
    // USA, Ryzen 7
    { id: 'us-r7-1', location: 'usa', cpu: 'ryzen7', name: 'BVPS1', cores: 1, ram: 2, storage: 25, price: 2.70 },
    { id: 'us-r7-2', location: 'usa', cpu: 'ryzen7', name: 'BVPS2', cores: 1, ram: 4, storage: 50, price: 5.20 },
    { id: 'us-r7-3', location: 'usa', cpu: 'ryzen7', name: 'BVPS3', cores: 2, ram: 8, storage: 100, price: 10.60 },
    // USA, Ryzen 9
    { id: 'us-r9-1', location: 'usa', cpu: 'ryzen9', name: 'BVPS9-1', cores: 2, ram: 8, storage: 150, price: 18.50 },
    { id: 'us-r9-2', location: 'usa', cpu: 'ryzen9', name: 'BVPS9-2', cores: 4, ram: 16, storage: 300, price: 35.00 },
    // Germany, Ryzen 7
    { id: 'de-r7-1', location: 'germany', cpu: 'ryzen7', name: 'BVPS1-DE', cores: 1, ram: 2, storage: 25, price: 3.00 },
    { id: 'de-r7-2', location: 'germany', cpu: 'ryzen7', name: 'BVPS2-DE', cores: 1, ram: 4, storage: 50, price: 5.80 },
    // Germany, Ryzen 9
    { id: 'de-r9-1', location: 'germany', cpu: 'ryzen9', name: 'BVPS9-1-DE', cores: 2, ram: 8, storage: 150, price: 20.00 },
    // Singapore, Ryzen 7
    { id: 'sg-r7-1', location: 'singapore', cpu: 'ryzen7', name: 'BVPS1-SG', cores: 1, ram: 2, storage: 25, price: 3.10 },
    // Singapore, Ryzen 9
    { id: 'sg-r9-1', location: 'singapore', cpu: 'ryzen9', name: 'BVPS9-1-SG', cores: 2, ram: 8, storage: 150, price: 21.00 },
];

// --- COMPONENTS ---

const FilterButton: React.FC<{ onClick: () => void; selected: boolean; children: React.ReactNode }> = ({ onClick, selected, children }) => {
    const baseClasses = "flex items-center justify-center text-center px-6 py-3 rounded-lg border-2 transition-all duration-300 font-semibold text-base";
    const selectedClasses = "bg-accent-purple border-accent-purple text-white shadow-lg shadow-purple-500/20";
    const unselectedClasses = "bg-card-bg-solid/50 border-gray-800 text-gray-300 hover:border-gray-600";
    return <button onClick={onClick} className={`${baseClasses} ${selected ? selectedClasses : unselectedClasses}`}>{children}</button>;
};

const PlanCard: React.FC<{ plan: typeof vpsPlans[0] }> = ({ plan }) => {
    const cpu = cpuTypes.find(c => c.id === plan.cpu);
    
    const SpecItem: React.FC<{icon:string, value:string, label:string}> = ({icon, value, label}) => (
        <div className="flex items-center space-x-3">
            <i className={`fa-solid ${icon} text-accent-purple text-lg w-6 text-center`}></i>
            <div>
                <p className="font-bold text-white">{value}</p>
                <p className="text-xs text-gray-400">{label}</p>
            </div>
        </div>
    );

    return (
        <div className="bg-card-bg-solid/80 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-accent-purple/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/50">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <img src={cpu?.logo} alt={cpu?.name} className="w-10 h-10" />
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                </div>
            </div>
            
            <div className="my-4 space-y-4 flex-grow">
                <SpecItem icon="fa-microchip" value={`${plan.cores} Core${plan.cores > 1 ? 's' : ''}`} label={cpu?.name || 'CPU'} />
                <SpecItem icon="fa-memory" value={`${plan.ram} GB`} label="DDR5 RAM" />
                <SpecItem icon="fa-hard-drive" value={`${plan.storage} GB`} label="NVMe SSD" />
            </div>

            <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center">
                <div className="text-left">
                    <p className="text-gray-400 text-sm">Starts at</p>
                    <p className="text-2xl font-bold text-white">LKR {plan.price.toFixed(2)}<span className="text-base font-normal text-gray-400">/mo</span></p>
                </div>
                <a href="https://discord.gg/ZjJz8GKB" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:opacity-90 transition-opacity">
                    Deploy
                </a>
            </div>
        </div>
    );
};


const VPSPage: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState('usa');
    const [selectedCpu, setSelectedCpu] = useState('ryzen7');

    const filteredPlans = useMemo(() => {
        return vpsPlans.filter(plan => plan.location === selectedLocation && plan.cpu === selectedCpu);
    }, [selectedLocation, selectedCpu]);

    return (
        <>
            {/* Hero Section */}
            <div className="relative text-center py-24 md:py-32 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://i.postimg.cc/3RwNKMVH/image.png')"}}>
                <div className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="inline-flex items-center space-x-2 bg-badge-bg text-badge-text font-semibold px-4 py-2 rounded-full mb-6">
                        <i className="fa-solid fa-cloud"></i>
                        <span>High Performance Cloud</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                        Cloud VPS <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Solutions</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
                        Blazing-fast, scalable, and reliable cloud servers powered by next-gen AMD Ryzen CPUs. Full root access, total control.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Configurator */}
                <div className="bg-dark-bg/50 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-lg shadow-purple-900/50 p-6 md:p-10">
                    <div className="space-y-12">
                         {/* Filters */}
                        <section>
                            <h2 className="text-2xl font-bold mb-2 text-white"><span className="text-accent-purple">1.</span> Select Location</h2>
                            <p className="text-gray-400 mb-6">Choose a datacenter location closest to you for the best latency.</p>
                            <div className="flex flex-wrap gap-4">
                                {locations.map(loc => (
                                    <FilterButton key={loc.id} selected={selectedLocation === loc.id} onClick={() => setSelectedLocation(loc.id)}>
                                        <span className="text-2xl mr-3">{loc.flag}</span>
                                        <span>{loc.name}</span>
                                    </FilterButton>
                                ))}
                            </div>
                        </section>
                        
                        <section>
                            <h2 className="text-2xl font-bold mb-2 text-white"><span className="text-accent-purple">2.</span> Choose CPU</h2>
                             <p className="text-gray-400 mb-6">Select your preferred CPU for tailored performance.</p>
                            <div className="flex flex-wrap gap-4">
                                {cpuTypes.map(cpu => (
                                    <FilterButton key={cpu.id} selected={selectedCpu === cpu.id} onClick={() => setSelectedCpu(cpu.id)}>
                                        <img src={cpu.logo} alt={cpu.name} className="w-8 h-8 mr-3" />
                                        <span>{cpu.name}</span>
                                    </FilterButton>
                                ))}
                            </div>
                        </section>

                        {/* Plans */}
                        <section>
                            <h2 className="text-2xl font-bold mb-2 text-white"><span className="text-accent-purple">3.</span> Choose Your Plan</h2>
                            <p className="text-gray-400 mb-6">Find the perfect balance of resources for your project.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPlans.length > 0 ? (
                                    filteredPlans.map(plan => <PlanCard key={plan.id} plan={plan} />)
                                ) : (
                                    <div className="text-center py-12 bg-card-bg-solid rounded-lg md:col-span-2 lg:col-span-3">
                                        <i className="fa-solid fa-ghost text-4xl text-gray-500 mb-4"></i>
                                        <p className="text-gray-400">No plans available for this configuration.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
                
                <OperatingSystems />
            </div>

            <FAQ />
            <AdvancedFeatures />
            <JoinDiscord />
        </>
    );
};

export default VPSPage;
