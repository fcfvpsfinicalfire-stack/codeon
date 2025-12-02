
import React, { useState } from 'react';

const faqData = [
  { 
    question: 'How do I get started with game server hosting?',
    answer: 'Getting started is easy! Simply choose a game from our pricing page, select a plan that fits your needs, and complete the checkout process. Your server will be set up instantly, and you\'ll receive an email with all the details to connect and start playing.'
  },
  { 
    question: 'What kind of support do you provide?',
    answer: 'We provide 24/7 expert support through our Discord server and ticket system. Our knowledgeable team is always on standby to help you with any technical issues, configuration questions, or general inquiries you might have.'
  },
  { 
    question: 'Can I modify server settings and configurations?',
    answer: 'Absolutely! You get full access to your server files via our user-friendly Pterodactyl control panel and FTP. You can install mods, plugins, and customize your server settings to create the perfect experience for your community.'
  },
  { 
    question: 'What payment methods do you accept?',
    answer: 'We accept a wide variety of payment methods, including major credit/debit cards (Visa, MasterCard, American Express), PayPal, and various cryptocurrencies. All transactions are secure and processed instantly.'
  },
  { 
    question: 'Do you offer DDoS protection?',
    answer: 'Yes, all of our game servers come with enterprise-grade DDoS protection for free. Our advanced mitigation system protects your server from all types of attacks, ensuring minimal downtime and a smooth, lag-free experience for your players.'
  },
];

const FaqItem: React.FC<{ item: typeof faqData[0]; isOpen: boolean; onClick: () => void; index: number }> = ({ item, isOpen, onClick, index }) => {
  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors duration-300"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <div className="flex items-center space-x-4">
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent-purple/10 text-accent-purple font-bold rounded-md">
            {String(index + 1).padStart(2, '0')}
          </span>
          <p className="text-white font-medium text-lg">{item.question}</p>
        </div>
        <i className={`fa-solid fa-chevron-down text-accent-purple transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div
        id={`faq-answer-${index}`}
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="text-gray-300 p-5 pt-0 pl-16">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};


const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqData = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 md:py-24 relative">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Image Column */}
        <div className="flex items-center justify-center">
          <img src="https://i.postimg.cc/HsLdLtVr/feature-9.avif" alt="Abstract high-tech support illustration" className="w-full max-w-lg" />
        </div>

        {/* FAQ Column */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Frequently Asked <span className="relative inline-block">
              <span className="text-accent-purple">Questions</span>
               <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 6" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" >
                  <path d="M1 4.25s12.5-4.5 35.5-2.5 30 4 58 0" stroke="#A755F7" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            Find answers to common questions about our game server hosting services. If you can't find your answer here, feel free to join our Discord!
          </p>

          <div className="relative mb-8">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-card-bg-solid border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all"
                aria-label="Search frequently asked questions"
            />
          </div>

          <div className="bg-card-bg-solid border border-white/10 rounded-lg overflow-hidden min-h-[200px]">
            {filteredFaqData.length > 0 ? (
                filteredFaqData.map((item, index) => (
                <FaqItem 
                    key={item.question}
                    index={index}
                    item={item} 
                    isOpen={openIndex === index} 
                    onClick={() => handleToggle(index)} 
                />
                ))
            ) : (
                <div className="p-8 text-center text-gray-400 flex flex-col items-center justify-center h-full">
                    <i className="fa-solid fa-ghost text-3xl mb-4"></i>
                    <p>No questions found matching your search.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
