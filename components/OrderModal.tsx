
import React, { useState } from 'react';
import { Plan, BillingCycle, User } from '../types';
import { LOCATIONS, DISCOUNT_PERCENT, NEW_YEAR_COUPON, LKR_TO_EUR, DISCORD_URL } from '../constants';
import { Theme } from '../App';

interface OrderModalProps {
  cart: Plan[];
  onClose: () => void;
  onClearCart: () => void;
  currency: 'LKR' | 'EUR';
  billingCycle: BillingCycle;
  onOrderSuccess: () => void;
  user: User;
  theme: Theme;
}

type Step = 'CONFIG' | 'LOCATION' | 'PAYMENT' | 'REVIEW';

const OrderModal: React.FC<OrderModalProps> = ({ cart, onClose, onClearCart, currency, billingCycle, onOrderSuccess, user, theme }) => {
  const [step, setStep] = useState<Step>('CONFIG');
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [orderId] = useState(() => 'CO-' + Math.random().toString(36).substr(2, 9).toUpperCase());
  const [selectedLocation, setSelectedLocation] = useState('SG');
  
  const [formData, setFormData] = useState({
    serverName: '',
    description: '',
    email: '',
    discordUser: `${user.username}#${user.discriminator}`,
    serverVersion: '1.21.1'
  });

  const calculateFinalTotal = () => {
    let totalLKR = 0;
    cart.forEach(item => {
      const isDedicated = item.category === 'DEDICATED';
      let cycleDiscount = 0;
      let multiplier = 1;
      
      if (billingCycle === 'QUARTERLY') { cycleDiscount = 10; multiplier = 3; }
      if (billingCycle === 'ANNUALLY') { cycleDiscount = 20; multiplier = 12; }

      let totalDiscount = (isDedicated ? 0 : DISCOUNT_PERCENT) + cycleDiscount;
      let basePrice = item.price * (1 - totalDiscount / 100);
      if (isCouponApplied) {
        basePrice = basePrice * (1 - DISCOUNT_PERCENT / 100);
      }
      totalLKR += (Math.floor(basePrice) * multiplier);
    });
    return totalLKR;
  };

  const finalPriceLKR = calculateFinalTotal();
  const finalPriceDisplay = currency === 'LKR' ? finalPriceLKR.toLocaleString() : (finalPriceLKR * LKR_TO_EUR).toFixed(2);
  const symbol = currency === 'LKR' ? '₨' : '€';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applyCoupon = () => {
    if (!couponCode) return;
    setIsApplying(true);
    setTimeout(() => {
      if (couponCode.toUpperCase() === NEW_YEAR_COUPON) {
        setIsCouponApplied(true);
      } else {
        alert("Invalid coupon code.");
      }
      setIsApplying(false);
    }, 800);
  };

  const proceedToLocation = () => {
    if (!formData.serverName || !formData.email || !formData.discordUser) {
      alert("Please provide real details. Credentials will be sent to the provided email and discord.");
      return;
    }
    setStep('LOCATION');
  };

  const handleFinalPayment = () => {
    window.open("https://buymeacoffee.com/codeonhostings", "_blank");
    setStep('REVIEW');
    onOrderSuccess();
  };

  const handleDownloadInvoice = () => {
    const activeLoc = LOCATIONS.find(l => l.id === selectedLocation) || LOCATIONS[0];
    const invoiceContent = `
========================================
    CODEON HOSTING (PVT) LTD INVOICE
========================================
Order ID: ${orderId}
Date: ${new Date().toLocaleDateString()}
Server: ${formData.serverName}
Version: ${formData.serverVersion}
Email: ${formData.email}
Discord: ${formData.discordUser}
Location: ${activeLoc.name}
----------------------------------------
PLAN DETAILS:
${cart.map(item => `- ${item.ram}GB ${item.category} (${billingCycle})`).join('\n')}
----------------------------------------
SUBTOTAL: ${symbol} ${(finalPriceLKR * (isCouponApplied ? 1.35 : 1)).toFixed(2)}
PROMO: ${isCouponApplied ? NEW_YEAR_COUPON + ' (26% OFF)' : 'N/A'}
TOTAL PAID: ${symbol} ${finalPriceDisplay}
----------------------------------------
STATUS: PENDING ACTIVATION
========================================
    `;
    
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl glass rounded-[3rem] p-10 overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
              {step === 'CONFIG' ? 'Configuration' : step === 'LOCATION' ? 'Location' : step === 'PAYMENT' ? 'Payment' : 'Complete'}
            </h2>
            <div className="flex gap-2 mt-4">
              <div className={`h-1 rounded-full transition-all duration-500 ${step === 'CONFIG' ? 'w-12 bg-blue-500' : 'w-4 bg-white/10'}`} />
              <div className={`h-1 rounded-full transition-all duration-500 ${step === 'LOCATION' ? 'w-12 bg-blue-500' : 'w-4 bg-white/10'}`} />
              <div className={`h-1 rounded-full transition-all duration-500 ${step === 'PAYMENT' ? 'w-12 bg-blue-500' : 'w-4 bg-white/10'}`} />
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full text-gray-500 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {step === 'CONFIG' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Server Name *</label>
                <input name="serverName" value={formData.serverName} onChange={handleInputChange} placeholder="My Epic Server" className="w-full bg-[#111827] border border-white/10 rounded-2xl p-4 text-sm font-bold text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Discord Username *</label>
                <input name="discordUser" value={formData.discordUser} onChange={handleInputChange} placeholder="Visitor#0001" className="w-full bg-[#111827] border border-white/10 rounded-2xl p-4 text-sm font-bold text-white focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email *</label>
              <input name="email" value={formData.email} onChange={handleInputChange} placeholder="hello@example.com" className="w-full bg-[#111827] border border-white/10 rounded-2xl p-4 text-sm font-bold text-white focus:outline-none focus:border-blue-500" />
              <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest ml-1">Your credentials will be sent to this email and discord username.</p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Server Version</label>
              <input name="serverVersion" value={formData.serverVersion} onChange={handleInputChange} placeholder="e.g. 1.21.1" className="w-full bg-[#111827] border border-white/10 rounded-2xl p-4 text-sm font-bold text-white focus:outline-none focus:border-blue-500" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Description (Optional)</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Any specific requirements?" className="w-full bg-[#111827] border border-white/10 rounded-2xl p-4 text-sm font-bold text-white focus:outline-none focus:border-blue-500 h-24 resize-none" />
            </div>

            <button onClick={proceedToLocation} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-600/30 transition-all uppercase tracking-widest active:scale-95">
              Continue to Location
            </button>
          </div>
        )}

        {step === 'LOCATION' && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
            <div className="space-y-3">
              {LOCATIONS.map((loc) => {
                const isSelected = selectedLocation === loc.id;
                const isOutOfStock = loc.stock === 0;
                return (
                  <div 
                    key={loc.id} 
                    onClick={() => !isOutOfStock && setSelectedLocation(loc.id)}
                    className={`relative p-5 rounded-3xl border transition-all cursor-pointer flex items-center justify-between ${
                      isOutOfStock ? 'opacity-40 grayscale cursor-not-allowed border-white/5' :
                      isSelected ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'border-white/10 bg-[#111827] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-lg font-black text-gray-500 w-8">{loc.flag}</span>
                      <div>
                        <h4 className="text-lg font-black text-white uppercase tracking-tight">{loc.name}</h4>
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{loc.datacenter}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <span className="text-sm font-black text-blue-400 block">{loc.ping}</span>
                       <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Latency Pulse</span>
                    </div>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-[#030712] animate-pulse" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep('CONFIG')} className="flex-1 py-5 glass hover:bg-white/5 rounded-2xl font-black uppercase tracking-widest transition-all">Back</button>
              <button onClick={() => setStep('PAYMENT')} className="flex-[2] py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-600/30 transition-all uppercase tracking-widest active:scale-95">Proceed to Pay</button>
            </div>
          </div>
        )}

        {step === 'PAYMENT' && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
            <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex justify-between items-center">
               <div className="text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Order Total</span>
                  <div className="text-3xl font-black text-white">{symbol} {finalPriceDisplay}</div>
               </div>
               <div className="text-right">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-xl text-[9px] font-black uppercase border border-blue-500/20">{billingCycle} Cycle</span>
               </div>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black text-blue-400 uppercase tracking-[0.3em] ml-1">Promotional Code</label>
              <div className={`flex items-center p-1 rounded-2xl border-2 transition-all ${isCouponApplied ? 'border-green-500 bg-green-500/10' : 'border-white/10 bg-[#111827] focus-within:border-blue-500'}`}>
                <input 
                  type="text" 
                  value={couponCode} 
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  disabled={isCouponApplied}
                  placeholder="CODEON2026" 
                  className="flex-1 bg-transparent px-4 py-3 text-sm font-black text-white focus:outline-none uppercase" 
                />
                <button 
                  onClick={applyCoupon}
                  disabled={isCouponApplied || !couponCode}
                  className={`px-8 py-3 rounded-xl font-black text-xs uppercase transition-all ${isCouponApplied ? 'text-green-500' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
                >
                  {isCouponApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep('LOCATION')} className="flex-1 py-6 glass hover:bg-white/5 rounded-3xl font-black uppercase tracking-widest transition-all">Back</button>
              <button onClick={handleFinalPayment} className="flex-[3] py-6 bg-[#FFDD00] hover:bg-[#ffea00] text-black font-black text-2xl rounded-3xl shadow-2xl flex items-center justify-center gap-4 transition-all active:scale-95 group">
                <img src="https://th.bing.com/th/id/ODF.iquX2Ael8XIH_WbPH-vmDg?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2" className="h-8 group-hover:scale-110 transition-transform" />
                Finalize & Pay
              </button>
            </div>
          </div>
        )}

        {step === 'REVIEW' && (
          <div className="text-center py-10 animate-in zoom-in-95 duration-500">
             <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce shadow-2xl shadow-green-500/50">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
             </div>
             <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Under Review</h3>
             <div className="bg-blue-600/10 border-2 border-blue-500/20 p-8 rounded-[2.5rem] mb-8 text-left">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-white text-lg font-black uppercase tracking-tighter italic">Order ID: {orderId}</p>
                  <button onClick={handleDownloadInvoice} className="p-2 glass rounded-xl text-[8px] font-black hover:bg-white/10 uppercase tracking-widest">Invoice</button>
                </div>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] mb-6 leading-relaxed">Please open a ticket on Discord and send your payment screenshot with your Order ID for immediate provisioning.</p>
                <a href={DISCORD_URL} target="_blank" className="block w-full text-center py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">Open Discord Ticket</a>
             </div>
             <button onClick={() => { onClearCart(); onClose(); }} className="w-full py-5 glass hover:bg-white/5 rounded-2xl font-black uppercase tracking-widest transition-all">Dismiss</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
