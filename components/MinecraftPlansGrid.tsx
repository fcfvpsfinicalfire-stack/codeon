
import React, { useState } from 'react';

// --- NEW INTERFACES & DATA ---

interface PlanPrices {
  [locationId: string]: string;
}

// FIX: Removed `extends Plan` to resolve a type mismatch. The `Plan` interface requires a `price` property,
// but this component's data uses a `prices` object for location-based pricing. The interface is now self-contained.
interface MinecraftPlan {
  name: string;
  ram: string;
  cpu: string;
  ssd: string;
  prices: PlanPrices;
  isPopular?: boolean;
}

interface Location {
    id: string;
    name: string;
    flag: string;
}

const locations: Location[] = [
    { id: 'sg', name: 'Singapore', flag: '🇸🇬' },
    { id: 'in', name: 'India', flag: '🇮🇳' },
    { id: 'us', name: 'USA', flag: '🇺🇸' },
];

const plansData: MinecraftPlan[] = [
    { name: 'MINECRAFT 1GB', ram: '1 GB DDR4', cpu: '0.5 CPU Core', ssd: '10GB NVMe SSD', prices: { sg: '300.00', in: '298.00', us: '228.00' } },
    { name: 'MINECRAFT 2GB', ram: '2 GB DDR4', cpu: '1 CPU Core', ssd: '10GB NVMe SSD', prices: { sg: '600.00', in: '595.00', us: '455.00' } },
    { name: 'MINECRAFT 4GB', ram: '4 GB DDR4', cpu: '1 CPU Core', ssd: '20GB NVMe SSD', prices: { sg: '1100.00', in: '1190.00', us: '910.00' } },
    { name: 'MINECRAFT 6GB', ram: '6 GB DDR4', cpu: '1.5 CPU Cores', ssd: '20GB NVMe SSD', prices: { sg: '1450.00', in: '1785.00', us: '1365.00' } },
    { name: 'MINECRAFT 8GB', ram: '8 GB DDR4', cpu: '2 CPU Cores', ssd: '30GB NVMe SSD', prices: { sg: '2200.00', in: '2380.00', us: '1820.00' }, isPopular: true },
    { name: 'MINECRAFT 10GB', ram: '10 GB DDR4', cpu: '2 CPU Cores', ssd: '30GB NVMe SSD', prices: { sg: '3300.00', in: '2975.00', us: '2275.00' } },
    { name: 'MINECRAFT 12GB', ram: '12 GB DDR4', cpu: '2 CPU Cores', ssd: '30GB NVMe SSD', prices: { sg: '3700.00', in: '3570.00', us: '2730.00' } },
    { name: 'MINECRAFT 16GB', ram: '16 GB DDR4', cpu: '4 CPU Cores', ssd: '40GB NVMe SSD', prices: { sg: '4100.00', in: '4760.00', us: '3640.00' } },
    { name: 'MINECRAFT 24GB', ram: '24 GB DDR4', cpu: '6 CPU Cores', ssd: '40GB NVMe SSD', prices: { sg: '8000.00', in: '7140.00', us: '5460.00' } },
    { name: 'MINECRAFT 32GB', ram: '32 GB DDR4', cpu: '8 CPU Cores', ssd: '40GB NVMe SSD', prices: { sg: '10900.00', in: '9520.00', us: '7280.00' } },
    { name: 'MINECRAFT 64GB', ram: '64 GB DDR4', cpu: '10 CPU Cores', ssd: '50GB NVMe SSD', prices: { sg: '21100.00', in: '19040.00', us: '14560.00' } },
];


// --- COMPONENTS ---

const SpecItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <li className="flex items-center space-x-3 text-gray-300">
    <i className={`fa-solid ${icon} text-green-400 w-5 text-center`}></i>
    <span>{text}</span>
  </li>
);

const MinecraftPlanCard: React.FC<{ plan: MinecraftPlan; location: Location }> = ({ plan, location }) => {
    const price = plan.prices[location.id] || 'N/A';

    return (
        <div className={`relative bg-[#111222] border border-gray-800 rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-green-500/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-900/50 ${plan.isPopular ? 'border-2 border-green-500' : ''}`}>
            {plan.isPopular && <div className="absolute top-0 right-4 -translate-y-1/2 bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-20">Popular</div>}
            <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">{location.flag}</span>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
            </div>
            <ul className="space-y-3 my-4 flex-grow">
                <SpecItem icon="fa-memory" text={plan.ram} />
                <SpecItem icon="fa-microchip" text={plan.cpu} />
                <SpecItem icon="fa-hard-drive" text={plan.ssd} />
                <SpecItem icon="fa-shield-halved" text="DDoS Protection" />
            </ul>
            <div className="border-t border-gray-700 pt-4 mt-4">
                <p className="text-4xl font-extrabold text-green-400">
                    LKR {price}
                    <span className="text-lg font-normal text-gray-500">/mo</span>
                </p>
                <a href="https://discord.gg/ZjJz8GKB" target="_blank" rel="noopener noreferrer"
                    className="w-full mt-6 bg-green-600/90 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                    <span>Order Now</span>
                    <i className="fa-solid fa-arrow-right text-sm"></i>
                </a>
            </div>
        </div>
    );
};

const AllPlansInclude: React.FC = () => {
    const features = [
        'AMD EPYC Processors', 'NVMe SSD Storage', 'DDoS Protection',
        'Global Locations', '99.9% Uptime SLA', 'Instant Setup',
        'Full FTP Access', 'Automated Backups'
    ];
    
    return (
        <div className="mt-16 max-w-4xl mx-auto bg-card-bg-solid/50 border border-green-500/30 rounded-2xl p-8">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-white">⚡ ALL PLANS INCLUDE</h3>
                <p className="mt-2 text-lg font-semibold text-green-400">🎯 PERFORMANCE FEATURES</p>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 text-gray-300">
                        <i className="fa-solid fa-plus text-green-500"></i>
                        <span>{feature}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


const MinecraftPlansGrid: React.FC = () => {
  const [selectedLocationId, setSelectedLocationId] = useState<string>('sg');
  const selectedLocation = locations.find(l => l.id === selectedLocationId) || locations[0];

  return (
    <section>
        <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-wider text-white text-center">
                Minecraft Hosting Plans
            </h2>
            <p className="mt-2 text-gray-400 max-w-3xl text-center mx-auto">High performance Minecraft server hosting with multiple locations for the best latency.</p>
        </div>

        {/* Location Selector */}
        <div className="flex justify-center items-center gap-4 mb-12">
            {locations.map(loc => (
                <button
                    key={loc.id}
                    onClick={() => setSelectedLocationId(loc.id)}
                    className={`flex items-center space-x-3 px-6 py-3 rounded-lg border-2 transition-all duration-300 font-semibold ${
                        selectedLocationId === loc.id
                        ? 'bg-green-500/10 border-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                        : 'bg-card-bg-solid/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                    }`}
                >
                    <span className="text-2xl">{loc.flag}</span>
                    <span>{loc.name}</span>
                </button>
            ))}
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {plansData.map((plan) => (
          <MinecraftPlanCard key={plan.name} plan={plan} location={selectedLocation} />
        ))}
      </div>

      <AllPlansInclude />
    </section>
  );
};

export default MinecraftPlansGrid;
