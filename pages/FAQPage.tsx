
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Zap, CreditCard, Cpu, MessageSquare, Box, Info } from 'lucide-react';
import DiscordBanner from '../components/DiscordBanner';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: 'GENERAL',
    icon: <Zap size={20} className="text-blue-500" />,
    description: 'All general questions are listed here.',
    color: 'border-blue-500',
    items: [
      { question: 'How long does setup take?', answer: 'Setup is instantaneous! Your server is deployed the second your payment is confirmed.' },
      { question: 'Can I upgrade or downgrade my server after ordering?', answer: 'Yes, you can change your plan at any time through our client area without losing any data.' },
      { question: 'Can I change player slots?', answer: 'Our plans are based on RAM, not slots. You can set as many slots as your RAM can handle!' },
      { question: 'Why can\'t I connect to my server?', answer: 'Check your server console for errors or verify that you are using the correct IP and port. Our support team is here to help if issues persist.' },
      { question: 'Can I transfer my existing server to CODEON HOSTHING?', answer: 'Absolutely. We have guides on how to upload your files via FTP, and our staff can assist with large migrations.' },
      { question: 'I can\'t login! What do I do?', answer: 'Reset your password through the client area. If your account is locked, please contact our security team.' },
      { question: 'Do I need to port forward?', answer: 'No, all our servers are hosted on dedicated hardware with open ports. You just share your IP.' },
      { question: 'Are the servers DDoS Protected?', answer: 'Every server includes automated, enterprise-grade DDoS protection at no extra cost.' },
    ]
  },
  {
    title: 'PAYMENT',
    icon: <CreditCard size={20} className="text-green-500" />,
    description: 'All payment related questions are listed here.',
    color: 'border-green-500',
    items: [
      { question: 'What payment methods do you accept?', answer: 'We accept PayPal, Credit/Debit Cards, Google Pay, Apple Pay, and various cryptocurrencies.' },
      { question: 'Can I pay in other lengths, rather than monthly?', answer: 'Yes, we offer Quarterly, Semi-Annual, and Annual billing cycles with significant discounts.' },
      { question: 'What happens if I don\'t pay on time?', answer: 'We hold your data for 7 days after the due date. After that, the server may be terminated if unpaid.' },
      { question: 'What is your refund policy?', answer: 'We offer a 72-hour money-back guarantee for all new server orders if you are not satisfied.' },
    ]
  },
  {
    title: 'HARDWARE',
    icon: <Cpu size={20} className="text-red-500" />,
    description: 'All hardware related questions are listed here.',
    color: 'border-red-500',
    items: [
      { question: 'What are the specs on your servers?', answer: 'We use the latest AMD EPYC and Ryzen processors with NVMe SSD storage for peak performance.' },
      { question: 'How much disk space is available on my server?', answer: 'Our servers come with unmetered NVMe SSD storage, within fair-use limits for game data.' },
      { question: 'Where are the servers located?', answer: 'We have locations globally, including North America, Europe, Asia-Pacific, and South America.' },
    ]
  },
  {
    title: 'SUPPORT',
    icon: <MessageSquare size={20} className="text-orange-500" />,
    description: 'All customer support related questions are listed here.',
    color: 'border-orange-500',
    items: [
      { question: 'How do I contact support?', answer: 'You can open a ticket through our client area or join our community Discord for live chat.' },
      { question: 'What are your support hours?', answer: 'Our support team is available 24 hours a day, 7 days a week, 365 days a year.' },
      { question: 'Where are your staff located?', answer: 'Our team is distributed globally to ensure around-the-clock coverage regardless of timezones.' },
    ]
  },
  {
    title: 'MINECRAFT',
    icon: <Box size={20} className="text-green-600" />,
    description: 'All Minecraft related questions are listed here.',
    color: 'border-green-600',
    items: [
      { question: 'What control panel is provided for Minecraft?', answer: 'We provide a custom, optimized version of Multicraft designed specifically for speed and ease of use.' },
      { question: 'Can I use any mods or server types I want?', answer: 'Yes, our servers support all modpacks, plugins, and custom .jar files for total freedom.' },
      { question: 'Can I use my own map on the server?', answer: 'Yes, simply upload your world folder via FTP or use our world manager in the panel.' },
      { question: 'Do you provide a MySQL database?', answer: 'Yes, free MySQL databases are available for every Minecraft server upon request.' },
      { question: 'Can I run a modpack on my server?', answer: 'Our one-click installer supports thousands of popular modpacks from CurseForge, Feed The Beast, and more.' },
      { question: 'Can I change the location of my server?', answer: 'Yes, you can request a location change via support ticket, and we will move your files to the new datacenter.' },
    ]
  }
];

export default function FAQPage() {
  const [openIds, setOpenIds] = useState<Record<string, number | null>>({});

  const toggleAccordion = (category: string, index: number) => {
    setOpenIds((prev) => ({
      ...prev,
      [category]: prev[category] === index ? null : index,
    }));
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen font-sans">
      {/* Header Search Section */}
      <section className="bg-blue-600 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          
          <div className="relative max-w-xl mx-auto">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-white border-none rounded-full py-4 px-6 text-slate-800 focus:outline-none focus:ring-4 focus:ring-white/20 shadow-2xl"
            />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20 space-y-24">
        {faqData.map((category) => (
          <div key={category.title} className="space-y-8">
            {/* Category Header */}
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-800/50 rounded-lg">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {category.title}
                </h2>
              </div>
              <p className="text-slate-500 text-sm font-medium">
                {category.description}
              </p>
            </div>

            {/* Accordion Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.items.map((item, idx) => (
                <div 
                  key={idx}
                  className={`bg-slate-900/40 border ${category.color}/10 rounded-xl overflow-hidden transition-all duration-300 ${
                    openIds[category.title] === idx ? 'bg-slate-900/80 border-white/10 ring-1 ring-white/5' : 'hover:bg-slate-900/60'
                  }`}
                >
                  <button 
                    onClick={() => toggleAccordion(category.title, idx)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
                  >
                    <span className={`font-bold text-xs md:text-sm tracking-tight transition-colors ${
                      openIds[category.title] === idx ? 'text-white' : 'text-slate-400 group-hover:text-white'
                    }`}>
                      {item.question}
                    </span>
                    <div className="text-slate-600 group-hover:text-slate-400">
                      {openIds[category.title] === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>
                  
                  {openIds[category.title] === idx && (
                    <div className="px-5 pb-6 pt-0 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="border-t border-white/5 pt-4">
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <DiscordBanner />
    </div>
  );
}
