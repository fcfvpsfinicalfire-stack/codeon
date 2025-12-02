
import React, { useState } from 'react';
import MinecraftPlansGrid from '../components/MinecraftPlansGrid';
import RustPlansGrid from '../components/RustPlansGrid';
import ArkPlansGrid from '../components/ArkPlansGrid';
import ValheimPlansGrid from '../components/ValheimPlansGrid';
import DiscordBotPlansGrid from '../components/DiscordBotPlansGrid';
import MtaPlansGrid from '../components/MtaPlansGrid';

// --- DATA ---
const planTypes = [
  { id: 'amd-epyc', name: 'AMD EPYC Processors', cpu: 'EPYC', description: 'Top-tier performance for the most demanding game servers.' }
];

const locations = [
  { id: 'singapore', name: 'Singapore', flag: '🇸🇬', region: 'Asia' }
];

const softwareList = [
  { id: 'minecraft', name: 'Minecraft', image: 'https://i.postimg.cc/tRL3mYQW/image.png' },
  { id: 'rust', name: 'Rust', image: 'https://i.postimg.cc/2SFXDg4f/image.png' },
  { id: 'ark', name: 'ARK: Survival', image: 'https://i.postimg.cc/yxfBNkqF/image.png' },
  { id: 'valheim', name: 'Valheim', image: 'https://i.imgur.com/OS2yvSP.png' },
  { id: 'discord', name: 'Discord Bot', icon: 'fa-brands fa-discord' },
  { id: 'mta', name: 'MTA:SA', image: 'https://i.imgur.com/IksA5Tj.png' }
];

// --- NEW PROFESSIONAL COMPONENTS ---

const Background: React.FC = () => (
    <div className="absolute inset-0 z-0 overflow-hidden bg-dark-bg">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-accent-purple/10 to-transparent to-70% blur-3xl animate-blob"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-brand-cyan/10 to-transparent to-70% blur-3xl animate-blob" style={{ animationDelay: '3s' }}></div>
    </div>
);

const Hero: React.FC = () => (
    <div className="text-center pt-24 pb-16 relative">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white animate-text-focus-in">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-brand-cyan">Perfect Server</span>
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg animate-text-focus-in" style={{ animationDelay: '0.2s' }}>
            Follow our guided steps to configure and deploy a high-performance server tailored to your exact needs.
        </p>
    </div>
);

const ConfigSection: React.FC<{ step: string; title: string; children: React.ReactNode; }> = ({ step, title, children }) => (
    <div className="relative p-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent">
        <div className="bg-[#0D0E1C] rounded-[15px] p-6 sm:p-8">
            <div className="flex items-center space-x-4 mb-6">
                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-lg bg-gradient-to-br from-accent-purple to-brand-cyan text-white font-bold rounded-md shadow-lg">{step}</span>
                <h2 className="font-bold text-white text-2xl">{title}</h2>
            </div>
            <div>{children}</div>
        </div>
    </div>
);


