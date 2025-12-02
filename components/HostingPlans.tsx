
import React, { useState } from 'react';
import { Page, Plan } from '../App';

// Define the structure for a server type button
interface ServerType {
  id: string;
  name: string;
  icon: string;
}

// Define the structure for a plan
interface MinecraftPlan extends Plan {
  name: string;
  ram: string;
  cpu: string;
  ssd: string;
  price: string;
  isPopular?: boolean;
}

const serverTypes: ServerType[] = [
  { id: 'vanilla', name: 'Vanilla', icon: 'fa-solid fa-cube' },
  { id: 'modded', name: 'Modded', icon: 'fa-solid fa-wrench' },
  { id: 'smp', name: 'SMP/Community', icon: 'fa-solid fa-users' },
  { id: 'modpacks', name: 'Modpacks', icon: 'fa-solid fa-box-archive' },
];

const plans: MinecraftPlan[] = [
  { name: 'Minecraft 1GB', ram: '1 GB RAM', cpu: '0.5 CPU', ssd: '10GB NVMe SSD', price: '350.00', paypalLink: 'https://www.paypal.com/ncp/payment/EEU6X35W9AGKY' },
  { name: 'Minecraft 2GB', ram: '2 GB RAM', cpu: '1 CPU', ssd: '10GB NVMe SSD', price: '700.00' },
  { name: 'Minecraft 4GB', ram: '4 GB RAM', cpu: '1 CPU', ssd: '20GB NVMe SSD', price: '1400.00', isPopular: true },
  { name: 'Minecraft 6GB', ram: '6 GB RAM', cpu: '1.5 CPU', ssd: '20GB NVMe SSD', price: '2100.00' },
];

const ServerTypeButton: React.FC<{
  type: ServerType;
  isSelected: boolean;
  onClick: () => void;
}> = ({ type, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 px-6 py-3 rounded-full border-2 transition-all duration-300 font-semibold ${
      isSelected
        ? 'bg-brand-cyan/10 border-brand-cyan text-brand-cyan shadow-[0_0_15px_rgba(34,211,238,0.3)]'
        : 'bg-card-bg-solid/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
    }`}
  >
    <i className={type.icon}></i>
    <span>{type.name}</span>
  </button>
);


const SpecItem: React.FC<{ icon: string; text: string; tooltip?: string }> = ({ icon, text, tooltip }) => (
    <li className="relative flex items-center space-x-3 text-gray-300 group">
        <i className={`fa-solid ${icon} text-green-400 w-5 text-center`}></i>
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

const PlanCard: React.FC<{ plan: MinecraftPlan }> = ({ plan }) => {
  return (
    <div className={`relative bg-[#111222] border border-gray-800 rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-green-500/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-900/50 ${plan.isPopular ? 'border-2 border-green-500' : ''}`}>
        {plan.isPopular && <div className="absolute top-0 right-4 -translate-y-1/2 bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-20">Popular</div>}
        <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl">🇸🇬</span>
            <h3 className="text-xl font-bold text-white">{plan.name}</h3>
        </div>
        <ul className="space-y-3 my-4 flex-grow">
            <SpecItem icon="fa-memory" text={plan.ram} tooltip="More RAM allows for more players, plugins, and larger worlds without lag." />
            <SpecItem icon="fa-microchip" text={plan.cpu} tooltip="A powerful CPU processes game logic faster, ensuring a smooth experience, especially with many players or complex mods." />
            <SpecItem icon="fa-hard-drive" text={plan.ssd} tooltip="NVMe SSDs provide ultra-fast loading times for your world and reduce server startup times." />
            <SpecItem icon="fa-shield-halved" text="DDoS Protection" tooltip="Enterprise-grade protection keeps your server online and safe from attacks." />
        </ul>
        <div className="border-t border-gray-700 pt-4 mt-4">
            <p className="text-4xl font-extrabold text-green-400">
                LKR {plan.price}
                <span className="text-lg font-normal text-gray-500">/mo</span>
            </p>
            <a
              href="https://discord.gg/ZjJz8GKB" target="_blank" rel="noopener noreferrer"
              className="w-full mt-6 bg-green-600/90 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                <span>Order Now</span>
                <i className="fa-solid fa-arrow-right text-sm"></i>
            </a>
        </div>
    </div>
  );
};

interface HostingPlansProps {
  setPage: (page: Page) => void;
}

const HostingPlans: React.FC<HostingPlansProps> = ({ setPage }) => {
  const [selectedType, setSelectedType] = useState('vanilla');

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(34, 211, 238, 0.1), transparent 30%), radial-gradient(circle at 90% 80%, rgba(225, 29, 72, 0.1), transparent 30%)',
        }}></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold">Pick your Minecraft server package</h2>
                <p className="mt-4 text-gray-400">
                    Choose a server type for a tailored package — switch anytime.
                </p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
                {serverTypes.map((type) => (
                    <ServerTypeButton
                        key={type.id}
                        type={type}
                        isSelected={selectedType === type.id}
                        onClick={() => setSelectedType(type.id)}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 max-w-7xl mx-auto">
                {plans.map((plan) => (
                    <PlanCard key={plan.name} plan={plan} />
                ))}
            </div>
        </div>
    </section>
  );
};

export default HostingPlans;
