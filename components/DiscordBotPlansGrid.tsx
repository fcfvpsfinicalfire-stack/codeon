
import React from 'react';

// Define plan structure
interface DiscordPlan {
  name: string;
  ram: string;
  cpu: string;
  ssd: string;
  language: string;
  price: string;
  isPopular?: boolean;
}

const plansData: DiscordPlan[] = [
  { name: 'Lil Bot', ram: '1 GB RAM', cpu: '1 CPU Core', ssd: '5GB NVMe SSD', language: 'Node.js, Python', price: '350.00' },
  { name: 'Community Bot', ram: '2 GB RAM', cpu: '1 CPU Core', ssd: '10GB NVMe SSD', language: 'Node.js, Python', price: '700.00', isPopular: true },
  { name: 'Server Manager', ram: '4 GB RAM', cpu: '2 CPU Cores', ssd: '20GB NVMe SSD', language: 'Node.js, Python', price: '1400.00' },
  { name: 'Bot Overlord', ram: '8 GB RAM', cpu: '2 CPU Cores', ssd: '40GB NVMe SSD', language: 'Node.js, Python', price: '2800.00' },
];

const SpecItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <li className="flex items-center space-x-3 text-gray-300">
    <i className={`fa-solid ${icon} text-indigo-400 w-5 text-center`}></i>
    <span>{text}</span>
  </li>
);

const DiscordPlanCard: React.FC<{ plan: DiscordPlan }> = ({ plan }) => (
    <div className={`relative bg-[#1a1829] border border-indigo-900/50 rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-indigo-500/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/50 ${plan.isPopular ? 'border-2 border-indigo-500' : ''}`}>
        {plan.isPopular && <div className="absolute top-0 right-4 -translate-y-1/2 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-20">Popular</div>}
        <div className="flex items-center space-x-3 mb-4">
             <i className="fa-brands fa-discord text-2xl text-indigo-400"></i>
            <h3 className="text-xl font-bold text-white">{plan.name}</h3>
        </div>
        <ul className="space-y-3 my-4 flex-grow">
            <SpecItem icon="fa-memory" text={plan.ram} />
            <SpecItem icon="fa-microchip" text={plan.cpu} />
            <SpecItem icon="fa-hard-drive" text={plan.ssd} />
            <SpecItem icon="fa-code" text={plan.language} />
            <SpecItem icon="fa-shield-halved" text="DDoS Protection" />
        </ul>
        <div className="border-t border-indigo-700/50 pt-4 mt-4">
            <p className="text-4xl font-extrabold text-indigo-400">
                LKR {plan.price}
                <span className="text-lg font-normal text-gray-500">/mo</span>
            </p>
            <a href="https://discord.gg/ZjJz8GKB" target="_blank" rel="noopener noreferrer" className="w-full mt-6 bg-indigo-600/90 text-white font-bold py-3 rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center space-x-2">
                <span>Deploy Bot</span>
                <i className="fa-solid fa-arrow-right text-sm"></i>
            </a>
        </div>
    </div>
);


const DiscordBotPlansGrid: React.FC = () => {
  return (
    <section>
        <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-wider text-white text-center">
                Discord Bot Hosting
            </h2>
            <p className="mt-2 text-gray-400 max-w-3xl text-center mx-auto">Reliable, 24/7 hosting to keep your Discord bot online and serving your community without interruption.</p>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {plansData.map((plan) => (
          <DiscordPlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </section>
  );
};

export default DiscordBotPlansGrid;
