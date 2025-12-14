
import React, { useState, useEffect } from 'react';

// Data for contact methods on the left
const contactMethods = [
    { icon: 'fa-solid fa-envelope', title: 'Email Us', line1: 'Send us an email anytime', line2: 'support@watchx.com', href: 'mailto:support@watchx.com' },
    { icon: 'fa-solid fa-phone', title: 'Call Us', line1: 'Mon-Fri from 9am to 6pm', line2: '+94 76 123 4567' },
    { icon: 'fa-brands fa-discord', title: 'Discord', line1: 'Join our community', line2: 'discord.watchx.net', href: 'https://discord.gg/codeon' },
    { icon: 'fa-solid fa-clock', title: 'Working Hours', line1: 'Our schedule', line2: 'Mon - Sun: 9am - 11pm\nTech Support: 24/7' },
    { icon: 'fa-solid fa-comment-dots', title: 'Live Chat', line1: 'Get instant assistance', line2: '▶ Start a conversation', href: '#', isAction: true },
    { icon: 'fa-solid fa-gamepad', title: 'Game Support', line1: 'Game server assistance', line2: 'View supported games', href: '#', isAction: true },
];

const ContactMethodCard: React.FC<{ item: typeof contactMethods[0] }> = ({ item }) => (
    <div className="bg-card-bg-solid/50 border border-white/10 rounded-xl p-6 flex items-start space-x-4 h-full">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/5 rounded-full text-brand-cyan text-xl">
            <i className={item.icon}></i>
        </div>
        <div>
            <h4 className="font-bold text-white text-lg">{item.title}</h4>
            <p className="text-gray-400 text-sm mt-1">{item.line1}</p>
            {item.href ? (
                 <a href={item.href} target={item.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className={`mt-2 inline-block font-semibold text-sm whitespace-pre-line ${item.isAction ? 'text-green-400 hover:text-green-300' : 'text-brand-cyan hover:text-cyan-300'}`}>
                    {item.line2}
                </a>
            ) : (
                <p className="mt-2 text-white font-semibold text-sm whitespace-pre-line">{item.line2}</p>
            )}
        </div>
    </div>
);


const ContactPage: React.FC = () => {
    const [verificationCode, setVerificationCode] = useState('');

    useEffect(() => {
        setVerificationCode(Math.floor(1000 + Math.random() * 9000).toString());
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic
        alert('Thank you! Your message has been sent.');
    };

    return (
        <div className="py-16 md:py-24 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-block bg-badge-bg text-badge-text px-4 py-1 rounded-full text-sm font-semibold mb-4">
                        24/7 SUPPORT TEAM
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                        Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-accent-purple">Touch With Us</span>
                    </h1>
                    <p className="mt-4 text-gray-400">
                        Our team of experts is available around the clock to assist with any of your hosting needs. We're just a message away from helping you achieve online success.
                    </p>
                </div>

                {/* Main Content */}
                <div className="mt-20 grid lg:grid-cols-5 gap-12">
                    {/* Left Column: Contact Info */}
                    <div className="lg:col-span-3">
                         <div className="inline-block bg-card-bg-solid border border-brand-cyan/50 text-brand-cyan/80 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                            Premium Support Channels
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Our team is <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-white">always ready</span> to assist you
                        </h2>
                        <p className="text-gray-400 mb-10">
                            Whether you have a question about our services, need technical assistance, or want to discuss a custom solution, our expert team is available 24/7 to provide fast and friendly support.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {contactMethods.map((method, index) => (
                                <ContactMethodCard key={index} item={method} />
                            ))}
                        </div>
                    </div>
                    
                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-card-bg-solid/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 h-full">
                            <h3 className="text-2xl font-bold text-white">Send Us a Message</h3>
                            <p className="text-sm text-gray-400 mt-1 mb-6">We'll get back to you as soon as possible</p>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                                    <input type="text" id="name" name="name" placeholder="John Doe" required className="w-full bg-dark-bg border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                    <input type="email" id="email" name="email" placeholder="john@example.com" required className="w-full bg-dark-bg border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                                    <select id="subject" name="subject" required className="w-full bg-dark-bg border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all appearance-none bg-no-repeat bg-right-4" style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em'}}>
                                        <option>Select a subject</option>
                                        <option>General Inquiry</option>
                                        <option>Technical Support</option>
                                        <option>Sales Question</option>
                                        <option>Partnerships</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                                    <textarea id="message" name="message" rows={4} placeholder="How can we help you?" required className="w-full bg-dark-bg border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all"></textarea>
                                </div>
                                <div>
                                    <label htmlFor="verification" className="block text-sm font-medium text-gray-300 mb-2">Verification Code</label>
                                    <div className="flex items-center gap-4">
                                        <input type="text" id="verification" name="verification" placeholder="Enter code" required className="w-full bg-dark-bg border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all" />
                                        <span className="bg-dark-bg border border-white/20 rounded-lg px-4 py-2.5 font-bold tracking-widest text-gray-300">{verificationCode}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Please enter the verification code to prove you're not a bot.</p>
                                </div>
                                <button type="submit" className="w-full bg-gradient-to-r from-brand-cyan to-accent-purple text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
                                    <i className="fa-solid fa-paper-plane"></i>
                                    <span>Send Message</span>
                                </button>
                                <p className="text-xs text-gray-500 text-center mt-2">By submitting this form, you agree to our <a href="#" className="underline hover:text-white">Privacy Policy</a>.</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
