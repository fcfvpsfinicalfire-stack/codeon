
import React, { useState } from 'react';
import { Plan, BillingCycle } from '../types';
import { LOCATIONS, DISCOUNT_PERCENT, NEW_YEAR_COUPON, LKR_TO_EUR } from '../constants';

interface OrderModalProps {
  cart: Plan[];
  onClose: () => void;
  onClearCart: () => void;
  currency: 'LKR' | 'EUR';
  billingCycle: BillingCycle;
  onOrderSuccess: () => void;
}

type Step = 'CONFIG' | 'LOCATION' | 'PAYMENT' | 'REVIEW';

const OrderModal: React.FC<OrderModalProps> = ({ cart, onClose, onClearCart, currency, billingCycle, onOrderSuccess }) => {
  const [step, setStep] = useState<Step>('CONFIG');
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  
  const [formData, setFormData] = useState({
    serverName: '',
    description: '',
    email: '',
    discordUser: ''
  });

  const calculateFinalTotal = () => {
    let totalLKR = 0;
    cart.forEach(item => {
      const isDedicated = item.category === 'DEDICATED';
      let cycleDiscount = 0;
      let multiplier = 1;
      
      if (billingCycle === 'QUARTERLY') { cycleDiscount = 10; multiplier = 3; }
      if (billingCycle === 'ANNUALLY') { cycleDiscount = 20; multiplier = 12; }

      // Standard base discount (26%) + Cycle discount
      let totalDiscount = (isDedicated ? 0 : DISCOUNT_PERCENT) + cycleDiscount;
      
      // Additional coupon discount if applied (e.g., extra 5%?) 
      // For now we treat coupon as the base DISCOUNT_PERCENT or just a flag
      if (isCouponApplied) {
        // Just for visual effect of coupon, usually it replaces or stacks.
        // We'll stick to the existing app logic of DISCOUNT_PERCENT being the main one.
      }

      const discountedMonthlyLKR = Math.floor(item.price * (1 - totalDiscount / 100));
      totalLKR += (discountedMonthlyLKR * multiplier);
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
    if (couponCode.toUpperCase() === NEW_YEAR_COUPON) {
      setIsCouponApplied(true);
    } else {
      alert("Invalid coupon code.");
    }
  };

  const proceedToLocation = () => {
    if (!formData.serverName || !formData.email || !formData.discordUser) {
      alert("Please fill in all required fields.");
      return;
    }
    setStep('LOCATION');
  };

  const handleFinalPayment = () => {
    window.open("https://buymeacoffee.com/codeonhostings", "_blank");
    setStep('REVIEW');
    onOrderSuccess();
  };

  const handleFinish = () => {
    onClearCart();
    onClose();
  };

  const activeLoc = LOCATIONS[0]; 

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl glass rounded-[3rem] p-10 overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase">
              {step === 'CONFIG' ? 'Configuration' : 
               step === 'LOCATION' ? 'Location' :
               step === 'PAYMENT' ? 'Checkout' : 'Order Placed'}
            </h2>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-1 rounded-full transition-all ${
                  (step === 'CONFIG' && i === 1) || 
                  (step === 'LOCATION' && i <= 2) || 
                  (step === 'PAYMENT' && i <= 3) || 
                  (step === 'REVIEW' && i <= 4) ? 'w-8 bg-blue-500' : 'w-4 bg-white/10'
                }`} />
              ))}
            </div>
          </div>
          {step !== 'REVIEW' && (
            <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-full text-gray-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
        </div>

        {step === 'CONFIG' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Server Name *</label>
                <input name="serverName" value={formData.serverName} onChange={handleInputChange} placeholder="My Epic Server" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold focus:outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Discord User *</label>
                <input name="discordUser" value={formData.discordUser} onChange={handleInputChange} placeholder="user#1234" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email *</label>
              <input name="email" value={formData.email} onChange={handleInputChange} placeholder="hello@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold focus:outline-none focus:border-blue-500" />
            </div>
            
            <div className="bg-blue-600/5 p-4 rounded-2xl border border-blue-500/10">
               <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Selected Cycle: {billingCycle}</span>
            </div>

            <button onClick={proceedToLocation} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-600/20 transition-all uppercase tracking-widest">
              Continue to Location
            </button>
          </div>
        )}

        {step === 'LOCATION' && (
          <div className="space-y-8">
            <div className="glass p-8 border-2 border-blue-500/50 rounded-3xl relative overflow-hidden">
               <div className="flex items-center gap-6">
                  <span className="text-6xl">{activeLoc.flag}</span>
                  <div className="flex-1">
                     <h4 className="text-2xl font-black uppercase tracking-tighter">{activeLoc.name}</h4>
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{activeLoc.datacenter}</p>
                     <p className="text-[10px] text-blue-400 font-black mt-2 uppercase">SGNS Datacenter SG-01</p>
                  </div>
                  <div className="text-right">
                     <div className="text-xl font-black text-green-400">{activeLoc.ping}</div>
                  </div>
               </div>
            </div>
            <button onClick={() => setStep('PAYMENT')} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg rounded-2xl uppercase tracking-widest transition-all">
              Go to Payment
            </button>
          </div>
        )}

        {step === 'PAYMENT' && (
          <div className="space-y-8">
            <div className="glass p-8 rounded-3xl border border-white/5 space-y-4">
               <div className="flex justify-between items-end">
                  <span className="text-sm font-black uppercase tracking-widest">Total ({billingCycle.toLowerCase()})</span>
                  <span className="text-4xl font-black text-white">{symbol} {finalPriceDisplay}</span>
               </div>
            </div>
            
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="PROMO CODE" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-blue-500" 
              />
              <button onClick={applyCoupon} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black text-xs rounded-2xl uppercase tracking-widest border border-white/10 transition-all">Apply</button>
            </div>

            <button onClick={handleFinalPayment} className="w-full py-6 bg-[#FFDD00] hover:bg-[#ffea00] text-black font-black text-2xl rounded-3xl shadow-2xl flex items-center justify-center gap-4 transition-all">
              <img src="https://th.bing.com/th/id/ODF.iquX2Ael8XIH_WbPH-vmDg?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2" className="h-8" />
              Pay with Card
            </button>
          </div>
        )}

        {step === 'REVIEW' && (
          <div className="text-center py-10 animate-in zoom-in-95 duration-500">
             <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce shadow-2xl shadow-blue-500/50">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
             </div>
             <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Under Review</h3>
             <div className="bg-blue-600/10 border-2 border-blue-500/20 p-8 rounded-[2.5rem] mb-8 text-left">
                <p className="text-white text-lg font-black uppercase leading-tight mb-4 italic">
                  Order pending manual activation.
                </p>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] mb-6">
                  Please open a ticket on Discord and send your payment screenshot for immediate provisioning.
                </p>
                <a href="https://discord.gg/CHAR4ABVWz" target="_blank" className="block w-full text-center px-8 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all">
                  Open Discord Ticket
                </a>
             </div>
             <button onClick={handleFinish} className="w-full py-5 glass hover:bg-white/5 rounded-2xl font-black uppercase tracking-widest transition-all">
                Close
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
