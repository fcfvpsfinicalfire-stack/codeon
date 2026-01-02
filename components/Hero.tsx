
import React from 'react';
import { Users, ArrowRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-16 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 z-10">
            <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8 animate-bounce">
              <Users size={16} className="text-blue-400" />
              <span className="text-xs font-black uppercase tracking-widest text-slate-200">
                Join <span className="text-white">2,000+ DISCORD MEMBERS</span>
              </span>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse ml-1"></div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6 uppercase tracking-tighter">
              Minecraft Server <br />
              <span className="text-blue-500">Hosting and More</span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
              We offer high-performance server hosting for over <span className="text-white font-semibold">60 different games</span> like Minecraft, ARK, Rust, Terraria, and Valheim. Join millions of players worldwide.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-lg shadow-xl shadow-blue-600/20 flex items-center justify-center transition-all group">
                View Minecraft Plans
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center transition-all">
                View All Games
              </button>
            </div>
          </div>

          {/* 3D Illustration Mock */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-square">
              {/* Hexagonal Background Pattern */}
              <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full"></div>
              
              {/* Central Hexagon Content */}
              <div className="relative z-10 flex items-center justify-center h-full">
                 <div className="w-[85%] aspect-[0.866/1] bg-slate-800/80 backdrop-blur-sm border-2 border-white/10 rounded-[10%] rotate-3 transform overflow-hidden shadow-2xl">
                    <img 
                      src="https://i.postimg.cc/NMJhXMS7/image.png" 
                      alt="Game Graphic" 
                      className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                    
                    {/* Floating Icons overlay */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                       <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse cursor-pointer hover:bg-blue-400 transition-colors">
                         <Play fill="white" className="ml-1" size={32} />
                       </div>
                    </div>
                 </div>

                 {/* Floating decorative elements */}
                 <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
                 <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
