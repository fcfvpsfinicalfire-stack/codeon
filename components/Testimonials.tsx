
import React from 'react';

const testimonialsData = [
    {
        quote: "Code On Hosting has completely changed our server experience. The performance is incredible, and the support team is always there to help, day or night. 10/10 would recommend!",
        name: 'RASmaner',
        role: 'Youtuber',
        avatar: 'https://i.postimg.cc/65BcPQCC/pack.png',
        stars: 5,
    },
    {
        quote: "The instant setup feature is a lifesaver. We had our Minecraft server up and running in minutes. The control panel is intuitive and powerful. Absolutely fantastic service.",
        name: 'Jane Smith',
        role: 'Minecraft Community Manager',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
        stars: 5,
    },
    {
        quote: "We've tried multiple hosting providers, and Code On is by far the best. The DDoS protection is top-notch, and we've had zero downtime since switching. Our players are happier than ever.",
        name: 'Alex Johnson',
        role: 'ARK Tribe Leader',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
        stars: 5,
    },
    {
        quote: "The cloud VPS servers are blazing fast. I migrated my entire web application over and saw an immediate performance boost. The AMD Ryzen CPUs make a huge difference.",
        name: 'Samantha Lee',
        role: 'Full-Stack Developer',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
        stars: 5,
    },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center space-x-1 text-yellow-400">
        {[...Array(5)].map((_, i) => (
            <i key={i} className={`fa-solid fa-star ${i < rating ? '' : 'text-gray-600'}`}></i>
        ))}
    </div>
);

const TestimonialCard: React.FC<{ testimonial: typeof testimonialsData[0] }> = ({ testimonial }) => (
    <div className="bg-card-bg-solid border border-white/10 rounded-xl p-8 h-full flex flex-col justify-between">
        <div>
            <div className="flex items-center justify-between mb-4">
                 <i className="fa-solid fa-quote-left text-4xl text-purple-500/50"></i>
                <StarRating rating={testimonial.stars} />
            </div>
            <p className="text-gray-300 italic">"{testimonial.quote}"</p>
        </div>
        <div className="mt-6 flex items-center space-x-4">
            <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
            <div>
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
            </div>
        </div>
    </div>
);


const Testimonials: React.FC = () => {
    // Duplicate for seamless loop
    const duplicatedTestimonials = [...testimonialsData, ...testimonialsData];

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 1px)',
                backgroundSize: '2.5rem 2.5rem'
            }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-dark-bg"></div>
            
            <div className="relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold">Loved By <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-magenta">Creators & Developers</span></h2>
                    <p className="mt-4 text-lg text-gray-300">
                        Don't just take our word for it. Here's what some of our amazing customers have to say about their experience with Code On Hosting.
                    </p>
                </div>
                <div className="mt-16 relative">
                     <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear_gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                        <ul className="flex items-stretch animate-marquee-scroll">
                            {duplicatedTestimonials.map((testimonial, index) => (
                                <li key={index} className="mx-4 flex-shrink-0" style={{ width: 'clamp(350px, 30vw, 450px)' }}>
                                    <TestimonialCard testimonial={testimonial} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
