
import React from 'react';
import { Zap, Clock, User, Calendar, Users } from 'lucide-react';
import DiscordBanner from '../components/DiscordBanner';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
}

const BlogPage: React.FC = () => {
  const posts: BlogPost[] = [
    {
      id: 1,
      title: "Announcing Shockbyte's Minecraft Education Partnership",
      excerpt: "CODEON for Education supplies teachers with the tools they need to bring Minecraft to the classroom...",
      category: "MINECRAFT",
      image: "https://picsum.photos/seed/blog1/400/220",
      author: "Cami Sclanca",
      date: "Dec 29, 2023"
    },
    {
      id: 2,
      title: "Modpack Installer Upgrade",
      excerpt: "Learn where, when, and how to catch Red Snapper in Stardew Valley with our new guide...",
      category: "THE CODEON CONTROL PANEL",
      image: "https://picsum.photos/seed/blog2/400/220",
      author: "Cami Sclanca",
      date: "Dec 17, 2023"
    },
    {
      id: 3,
      title: "What Does Sam Like in Stardew Valley?",
      excerpt: "Find out what Sam likes in Stardew Valley, where to find him, and how to increase friendship levels...",
      category: "STARDEW VALLEY",
      image: "https://picsum.photos/seed/blog3/400/220",
      author: "Cami Sclanca",
      date: "Dec 12, 2023"
    },
    {
      id: 4,
      title: "Best Christmas Minecraft Skins to Level Up Your Holiday Vibes",
      excerpt: "Discover the best Christmas Minecraft skins for 2024! Cute, funny, and festive skins for your avatar...",
      category: "MINECRAFT",
      image: "https://picsum.photos/seed/blog4/400/220",
      author: "Cami Sclanca",
      date: "Dec 11, 2023"
    },
    {
      id: 5,
      title: "The Best Minecraft Christmas Mods to Try",
      excerpt: "Get into the holiday spirit with the best Minecraft Christmas mods. Perfect for decorating your world...",
      category: "MINECRAFT",
      image: "https://picsum.photos/seed/blog5/400/220",
      author: "Cami Sclanca",
      date: "Dec 11, 2023"
    },
    {
      id: 6,
      title: "What Does Shane Like in Stardew Valley?",
      excerpt: "Find out what Shane likes in Stardew Valley, find his schedule, and discover how to trigger his heart events...",
      category: "STARDEW VALLEY",
      image: "https://picsum.photos/seed/blog6/400/220",
      author: "Cami Sclanca",
      date: "Dec 10, 2023"
    },
    {
      id: 7,
      title: "The Best Minecraft Christmas Builds",
      excerpt: "Explore the best Minecraft Christmas builds, from cozy cabins to massive winter wonderlands...",
      category: "MINECRAFT",
      image: "https://picsum.photos/seed/blog7/400/220",
      author: "Cami Sclanca",
      date: "Dec 9, 2023"
    },
    {
      id: 8,
      title: "What Does Penny Like in Stardew Valley?",
      excerpt: "Discover Penny's favorite gifts, her schedule, and everything else you need to know about the school teacher...",
      category: "STARDEW VALLEY",
      image: "https://picsum.photos/seed/blog8/400/220",
      author: "Cami Sclanca",
      date: "Dec 5, 2023"
    },
    {
      id: 9,
      title: "What Does Abigail Like in Stardew Valley? [Full Gift Guide]",
      excerpt: "Find out what gifts Abigail loves in Stardew Valley, where to find her, and how to marry her...",
      category: "STARDEW VALLEY",
      image: "https://picsum.photos/seed/blog9/400/220",
      author: "Cami Sclanca",
      date: "Dec 4, 2023"
    },
    {
      id: 10,
      title: "Where to Catch Red Snapper in Stardew Valley (A Full Guide)",
      excerpt: "Learn where, when, and how to catch Red Snapper in Stardew Valley, a crucial fish for community center bundles...",
      category: "STARDEW VALLEY",
      image: "https://picsum.photos/seed/blog10/400/220",
      author: "Cami Sclanca",
      date: "Dec 3, 2023"
    }
  ];

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen font-sans">
      
      {/* Blog Header */}
      <section className="pt-24 pb-16 px-4 text-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6 shadow-2xl shadow-blue-600/30">
            <Zap size={28} className="text-white fill-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter italic">
            CODEON BLOG
          </h1>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
            News and development updates.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-[#111827]/40 border border-white/5 rounded-3xl overflow-hidden group hover:bg-[#1a2333]/80 hover:border-blue-500/20 transition-all duration-300 shadow-xl"
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-white font-black text-base uppercase tracking-tight mb-3 line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-xs font-bold leading-relaxed mb-6 line-clamp-2 uppercase tracking-wide">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center">
                      <User size={12} className="text-slate-400" />
                    </div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-tight">
                      {post.author}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-500">
                    <Calendar size={12} />
                    <span className="text-[10px] font-black uppercase tracking-tight">
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <button className="bg-slate-800/80 hover:bg-slate-700 text-white font-black py-2.5 px-10 rounded-lg text-[10px] uppercase tracking-widest border border-white/10 transition-all active:scale-95 shadow-xl">
            Show More
          </button>
        </div>
      </section>

      {/* Blue Discord Banner */}
      <section className="bg-blue-600 py-4 border-t border-black/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-8 text-[11px] font-black uppercase tracking-widest">
          <p className="text-white">Join our Discord server for exclusive industry news, updates & giveaways!</p>
          <a 
            href="https://discord.gg/PE7HuAEA"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 px-5 py-2 rounded-lg flex items-center space-x-2 hover:bg-slate-100 transition-colors shadow-lg active:scale-95"
          >
            <Users size={16} />
            <span>Join Discord</span>
          </a>
        </div>
      </section>

    </div>
  );
};

export default BlogPage;
