
import React from 'react';

// Define plan structure
interface ValheimPlan {
  name: string;
  ram: string;
  cpu: string;
  ssd: string;
  slots: string;
  price: string;
  isPopular?: boolean;
}

// Valheim is less demanding than ARK/Rust but more than vanilla Minecraft
const plansData: ValheimPlan[] = [
  { name: 'Viking', ram: '4 GB RAM', cpu: '1 CPU', ssd: '20GB NVMe SSD', slots: '10 Slots', price: '1400.00' },
  { name: 'Jarl', ram: '6 GB RAM', cpu: '1.5 CPU', ssd: '30GB NVMe SSD', slots: '20 Slots', price: '2100.00', isPopular: true },
  { name: 'Einherjar', ram: '8 GB RAM', cpu: '2 CPU', ssd: '40GB NVMe SSD', slots: '30 Slots', price: '2800.00' },
  { name: 'All-Father', ram: '12 GB RAM', cpu: '2.5 CPU', ssd: '60GB NVMe SSD', slots: '50+ Slots', price: '4200.00' },
];

const SpecItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <li className="flex items-center space-x-3 text-gray-300">
    <i className={`fa-solid ${icon} text-sky-400 w-5 text-center`}></i>
    <span>{text}</span>
  </li>
);

const ValheimPlanCard: React.FC<{ plan: ValheimPlan }> = ({ plan }) => (
    <div className={`relative bg-[#11151f] border border-sky-900/50 rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-sky-500/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-900/50 ${plan.isPopular ? 'border-2 border-sky-500' : ''}`}>
        {plan.isPopular && <div className="absolute top-0 right-4 -translate-y-1/2 bg-sky-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-20">Popular</div>}
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
        <div className="border-t border-sky-700/50 pt-4 mt-4">
            <p className="text-4xl font-extrabold text-sky-400">
                LKR {plan.price}
                <span className="text-lg font-normal text-gray-500">/mo</span>
            </p>
            <a href="https://discord.gg/ZjJz8GKB" target="_blank" rel="noopener noreferrer" className="w-full mt-6 bg-sky-600/90 text-white font-bold py-3 rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center space-x-2">
                <span>Order Now</span>
                <i className="fa-solid fa-arrow-right text-sm"></i>
            </a>
        </div>
    </div>
);


const ValheimPlansGrid: React.FC = () => {
  return (
    <section>
        <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-wider text-white text-center">
                Valheim Hosting Plans
            </h2>
            <p className="mt-2 text-gray-400 max-w-3xl text-center mx-auto">Brave the tenth Norse world with our stable and powerful Valheim servers, perfect for you and your clan.</p>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {plansData.map((plan) => (
          <ValheimPlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </section>
  );
};

export default ValheimPlansGrid;
