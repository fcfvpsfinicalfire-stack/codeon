

import React from 'react';

const guarantees = [
    {
        iconClass: 'fa-solid fa-tower-broadcast',
        title: '99.9% Uptime Guarantee',
        description: 'We guarantee your server will be available 99.9% of the time, ensuring uninterrupted gameplay for your community.'
    },
    {
        iconClass: 'fa-solid fa-headset',
        title: '24/7 Expert Support',
        description: 'Our dedicated support team is available around the clock to assist you with any questions or issues, big or small.'
    },
    {
        iconClass: 'fa-solid fa-shield-halved',
        title: 'Top-Tier Security',
        description: 'Benefit from our enterprise-grade DDoS protection and robust security measures to keep your server safe from threats.'
    }
];


const OurGuarantees: React.FC = () => {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden group">
            <div className="absolute inset-0 z-0 opacity-10">
                <img src="https://i.postimg.cc/v8xdrSt5/image.png" alt="Abstract security shield background" className="w-full h-full object-cover" />
            </div>
             <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-dark-bg via-[#101123] to-transparent z-0"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image Column */}
                    <div className="relative flex items-center justify-center">
                         <img src="https://i.postimg.cc/v8xdrSt5/image.png" alt="Abstract security shield illustration" className="w-full max-w-md rounded-lg opacity-75" />
                    </div>

                    {/* Text Column */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold">Our Commitment to You</h2>
                        <p className="mt-4 text-gray-300 text-lg">
                            We stand by our service. These are the promises we make to every single one of our clients.
                        </p>
                        <ul className="mt-8 space-y-6">
                            {guarantees.map((item, index) => (
                                <li key={index} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-purple-600/20 rounded-lg text-purple-300 text-2xl border border-white/10">
                                        <i className={item.iconClass}></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white text-lg">{item.title}</h4>
                                        <p className="text-gray-400">{item.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurGuarantees;