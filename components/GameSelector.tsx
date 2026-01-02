
import React from 'react';

const games = [
  { name: 'Minecraft', icon: '⛏️', color: 'bg-green-600' },
  { name: 'Rust', icon: '☢️', color: 'bg-red-700' },
  { name: 'ARK', icon: '🦖', color: 'bg-cyan-600' },
  { name: 'Terraria', icon: '🌳', color: 'bg-emerald-500' },
  { name: 'Palworld', icon: '🔥', color: 'bg-blue-600' },
  { name: 'Valheim', icon: '🛡️', color: 'bg-orange-700' },
  { name: 'Garry\'s Mod', icon: '🔧', color: 'bg-blue-700' },
  { name: 'Enshrouded', icon: '🌫️', color: 'bg-indigo-600' },
];

const GameSelector: React.FC = () => {
  return (
    <div className="bg-slate-900/30 py-12 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide no-scrollbar">
          {games.map((game, i) => (
            <button 
              key={i}
              className="flex-shrink-0 flex items-center space-x-3 bg-slate-800/50 hover:bg-slate-700 border border-white/5 px-6 py-4 rounded-xl transition-all card-hover"
            >
              <span className="text-2xl">{game.icon}</span>
              <span className="font-bold text-white whitespace-nowrap">{game.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameSelector;
