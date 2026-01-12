
import React from 'react';
import { Share2, Clock, BookOpen, MessageCircle, ArrowLeft } from 'lucide-react';
import DiscordBanner from '../components/DiscordBanner';

export default function ArticlePage() {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-6 py-20">
        
        {/* Header Section */}
        <div className="mb-12">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            7 April 2024
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tighter italic mb-8 drop-shadow-lg">
            The CODEON HOSTHING Panel - The Latest Trendsetter In Multiplayer Gaming
          </h1>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-slate-300 text-sm md:text-base leading-relaxed font-medium opacity-90">
          <p>
            CODEON HOSTHING has been working tirelessly to bring multiplayer gamers something completely new. We're breaking all boundaries and setting a new industry standard for server hosts: Hosting your multiplayer server for games isn't supposed to detract from the gaming. We've taken steps to completely overhaul absolutely everything you know about game server hosting. CODEON HOSTHING has made it quicker, more responsive, more reliable, easier to use, and more automated than ever.
          </p>

          <p>
            No more confusing buttons, drop-downs, and hundreds of guides just to get to play your favorite game on your server. CODEON HOSTHING has taken every frustration with game server hosting and flipped it on its head, redesigning absolutely every element of the panel. We've spent years rebuilding our hardware and software, so that it's SPECIFICALLY tailored to all players, and we are calling this new interactive panel: the CODEON HOSTHING Panel; launching as part of our Orbit project (which we'll be going into more in the coming weeks).
          </p>

          {/* First Featured Image (Updated with User's provided image) */}
          <div className="my-16 relative flex justify-center group">
             {/* Background Glow */}
             <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000"></div>
             
             <div className="relative z-10 w-full max-w-2xl transform transition-all duration-700 hover:scale-[1.02]">
                <img 
                  src="https://i.postimg.cc/8CPjb4N2/image-removebg-preview-(3).png" 
                  alt="New CODEON Panel Interface" 
                  className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                />
             </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic mt-16 mb-6">
            Where have I seen Multiplayer Game Servers Before?
          </h2>

          <p>
            Many multiplayer gamers across the globe may not even be aware, but nearly every game they play actually uses multiplayer servers. Nearly every major multiplayer title that players enjoy, whether it be League of Legends, Counter-Strike, Rainbow Six Siege, Minecraft, Player Unknown's Battlegrounds, Fortnite...they all use <span className="text-white italic font-bold">Multiplayer Game Servers</span>.
          </p>

          <p>
            These servers are called "dedicated servers" and when it comes to Fortnite, PUBG, League of Legends, and Rainbow Six, these servers are solely owned by the developers. This gives developers control, but also costs them money, limits player freedom, and means servers eventually get shut down causing multiplayer on that game to die.
          </p>

          {/* Second Featured Image (Game Mashup) */}
          <div className="my-12 relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-slate-900 p-1 flex items-center justify-center">
             <div className="grid grid-cols-3 gap-1 w-full aspect-[16/7]">
               <div className="relative overflow-hidden">
                 <img src="https://i.postimg.cc/xTThnbj0/image.png" className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all" alt="FPS" />
               </div>
               <div className="relative overflow-hidden">
                 <img src="https://picsum.photos/seed/mc-landscape-render/400/800" className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all" alt="Minecraft" />
               </div>
               <div className="relative overflow-hidden">
                 <img src="https://picsum.photos/seed/rust-render/400/800" className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all" alt="Rust" />
               </div>
             </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic mt-16 mb-6">
            Where Multiplayers Establish A MultiHome
          </h2>

          <p>
            On the other hand, players who want more community, more customization, and no risk of servers being shut down, that's where hosting your own servers is perfect! It's not available for every title out there, but it is for many fan favorites such as CS:GO, Terraria, Minecraft, Rust, and many more. These servers (unlike the ones owned by the developers) can be customized however players see fit! Add mods, plugins, maps, whatever the host enjoys.
          </p>

          <p>
            The actual hosting process can be tedious, to say the least, and it is even harder if you are running your own server at home or on your own dedicated server! Sooo many issues! We recognize the current difficulties in multiplayer game server hosting and have drafted a solution to over a decade of gaming struggles. Look forward to the CODEON HOSTHING Panel!
          </p>
        </div>

        {/* Share Section */}
        <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-between">
           <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                <Share2 size={16} />
                <span>Share Post</span>
              </button>
              <button className="flex items-center space-x-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                <MessageCircle size={16} />
                <span>Comment</span>
              </button>
           </div>
           <button 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="text-slate-500 hover:text-white transition-colors text-xs font-black uppercase italic"
           >
             Back to Top
           </button>
        </div>
      </div>

      <DiscordBanner />
    </div>
  );
}
