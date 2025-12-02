
import React, { useState, useMemo } from 'react';
import OperatingSystems from '../components/OperatingSystems';
import AdvancedFeatures from '../components/AdvancedFeatures';
import FAQ from '../components/FAQ';
import JoinDiscord from '../components/JoinDiscord';

// --- DATA ---

const cpuTypes = [
    { id: 'ryzen7', name: 'AMD Ryzen 7', logo: 'https://i.imgur.com/2Y05ea7.png' },
    { id: 'ryzen9', name: 'AMD Ryzen 9', logo: 'https://i.imgur.com/PaoV5B6.png' },
];

const locations = [
    { id: 'singapore', name: 'Singapore', flag: '🇸🇬' },
];

const plans = [
    {
        id: 'vds-r9-basic',
        cpu: 'ryzen9',
        location: 'singapore',
        name: 'VDS-R9-Basic',
        badge: { text: 'Popular', color: 'bg-purple-600' },
        price: 25000,
        specs: {
            cpu: 'AMD Ryzen 9',
            cores: '6 Cores',
            ram: '32 GB',
            ramType: 'DDR5',
            ssd: '1 TB',
            ssdType: 'NVMe',
            bandwidth: 'Unlimited',
        },
        features: ['Full Root Access', '24/7 Support'],
    },
    {
        id: 'vds-r9-standard',
        cpu: 'ryzen9',
        location: 'singapore',
        name: 'VDS-R9-Standard',
        badge: { text: 'Best Value', color: 'bg-indigo-500' },
        isBestValue: true,
        price: 50000,
        specs: {
            cpu: 'AMD Ryzen 9',
            cores: '8 Cores',
            ram: '64 GB',
            ramType: 'DDR5',
            ssd: '2 TB',
            ssdType: 'NVMe',
            bandwidth: 'Unlimited',
        },
        features: ['Full Root Access', '24/7 Support'],
    },
    {
        id: 'vds-r9-pro',
        cpu: 'ryzen9',
        location: 'singapore',
        name: 'VDS-R9-Pro',
        badge: { text: 'Professional', color: 'bg-fuchsia-600' },
        price: 100000,
        specs: {
            cpu: 'AMD Ryzen 9',
            cores: '12 Cores',
            ram: '128 GB',
            ramType: 'DDR5',
            ssd: '4 TB',
            ssdType: 'NVMe',
            bandwidth: 'Unlimited',
        },
        features: ['Full Root Access', '24/7 Support'],
    },
];

// --- COMPONENTS ---

const PlanCard: React.FC<{ plan: typeof plans[0] }> = ({ plan }) => {
    const cardClasses = `relative bg-card-bg-solid rounded-xl p-6 border-2 transition-all duration-300 flex flex-col ${plan.isBestValue ? 'border-accent-purple' : 'border-gray-800 hover:border-accent-purple/50'}`;
    
    const SpecItem: React.FC<{icon: string, label: string, value: string, subValue: string}> = ({ icon, label, value, subValue }) => (
        <div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
                <i className={`fa-solid ${icon} w-4 text-center`}></i>
                <span>{label}</span>
            </div>
            <p className="font-bold text-xl text-white mt-1">{value}</p>
            <p className="text-sm text-gray-400">{subValue}</p>
        </div>
    );
    
    return (
        <div className={cardClasses}>
            {plan.badge && (
                <div className={`absolute -top-3 right-5 text-white text-xs font-bold px-3 py-1 rounded-full ${plan.badge.color}`}>
                    {plan.badge.text}
                </div>
            )}

            <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl">🇸🇬</span>
                <div>
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <p className="text-gray-400">Singapore</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-8 flex-grow">
                <SpecItem icon="fa-microchip" label={plan.specs.cpu} value={plan.specs.cores} subValue="" />
                <SpecItem icon="fa-memory" label={`${plan.specs.ramType} RAM`} value={plan.specs.ram} subValue="" />
                <SpecItem icon="fa-hard-drive" label={`${plan.specs.ssdType} SSD`} value={plan.specs.ssd} subValue="" />
                <SpecItem icon="fa-wifi" label="Bandwidth" value={plan.specs.bandwidth} subValue="" />
            </div>

            <ul className="space-y-2 text-gray-300 border-t border-white/10 pt-6">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                        <i className="fa-solid fa-check text-green-500"></i>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="border-t border-white/10 pt-6 mt-6">
                <p className="text-4xl font-extrabold text-white">
                    LKR {plan.price.toFixed(2)}
                    <span className="text-lg font-normal text-gray-500">/mo</span>
                </p>
                <a href="https://discord.gg/ZjJz8GKB" target="_blank" rel="noopener noreferrer" className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-colors flex items-center justify-center space-x-2">
                    <span>Order Now</span>
                    <i className="fa-solid fa-arrow-right text-sm"></i>
                </a>
            </div>
        </div>
    );
};


