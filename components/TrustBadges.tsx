import React from 'react';

const partners = [
  { name: 'Intel', logo: 'https://i.imgur.com/vA15A9G.png' },
  { name: 'AMD', logo: 'https://i.imgur.com/s1mJ5kV.png' },
  { name: 'Cloudflare', logo: 'https://i.imgur.com/w1sN1pW.png' },
  { name: 'Pterodactyl', logo: 'https://i.imgur.com/tJMh19x.png' },
  { name: 'cPanel', logo: 'https://i.imgur.com/fOL5w45.png' },
  { name: 'LiteSpeed', logo: 'https://i.imgur.com/wTRLzV4.png' },
];

const TrustBadges: React.FC = () => {
    return (
        <section className="py-12 bg-dark-bg/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <h3 className="text-center md:text-left text-lg font-semibold text-gray-400 flex-shrink-0">
                        Powered by Industry Leaders
                    </h3>
                    <div className="w-full h-px md:w-px md:h-8 bg-white/10"></div>
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                        {partners.map((partner) => (
                             <img 
                                key={partner.name} 
                                src={partner.logo} 
                                alt={partner.name} 
                                className="h-7 object-contain filter grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
