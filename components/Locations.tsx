import React from 'react';

const locations = [
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'USA', flag: '🇺🇸' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Australia', flag: '🇦🇺' },
];

const LocationCard: React.FC<{ location: typeof locations[0] }> = ({ location }) => (
  <div className="relative group bg-card-bg-solid/50 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-900/50 hover:border-cyan-500/50">
      <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
          {location.flag}
      </div>
      <h3 className="text-lg font-bold text-white">{location.name}</h3>
      <div className="mt-2 flex items-center justify-center space-x-2">
          <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-semibold text-green-400">ONLINE</span>
      </div>
  </div>
);

const Locations: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-[#101123] to-dark-bg z-0"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Global Network, Local Performance</h2>
          <p className="mt-4 text-gray-300">
            Deploy your servers close to your players for the best possible latency and gaming experience. Our network is optimized for performance and reliability.
          </p>
        </div>
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {locations.map((loc, index) => (
              <LocationCard key={index} location={loc} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;