const DedicatedServerPage: React.FC = () => {
    const [selectedCpu, setSelectedCpu] = useState('ryzen9');
    const [selectedLocation, setSelectedLocation] = useState('singapore');

    const filteredPlans = useMemo(() => {
        return plans.filter(plan => plan.cpu === selectedCpu && plan.location === selectedLocation);
    }, [selectedCpu, selectedLocation]);

    return (
        <>
            <div className="relative py-24 md:py-32 text-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://i.postimg.cc/q7KGJmb5/image.png')" }}>
                <div className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="inline-flex items-center space-x-2 bg-card-bg-solid border border-gray-700 text-purple-300 font-semibold px-4 py-2 rounded-full mb-6">
                       <i className="fa-solid fa-server"></i>
                       <span>Dedicated Servers</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                        Unleash <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Bare Metal Power</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
                        Enterprise-grade dedicated servers for maximum performance and total control. Perfect for the most demanding applications.
                    </p>
                </div>
            </div>

            <div className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            <section>
                                <h2 className="text-lg font-semibold mb-4 text-gray-300">1. CPU Type</h2>
                                <div className="flex flex-wrap gap-4">
                                    {cpuTypes.map(cpu => (
                                        <button 
                                            key={cpu.id} 
                                            onClick={() => setSelectedCpu(cpu.id)}
                                            className={`flex items-center p-3 rounded-lg border-2 transition-all duration-300 w-full sm:w-auto ${selectedCpu === cpu.id ? 'bg-accent-purple/10 border-accent-purple' : 'bg-card-bg-solid border-gray-800 hover:border-gray-600'}`}
                                        >
                                            <img src={cpu.logo} alt={cpu.name} className="w-10 h-10 mr-4" />
                                            <span className="font-bold text-white">{cpu.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </section>
                            <section>
                                <h2 className="text-lg font-semibold mb-4 text-gray-300">2. Location</h2>
                                <div className="flex flex-wrap gap-4">
                                    {locations.map(loc => (
                                        <button 
                                            key={loc.id} 
                                            onClick={() => setSelectedLocation(loc.id)}
                                            className={`flex items-center p-3 rounded-lg border-2 transition-all duration-300 w-full sm:w-auto ${selectedLocation === loc.id ? 'bg-accent-purple/10 border-accent-purple' : 'bg-card-bg-solid border-gray-800 hover:border-gray-600'}`}
                                        >
                                            <span className="text-2xl mr-3">{loc.flag}</span>
                                            <span className="font-bold text-white">{loc.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Plans */}
                        <section className="mt-12">
                            <h2 className="text-lg font-semibold mb-4 text-gray-300">3. Choose Plan</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPlans.length > 0 ? (
                                    filteredPlans.map(plan => <PlanCard key={plan.id} plan={plan} />)
                                ) : (
                                    <div className="text-center py-12 bg-card-bg-solid rounded-lg lg:col-span-3">
                                        <p className="text-gray-400">No plans available for this configuration.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <OperatingSystems />
                 <AdvancedFeatures />
                 <FAQ />
                 <JoinDiscord />
            </div>
        </>
    );
};

export default DedicatedServerPage;
