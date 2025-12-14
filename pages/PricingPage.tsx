
import React, { useState, useMemo } from 'react';
import IncludedFeaturesPricing from '../components/IncludedFeaturesPricing';

// --- DATA ---
const planTypes = [
  { id: 'budget-ryzen', name: 'Budget Ryzen' },
  { id: 'premium-ryzen-9', name: 'Premium Ryzen 9' },
];

const locations = [
  { id: 'singapore', name: 'Singapore', flag: '🇸🇬' },
];

const softwareList = [
    { id: 'minecraft', name: 'Minecraft', description: 'Build, explore, and create in the ultimate sandbox world.', image: 'https://i.postimg.cc/tRL3mYQW/image.png', featured: true },
    { id: 'rust', name: 'Rust', description: 'Random build, and dominate in this harsh multiplayer survival.', image: 'https://i.postimg.cc/2SFXDg4f/image.png', featured: false },
    { id: 'ark', name: 'ARK: Survival Evolved', description: 'Tame dinosaurs and survive in a prehistoric open-world.', image: 'https://i.postimg.cc/yxfBNkqF/image.png', featured: false },
    { id: 'valheim', name: 'Valheim', description: 'Explore and conquer a mystical Viking-inspired world.', image: 'https://i.imgur.com/OS2yvSP.png', featured: false },
    { id: 'mta', name: 'Multi Theft Auto', description: 'Multiplayer GTA:SA with custom modes and roleplay.', image: 'https://i.postimg.cc/8zYCPpB9/image.png', featured: false },
    { id: 'palworld', name: 'Palworld', description: 'Your favorite pals, apps and Discord bots available with one-click installs.', image: 'https://i.postimg.cc/x1S5R6MM/image.png', featured: true },
];

const allPlans: { [key: string]: any[] } = {
    minecraft: [
        { name: '1GB', ram: '1 GB RAM', cores: '0.5 Core', ssd: '10GB NVMe SSD', price: '350.00' },
        { name: '2GB', ram: '2 GB RAM', cores: '1 Core', ssd: '10GB NVMe SSD', price: '700.00' },
        { name: '4GB', ram: '4 GB RAM', cores: '1 Core', ssd: '20GB NVMe SSD', price: '1400.00', isPopular: true },
        { name: '6GB', ram: '6 GB RAM', cores: '1.5 Cores', ssd: '20GB NVMe SSD', price: '2100.00' },
        { name: '8GB', ram: '8 GB RAM', cores: '2 Cores', ssd: '30GB NVMe SSD', price: '2800.00' },
        { name: '10GB', ram: '10 GB RAM', cores: '2.5 Cores', ssd: '30GB NVMe SSD', price: '3500.00' },
        { name: '12GB', ram: '12 GB RAM', cores: '3 Cores', ssd: '30GB NVMe SSD', price: '4200.00' },
        { name: '16GB', ram: '16 GB RAM', cores: '4 Cores', ssd: '40GB NVMe SSD', price: '5600.00' },
        { name: '20GB', ram: '20 GB RAM', cores: '5 Cores', ssd: '40GB NVMe SSD', price: '7000.00' },
        { name: '24GB', ram: '24 GB RAM', cores: '6 Cores', ssd: '40GB NVMe SSD', price: '8400.00' },
        { name: '32GB', ram: '32 GB RAM', cores: '8 Cores', ssd: '40GB NVMe SSD', price: '11200.00' },
        { name: '64GB', ram: '64 GB RAM', cores: '10 Cores', ssd: '50GB NVMe SSD', price: '22400.00' },
    ],
    rust: [
        { name: 'Scrap', ram: '8 GB RAM', cores: '2 Cores', ssd: '50GB NVMe SSD', price: '2800.00' },
        { name: 'Component', ram: '12 GB RAM', cores: '3 Cores', ssd: '75GB NVMe SSD', price: '4200.00', isPopular: true },
        { name: 'High-Qual', ram: '16 GB RAM', cores: '4 Cores', ssd: '100GB NVMe SSD', price: '5600.00' },
    ],
    ark: [
        { name: 'Survivor', ram: '10 GB RAM', cores: '2 Cores', ssd: '60GB NVMe SSD', price: '3500.00' },
        { name: 'Tribe', ram: '16 GB RAM', cores: '3 Cores', ssd: '100GB NVMe SSD', price: '5600.00', isPopular: true },
    ],
    valheim: [
        { name: 'Viking', ram: '4 GB RAM', cores: '1 Core', ssd: '20GB NVMe SSD', price: '1400.00' },
        { name: 'Jarl', ram: '6 GB RAM', cores: '1.5 Cores', ssd: '30GB NVMe SSD', price: '2100.00', isPopular: true },
    ],
    mta: [
        { name: 'Street Race', ram: '2 GB RAM', cores: '1 Core', ssd: '15GB NVMe SSD', price: '700.00' },
        { name: 'City-Wide RP', ram: '8 GB RAM', cores: '2 Cores', ssd: '30GB NVMe SSD', price: '2800.00', isPopular: true },
    ],
    palworld: [
        { name: 'Hatcher', ram: '8 GB RAM', cores: '2 Cores', ssd: '40GB NVMe SSD', price: '2800.00' },
        { name: 'Syndicate', ram: '16 GB RAM', cores: '4 Cores', ssd: '80GB NVMe SSD', price: '5600.00', isPopular: true },
    ],
};

