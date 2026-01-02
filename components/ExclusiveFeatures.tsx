
import React from 'react';
import { Shield, Zap, Clock, Headphones, Globe, Gamepad2 } from 'lucide-react';

const featureList = [
  {
    title: '99% Uptime',
    description: 'All network outages are covered by our SLA.',
    icon: <Clock size={24} />,
    color: 'border-emerald-500/50',
    glow: 'shadow-emerald-500/10',
    iconColor: 'text-emerald-500'
  },
  {
    title: 'Instant Setup',
    description: 'Start hosting in seconds after purchasing your game server.',
    icon: <Zap size={24} />,
    color: 'border-amber-500/50',
    glow: 'shadow-amber-500/10',
    iconColor: 'text-amber-500'
  },
  {
    title: '24/7 Support',
    description: 'Our support team is available around-the-clock to assist you.',
    icon: <Headphones size={24} />,
    color: 'border-slate-500/50',
    glow: 'shadow-slate-500/10',
    iconColor: 'text-slate-400'
  },
  {
    title: 'DDoS Protection',
    description: 'We guarantee full protection against DDoS attacks under our SLA.',
    icon: <Shield size={24} />,
    color: 'border-red-500/50',
    glow: 'shadow-red-500/10',
    iconColor: 'text-red-500'
  },
  {
    title: 'Free Subdomain',
    description: 'Get a custom IP address for free using our subdomain creator.',
    icon: <Globe size={24} />,
    color: 'border-blue-500/50',
    glow: 'shadow-blue-500/10',
    iconColor: 'text-blue-500'
  },
  {
    title: 'Expanding Game Library',
    description: 'Our team is constantly working to keep our library up to date.',
    icon: <Gamepad2 size={24} />,
    color: 'border-indigo-500/50',
    glow: 'shadow-indigo-500/10',
    iconColor: 'text-indigo-500'
  }
];

const ExclusiveFeatures: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Title Section */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
            EXCLUSIVE FEATURES
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            We offer a wide variety of features that enhance your gaming experience and provide the most powerful hardware at the best price.
          </p>
        </div>

        {/* Feature Grid - Replicating the staggered/centered look from the image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featureList.map((feature, idx) => (
            <div 
              key={idx}
              className={`bg-slate-900/40 border-2 ${feature.color} ${feature.glow} p-8 rounded-2xl text-left transition-all hover:scale-[1.02] cursor-default group flex items-start space-x-5`}
            >
              <div className={`${feature.iconColor} bg-white/5 p-3 rounded-xl group-hover:bg-white/10 transition-colors`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-1/2 bg-blue-500/5 blur-[120px] -z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default ExclusiveFeatures;
