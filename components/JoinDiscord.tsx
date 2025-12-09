import React from 'react';

const JoinDiscord: React.FC = () => {
    return (
        <section className="my-16 md:my-24">
            <a 
                href="https://discord.gg/ZjJz8GKB" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-discord-blue rounded-xl p-8 md:p-12 relative overflow-hidden transition-transform duration-300 hover:scale-[1.02] group"
            >
                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold">
                            <span className="text-white">Join Our </span>
                            <span className="text-blue-200">Discord</span>
                        </h2>
                        <p className="text-blue-100 mt-4 max-w-lg">
                            Connect with our community of gamers and developers. Get instant support, share experiences, and stay updated with the latest news.
                        </p>
                    </div>
                    <div className="flex justify-start md:justify-end">
                        <img src="https://i.postimg.cc/sDkQbGRM/image.png" alt="Modern illustration of a person on a chair with a headset" className="w-64 rounded-lg transition-transform duration-300 group-hover:rotate-3" />
                    </div>
                </div>

                {/* Background icons */}
                <i className="fa-brands fa-discord text-white/5 absolute text-8xl -top-4 left-1/4 transform -translate-x-1/2 rotate-12 transition-transform duration-500 group-hover:rotate-0"></i>
                <i className="fa-brands fa-discord text-white/5 absolute text-9xl bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 -rotate-12 transition-transform duration-500 group-hover:rotate-0"></i>
                <i className="fa-brands fa-discord text-white/5 absolute text-6xl bottom-1/4 left-1/2 transform -translate-x-1/2 transition-transform duration-500 group-hover:rotate-6"></i>
            </a>
        </section>
    );
};

export default JoinDiscord;