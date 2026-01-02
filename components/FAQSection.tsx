
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Zap, ArrowUpCircle, RefreshCcw, Box } from 'lucide-react';

interface FAQSectionProps {
  onViewChange?: (view: 'home' | 'minecraft' | 'rust' | 'ark' | 'fivem' | 'article' | 'faq') => void;
}

const faqs = [
  {
    id: 1,
    question: "Why should I choose CODEON HOSTHING as my server host?",
    answer: "We're one of the longest running server hosts in the world; we've been providing our customers with **high-quality game server hosting at affordable prices** since the very beginning in 2013. We offer **24/7 customer support** in case you run into any issues. Our platform is the **fastest and easiest to use** in the market, so even if you're a newbie to server hosting, we're sure you'll find it very easy with us! With over 7,000 5-star reviews, locations all across the globe and a 3-day money back guarantee, we firmly believe that CODEON HOSTHING is the best option for your game server hosting needs.",
    icon: <Zap size={16} className="text-orange-400" />,
  },
  {
    id: 2,
    question: "Can I change my plan or upgrade my server later?",
    answer: "Yes, you can upgrade or downgrade your server plan at any time through our client area. The process is automated and your files will be preserved during the transition.",
    icon: <ArrowUpCircle size={16} className="text-blue-400" />,
  },
  {
    id: 3,
    question: "Can I get my money back if I don't like my server?",
    answer: "Absolutely. we offer a 72-hour money-back guarantee for all new server orders. If you're not satisfied, simply open a ticket and our billing team will process your refund.",
    icon: <RefreshCcw size={16} className="text-green-400" />,
  },
  {
    id: 4,
    question: "Do you support mods and plugins?",
    answer: "Yes! All of our servers come with full support for mods, plugins, and custom jars. Our one-click installer makes it easy to set up popular modpacks and plugin sets.",
    icon: <Box size={16} className="text-purple-400" />,
  }
];

const FAQSection: React.FC<FAQSectionProps> = ({ onViewChange }) => {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Title & Intro */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
              FREQUENTLY ASKED<br />QUESTIONS
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-10 max-w-md font-medium">
              Here are some of our new customers' frequently asked questions. If you still need help, you can check out our knowledgebase articles or contact support.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onViewChange?.('faq')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg text-sm transition-all shadow-lg shadow-blue-600/20"
              >
                View FAQ
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg text-sm transition-all border border-white/5">
                View Knowledgebase
              </button>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq) => (
              <div 
                key={faq.id}
                className={`bg-slate-900/40 border border-white/5 rounded-xl overflow-hidden transition-all duration-300 ${openId === faq.id ? 'bg-slate-900/60' : ''}`}
              >
                <button 
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {faq.icon}
                    </div>
                    <span className={`font-bold text-sm md:text-base tracking-tight transition-colors ${openId === faq.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-slate-500">
                    {openId === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                
                {openId === faq.id && (
                  <div className="px-5 pb-6 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="pl-8 border-t border-white/5 pt-4">
                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                        {faq.answer.split('**').map((part, i) => 
                          i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
