
import React from 'react';

const AutomationAnnouncement: React.FC = () => {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-card-bg-solid/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center">
                    {/* Visual Flow */}
                    <div className="flex items-center justify-center">
                        <img 
                            src="https://i.postimg.cc/YCSHsP24/image-2025-11-27-173359794.png" 
                            alt="Automation flow diagram showing billing panel connecting to game panel for instant server setup" 
                            className="rounded-lg shadow-lg shadow-black/30"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            The Future is <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-magenta">Automated</span>
                        </h2>
                        <p className="mt-4 text-gray-300">
                            Say goodbye to waiting. Our custom automation engine links our billing system directly to our game panel. The moment your order is complete, your server starts building. No manual intervention, just instant setup.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AutomationAnnouncement;