
import React from 'react';

const features = [
    'AMD EPYC Processors', 'NVMe SSD Storage', 'DDoS Protection',
    'Global Locations', '99.9% Uptime SLA', 'Instant Setup',
    'Full FTP Access', 'Automated Backups'
];

const IncludedFeatures: React.FC = () => {
    return (
        <section className="pb-16 md:pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-card-bg-solid/50 border border-accent-purple/30 rounded-2xl p-8 shadow-lg shadow-purple-900/30">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-white">⚡ ALL PLANS INCLUDE</h3>
                        <p className="mt-2 text-lg font-semibold text-accent-purple">🎯 PERFORMANCE FEATURES</p>
                    </div>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3 text-gray-300">
                                <i className="fa-solid fa-plus text-accent-purple"></i>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IncludedFeatures;
