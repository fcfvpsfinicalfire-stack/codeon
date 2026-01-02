
import React, { useState } from 'react';
import { FAQS } from '../constants';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-4 bg-[#030712]/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">Everything you need to know before deploying.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="glass rounded-2xl border border-white/5 overflow-hidden transition-all">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="text-sm font-black text-gray-200 uppercase tracking-tight">{faq.question}</span>
                <span className={`text-blue-500 font-black transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === i && (
                <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed tracking-tight border-t border-white/5 pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
