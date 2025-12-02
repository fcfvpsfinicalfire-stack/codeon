
import React from 'react';

// Define plan structure
interface ArkPlan {
  name: string;
  ram: string;
  cpu: string;
  ssd: string;
  slots: string;
  price: string;
  isPopular?: boolean;
}

// ARK is very demanding
const plansData: ArkPlan[] = [
  { name: 'Survivor', ram: '10 GB RAM', cpu: '2 CPU', ssd: '60GB NVMe SSD', slots: '30 Slots', price: '3500.00' },
  { name: 'Tribe', ram: '16 GB RAM', cpu: '3 CPU', ssd: '100GB NVMe SSD', slots: '50 Slots', price: '5600.00', isPopular: true },
  { name: 'Alpha', ram: '24 GB RAM', cpu: '4 CPU', ssd: '150GB NVMe SSD', slots: '70 Slots', price: '8400.00' },
  { name: 'Tek Tier', ram: '32 GB RAM', cpu: '6 CPU', ssd: '200GB NVMe SSD', slots: '100+ Slots', price: '11200.00' },
];

const SpecItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <li className="flex items-center space-x-3 text-gray-300">
    <i className={`fa-solid ${icon} text-teal-400 w-5 text-center`}></i>
    <span>{text}</span>
  </li>
);

const ArkPlanCard: React.FC<{ plan: ArkPlan }> = ({ plan }) => (
    <div className={`relative bg-[#111a19] border border-teal-900/50 rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-teal-500/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-900/50 ${plan.isPopular ? 'border-2 border-teal-500' : ''}`}>
        {plan.isPopular && <div className="absolute top-0 right-4 -translate-y-1/2 bg-teal-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-20">Popular</div>}
        <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl">🇸🇬</span>
            <h3 className="text-xl font-bold text-white">{plan.name} Plan</h3>
        </div>
        <ul className="space-y-3 my-4 flex-grow">
            <SpecItem icon="fa-memory" text={plan.ram} />
            <SpecItem icon="fa-microchip" text={plan.cpu} />
            <SpecItem icon="fa-hard-drive" text={plan.ssd} />
            <SpecItem icon="fa-users" text={plan.slots} />
            <SpecItem icon="fa-shield-halved" text="DDoS Protection" />
        </ul>
        <div className="border-t border-teal-700/50 pt-4 mt-4">
            <p className="text-4xl font-extrabold text-teal-400">
                LKR {plan.price}
                <span className="text-lg font-normal text-gray-500">/mo</span>
            </p>
            <a href="https://discord.gg/ZjJz8GKB" target="_blank" rel="noopener noreferrer" className="w-full mt-6 bg-teal-600/90 text-white font-bold py-3 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center space-x-2">
                <span>Order Now</span>
                <i className="fa-solid fa-arrow-right text-sm"></i>
            </a>
        </div>
    </div>
);


const ArkPlansGrid: React.FC = () => {
  return (
    <section>
        <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-wider text-white text-center">
                ARK: Survival Evolved Plans
            </h2>
            <p className="mt-2 text-gray-400 max-w-3xl text-center mx-auto">Tame the wild with our powerful ARK servers, ready for epic adventures and massive tribes.</p>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {plansData.map((plan) => (
          <ArkPlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </section>
  );
};

export default ArkPlansGrid;
