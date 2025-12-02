
import React from 'react';

const modpacks = [
  // Two rows of data to create a stacked effect
  [
    { name: 'Modpack 1', image: 'https://i.postimg.cc/Cx1ZL7S0/image-2025-11-27-130841217.png' },
    { name: 'Modpack 2', image: 'https://i.postimg.cc/LXz500BG/image.png' },
    { name: 'Modpack 3', image: 'https://i.postimg.cc/9FxMS9Zf/image.png' },
    { name: 'Modpack 4', image: 'https://i.postimg.cc/Hx4Wt8TG/image.png' },
    { name: 'Modpack 5', image: 'https://i.postimg.cc/j22VJD5z/image.png' },
    { name: 'Modpack 6', image: 'https://i.postimg.cc/VLjy0Psp/image.png' },
    { name: 'Modpack 7', image: 'https://i.postimg.cc/sgVLBBNB/image.png' },
    { name: 'Modpack 8', image: 'https://i.postimg.cc/qMQL511B/image.png' },
    { name: 'Modpack 9', image: 'https://i.postimg.cc/m2Z3CQBK/image.png' },
  ],
  [
    { name: 'Modpack 10', image: 'https://i.postimg.cc/W36rJ4KV/image.png' },
    { name: 'Modpack 11', image: 'https://i.postimg.cc/xj5MfcLS/image.png' },
    { name: 'Modpack 12', image: 'https://i.postimg.cc/vZgVthks/image.png' },
    { name: 'Modpack 13', image: 'https://i.postimg.cc/y6L3q2CL/image.png' },
    { name: 'Modpack 14', image: 'https://i.postimg.cc/W32zCw9H/image.png' },
    { name: 'Modpack 15', image: 'https://i.postimg.cc/qvskrCCz/image.png' },
    { name: 'Modpack 16', image: 'https://i.postimg.cc/7LLYNZfD/image.png' },
    { name: 'Modpack 17', image: 'https://i.postimg.cc/Z5sh4F5h/image.png' },
  ]
];

const ModpackCard: React.FC<{ modpack: typeof modpacks[0][0] }> = ({ modpack }) => (
    <div className="flex-shrink-0 w-44 h-44 md:w-48 md:h-48 mx-4 group relative cursor-pointer">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative w-full h-full bg-card-bg-solid rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-cyan-400/50 transition-all duration-300">
             <img src={modpack.image} alt={modpack.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
    </div>
);

const Marquee: React.FC<{ items: typeof modpacks[0]; reverse?: boolean }> = ({ items, reverse }) => {
    const duplicatedItems = [...items, ...items];
    const animationClass = reverse ? 'animate-[marquee-scroll_60s_linear_infinite_reverse]' : 'animate-[marquee-scroll_60s_linear_infinite]';
    
    return (
        <ul className={`flex items-stretch ${animationClass}`}>
            {duplicatedItems.map((modpack, index) => (
                <li key={index}>
                    <ModpackCard modpack={modpack} />
                </li>
            ))}
        </ul>
    );
};


const Modpacks: React.FC = () => {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden bg-dark-bg">
            <div className="absolute inset-0 z-0 opacity-25" style={{
                backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(0, 255, 255, 0.1), transparent 40%), radial-gradient(circle at 90% 80%, rgba(138, 43, 226, 0.1), transparent 40%)',
            }}></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
                      All your favorite modpacks.
                    </h2>
                    <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                      Code One Hosting supports over <span className="text-cyan-400 font-semibold">15,000 different modpacks</span> that you can install with just one click.
                    </p>
                </div>
                
                <div className="mt-16 relative w-full overflow-hidden space-y-8 [mask-image:_linear_gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
                    <Marquee items={modpacks[0]} />
                    <Marquee items={modpacks[1]} reverse />
                </div>
            </div>
        </section>
    );
};

export default Modpacks;
