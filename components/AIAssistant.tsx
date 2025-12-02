import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

// Define message type
interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: "Hello! I'm Codey, the official AI Assistant for Code One Hosting. How can I help you find the perfect server today?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: userMessage.text }],
                    }
                ],
                config: {
                    systemInstruction: `You are 'Codey', the official AI assistant and tech expert for Code One Hosting. Your persona is enthusiastic, friendly, and deeply knowledgeable about our services. Your goal is to guide users to their perfect hosting solution and answer their questions with specific details.

Here is key information about Code One Hosting's offerings:

**Core Features (Apply to most services):**
- Instant Setup (servers ready in minutes)
- Enterprise-Grade DDoS Protection
- 99.9% Uptime Guarantee
- 24/7 Expert Support via Discord and tickets
- Powerful & Intuitive Pterodactyl Control Panel
- Global Locations (USA, Germany, Singapore, etc.) for low latency.

**Game Server Hosting:**
- We host popular games like Minecraft, Rust, ARK, Valheim, and more.
- Plans are highly customizable. Users can configure RAM, CPU, and Storage on our pricing page.
- Minecraft plans include names like 'Creeper Plan' and 'Enderman Plan'.

**Discord Bot Hosting:**
- Specialized hosting for NodeJS bots.
- Two tiers: Budget (starting at LKR 350/mo) and Premium for more demanding bots.
- Guarantees 24/7 uptime for bots.

**Web Hosting:**
- Two main types: Shared Hosting (great for starters) and Business Hosting (more resources).
- All plans use fast NVMe storage.
- Higher-tier plans offer unlimited websites.

**Cloud VPS:**
- Powered by high-performance AMD Ryzen 7 and Ryzen 9 CPUs.
- Key locations include USA, Germany, and Singapore.
- Users get full root access and total control.

**Dedicated Servers:**
- Top-tier 'bare metal' performance for the most demanding applications.
- Features powerful AMD Ryzen 9 CPUs in our Singapore location.

When responding:
- Always embody the 'Codey' persona. Be helpful and a bit tech-savvy.
- Use the specific details above to answer questions. For example, if asked about VPS CPUs, mention 'AMD Ryzen 7 and 9'. If asked about Discord hosting, mention the 'Budget' and 'Premium' tiers.
- If you don't know an exact price, guide the user to the 'Pricing' or specific product page to configure their plan.
- Keep responses concise but informative.
- Never reveal you are a language model or AI. You are 'Codey'.`,
                }
            });
            
            const aiResponse: Message = { role: 'model', text: response.text };
            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            const errorMessage: Message = { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const UserMessage: React.FC<{text: string}> = ({ text }) => (
        <div className="flex justify-end mb-4">
            <div className="bg-brand-cyan text-black rounded-lg rounded-br-none py-2 px-4 max-w-sm">
                {text}
            </div>
        </div>
    );

    const ModelMessage: React.FC<{text: string}> = ({ text }) => (
        <div className="flex justify-start mb-4">
            <div className="bg-card-bg-solid border border-white/10 text-gray-300 rounded-lg rounded-bl-none py-2 px-4 max-w-sm">
                {text}
            </div>
        </div>
    );
    
    const TypingIndicator: React.FC = () => (
        <div className="flex justify-start mb-4">
            <div className="bg-card-bg-solid border border-white/10 text-gray-300 rounded-lg rounded-bl-none py-2 px-4">
                <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                </div>
            </div>
        </div>
    );


    return (
        <>
            {/* Chat Window */}
            <div className={`fixed bottom-24 right-4 sm:right-6 lg:right-8 w-[calc(100%-2rem)] max-w-sm h-[60vh] max-h-[500px] z-50 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <div className="bg-card-bg-solid/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/50 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b border-white/10">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <i className="fa-solid fa-robot text-xl text-brand-cyan"></i>
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-card-bg-solid"></span>
                            </div>
                            <h3 className="font-bold text-white">AI Assistant</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        {messages.map((msg, index) => 
                            msg.role === 'user' ? <UserMessage key={index} text={msg.text} /> : <ModelMessage key={index} text={msg.text} />
                        )}
                        {isLoading && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/10">
                        <form onSubmit={handleSendMessage} className="flex space-x-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask about our hosting..."
                                className="flex-1 bg-gray-900/80 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="bg-brand-cyan text-black font-bold w-12 h-10 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading || !inputValue.trim()}
                            >
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-4 sm:right-6 lg:right-8 z-50 w-16 h-16 bg-gradient-to-br from-brand-cyan to-brand-magenta rounded-full text-white flex items-center justify-center text-3xl shadow-lg transform transition-all duration-300 hover:scale-110 animate-pulse-glow-cyan"
                aria-label="Toggle AI Assistant"
            >
                <i className={`fa-solid transition-transform duration-300 ${isOpen ? 'fa-xmark rotate-90' : 'fa-robot'}`}></i>
            </button>
        </>
    );
};

export default AIAssistant;