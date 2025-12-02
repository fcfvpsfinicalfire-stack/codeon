
import React from 'react';

const whyChooseUsData = [
    {
        iconClass: 'fa-solid fa-globe',
        title: 'Global Low-Latency Network',
        description: 'Host your server close to you and your players with our strategically located data centers for the lowest latency.',
    },
    {
        iconClass: 'fa-solid fa-headset',
        title: '24/7 Expert Support',
        description: 'Our dedicated support team is available around the clock to assist you with any questions or issues.',
    },
    {
        iconClass: 'fa-solid fa-server',
        title: 'Next-Gen Hardware',
        description: 'We use the latest generation of enterprise-grade hardware like AMD Ryzen CPUs and NVMe SSDs for maximum performance.',
    },
    {
        iconClass: 'fa-solid fa-shield-halved',
        title: 'Ironclad Security',
        description: 'All our services include enterprise-grade DDoS protection to keep your server safe from attacks and ensure uptime.',
    },
];

const WhyChooseUsCard: React.FC<{ item: typeof whyChooseUsData[0] }> = ({ item }) => (
    <div className="relative group h-full transition-all duration-300 transform hover:-translate-y-2 [transform-style:preserve-3d]">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-brand-cyan to-brand-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-border-chase" style={{ backgroundSize: '400% 400%'}}></div>
        <div className="relative bg-card-bg-solid/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full transition-transform duration-500 group-hover:[transform:rotateX(5deg)_rotateY(-5deg)]">
            <div className="flex-shrink-0 w-16 h-16 mb-6 flex items-center justify-center bg-white/5 rounded-xl text-brand-cyan text-3xl border border-white/10 group-hover:border-brand-cyan/50 group-hover:text-white transition-all duration-300">
                <i className={item.iconClass}></i>
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
            </div>
        </div>
    </div>
);


const WhyChooseUs: React.FC = () => {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://i.postimg.cc/NMHknXyF/image.png')"}}>
            <div className="absolute inset-0 bg-dark-bg/90 backdrop-blur-sm"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold">Why Trust <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-magenta">Code One?</span></h2>
                    <p className="mt-4 text-lg text-gray-300">
                        We are committed to providing the best hosting experience with unbeatable performance, reliability, and support. Here's what sets us apart.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {whyChooseUsData.map((item, index) => (
                        <WhyChooseUsCard key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
