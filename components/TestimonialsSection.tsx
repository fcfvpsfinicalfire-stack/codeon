
import React from 'react';
import { Star, MessageCircle, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    title: "Best Support on Discord!",
    text: "I was having trouble setting up my BungeeCord network, but the staff on their Discord helped me within 5 minutes. Honestly, the fastest support I've ever experienced in hosting.",
    author: "@Shadow_MC",
    time: "2 hours ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shadow",
    stars: 5
  },
  {
    title: "Zero Lag for my SMP",
    text: "Running a 30-player SMP on their 8GB plan and the TPS hasn't dropped once. The community on Discord also helped me optimize my plugins for free. 10/10!",
    author: "@VoidRunner",
    time: "Yesterday",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Void",
    stars: 5
  },
  {
    title: "Switched and Happy",
    text: "Moved from a big-name host and saved nearly 50% on my monthly bill. The migration was handled by their team via a Discord ticket. Super professional.",
    author: "@MineMaster_SL",
    time: "3 days ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mine",
    stars: 5
  },
  {
    title: "Affordable & Powerful",
    text: "For the price, you can't beat CODEON. Their Discord is full of experienced devs who actually give useful advice. The server hardware is absolute top-tier.",
    author: "@IronGamer_01",
    time: "1 week ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Iron",
    stars: 5
  },
  {
    title: "Setup was Instant",
    text: "Bought the server, joined the Discord, and it was already online by the time I opened my console. The Discord bot integration for server stats is a huge plus!",
    author: "@PixelPioneer",
    time: "2 weeks ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pixel",
    stars: 5
  }
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <div className="w-[350px] flex-shrink-0 bg-[#111827] border border-white/5 p-6 rounded-3xl mx-4 relative group overflow-hidden hover:border-white/10 transition-colors">
    <div className="absolute top-0 right-0 p-6 opacity-10">
      <Quote size={40} className="text-blue-500 rotate-12" />
    </div>

    <div className="flex items-center gap-1 mb-4">
      {[...Array(review.stars)].map((_, i) => (
        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
      ))}
    </div>

    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors">{review.title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
      "{review.text}"
    </p>

    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
      <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 overflow-hidden">
        <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
      </div>
      <div>
        <p className="text-white text-xs font-bold">{review.author}</p>
        <p className="text-slate-500 text-[10px]">{review.time}</p>
      </div>
    </div>
  </div>
);

const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-[#05080f] py-32 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md">
              <MessageCircle size={12} className="text-blue-400" /> Community Feedback
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-2 uppercase italic tracking-tighter loading-none">
              OUR DISCORD IS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">600+ RATED!</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium">
              5 OUT OF 5 BASED ON <span className="text-white font-bold underline decoration-blue-500 decoration-2 underline-offset-4">600+ RATINGS</span>
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-lg shadow-[#5865F2]/20 transition-all"
          >
            Join Our Community
          </motion.button>

        </div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative w-full overflow-hidden mask-linear-gradient">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#05080f] to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#05080f] to-transparent z-10"></div>

        <motion.div
          className="flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...reviews, ...reviews, ...reviews].map((review, i) => ( // Triple the list for smooth infinite scroll
            <ReviewCard key={i} review={review} />
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default TestimonialsSection;
