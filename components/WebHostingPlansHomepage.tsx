
import React from 'react';
import { Page } from '../App';

interface WebHostingPlansHomepageProps {
    setPage: (page: Page) => void;
}

const WebHostingPlansHomepage: React.FC<WebHostingPlansHomepageProps> = ({ setPage }) => {
    return (
        <section className="relative py-20 md:py-28 bg-cover bg-center overflow-hidden rounded-2xl my-16 md:my-24" style={{ backgroundImage: "url('https://i.postimg.cc/xdpdyzSL/image.png')" }}>
            <div className="absolute inset-0 bg-dark-bg/70 backdrop-blur-sm"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left side: Text content */}
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
                            Create your <span className="text-cyan-400">Minecraft server</span> today!
                        </h2>
                        <p className="mt-6 text-lg text-gray-300 max-w-lg mx-auto md:mx-0">
                            Everyone can create their own Minecraft server. Change your server configuration, change your version (Vanilla, Snapshot, Modpacks, Paper, Forge, Mohist, Spigot,...) or install plugins or mods whenever your want with our Minecraft hosting.
                        </p>
                        <div className="mt-8">
                            <a
                                href="https://discord.gg/ZjJz8GKB"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-900/50"
                            >
                                Order now
                            </a>
                        </div>
                    </div>

                    {/* Right side: Image */}
                    <div className="relative h-64 md:h-full flex items-center justify-center min-h-[300px]">
                        <img 
                            src="https://i.postimg.cc/3R80BvN6/image.png" 
                            alt="Minecraft character ready for battle" 
                            className="w-full max-w-xs md:max-w-sm animate-float"
                        />
                         {/* Floating Items */}
                        <img src="https://i.imgur.com/VbC3s2P.png" alt="Diamond Ore" className="absolute top-10 right-5 w-16 h-16 animate-subtle-bob" style={{animationDelay: '0s'}}/>
                        <img src="https://i.imgur.com/k2tVn2W.png" alt="TNT Block" className="absolute bottom-10 left-5 w-12 h-12 animate-subtle-bob" style={{animationDelay: '1s'}}/>
                        <img src="https://i.postimg.cc/pr4Lj934/image.png" alt="Furnace" className="absolute top-1/4 left-0 w-14 h-14 animate-subtle-bob" style={{animationDelay: '0.5s'}}/>
                        <img src="https://i.postimg.cc/pr4Lj934/image.png" alt="Furnace" className="absolute bottom-1/4 right-0 w-14 h-14 animate-subtle-bob" style={{animationDelay: '1.5s'}}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WebHostingPlansHomepage;
