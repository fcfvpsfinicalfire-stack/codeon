
import React, { useState, useRef, useEffect } from 'react';
import { Zap, X, Send, RefreshCw, Bot, User } from 'lucide-react';
// Correct import according to guidelines
import {GoogleGenAI} from "@google/genai";

const FloatingAction: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Hi! I'm your CODEON AI assistant. How can I help you with your server today?" }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      // Use named parameter as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are the official CODEON HOSTING Support AI. 
          Your goal is to help users with gaming server hosting.
          Details:
          - Minecraft Plans start at Rs. 300.00.
          - Locations: Singapore, Germany, USA.
          - We support Minecraft, Rust, ARK, and FiveM.
          - Support is 24/7 via Discord tickets.
          - Payments: Manual screenshot upload to Discord is currently required.
          Be professional, high-tech, and helpful. Keep answers concise.`,
        },
        contents: userMessage,
      });
      // response.text is a property
      setMessages(prev => [...prev, { role: 'model', text: response.text || 'Sorry, I encountered an error.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the nodes. Please try again later or join our Discord." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* AI Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] bg-[#111827] border border-blue-500/20 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-blue-600 p-5 flex justify-between items-center shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Zap size={18} fill="white" className="text-white" />
              </div>
              <div>
                <p className="font-black text-white text-xs uppercase tracking-widest leading-none">CODEON AI</p>
                <p className="text-[9px] text-blue-100 font-bold uppercase mt-1 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                  Active Node
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white hover:bg-white/10 p-1 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div ref={scrollRef} className="flex-grow p-5 overflow-y-auto space-y-4 custom-scrollbar bg-[#0b0f19]/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end space-x-2`}>
                {msg.role === 'model' && <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mb-1"><Bot size={12} /></div>}
                <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none shadow-lg' 
                    : 'bg-[#1a2333] text-slate-300 border border-white/5 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
                {msg.role === 'user' && <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mb-1"><User size={12} /></div>}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center"><Bot size={12} /></div>
                <div className="bg-[#1a2333] p-3 rounded-2xl border border-white/5">
                  <RefreshCw size={14} className="animate-spin text-blue-500" />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#111827] border-t border-white/5">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about servers, pricing, mods..." 
                className="w-full bg-[#0b0f19] border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-xs focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600"
              />
              <button 
                onClick={handleSendMessage}
                disabled={loading}
                className="absolute right-2 top-1.5 p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all disabled:opacity-30"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[8px] text-slate-600 mt-3 text-center uppercase tracking-widest font-black">
              Powered by Google Gemini Node
            </p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95 group relative ${isOpen ? 'bg-slate-800' : 'bg-blue-600 shadow-blue-600/40 hover:scale-110'}`}
      >
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 animate-pulse"></div>
        {isOpen ? (
          <X size={28} className="text-white relative z-10" />
        ) : (
          <Zap size={28} fill="white" className="text-white relative z-10 group-hover:animate-bounce" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-[#0f172a] rounded-full flex items-center justify-center text-[10px] font-black text-white animate-bounce">1</span>
        )}
      </button>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default FloatingAction;