const LocationButton: React.FC<{ location: any, selected: boolean, onClick: () => void }> = ({ location, selected, onClick }) => (
    <button onClick={onClick} className={`relative group p-4 rounded-xl border-2 w-full transition-all duration-300 transform ${selected ? 'bg-accent-purple/10 border-accent-purple scale-105' : 'bg-card-bg-solid/50 border-gray-800 hover:border-gray-600 hover:-translate-y-1'}`}>
        <div className="flex items-center">
            <span className="text-4xl mr-4">{location.flag}</span>
            <div>
                <span className="text-white font-semibold text-lg">{location.name}</span>
                <span className="block text-sm text-gray-400">{location.region}</span>
            </div>
        </div>
        {selected && <div className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-accent-purple rounded-full shadow-lg"><i className="fa-solid fa-check text-sm text-white"></i></div>}
    </button>
);

const CpuButton: React.FC<{ plan: any, selected: boolean, onClick: () => void }> = ({ plan, selected, onClick }) => (
     <button onClick={onClick} className={`relative group p-4 rounded-xl border-2 w-full transition-all duration-300 transform text-left ${selected ? 'bg-orange-500/10 border-orange-500 scale-105' : 'bg-card-bg-solid/50 border-gray-800 hover:border-gray-600 hover:-translate-y-1'}`}>
        <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-900 rounded-lg flex flex-col items-center justify-center mr-4 flex-shrink-0 border border-white/10">
                <span className="text-orange-500 font-bold text-sm leading-none">AMD</span>
                <span className="text-white font-bold text-3xl leading-tight">{plan.cpu}</span>
            </div>
            <div>
                 <span className="text-white font-semibold text-lg">{plan.name}</span>
                 <span className="block text-sm text-gray-400">{plan.description}</span>
            </div>
        </div>
        {selected && <div className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-orange-500 rounded-full shadow-lg"><i className="fa-solid fa-check text-sm text-white"></i></div>}
    </button>
);


const SoftwareButton: React.FC<{ software: any, selected: boolean, onClick: () => void }> = ({ software, selected, onClick }) => (
    <button onClick={onClick} className={`relative group p-4 rounded-xl border-2 w-full text-left transition-all duration-300 h-full flex flex-col items-center justify-center text-center transform ${selected ? 'bg-accent-purple/10 border-accent-purple scale-105' : 'bg-card-bg-solid/50 border-gray-800 hover:border-gray-600 hover:-translate-y-1'}`}>
        {software.image ? (
            <img src={software.image} alt={software.name} className="w-20 h-20 object-contain mb-3 transition-transform duration-300 group-hover:scale-110" />
        ) : (
            <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-gray-800 rounded-lg mb-3 transition-transform duration-300 group-hover:scale-110 border border-white/10">
                <i className={`${software.icon} text-4xl text-purple-300`}></i>
            </div>
        )}
        <span className="text-white font-semibold mt-auto">{software.name}</span>
        {selected && <div className="absolute right-3 top-3 w-6 h-6 flex items-center justify-center bg-accent-purple rounded-full shadow-lg"><i className="fa-solid fa-check text-xs text-white"></i></div>}
    </button>
);

// --- MAIN PAGE COMPONENT ---
const PricingPage: React.FC = () => {
    const [selectedPlan, setSelectedPlan] = useState('amd-epyc');
    const [selectedLocation, setSelectedLocation] = useState('singapore');
    const [selectedSoftware, setSelectedSoftware] = useState('minecraft');
    
    const renderPlanGrid = () => {
        switch (selectedSoftware) {
            case 'minecraft': return <MinecraftPlansGrid />;
            case 'rust': return <RustPlansGrid />;
            case 'ark': return <ArkPlansGrid />;
            case 'valheim': return <ValheimPlansGrid />;
            case 'discord': return <DiscordBotPlansGrid />;
            case 'mta': return <MtaPlansGrid />;
            default: return null;
        }
    };

    return (
        <div className="relative overflow-hidden">
            <Background />
            <div className="relative z-10">
                <Hero />
                
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-12">
                    <div className="space-y-8 animate-tilt-in-fwd" style={{ animationDelay: '0.4s' }}>
                        <ConfigSection step="01" title="Select Your Location">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {locations.map(loc => (
                                    <LocationButton key={loc.id} location={loc} selected={selectedLocation === loc.id} onClick={() => setSelectedLocation(loc.id)} />
                                ))}
                            </div>
                        </ConfigSection>
                        
                        <ConfigSection step="02" title="Select Your Core">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {planTypes.map(plan => (
                                    <CpuButton key={plan.id} plan={plan} selected={selectedPlan === plan.id} onClick={() => setSelectedPlan(plan.id)} />
                                ))}
                            </div>
                        </ConfigSection>
                        
                        <ConfigSection step="03" title="Select Your Application">
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                                {softwareList.map(sw => (
                                    <SoftwareButton key={sw.id} software={sw} selected={selectedSoftware === sw.id} onClick={() => setSelectedSoftware(sw.id)} />
                                ))}
                            </div>
                        </ConfigSection>
                    </div>

                    <div key={selectedSoftware} className="animate-fade-in pt-12">
                         <div className="w-24 h-1 bg-gradient-to-r from-accent-purple to-brand-cyan mx-auto mb-12 rounded-full"></div>
                        {renderPlanGrid()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
