
import React from 'react';
import { Plan, BillingCycle } from '../types';
import { LKR_TO_EUR, DISCOUNT_PERCENT, NEW_YEAR_COUPON } from '../constants';
// Added theme type import
import { Theme } from '../App';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Plan[];
  onRemove: (index: number) => void;
  onCheckout: () => void;
  currency: 'LKR' | 'EUR';
  billingCycle: BillingCycle;
  // Added theme prop to interface
  theme: Theme;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  onRemove, 
  onCheckout, 
  currency, 
  billingCycle,
  // Destructured theme prop
  theme 
}) => {
  const calculateTotal = () => {
    let totalLKR = 0;
    cart.forEach(item => {
      const isDedicated = item.category === 'DEDICATED';
      let cycleDiscount = 0;
      let multiplier = 1;
      
      if (billingCycle === 'QUARTERLY') { cycleDiscount = 10; multiplier = 3; }
      if (billingCycle === 'ANNUALLY') { cycleDiscount = 20; multiplier = 12; }

      const totalDiscount = (isDedicated ? 0 : DISCOUNT_PERCENT) + cycleDiscount;
      const discountedMonthlyLKR = Math.floor(item.price * (1 - totalDiscount / 100));
      totalLKR += (discountedMonthlyLKR * multiplier);
    });
    return totalLKR;
  };

  const totalLKR = calculateTotal();
  const symbol = currency === 'LKR' ? '₨' : '€';
  const displayTotal = currency === 'LKR' ? totalLKR.toLocaleString() : (totalLKR * LKR_TO_EUR).toFixed(2);

  const multiplier = billingCycle === 'QUARTERLY' ? 3 : billingCycle === 'ANNUALLY' ? 12 : 1;
  const monthlyLKR = totalLKR / multiplier;
  const displayMonthly = currency === 'LKR' ? Math.floor(monthlyLKR).toLocaleString() : (monthlyLKR * LKR_TO_EUR).toFixed(2);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md glass z-[101] shadow-2xl transition-transform duration-500 ease-out border-l border-white/5 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Your Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-500 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </div>
                <p className="text-gray-500 font-bold">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-6">
                   <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                      Billing Cycle: {billingCycle}
                   </span>
                </div>
                {cart.map((item, index) => (
                  <div key={item.id} className="glass p-4 rounded-2xl border border-white/5 flex justify-between items-center group">
                    <div>
                      <h4 className="font-black text-white">{item.ram}GB {item.category}</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.cores} Core / {item.disk}GB NVMe</p>
                      <p className="text-sm text-blue-400 font-black mt-1">
                        {symbol} {currency === 'LKR' ? item.price.toLocaleString() : (item.price * LKR_TO_EUR).toFixed(2)} <span className="text-[10px] text-gray-600">/mo base</span>
                      </p>
                    </div>
                    <button 
                      onClick={() => onRemove(index)}
                      className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-white/5 bg-white/5 space-y-4">
              {/* Coupon Reminder Banner */}
              <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-xl p-3 flex items-center gap-3 animate-pulse">
                <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12.75 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM12.75 20.25a.75.75 0 01-1.5 0v1.5a.75.75 0 011.5 0v-1.5zM21.75 12a.75.75 0 01-1.5 0h-1.5a.75.75 0 011.5 0h1.5zM4.5 12a.75.75 0 01-1.5 0h-1.5a.75.75 0 011.5 0h1.5zM18.894 5.106a.75.75 0 00-1.06 0l-1.061 1.06a.75.75 0 001.06 1.061l1.061-1.06a.75.75 0 000-1.061zM7.227 16.773a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.061l-1.061-1.06a.75.75 0 010-1.061zM18.894 18.894a.75.75 0 010-1.06l1.061-1.061a.75.75 0 011.06 1.06l-1.06 1.061a.75.75 0 01-1.061 0zM7.227 7.227a.75.75 0 000-1.06l-1.061-1.06a.75.75 0 00-1.06 1.06l1.06 1.061a.75.75 0 001.061 0z" /></svg>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-white uppercase tracking-tighter">Save More!</p>
                  <p className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest">Use <span className="text-white font-black">{NEW_YEAR_COUPON}</span> for 26% Extra Off</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total for {billingCycle.toLowerCase()}</span>
                  <span className="text-2xl font-black text-white">{symbol} {displayTotal}</span>
                </div>
                {billingCycle !== 'MONTHLY' && (
                  <div className="flex justify-between items-center bg-blue-500/5 p-3 rounded-xl border border-blue-500/10">
                    <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Equivalent Monthly</span>
                    <span className="text-sm font-black text-blue-400">{symbol} {displayMonthly}<span className="text-[9px] lowercase opacity-60">/mo</span></span>
                  </div>
                )}
              </div>
              <button 
                onClick={onCheckout}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-1"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
