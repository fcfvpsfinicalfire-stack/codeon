
import React from 'react';
import { BrandLogo } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/50 border-t border-white/5 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BrandLogo className="w-8 h-8" />
            <span className="text-lg font-black uppercase tracking-tighter">CODEON HOSTINGS</span>
          </div>
          <p className="text-[11px] font-bold text-gray-500 leading-relaxed uppercase tracking-widest">
            CodeOn Hostings Premium Minecraft Server Hosting Service. <br />
            Register Under <span className="text-blue-500">CodeOn Group Of Companies (Pvt) LTD</span>
          </p>
          <div className="flex gap-4">
            {['Twitter', 'Discord', 'GitHub'].map(s => (
              <a key={s} href="#" className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 text-gray-400 hover:text-white transition-all text-xs font-bold">
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-black mb-6 text-white uppercase tracking-widest text-[10px]">Products</h4>
          <ul className="space-y-4 text-xs text-gray-500 font-bold uppercase tracking-wider">
            <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Minecraft Hosting</a></li>
            <li><a href="#pricing" className="hover:text-purple-400 transition-colors">ARK Survival</a></li>
            <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Cloud VPS</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black mb-6 text-white uppercase tracking-widest text-[10px]">Platform</h4>
          <ul className="space-y-4 text-xs text-gray-500 font-bold uppercase tracking-wider">
            <li><a href="https://control.codeon.codes" className="hover:text-purple-400 transition-colors">Client Area</a></li>
            <li><a href="https://status.codeon.codes" className="hover:text-purple-400 transition-colors">System Status</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black mb-6 text-white uppercase tracking-widest text-[10px]">Support</h4>
          <ul className="space-y-4 text-xs text-gray-500 font-bold uppercase tracking-wider">
            <li><a href="#" className="hover:text-purple-400 transition-colors">Submit Receipt</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Discord Community</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Live Support</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Billing Help</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 font-black tracking-widest uppercase">
        <p>© 2024 CodeOn Hostings. Power to the Players.</p>
        <div className="flex gap-4">
          <span>Supported:</span>
          <span className="text-gray-400">Visa</span>
          <span className="text-gray-400">Mastercard</span>
          <span className="text-gray-400">PayPal</span>
          <span className="text-gray-400">mCash</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
