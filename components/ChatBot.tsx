
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { DISCOUNT_PERCENT, NEW_YEAR_COUPON } from '../constants';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Welcome to CodeOn Hostings! Happy New Year! I can help you with Game Plans, VPS, and our 26% off sale. How can I assist?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are CodeOn AI, support for CodeOn Hostings (previously SkyBound).
          SERVICES: Minecraft, ARK, VPS, V2Ray.
          PRICING: Starts at 350 LKR for 1GB. Linear scaling (2GB=700, 4GB=1400, etc).
          OFFER: 26% discount with code "${NEW_YEAR_COUPON}".
          ORDERING: Users must send payment receipt to support after paying via BuyMeACoffee link.
          LOCATIONS: Singapore (SG) is our primary node.
          DASHBOARD: https://control.codeon.codes
          STATUS: https://status.codeon.codes
          Be bold, professional, and helpful.`,
        }
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Technical issue. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-blue-600 hover:bg-blue-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-600/30 transition-all transform hover:scale-110 rotate-3 hover:rotate-0"
        >
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      ) : (
        <div className="w-80 md:w-96 glass rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white/10 animate-in fade-in zoom-in-95">
          <div className="bg-blue-600 p-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white font-black">AI</div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-tight">CodeOn Assistant</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-blue-100 uppercase font-black tracking-widest">Live Help</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div ref={scrollRef} className="h-96 overflow-y-auto p-5 space-y-4 bg-gray-950/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-3 rounded-3xl text-sm font-medium leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-lg' 
                    : 'glass text-gray-200 rounded-tl-none border-white/5'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="glass px-5 py-3 rounded-3xl rounded-tl-none">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 border-t border-white/5 bg-gray-900/50">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="How do I pay?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white font-bold focus:outline-none focus:border-blue-500 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white p-3 rounded-2xl transition-all shadow-lg shadow-blue-600/20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
