
import React from 'react';
import { Star, ChevronRight, MessageSquare } from 'lucide-react';

const reviews = [
  {
    title: "Best Support on Discord!",
    text: "I was having trouble setting up my BungeeCord network, but the staff on their Discord helped me within 5 minutes. Honestly, the fastest support I've ever experienced in hosting.",
    author: "@Shadow_MC - 2 hours ago",
    stars: 5
  },
  {
    title: "Zero Lag for my SMP",
    text: "Running a 30-player SMP on their 8GB plan and the TPS hasn't dropped once. The community on Discord also helped me optimize my plugins for free. 10/10!",
    author: "@VoidRunner - Yesterday",
    stars: 5
  },
  {
    title: "Switched and Happy",
    text: "Moved from a big-name host and saved nearly 50% on my monthly bill. The migration was handled by their team via a Discord ticket. Super professional.",
    author: "@MineMaster_SL - 3 days ago",
    stars: 5
  },
  {
    title: "Affordable & Powerful",
    text: "For the price, you can't beat CODEON. Their Discord is full of experienced devs who actually give useful advice. The server hardware is absolute top-tier.",
    author: "@IronGamer_01 - 1 week ago",
    stars: 5
  },
  {
    title: "Setup was Instant",
    text: "Bought the server, joined the Discord, and it was already online by the time I opened my console. The Discord bot integration for server stats is a huge plus!",
    author: "@PixelPioneer - 2 weeks ago",
    stars: 5
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-blue-600 py-16 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2),transparent)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12">
          
          {/* Discord Rating Summary Left */}
          <div className="flex flex-col items-center justify-center text-center lg:text-left lg:items-start lg:min-w-[320px]">
            <h2 className="text-white font-black text-2xl md:text-3xl leading-tight mb-2 uppercase italic tracking-tighter">
              OUR DISCORD IS<br />
              <span className="text-4xl md:text-5xl">600+ RATED!</span>
            </h2>
            
            <div className="flex space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-7 h-7 bg-yellow-400 flex items-center justify-center rounded-md shadow-lg">
                  <Star size={16} className="fill-white text-white" />
                </div>
              ))}
            </div>

            <p className="text-blue-100 text-xs font-black uppercase tracking-widest mb-6">
              5 OUT OF 5 BASED ON <span className="underline decoration-2 underline-offset-4">600+ RATINGS</span>
            </p>
            
            <div className="flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-xl border border-white/20">
               <div className="bg-white p-1 rounded-md">
                 <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"/>
                 </svg>
               </div>
               <span className="text-white font-black uppercase tracking-widest text-sm">Discord Community</span>
            </div>
          </div>

          {/* Testimonial Cards Carousel */}
          <div className="flex-grow flex items-center space-x-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
            {reviews.map((review, idx) => (
              <div 
                key={idx}
                className="flex-shrink-0 w-[300px] md:w-[320px] bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex flex-col h-full hover:bg-white/15 transition-all cursor-grab active:cursor-grabbing group shadow-xl"
              >
                <h3 className="text-white font-black text-sm mb-4 uppercase tracking-tight group-hover:text-yellow-400 transition-colors">{review.title}</h3>
                <p className="text-blue-50 text-xs leading-relaxed font-medium flex-grow mb-6 italic opacity-90">
                  "{review.text}"
                </p>
                
                <div className="flex items-center justify-between mt-auto border-t border-white/10 pt-4">
                   <div className="flex space-x-0.5">
                     {[...Array(review.stars)].map((_, i) => (
                       <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                     ))}
                   </div>
                   <div className="flex items-center space-x-2">
                     <span className="text-[10px] text-white font-black uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                       {review.author}
                     </span>
                   </div>
                </div>
              </div>
            ))}
            
            {/* Arrow Button */}
            <button className="flex-shrink-0 w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-2xl active:scale-95">
              <ChevronRight size={24} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
