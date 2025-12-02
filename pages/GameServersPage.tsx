import React from 'react';
import { Page } from '../App';
import WhyChooseUs from '../components/WhyChooseUs';
import FAQ from '../components/FAQ';
import JoinDiscord from '../components/JoinDiscord';
import Locations from '../components/Locations';

// --- DATA ---
const games = [
    { id: 'minecraft', name: 'Minecraft', image: 'https://i.postimg.cc/NMHknXyF/image.png' },
    { id: 'rust', name: 'Rust', image: 'https://i.postimg.cc/pVj8885C/image.png' },
    { id: 'ark', name: 'ARK: Survival', image: 'https://i.postimg.cc/tRr03Z0h/image.png' },
    { id: 'valheim', name: 'Valheim', image: 'https://i.imgur.com/OS2yvSP.png' },
    { id: 'mta', name: 'MTA:SA', image: 'https://i.imgur.com/IksA5Tj.png' },
];

const features = [
    { icon: 'fa-rocket', title: 'Instant Setup', description: 'Deploy in minutes' },
    { icon: 'fa-shield-halved', title: 'DDoS Protection', description: 'Always-on security' },
    { icon: 'fa-headset', title: '24/7 Support', description: 'Expert help anytime' },
    { icon: 'fa-gamepad', title: 'Powerful Panel', description: 'Full server control' },
];

// --- COMPONENTS ---
const Background: React.FC = () => (
    <div className="absolute inset-0 z-0 overflow-hidden bg-dark-bg">
        <div className="absolute inset-0 animate-aurora opacity-50" style={{
            background: 'linear-gradient(125deg, rgba(34, 197, 94, 0.15) 0%, rgba(13, 14, 27, 0) 25%, rgba(138, 43, 226, 0.1) 50%, rgba(13, 14, 27, 0) 75%, rgba(34, 197, 94, 0.15) 100%)',
            backgroundSize: '400% 400%',
        }}></div>
    </div>
);

const GameCard: React.FC<{ game: typeof games[0]; setPage: (page: Page) => void }> = ({ game, setPage }) => (
    <button 
        onClick={() => setPage('pricing')}
        className="relative group bg-card-bg-solid border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <img src={game.image} alt={game.name} className="w-24 h-24 object-contain mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h3 className="text-xl font-bold text-white">{game.name}</h3>
        </div>
    </button>
);


interface GameServersPageProps {
    setPage: (page: Page) => void;
}

const GameServersPage: React.FC<GameServersPageProps> = ({ setPage }) => {
    return (
        <>
            <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                <Background />
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="inline-flex items-center space-x-2 bg-badge-bg border border-green-500/50 text-green-300 font-semibold px-4 py-2 rounded-full mb-6">
                        <i className="fa-solid fa-gamepad"></i>
                        <span>Game Server Hosting</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                        Unleash Your Gaming World
                    </h1>
                    <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
                        High-performance, low-latency server hosting for the world's most popular games. Your adventure starts here.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Features Bar */}
                <div className="bg-card-bg-solid/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {features.map(feature => (
                        <div key={feature.title} className="flex flex-col items-center">
                            <i className={`fa-solid ${feature.icon} text-3xl text-brand-cyan mb-2`}></i>
                            <h4 className="font-semibold text-white">{feature.title}</h4>
                            <p className="text-sm text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Game Grid */}
                <div className="py-16 md:py-24">
                    <h2 className="text-3xl font-bold text-center mb-12">Choose Your Game</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {games.map(game => (
                            <GameCard key={game.id} game={game} setPage={setPage} />
                        ))}
                    </div>
                </div>
            </div>
            
            <WhyChooseUs />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Locations />
                <FAQ />
                <JoinDiscord />
            </div>
        </>
    );
};

export default GameServersPage;