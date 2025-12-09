
import React, { useState, useMemo } from 'react';

interface Game {
    name: string;
    image: string;
    category: string;
    price: string;
    isFeatured?: boolean;
}

const gamesData: Game[] = [
    { name: 'Minecraft', image: 'https://i.imgur.com/gJBz7HFh.png', category: 'Sandbox', price: '1.99/mo', isFeatured: true },
    { name: 'FiveM', image: 'https://i.imgur.com/kG5B224.png', category: 'Roleplay', price: '1.99/mo', isFeatured: true },
    { name: 'CS-GO', image: 'https://i.imgur.com/Yh3t8v5.png', category: 'FPS', price: '1.99/mo' },
    { name: 'Rust', image: 'https://i.imgur.com/OS2yvSP.png', category: 'Survival', price: '1.99/mo' },
    { name: 'ECO Game', image: 'https://i.imgur.com/2Y05ea7.png', category: 'Survival', price: '1.99/mo' },
    { name: 'Valheim', image: 'https://i.imgur.com/s1mJ5kV.png', category: 'Survival', price: '1.99/mo' },
    { name: 'ARK', image: 'https://i.imgur.com/PaoV5B6.png', category: 'Survival', price: '1.99/mo' },
    { name: 'Multi Theft Auto', image: 'https://i.imgur.com/3RwNKMVH.png', category: 'Roleplay', price: '1.99/mo' },
];

const categories = ['All Games', 'Featured', 'Survival', 'FPS', 'Sandbox', 'Roleplay'];

const GameCard: React.FC<{ game: Game }> = ({ game }) => (
    <div className="bg-card-bg-solid rounded-lg overflow-hidden border border-gray-800 transition-all duration-300 hover:border-discord-blue/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-discord-blue/10">
        <div className="relative h-48 bg-cover bg-center group" style={{ backgroundImage: `url(${game.image})` }}>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
            {game.isFeatured && (
                <span className="absolute top-3 right-3 bg-discord-blue text-white text-xs font-bold px-2 py-1 rounded">Featured</span>
            )}
            <span className="absolute bottom-3 left-3 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded backdrop-blur-sm">{game.category}</span>
        </div>
        <div className="p-4 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-2">{game.name}</h3>
            <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-400">From <span className="font-bold text-white">${game.price}</span></p>
                <button className="bg-discord-blue text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
                    View Plans
                </button>
            </div>
        </div>
    </div>
);


const SupportedGames: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('All Games');

    const filteredGames = useMemo(() => {
        if (activeFilter === 'All Games') {
            return gamesData;
        }
        if (activeFilter === 'Featured') {
            return gamesData.filter(g => g.isFeatured);
        }
        return gamesData.filter(g => g.category === activeFilter);
    }, [activeFilter]);

    return (
        <section className="py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
                <div className="inline-block bg-badge-bg text-badge-text px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    GAME VARIETY
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Huge Selection of Supported Games
                </h2>
                <p className="mt-4 text-gray-400">
                    We support a wide range of popular games with optimized configurations and one-click installations. Choose your game and start playing in minutes.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-10 mb-12">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveFilter(category)}
                        className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors duration-200 border ${
                            activeFilter === category
                                ? 'bg-discord-blue text-white border-discord-blue'
                                : 'bg-card-bg-solid/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredGames.map(game => (
                    <GameCard key={game.name} game={game} />
                ))}
            </div>
        </section>
    );
};

export default SupportedGames;
