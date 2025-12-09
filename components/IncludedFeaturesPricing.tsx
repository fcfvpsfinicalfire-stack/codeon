
import React from 'react';

const features = [
    { icon: 'fa-solid fa-microchip', text: 'High-Performance CPUs' },
    { icon: 'fa-solid fa-hard-drive', text: 'NVMe SSD Storage' },
    { icon: 'fa-solid fa-shield-halved', text: 'DDoS Protection' },
    { icon: 'fa-solid fa-globe', text: 'Global Locations' },
    { icon: 'fa-solid fa-headset', text: '24/7 Expert Support' },
    { icon: 'fa-solid fa-rocket', text: 'Instant Setup' },
    { icon: 'fa-solid fa-folder-open', text: 'Full FTP Access' },
    { icon: 'fa-solid fa-floppy-disk', text: 'Automated Backups' }
];

const IncludedFeaturesPricing: React.FC = () => {
    return (
        <section className="mt-16 md:mt-24">
            <div className="max-w-4xl mx-auto">
                <div className="bg-card-bg-solid/50 border border-green-500/30 rounded-2xl p-8 shadow-lg shadow-green-900/30">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-white">All Game Server Plans Include</h3>
                        <p className="mt-2 text-green-300/80">Core features to guarantee performance and reliability.</p>
                    </div>
                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4 text-center">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center space-y-2 text-gray-300">
                                <i className={`${feature.icon} text-2xl text-green-400`}></i>
                                <span className="text-sm">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IncludedFeaturesPricing;
