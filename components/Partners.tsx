
import React from 'react';
import { ExternalLink } from 'lucide-react';

const partners = [
  {
    name: 'ESCLIPC MC NETHWORK',
    description: 'A premier Minecraft network focused on competitive gameplay and unique custom game modes for a global audience.',
    color: 'text-purple-500'
  },
  {
    name: 'VOID SMP',
    description: 'An immersive survival multiplayer experience with a deep focus on community-driven storytelling and exploration.',
    color: 'text-slate-400'
  },
  {
    name: 'FITH CLUB MC NETHWORK',
    description: 'The ultimate high-energy Minecraft network featuring intense PvP challenges and a robust survival economy.',
    color: 'text-red-500'
  },
  {
    name: 'TRBOXY CLUB',
    description: 'An innovative sandbox community enabling players to build, share, and interact in a creative digital playground.',
    color: 'text-blue-500'
  }
];

const Partners: React.FC = () => {
  return (
    <div className="py-24 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Our Trusted Partners</h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg">
          At CODEON HOSTHING, we work with top gaming brands to deliver unbeatable hosting experiences and exclusive content for our community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, i) => (
            <div 
              key={i}
              className="group bg-slate-900/50 border border-white/5 p-8 rounded-2xl text-left transition-all hover:bg-slate-900 hover:border-blue-500/30 card-hover flex flex-col"
            >
              <div className={`text-2xl font-black uppercase tracking-widest mb-4 ${partner.color}`}>
                {partner.name}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                {partner.description}
              </p>
              <button className="flex items-center space-x-2 text-slate-300 group-hover:text-blue-400 font-semibold text-sm transition-colors border border-white/10 bg-white/5 py-2 px-4 rounded-lg self-start">
                <ExternalLink size={16} />
                <span>Visit Website</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