// --- SUB-COMPONENTS ---
const CurrencySelector: React.FC = () => (
    <div className="absolute top-8 right-8 z-20">
        <select className="bg-card-bg-solid border border-gray-700 rounded-md px-3 py-2 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="lkr">Rs. LKR</option>
            <option value="usd">$ USD</option>
        </select>
    </div>
);

const ConfigSection: React.FC<{ step: string; title: string; children: React.ReactNode }> = ({ step, title, children }) => (
    <div className="mb-10">
        <div className="flex items-center space-x-4 mb-4">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm bg-green-900/50 text-green-400 font-bold rounded-md border border-green-700">{step}</span>
            <h2 className="font-semibold text-white text-lg">{title}</h2>
        </div>
        <div className="pl-12">{children}</div>
    </div>
);

const ConfigButton: React.FC<{ onClick: () => void, selected: boolean, children: React.ReactNode }> = ({ onClick, selected, children }) => (
    <button
        onClick={onClick}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg border-2 transition-all duration-300 font-semibold ${
            selected
            ? 'bg-green-500/10 border-green-500 text-white'
            : 'bg-card-bg-solid/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
        }`}
    >
        {children}
    </button>
);

const SoftwareCard: React.FC<{ software: any, selected: boolean, onClick: () => void }> = ({ software, selected, onClick }) => (
    <button onClick={onClick} className={`relative group p-4 rounded-xl border-2 w-full text-left transition-all duration-300 h-full flex items-start space-x-4 ${selected ? 'bg-blue-500/10 border-blue-500' : 'bg-card-bg-solid/50 border-gray-800 hover:border-gray-600'}`}>
        {software.featured && <div className="absolute top-2 right-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Featured</div>}
        <img src={software.image} alt={software.name} className="w-12 h-12 object-contain flex-shrink-0" />
        <div>
            <p className="font-bold text-white">{software.name}</p>
            <p className="text-xs text-gray-400 mt-1">{software.description}</p>
        </div>
    </button>
);

const PlanCard: React.FC<{ plan: any, softwareName: string, locationFlag: string }> = ({ plan, softwareName, locationFlag }) => {
    const SpecItem: React.FC<{ icon: string; text: string, tooltip?: string }> = ({ icon, text, tooltip }) => (
      <li className="relative flex items-center space-x-3 text-gray-300 text-sm group">
        <i className={`fa-solid ${icon} text-green-400 w-4 text-center`}></i>
        <span>{text}</span>
         {tooltip && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs bg-card-bg-solid text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 border border-white/10 shadow-lg">
                <div className="relative">
                    {tooltip}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-card-bg-solid -mt-px"></div>
                </div>
            </div>
        )}
      </li>
    );

    return (
        <div className={`relative bg-[#111222]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-green-500/50 hover:-translate-y-1 ${plan.isPopular ? 'border-2 border-green-500' : ''}`}>
            {plan.isPopular && <div className="absolute top-0 right-4 -translate-y-1/2 bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-20">Popular</div>}
            <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">{locationFlag}</span>
                <h3 className="text-lg font-bold text-white">{softwareName} {plan.name}</h3>
            </div>
            <ul className="space-y-2.5 my-4 flex-grow">
                {plan.ram && <SpecItem icon="fa-memory" text={plan.ram} tooltip="More RAM allows for more players, plugins, and larger worlds without lag." />}
                {plan.cores && <SpecItem icon="fa-microchip" text={plan.cores} tooltip="A powerful CPU processes game logic faster, ensuring a smooth experience." />}
                {plan.ssd && <SpecItem icon="fa-hard-drive" text={plan.ssd} tooltip="NVMe SSDs provide ultra-fast loading times for your world and reduce server startup times." />}
                <SpecItem icon="fa-shield-halved" text="DDoS Protection" tooltip="Enterprise-grade protection keeps your server online and safe from attacks." />
            </ul>
            <div className="border-t border-gray-700/50 pt-4 mt-4">
                <p className="text-3xl font-extrabold text-white">
                    Rs. {plan.price}
                    <span className="text-base font-normal text-gray-500">/mo</span>
                </p>
                <a href="https://discord.gg/codeon" target="_blank" rel="noopener noreferrer"
                    className="w-full mt-5 bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-500 transition-colors flex items-center justify-center space-x-2 text-sm">
                    <span>Order Now</span>
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                </a>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const PricingPage: React.FC = () => {
    const [selectedPlanType, setSelectedPlanType] = useState('premium-ryzen-9');
    const [selectedLocation, setSelectedLocation] = useState('singapore');
    const [selectedSoftware, setSelectedSoftware] = useState('minecraft');

    const plansToShow = useMemo(() => allPlans[selectedSoftware] || [], [selectedSoftware]);
    const currentSoftware = useMemo(() => softwareList.find(s => s.id === selectedSoftware), [selectedSoftware]);
    const currentLocation = useMemo(() => locations.find(l => l.id === selectedLocation), [selectedLocation]);

    return (
        <div className="relative py-16 md:py-24 overflow-hidden">
            {/* Standard Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-[#101123] to-dark-bg"></div>
                <div className="absolute inset-0 z-0 opacity-20 animate-plexus-pan"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7-7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-dark-bg/80"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <CurrencySelector />
                <div className="text-center">
                    <div className="inline-block bg-badge-bg text-badge-text px-4 py-1 rounded-full text-sm font-semibold mb-4">
                        GAME SERVERS
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                        Choose your <span className="text-green-400">Game Server</span>
                    </h1>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        Select from out wide range of optimized game servers. Each server is configured for maximum performance and comes with DDoS protection.
                    </p>
                </div>

                <div className="mt-16 space-y-8">
                    {/* --- CONFIGURATOR --- */}
                    <ConfigSection step="1" title="Plan Type">
                        <div className="flex flex-wrap gap-4">
                            {planTypes.map(pt => (
                                <ConfigButton key={pt.id} selected={selectedPlanType === pt.id} onClick={() => setSelectedPlanType(pt.id)}>
                                    <i className="fa-solid fa-microchip text-green-400"></i>
                                    <span>{pt.name}</span>
                                </ConfigButton>
                            ))}
                        </div>
                    </ConfigSection>

                    <ConfigSection step="2" title="Location">
                        <div className="flex flex-wrap gap-4">
                             {locations.map(loc => (
                                <ConfigButton key={loc.id} selected={selectedLocation === loc.id} onClick={() => setSelectedLocation(loc.id)}>
                                    <span className="text-xl">{loc.flag}</span>
                                    <span>{loc.name}</span>
                                </ConfigButton>
                            ))}
                        </div>
                    </ConfigSection>

                    <ConfigSection step="3" title="Select Software">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {softwareList.map(sw => (
                                <SoftwareCard key={sw.id} software={sw} selected={selectedSoftware === sw.id} onClick={() => setSelectedSoftware(sw.id)} />
                            ))}
                        </div>
                    </ConfigSection>

                    {/* --- PRICING GRID --- */}
                    <div className="pt-8">
                        <ConfigSection step="4" title="Choose Plan">
                            <div key={selectedSoftware} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
                                {plansToShow.map((plan, index) => (
                                    <PlanCard 
                                        key={index}
                                        plan={plan}
                                        softwareName={currentSoftware?.name || ''}
                                        locationFlag={currentLocation?.flag || '🇸🇬'}
                                    />
                                ))}
                            </div>
                        </ConfigSection>
                    </div>
                </div>
                
                <IncludedFeaturesPricing />

            </div>
        </div>
    );
};

export default PricingPage;
