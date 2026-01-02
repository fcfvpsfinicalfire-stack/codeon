
import React, { useState } from 'react';
import { ArrowLeft, Check, Server, Globe, Zap, Shield, CreditCard, ChevronRight, Info, MapPin, Database, Cpu, X, AlertCircle, ExternalLink, Landmark, Wallet } from 'lucide-react';

interface CheckoutPageProps {
  plan: any;
  onBack: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ plan, onBack }) => {
  const [serverName, setServerName] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [location, setLocation] = useState('Singapore');
  const [showReadMe, setShowReadMe] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  if (!plan) return null;

  const getPrice = () => {
    const rawPrice = plan.price.replace('Rs. ', '').replace('RS', '');
    const base = parseFloat(rawPrice);
    if (billingCycle === 'quarterly') return (base * 3 * 0.9).toFixed(2);
    if (billingCycle === 'annually') return (base * 12 * 0.8).toFixed(2);
    return base.toFixed(2);
  };

  const getPriceLabel = () => {
    if (billingCycle === 'monthly') return '/ month';
    if (billingCycle === 'quarterly') return '/ 3 months';
    if (billingCycle === 'annually') return '/ year';
  };

  const handlePayNow = () => {
    window.open('https://buymeacoffee.com/codeonhostings', '_blank');
  };

  const getGameTitle = () => {
    if (plan.gameType === 'rust') return plan.name;
    if (plan.gameType === 'ark') return plan.name.toUpperCase();
    if (plan.gameType === 'fivem') return plan.name;
    return `Minecraft ${plan.ram}`;
  };

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen pt-12 pb-24 px-4 font-sans relative">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs & Back */}
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-400 hover:text-white mb-10 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Back to Plans</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Configuration Form */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tighter italic text-left">
                CONFIGURE YOUR SERVER
              </h1>
              <p className="text-slate-400 font-medium opacity-80 text-left mb-6">
                You're one step away from launching your world.
              </p>
              
              {/* Payment Note Button */}
              <button 
                onClick={() => setShowInfoModal(true)}
                className="flex items-center space-x-2 bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-xl text-blue-400 hover:bg-blue-600/20 transition-all group"
              >
                <Info size={14} className="group-hover:rotate-12 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Read Payment Note / ගෙවීම් පිළිබඳ සටහන</span>
              </button>
            </div>

            {/* Server Name */}
            <div className="bg-[#111827]/40 border border-white/5 rounded-3xl p-8 space-y-6">
              <div className="flex items-center space-x-3 text-blue-500 mb-2">
                <Server size={20} />
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Server Name</h3>
              </div>
              <input 
                type="text" 
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="My Awesome Server"
                className="w-full bg-[#0b0f19] border border-white/10 rounded-xl py-4 px-6 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight text-left">
                This is just for identification in your dashboard. You can change it anytime.
              </p>
            </div>

            {/* Location Selection */}
            <div className="bg-[#111827]/40 border border-white/5 rounded-3xl p-8 space-y-8">
              <div className="flex items-center space-x-3 text-blue-500">
                <MapPin size={20} />
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Server Location</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Singapore', 'Germany', 'USA East', 'USA West'].map((loc) => (
                  <button 
                    key={loc}
                    onClick={() => setLocation(loc)}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${location === loc ? 'bg-blue-600/10 border-blue-600 text-white' : 'bg-[#0b0f19] border-white/5 text-slate-400 hover:border-white/10'}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{loc === 'Singapore' ? '🇸🇬' : loc === 'Germany' ? '🇩🇪' : '🇺🇸'}</span>
                      <span className="text-xs font-bold uppercase tracking-widest">{loc}</span>
                    </div>
                    {location === loc && <Check size={16} className="text-blue-500" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Billing Cycle */}
            <div className="bg-[#111827]/40 border border-white/5 rounded-3xl p-8 space-y-8">
              <div className="flex items-center space-x-3 text-blue-500">
                <CreditCard size={20} />
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Billing Cycle</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'monthly', label: 'Monthly', desc: 'Full price' },
                  { id: 'quarterly', label: 'Quarterly', desc: '10% Savings' },
                  { id: 'annually', label: 'Annually', desc: '20% Savings' }
                ].map((cycle) => (
                  <button 
                    key={cycle.id}
                    onClick={() => setBillingCycle(cycle.id)}
                    className={`p-6 rounded-2xl border text-center transition-all flex flex-col items-center ${billingCycle === cycle.id ? 'bg-blue-600/10 border-blue-600' : 'bg-[#0b0f19] border-white/5'}`}
                  >
                    <span className={`text-xs font-black uppercase tracking-widest mb-2 ${billingCycle === cycle.id ? 'text-white' : 'text-slate-400'}`}>{cycle.label}</span>
                    <span className={`text-[10px] font-bold uppercase ${billingCycle === cycle.id ? 'text-blue-400' : 'text-slate-600'}`}>{cycle.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-[#111827] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-3xl">
              <div className="bg-blue-600 p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -z-0"></div>
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter relative z-10">ORDER SUMMARY</h2>
              </div>
              
              <div className="p-8 space-y-8">
                {/* Plan Details */}
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-left">Selected Plan</span>
                    <span className="text-sm font-black text-white uppercase text-right">{getGameTitle()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                    <div className="flex items-center space-x-2">
                       <Cpu size={14} className="text-blue-500" />
                       <span>{plan.cpu || plan.players || 'Dedicated'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                       <Database size={14} className="text-blue-500" />
                       <span>{plan.ram}</span>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-white/5"></div>

                {/* Sub-costs */}
                <div className="space-y-4">
                   <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 tracking-widest">
                      <span>Server Location ({location})</span>
                      <span className="text-green-500">FREE</span>
                   </div>
                   <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 tracking-widest">
                      <span>DDoS Protection</span>
                      <span className="text-green-500">FREE</span>
                   </div>
                   <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 tracking-widest">
                      <span>Setup Fee</span>
                      <span className="text-green-500">FREE</span>
                   </div>
                </div>

                <div className="h-px w-full bg-white/5"></div>

                {/* Total */}
                <div className="pt-2 text-center">
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Amount Due</div>
                   <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-5xl font-black text-white italic tracking-tighter">Rs. {getPrice()}</span>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{getPriceLabel()}</span>
                   </div>
                </div>

                <button 
                  onClick={() => setShowReadMe(true)}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl shadow-2xl shadow-blue-600/40 flex items-center justify-center space-x-3 uppercase tracking-[0.2em] text-xs transition-all active:scale-95 group"
                >
                  <span>Checkout & Launch</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center space-x-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                  <Shield size={12} />
                  <span>72-Hour Refund Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INFO MODAL: Temporary System Explanation */}
      {showInfoModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="max-w-2xl w-full bg-[#111827] border border-blue-500/30 rounded-[2.5rem] shadow-3xl overflow-hidden animate-in zoom-in-95">
              <div className="bg-blue-600 p-6 flex justify-between items-center">
                 <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">PAYMENT SYSTEM NOTE</h2>
                 <button onClick={() => setShowInfoModal(false)} className="text-white hover:opacity-70"><X size={24} /></button>
              </div>
              <div className="p-10 space-y-8 text-left">
                 <div className="space-y-4">
                    <p className="text-slate-200 font-bold leading-relaxed">
                       Currently, <span className="text-blue-500">CODEON HOSTHING</span> does not have a direct payment gateway. This manual system is temporary, and we are working to automate it soon. We apologize for the inconvenience.
                    </p>
                    <div className="h-px bg-white/5"></div>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                       දැනට CODEON HOSTHING සමාගම සතුව සෘජු ගෙවීම් ද්වාරයක් (Payment Gateway) නොමැති බැවින්, දැනට මෙම පද්ධතිය තාවකාලිකව භාවිතා කරනු ලැබේ. මෙය ඉතා ඉක්මනින් ස්වයංක්‍රීය කිරීමට අප සමාගම කටයුතු කරමින් සිටින අතර සිදුවූ අපහසුතාවයට අපගේ කණගාටුව ප්‍රකාශ කරමු.
                    </p>
                 </div>
                 <button 
                   onClick={() => setShowInfoModal(false)}
                   className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest transition-all"
                 >
                   I Understand / මට තේරුණා
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* READ ME MODAL OVERLAY: Main Checkout Flow */}
      {showReadMe && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="max-w-xl w-full bg-[#111827] border border-blue-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(59,130,246,0.2)] overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="bg-blue-600 p-8 flex justify-between items-center">
                 <div className="flex items-center space-x-3">
                    <AlertCircle size={24} className="text-white animate-pulse" />
                    <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">READ ME FIRST</h2>
                 </div>
                 <button 
                   onClick={() => setShowReadMe(false)}
                   className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                 >
                   <X size={24} />
                 </button>
              </div>

              <div className="p-10 space-y-8 text-left max-h-[70vh] overflow-y-auto custom-scrollbar">
                 <div className="space-y-4">
                    <p className="text-lg font-bold text-white leading-tight">
                       මෙම ගෙවීම සිදු කළ පසු එහි <span className="text-blue-500 underline decoration-2">Screenshot</span> එකක් ලබා ගැනීමට කාරුණික වන්න.
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                       After completing your payment, please take a clear screenshot of the successful transaction. 
                    </p>
                    
                    {/* Primary Button */}
                    <button 
                      onClick={handlePayNow}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-3 uppercase tracking-[0.2em] text-xs transition-all active:scale-95 group mt-4"
                    >
                      <span>Pay via Buy Me a Coffee</span>
                      <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
                    </button>

                    {/* More Payment Options */}
                    <div className="mt-8 space-y-4 pt-6 border-t border-white/10">
                       <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">More Payment Options / වෙනත් ගෙවීම් ක්‍රම</h3>
                       
                       {/* Bank Transfer */}
                       <div className="bg-slate-900/50 border border-white/5 p-5 rounded-2xl space-y-3">
                          <div className="flex items-center space-x-3 text-blue-400">
                             <Landmark size={18} />
                             <span className="text-[10px] font-black uppercase tracking-widest">Bank Transfer</span>
                          </div>
                          <div className="space-y-1">
                             <p className="text-sm font-bold text-white">115512117084</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">NDB Bank Gampaha</p>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">M.P.W.wijerathna</p>
                          </div>
                       </div>

                       {/* Binance */}
                       <div className="bg-slate-900/50 border border-white/5 p-5 rounded-2xl space-y-3">
                          <div className="flex items-center space-x-3 text-yellow-500">
                             <Wallet size={18} />
                             <span className="text-[10px] font-black uppercase tracking-widest">Binance ID</span>
                          </div>
                          <p className="text-sm font-bold text-white">786361530</p>
                       </div>
                    </div>

                    <div className="bg-blue-600/5 border border-blue-500/20 p-6 rounded-2xl space-y-3 mt-8">
                       <p className="text-xs font-black text-white uppercase tracking-widest flex items-center space-x-2">
                          <Check size={14} className="text-green-500" />
                          <span>REQUIRED STEP / අනිවාර්ය පියවර</span>
                       </p>
                       <p className="text-sm font-medium text-slate-300">
                          ඕනෑම ගෙවීමකින් පසුව, ඔබගේ ඇණවුම තහවුරු කිරීමට එම Screenshot එක <span className="text-white font-bold italic">CODEON HOSTHING Discord Ticket</span> එකක් සාදා එහි ඉදිරිපත් කරන්න. 
                       </p>
                       <p className="text-[10px] text-slate-500 font-bold uppercase">
                          (After any payment, create a Discord support ticket and upload the screenshot to complete your order.)
                       </p>
                    </div>
                 </div>

                 <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => setShowReadMe(false)}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-xs transition-all border border-white/5"
                    >
                      Back / ආපසු
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;
