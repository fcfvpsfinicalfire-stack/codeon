
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, ChevronRight, X, RefreshCw, Landmark, Wallet, ShieldCheck, CreditCard, ExternalLink } from 'lucide-react';
import { api } from '../lib/api';

interface CheckoutPageProps {
  plan: any;
  onBack: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ plan, onBack }) => {
  const [user, setUser] = useState<any>(null);
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [showReadMe, setShowReadMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, []);

  if (!plan || !user) return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-blue-500">
      <RefreshCw className="animate-spin" size={48} />
    </div>
  );

  const getPrice = () => {
    const rawPrice = plan.price.toString().replace('Rs.', '').replace('Rs', '').replace('RS', '').replace('$', '').replace(',', '').trim();
    return parseFloat(rawPrice).toFixed(2);
  };

  const handleFinalOrder = async () => {
    if (!address || !tel) {
      alert('Identity sync requires address and telephone verification.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post('/orders', {
        plan_name: plan.ram ? `Minecraft ${plan.ram}` : plan.name,
        price: parseFloat(getPrice()),
        address,
        tel,
        payment_method: paymentMethod,
        email, // SEND EMAIL FOR GUEST
        clientName: name, // SEND NAME FOR GUEST
        password // SEND PASSWORD FOR ACCOUNT CREATION
      });

      // AUTO-LOGIN IF GUEST
      if (!user) {
        const guestUser = {
          id: response.clientId || 'GUEST-' + Math.floor(Math.random() * 10000),
          name: name,
          email: email,
          role: 'client'
        };
        localStorage.setItem('codeon_user', JSON.stringify(guestUser));
      }

      window.location.href = '/';
    } catch (e) {
      alert('Transmission overlap error. Check identity status.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen pt-12 pb-24 px-4 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/5 blur-[120px] rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <button onClick={onBack} className="flex items-center space-x-2 text-slate-400 hover:text-white mb-10 transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Protocol Re-entry: Node Selection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-10">
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-black text-white mb-2 uppercase tracking-tighter italic leading-none">
                DEPLOYMENT <span className="text-blue-500">SETTLEMENT</span>
              </h1>
              <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em]">Identity & Provisioning Verification</p>
            </div>

            <div className="bg-[#111827]/60 border border-white/5 rounded-[2.5rem] p-10 space-y-8 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center space-x-4 text-blue-500 border-b border-white/5 pb-6">
                <ShieldCheck size={28} />
                <div>
                  <h3 className="text-lg font-black uppercase italic text-white tracking-tighter">Identity Verified</h3>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Linked via Secure Local Node</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-4">Subject Name</label>
                  {user ? (
                    <div className="w-full bg-[#0b0f19]/80 border border-white/5 rounded-2xl py-4 px-6 text-slate-400 text-xs font-bold uppercase truncate">{user.name}</div>
                  ) : (
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Enter Name" className="w-full bg-[#0b0f19] border border-white/10 rounded-2xl py-4 px-6 text-white text-xs font-bold outline-none focus:border-blue-500 transition-all placeholder:text-slate-700" />
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-4">Communication Relay</label>
                  {user ? (
                    <div className="w-full bg-[#0b0f19]/80 border border-white/5 rounded-2xl py-4 px-6 text-slate-400 text-xs font-bold truncate">{user.email}</div>
                  ) : (
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Active Email Address" className="w-full bg-[#0b0f19] border border-white/10 rounded-2xl py-4 px-6 text-white text-xs font-bold outline-none focus:border-blue-500 transition-all placeholder:text-slate-700" />
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4 italic">Provisioning Address</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Physical location for routing..." className="w-full bg-[#0b0f19] border border-white/10 rounded-2xl py-4 px-6 text-white text-xs focus:border-blue-500 outline-none transition-all placeholder:text-slate-800" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4 italic">Tactical Telephone</label>
                  <input type="tel" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="07XXXXXXXX" className="w-full bg-[#0b0f19] border border-white/10 rounded-2xl py-4 px-6 text-white text-xs focus:border-blue-500 outline-none transition-all placeholder:text-slate-800" />
                </div>
              </div>
            </div>

            <div className="bg-[#111827]/60 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center space-x-4 text-blue-500 mb-10">
                <CreditCard size={24} />
                <h3 className="text-lg font-black uppercase italic text-white tracking-tighter">Settlement Node</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { id: 'Bank Transfer', label: 'Manual Bank', icon: <Landmark size={28} /> },
                  { id: 'eZ Cash', label: 'Mobile Hub', icon: <Wallet size={28} /> },
                  { id: 'BuyMeACoffee', label: 'Coffee Point', icon: <ExternalLink size={28} /> },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center group relative overflow-hidden ${paymentMethod === method.id ? 'bg-blue-600 border-blue-600 shadow-2xl' : 'bg-[#0b0f19] border-white/5 hover:border-white/10'}`}
                  >
                    <div className={`mb-4 transition-transform group-hover:scale-110 ${paymentMethod === method.id ? 'text-white' : 'text-slate-500'}`}>{method.icon}</div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${paymentMethod === method.id ? 'text-white' : 'text-slate-400'}`}>{method.label}</span>
                    {paymentMethod === method.id && <div className="absolute top-2 right-2 text-white"><Check size={16} /></div>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-[#111827] border border-white/10 rounded-[3rem] overflow-hidden shadow-3xl sticky top-12 backdrop-blur-xl">
              <div className="bg-blue-600 p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 skew-x-12 -translate-x-1/2"></div>
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter relative z-10">CORE SUMMARY</h2>
              </div>
              <div className="p-10 space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    <span>Allocated Node:</span>
                    <span className="text-white italic">{plan.ram ? `MC ${plan.ram}` : plan.name}</span>
                  </div>
                  <div className="h-px bg-white/5"></div>
                  <div className="text-center py-4">
                    <p className="text-6xl font-black text-white italic tracking-tighter leading-none">Rs.{getPrice()}</p>
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mt-3">Periodic Settlement</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReadMe(true)}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl flex items-center justify-center space-x-3 uppercase tracking-widest text-xs transition-all active:scale-95 shadow-2xl shadow-blue-600/30 group"
                >
                  <span>Commit Transmission</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showReadMe && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/95 backdrop-blur-3xl animate-in zoom-in-95 duration-300">
          <div className="max-w-xl w-full bg-[#111827] border border-blue-500/30 rounded-[3rem] shadow-3xl overflow-hidden">
            <div className="bg-blue-600 p-8 flex justify-between items-center">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">FINAL PROTOCOL</h2>
              <button onClick={() => setShowReadMe(false)} className="text-white hover:opacity-70"><X size={24} /></button>
            </div>
            <div className="p-10 space-y-8 text-center">
              <p className="text-xl font-black text-white uppercase italic tracking-tighter leading-tight">Identity confirmed. Proceed to settlement phase.</p>
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] text-left">
                <p className="text-[10px] font-black text-blue-500 uppercase mb-4 italic tracking-widest">Deployment Manual</p>
                <p className="text-xs font-bold text-slate-400 leading-relaxed">
                  1. Commit to the deployment log below.<br />
                  2. Access your <span className="text-white">Dashboard</span> immediately.<br />
                  3. Settle the balance and upload the receipt to trigger node provisioning.<br />
                  4. Automatic status updates will follow via backbone link.
                </p>
              </div>
              <button
                onClick={handleFinalOrder}
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl flex items-center justify-center space-x-3 uppercase tracking-widest text-xs transition-all shadow-xl shadow-blue-600/20 active:scale-95"
              >
                {isSubmitting ? <RefreshCw className="animate-spin" size={18} /> : "Finalize Protocol Transmission"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
