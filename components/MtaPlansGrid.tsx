
import React from 'react';

// Define plan structure
interface MtaPlan {
  name: string;
  ram: string;
  cpu: string;
  slots: string;
  price: string;
  isPopular?: boolean;
}

const plansData: MtaPlan[] = [
  { name: 'Street Race', ram: '2 GB RAM', cpu: '1 CPU', slots: '32 Slots', price: '700.00' },
  { name: 'Crew Hangout', ram: '4 GB RAM', cpu: '1.5 CPU', slots: '64 Slots', price: '1400.00', isPopular: true },
  { name: 'City-Wide RP', ram: '8 GB RAM', cpu: '2 CPU', slots: '128 Slots', price: '2800.00' },
  { name: 'Metropolis', ram: '12 GB RAM', cpu: '3 CPU', slots: '256+ Slots', price: '4200.00' },
];

const SpecItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <li className="flex items-center space-x-3 text-gray-300">
    <i className={`fa-solid ${icon} text-brand-magenta w-5 text-center`}></i>
    <span>{text}</span>
  </li>
);

const MtaPlanCard: React.FC<{ plan: MtaPlan }> = ({ plan }) => (
    <div className={`relative bg-gradient-to-br from-[#1c1215] to-[#21151c] border border-red-900/50 rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-red-500/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-900/50 ${plan.isPopular ? 'border-2 border-red-500' : ''}`}>
        {plan.isPopular && <div className="absolute top-0 right-4 -translate-y-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-20">Popular</div>}
        <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl">🇸🇬</span>
            <h3 className="text-xl font-bold text-white">{plan.name}</h3>
        </div>
        <ul className="space-y-3 my-4 flex-grow">
            <SpecItem icon="fa-memory" text={plan.ram} />
            <SpecItem icon="fa-microchip" text={plan.cpu} />
            <SpecItem icon="fa-users" text={plan.slots} />
            <SpecItem icon="fa-shield-halved" text="DDoS Protection" />
        </ul>
        <div className="border-t border-red-700/50 pt-4 mt-4">
            <p className="text-4xl font-extrabold text-red-400">
                LKR {plan.price}
                <span className="text-lg font-normal text-gray-500">/mo</span>
            </p>
            <a href="https://discord.gg/ZjJz8GKB" target="_blank" rel="noopener noreferrer" className="w-full mt-6 bg-red-600/90 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2">
                <span>Start Server</span>
                <i className="fa-solid fa-arrow-right text-sm"></i>
            </a>
        </div>
    </div>
);


const MtaPlansGrid: React.FC = () => {
  return (
    <section>
        <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-wider text-white text-center">
                MTA:SA Hosting Plans
            </h2>
            <p className="mt-2 text-gray-400 max-w-3xl text-center mx-auto">Host your own San Andreas multiplayer world with our optimized, high-performance servers.</p>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {plansData.map((plan) => (
          <MtaPlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </section>
  );
};

export default MtaPlansGrid;
