
import React from 'react';
import { Server, Twitter, MessageCircle, Github, Heart } from 'lucide-react';

interface FooterProps {
  onViewChange?: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  return (
    <footer className="bg-[#05080f] pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Footer background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* BRAND */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg"><Server size={20} /></div>
              <div>
                <h3 className="font-black italic text-white tracking-tighter text-xl">CODEON</h3>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Premium performance hosting for gamers, developers, and businesses. Deployed in seconds, designed for excellence.
            </p>
            <div className="flex gap-4">
              {[Twitter, MessageCircle, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all hover:-translate-y-1">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs text-white mb-8">Services</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              {['Minecraft Hosting', 'Web Hosting', 'Dedicated Servers', 'VPS Hosting'].map(l => (
                <li key={l}><a href="#" className="hover:text-blue-400 transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs text-white mb-8">Support</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              {['Knowledgebase', 'Submit Ticket', 'Network Status', 'API Documentation'].map(l => (
                <li key={l}><a href="#" className="hover:text-blue-400 transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs text-white mb-8">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              {['Terms of Service', 'Privacy Policy', 'Refund Policy', 'SLA'].map(l => (
                <li key={l}><a href="#" className="hover:text-blue-400 transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-xs font-medium flex items-center">
            © 2024 Codeon Hosting. Crafted with <Heart size={10} className="mx-1 text-red-500 fill-red-500" /> by Codeon Team.
          </p>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              All Systems Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
