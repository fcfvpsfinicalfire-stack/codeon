
import React from 'react';

const locations = [
  { name: 'Singapore', region: 'India', flag: '🇸🇬' },
  { name: 'Mumbai', region: 'India', flag: '🇮🇳' },
  { name: 'Kansas City, MO', region: 'US Central', flag: '🇺🇸' },
  { name: 'Sri Lanka', region: 'South Asia', flag: '🇱🇰', comingSoon: true },
];

const LocationItem: React.FC<{ location: typeof locations[0] }> = ({ location }) => (
    <div className="flex items-center space-x-4 bg-card-bg-solid/50 p-4 rounded-lg border border-white/10">
        <span className="text-4xl">{location.flag}</span>
        <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-bold text-white text-lg">{location.name}</h4>
              {location.comingSoon && (
                  <span className="bg-yellow-500/20 text-yellow-300 text-xs font-bold px-2 py-0.5 rounded-full border border-yellow-500/50">
                      Coming soon
                  </span>
              )}
            </div>
            <p className="text-gray-400">{location.region}</p>
        </div>
    </div>
);


const Locations: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-dark-bg">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-[#101123] to-dark-bg z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Text Content */}
            <div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
                    Global <span className="text-accent-purple">Presence</span>,
                    <br />
                    Local <span className="text-accent-purple">Performance</span>
                </h2>
                <p className="mt-6 text-lg text-gray-300">
                    Our rapidly expanding datacenter network spans across the Americas and Europe, delivering ultra-low latency from anywhere and lightning-fast connections wherever you play.
                </p>
                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 text-gray-200">Locations</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {locations.map((loc, index) => (
                            <LocationItem key={index} location={loc} />
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Globe Visual */}
            <div className="relative flex items-center justify-center">
                <img src="https://i.postimg.cc/LsSfwHPj/image.png" alt="Glowing purple globe of the world" className="w-full max-w-lg animate-[pulse-glow-purple_5s_ease-in-out_infinite]" />
            </div>
      </div>
    </section>
  );
};

export default Locations;