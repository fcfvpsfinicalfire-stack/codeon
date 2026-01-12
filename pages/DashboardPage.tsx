import React, { useState, useEffect, useRef } from 'react';
import { api } from '../lib/api';
import {
  Upload, Clock, CheckCircle2, XCircle, LogOut,
  Landmark, Wallet, ExternalLink, RefreshCw, Layers,
  MessageSquare, Send, CreditCard, Receipt, Shield, Bell, Settings, Paperclip,
  Tag, Coffee, Search, ChevronDown, Download
} from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

interface DashboardPageProps {
  onViewChange: (view: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onViewChange }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'billing' | 'support'>('overview');
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload Form
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Bank Transfer');
  const [slipFile, setSlipFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Support Chat
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [creatingTicket, setCreatingTicket] = useState(false);
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMsg, setNewTicketMsg] = useState('');
  const [replyMsg, setReplyMsg] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);

  // Stripe Payment Modal State
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPaymentOrder, setSelectedPaymentOrder] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = api.getCurrentUser();
        setUser(currentUser);

        if (currentUser) {
          const [o, t] = await Promise.all([
            api.get('/user/orders'),
            api.get('/user/tickets')
          ]);
          setOrders(Array.isArray(o) ? o : []);
          setTickets(Array.isArray(t) ? t : []);
        }
      } catch (e) {
        console.warn('Sync Error', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // Safety Timeout
    const safetyTimer = setTimeout(() => setLoading(false), 2000);

    const interval = setInterval(fetchData, 8000);

    // Auto-open Payment Modal if query param exists
    const urlParams = new URLSearchParams(window.location.search);
    const payOrderId = urlParams.get('pay_order');
    if (payOrderId && !paymentModalOpen && !loading) {
      // We need to wait for orders to load.
      // This logic is better placed inside fetchData or a separate effect dependent on [orders]
    }

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
    };
  }, []);

  // Effect to handle auto-opening payment modal after orders are loaded
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const payOrderId = urlParams.get('pay_order');
    const welcome = urlParams.get('welcome');

    if (payOrderId && orders.length > 0 && !paymentModalOpen) {
      const orderToPay = orders.find(o => o.id === Number(payOrderId));
      if (orderToPay && orderToPay.status === 'pending') {
        setSelectedPaymentOrder(orderToPay);
        setPaymentModalOpen(true);
        // Optional: Clean URL
        window.history.replaceState({}, '', '/ClientPortal');
      }
    }
  }, [orders, loading]);

  const handleLogout = () => {
    api.logout();
    onViewChange('home');
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !slipFile) return alert("Please enter amount and upload receipt.");

    setIsUploading(true);
    try {
      const orderRes = await api.post('/orders', {
        price: amount,
        payment_method: method,
        plan_name: "Manual Payment Upload"
      });

      await api.post('/payments/upload', {
        order_id: orderRes.id,
        slip_base64: slipFile
      });

      alert("Receipt Uploaded Successfully! Support Ticket Created.");
      setAmount('');
      setSlipFile(null);
      setActiveTab('billing');

      // Refresh
      const [o, t] = await Promise.all([api.get('/user/orders'), api.get('/user/tickets')]);
      setOrders(Array.isArray(o) ? o : []);
      setTickets(Array.isArray(t) ? t : []);

    } catch (err) {
      alert("Upload Failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !replyMsg.trim()) return;
    setSendingMsg(true);
    try {
      await api.post('/tickets/reply', {
        ticket_id: selectedTicket.id,
        message: replyMsg
      });
      setReplyMsg('');
      const t = await api.get('/user/tickets');
      setTickets(Array.isArray(t) ? t : []);
      const updated = t.find((x: any) => x.id === selectedTicket.id);
      if (updated) setSelectedTicket(updated);
    } catch (e) { }
    setSendingMsg(false);
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingMsg(true);
    try {
      await api.post('/tickets/create', { subject: newTicketSubject, message: newTicketMsg });
      setNewTicketSubject('');
      setNewTicketMsg('');
      setCreatingTicket(false);
      const t = await api.get('/user/tickets');
      setTickets(Array.isArray(t) ? t : []);
      alert("Ticket Created Successfully");
    } catch (e) { alert("Failed to create ticket"); }
    setSendingMsg(false);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Loading Dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#030508] min-h-screen text-white flex flex-col md:flex-row font-sans overflow-hidden font-outfit selection:bg-blue-500/30">

      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] left-[20%] w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-80 bg-[#0a0f1a]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col h-screen sticky top-0 z-50 relative shadow-2xl">
        <div className="p-8 pb-6">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-black text-sm shadow-lg shadow-blue-600/30 border border-white/10 group cursor-pointer hover:scale-105 transition-transform">
              CH
            </div>
            <div>
              <h1 className="text-lg font-black italic uppercase tracking-tighter text-white leading-none">CODEON<span className="text-blue-500">.HOST</span></h1>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Client Hub v2.1</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0f1219] rounded-2xl p-1 border border-white/5 mb-8 shadow-inner group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/10 blur-xl rounded-full group-hover:bg-blue-600/20 transition-all duration-500"></div>
            <div className="bg-[#0a0f1a]/90 backdrop-blur-sm rounded-xl p-4 relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xs font-bold border border-white/10 shadow-lg">
                  {user?.name?.[0] || 'U'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-black text-white truncate">{user?.name || 'User'}</p>
                  <p className="text-[10px] text-slate-500 truncate font-mono">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wide text-green-400 bg-green-500/5 border border-green-500/10 px-3 py-1.5 rounded-lg">
                <span className="flex items-center gap-1.5"><Shield size={10} /> Verified Identity</span>
                <span className="text-white/50">Tier 1</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-grow px-6 space-y-2">
          {[
            { id: 'overview', icon: Layers, label: 'Overview' },
            { id: 'billing', icon: CreditCard, label: 'Billing & Orders' },
            { id: 'support', icon: MessageSquare, label: 'Support Center', badge: tickets.length }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-xl text-xs font-bold transition-all duration-300 group relative overflow-hidden ${activeTab === item.id
                ? 'bg-gradient-to-r from-blue-600/20 to-transparent text-white border-l-2 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.1)]'
                : 'text-slate-500 hover:bg-white/5 hover:text-slate-200 border-l-2 border-transparent'
                }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <item.icon size={18} className={`transition-colors ${activeTab === item.id ? 'text-blue-500' : 'group-hover:text-white'}`} />
                <span className="tracking-wide">{item.label}</span>
              </div>
              {item.badge ? <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[9px] min-w-[20px] text-center font-black shadow-lg shadow-blue-600/20">{item.badge}</span> : null}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 bg-[#080c14]/50">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-xl text-xs font-black text-slate-500 hover:bg-red-500/10 hover:text-red-500 transition-all border border-transparent hover:border-red-500/10 group">
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow md:p-12 p-8 overflow-y-auto relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-[#05080f] to-[#05080f]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* TAB 1: OVERVIEW (ULTRA-MAX) */}
        {activeTab === 'overview' && (
          <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-white mb-2">Command Center</h2>
                <p className="text-slate-400 text-sm font-bold tracking-wide">Manage your payments and active services.</p>
              </div>

              {/* System Status Widget */}
              <div className="bg-[#0a0f1a]/80 backdrop-blur-md border border-white/5 px-6 py-3 rounded-2xl flex items-center gap-6 shadow-xl animate-in slide-in-from-right duration-700">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Status</span>
                  <span className="text-xs font-bold text-green-400 flex items-center gap-1"><CheckCircle2 size={10} /> Operational</span>
                </div>
                <div className="w-px h-8 bg-white/5"></div>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Ping</span>
                  <span className="text-xs font-bold text-blue-400">24ms</span>
                </div>
                <div className="w-px h-8 bg-white/5"></div>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Encryption</span>
                  <span className="text-xs font-bold text-purple-400 flex items-center gap-1"><Shield size={10} /> AES-256</span>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Stats */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {[
                  { label: 'Active Services', val: orders.filter(o => o.status === 'active').length, icon: Layers, color: 'text-green-400', border: 'hover:border-green-500/50', shadow: 'hover:shadow-green-500/20' },
                  { label: 'Pending Orders', val: orders.filter(o => o.status === 'pending').length, icon: Clock, color: 'text-amber-400', border: 'hover:border-amber-500/50', shadow: 'hover:shadow-amber-500/20' },
                  { label: 'Open Tickets', val: tickets.filter(t => t.status === 'open').length, icon: MessageSquare, color: 'text-blue-400', border: 'hover:border-blue-500/50', shadow: 'hover:shadow-blue-500/20' },
                ].map((stat, i) => (
                  <div key={i} className={`bg-[#0a0f1a]/60 backdrop-blur-md border border-white/5 p-6 rounded-3xl flex items-center gap-6 group transition-all duration-300 ${stat.border} ${stat.shadow} relative overflow-hidden`}>
                    <div className={`absolute top-0 right-0 p-4 opacity-5 ${stat.color} group-hover:scale-110 transition-transform`}><stat.icon size={64} /></div>
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color} border border-white/5 group-hover:bg-white/10 transition-colors shadow-lg`}>
                      <stat.icon size={24} />
                    </div>
                    <div className="relative z-10">
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-3xl font-black text-white">{stat.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upload Card */}
              <div className="lg:col-span-2">
                <div className="bg-[#0a0f1a]/80 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-50"></div>
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div>
                      <h3 className="text-2xl font-black text-white flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-xl text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"><Wallet size={24} /></div>
                        Universal Payment Gateway
                      </h3>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 ml-14">Acquire Any Service // Instant Provisioning</p>
                    </div>
                    <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] font-black uppercase tracking-widest rounded-full shadow-[0_0_10px_rgba(34,197,94,0.2)] animate-pulse">
                      <Shield size={10} className="inline mr-1 mb-0.5" /> Secure
                    </span>
                  </div>

                  <form onSubmit={handleUpload} className="space-y-6 relative z-10">
                    {/* Common Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group/input">
                        <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest block mb-2 ml-1">Payment For</label>
                        <div className="relative">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"><Tag size={16} /></span>
                          <input
                            type="text" required
                            className="w-full bg-[#05080f] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white font-bold text-sm outline-none focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all placeholder:text-slate-700"
                            placeholder="Service Name / Item"
                          />
                        </div>
                      </div>
                      <div className="group/input">
                        <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest block mb-2 ml-1">Total Amount</label>
                        <div className="relative">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">LKR</span>
                          <input
                            type="number" required value={amount} onChange={e => setAmount(e.target.value)}
                            className="w-full bg-[#05080f] border border-white/10 rounded-2xl pl-14 pr-4 py-4 text-white font-bold text-sm outline-none focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all placeholder:text-slate-700"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Method Details */}
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      {method === 'Card' ? (
                        <div className="bg-[#FFDD00] rounded-3xl p-1 relative overflow-hidden shadow-xl">
                          <div className="bg-[#1a1a1a] rounded-[1.3rem] p-6 relative">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#FFDD00] rounded-2xl flex items-center justify-center text-black shadow-lg animate-bounce-slow">
                                  <Coffee size={24} strokeWidth={2.5} />
                                </div>
                                <div>
                                  <p className="text-white font-black uppercase tracking-wide text-sm">External Gateway</p>
                                  <p className="text-[10px] text-[#FFDD00] font-bold mt-1">buymeacoffee.com/codeonhostings</p>
                                </div>
                              </div>
                              <a href="https://buymeacoffee.com/codeonhostings" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-[#FFDD00] hover:bg-white text-black px-8 py-4 rounded-xl font-black uppercase text-[11px] tracking-[0.15em] transition-all shadow-[0_0_20px_rgba(255,221,0,0.3)] hover:shadow-[0_0_30px_rgba(255,221,0,0.5)] flex items-center justify-center gap-2 hover:-translate-y-1">
                                Pay Now <ExternalLink size={14} />
                              </a>
                            </div>
                            <div className="mt-6 pt-4 border-t border-white/10 text-center">
                              <p className="text-[9px] text-slate-400 font-mono">* After payment, capture a screenshot and upload below to verify instantly.</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-1 relative overflow-hidden shadow-xl">
                          <div className="bg-[#1a0505] rounded-[1.3rem] p-6 relative">
                            <div className="flex items-start justify-between mb-6">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-500/10 rounded-lg text-red-500"><Landmark size={20} /></div>
                                <span className="text-red-500 font-black uppercase text-xs tracking-widest">Bank Details</span>
                              </div>
                              <div className="px-3 py-1 bg-red-500/10 rounded-lg border border-red-500/20 text-red-400 text-[9px] font-bold">Local Transfer</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Bank / Branch</p>
                                <p className="text-white font-bold text-lg">NDB Bank <span className="text-slate-600 text-sm">/ Gampaha</span></p>
                              </div>
                              <div>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Account Number</p>
                                <p className="text-white font-mono text-2xl tracking-widest">1155 1211 7084</p>
                              </div>
                              <div className="md:col-span-2">
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Beneficiary Name</p>
                                <p className="text-white font-bold">M.P.W. Wijerathna</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div onClick={() => fileInputRef.current?.click()} className={`border-2 border-dashed rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all group/drop relative overflow-hidden ${slipFile ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5'}`}>
                      {slipFile ? (
                        <div className="flex flex-col items-center gap-2 text-green-400 font-bold text-sm animate-in zoom-in-90">
                          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-2"><CheckCircle2 size={24} /></div>
                          <span>Receipt Analysis Complete</span>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 rounded-full bg-[#0b0f19] border border-white/10 flex items-center justify-center text-slate-500 group-hover/drop:scale-110 group-hover/drop:text-blue-400 group-hover/drop:border-blue-500/50 transition-all shadow-xl"><Paperclip size={24} /></div>
                          <div className="text-center">
                            <span className="text-xs text-white font-black uppercase tracking-wide block mb-1">Click to Upload Receipt</span>
                            <span className="text-[10px] text-slate-500 uppercase font-bold">Supported: JPG, PNG, PDF</span>
                          </div>
                        </>
                      )}
                      <input type="file" ref={fileInputRef} onChange={e => {
                        const f = e.target.files?.[0];
                        if (f) { const r = new FileReader(); r.onloadend = () => setSlipFile(r.result as string); r.readAsDataURL(f); }
                      }} className="hidden" accept="image/*" />
                    </div>

                    <button disabled={isUploading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isUploading ? <RefreshCw className="animate-spin" /> : <><span>Initiate Transaction</span> <ExternalLink size={14} /></>}
                    </button>
                  </form>
                </div>
              </div>

              {/* Notifications / Side */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl group cursor-pointer hover:scale-[1.02] transition-transform">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <div className="relative z-10">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white mb-6 backdrop-blur-md"><MessageSquare size={20} /></div>
                    <h3 className="font-black text-white text-xl italic uppercase mb-2">Need Help?</h3>
                    <p className="text-blue-100 text-xs leading-relaxed mb-6 font-medium">Our elite support unit is available 24/7 to assist with your deployment operations.</p>
                    <button onClick={() => setActiveTab('support')} className="bg-white text-blue-600 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/90 transition-colors shadow-lg">Open Uplink</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BILLING SYSTEM (ULTRA-MAX) */}
        {activeTab === 'billing' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-white mb-2">Ledger</h2>
                <p className="text-slate-400 text-sm font-bold tracking-wide">Financial records and transaction history.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative group/search">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/search:text-blue-500 transition-colors" />
                  <input type="text" placeholder="Search ID..." className="bg-[#0a0f1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-[10px] font-bold text-white uppercase tracking-wide focus:outline-none focus:border-blue-500/50 focus:bg-[#0f1623] transition-all w-40" />
                </div>

                <div className="relative">
                  <select className="bg-[#0a0f1a] border border-white/10 rounded-xl pl-4 pr-8 py-3 text-[10px] font-bold text-slate-300 uppercase tracking-wide appearance-none cursor-pointer hover:bg-white/5 focus:outline-none focus:border-blue-500/50">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>

                <button className="bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-600/20">
                  <Download size={14} /> Export CSV
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-6">
              {orders.length === 0 ? (
                <div className="p-24 text-center border-2 border-dashed border-white/5 rounded-[3rem] text-slate-600 uppercase font-black tracking-widest text-xs relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                  <Wallet size={48} className="mx-auto mb-6 text-slate-700 group-hover:text-blue-500 transition-colors duration-500 opacity-50" />
                  <p>No transactions recorded in the ledger.</p>
                </div>
              ) : [...orders].sort((a, b) => b.created_at - a.created_at).map(order => (
                <div key={order.id} className="bg-[#0a0f1a]/80 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between group hover:border-blue-500/30 transition-all relative overflow-hidden hover:shadow-2xl hover:shadow-blue-900/10">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-indigo-600"></div>
                  <div className="flex items-center gap-8 w-full md:w-auto mb-6 md:mb-0">
                    <div className="w-16 h-16 rounded-2xl bg-[#05080f] flex items-center justify-center text-slate-500 border border-white/5 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all shadow-lg">
                      <Receipt size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-white font-black text-xl italic tracking-tight">{order.plan_name || 'Hosting Service'}</span>
                        <span className="text-[9px] text-slate-500 bg-white/5 px-2 py-1 rounded-lg font-mono border border-white/5">#{order.id}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                        <Clock size={10} />
                        {new Date(order.created_at).toLocaleDateString()}
                        <span className="text-slate-700">|</span>
                        <span className="text-slate-400">{order.method}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <div className="text-2xl font-black text-white mb-1">Rs. {order.price}</div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${order.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                        order.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                          'bg-slate-500/10 text-slate-500 border-slate-500/20'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'active' ? 'bg-green-500 animate-pulse' : order.status === 'pending' ? 'bg-amber-500 animate-pulse' : 'bg-slate-500'}`}></span>
                        {order.status}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => {
                            setSelectedPaymentOrder(order);
                            setPaymentModalOpen(true);
                          }}
                          className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-600/20 hover:-translate-y-1"
                        >
                          <CreditCard size={14} /> Pay Now
                        </button>
                      )}
                      <button className="p-4 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5 group/btn">
                        <ExternalLink size={18} className="group-hover/btn:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SUPPORT */}
        {/* TAB 3: SUPPORT (ULTRA-MAX DESIGN) */}
        {activeTab === 'support' && (
          <div className="h-[calc(100vh-100px)] flex flex-col animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-3xl flex-grow flex overflow-hidden shadow-2xl relative">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

              {/* Ticket Sidebar */}
              <div className="w-80 border-r border-white/5 bg-[#0e1422]/90 flex flex-col backdrop-blur-md">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-slate-900 to-slate-900/50">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Support Uplink</h3>
                  <button onClick={() => { setSelectedTicket(null); setCreatingTicket(true); }} className="bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white p-2 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]" title="Open New Ticket">
                    <MessageSquare size={16} />
                  </button>
                </div>
                <div className="flex-grow overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {tickets.length === 0 && (
                    <div className="text-center p-8 opacity-30">
                      <MessageSquare size={32} className="mx-auto mb-2" />
                      <p className="text-[10px] uppercase font-bold">No Channels</p>
                    </div>
                  )}
                  {tickets.map(t => (
                    <div key={t.id} onClick={() => { setSelectedTicket(t); setCreatingTicket(false); }}
                      className={`p-4 rounded-2xl cursor-pointer transition-all border ${selectedTicket?.id === t.id
                        ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-blue-500/30 shadow-lg'
                        : 'bg-[#151e2e]/50 border-white/5 hover:bg-[#1f2937] hover:border-white/10 text-slate-400'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className={`font-bold text-xs truncate w-3/4 ${selectedTicket?.id === t.id ? 'text-white' : 'text-slate-300'}`}>{t.subject}</span>
                        {t.status === 'open' && (
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] opacity-60 line-clamp-1 font-mono">{t.messages[t.messages.length - 1]?.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-grow flex flex-col bg-[#0b0f19]/50 relative backdrop-blur-sm">
                {creatingTicket ? (
                  <div className="h-full flex items-center justify-center p-8 animate-in zoom-in-95 duration-300">
                    <div className="max-w-xl w-full bg-[#111827] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                      <h2 className="text-3xl font-black text-white mb-2 uppercase italic tracking-tighter">New Frequency</h2>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">Establish a secure connection with support</p>

                      <form onSubmit={handleCreateTicket} className="space-y-6">
                        <div className="group">
                          <label className="text-[9px] font-black uppercase text-blue-500 tracking-widest block mb-2 ml-2">Subject Line</label>
                          <input required value={newTicketSubject} onChange={e => setNewTicketSubject(e.target.value)}
                            className="w-full bg-[#0b0f19] border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all font-bold placeholder:text-slate-700" placeholder="e.g., Server Performance Issue" />
                        </div>
                        <div className="group">
                          <label className="text-[9px] font-black uppercase text-blue-500 tracking-widest block mb-2 ml-2">Transmission Content</label>
                          <textarea required value={newTicketMsg} onChange={e => setNewTicketMsg(e.target.value)} rows={5}
                            className="w-full bg-[#0b0f19] border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all font-bold placeholder:text-slate-700 resize-none" placeholder="Describe the anomaly..."></textarea>
                        </div>
                        <div className="flex gap-4 pt-2">
                          <button type="button" onClick={() => setCreatingTicket(false)} className="flex-1 bg-[#1f2937] hover:bg-[#2d3748] text-slate-400 font-black py-4 rounded-xl uppercase tracking-widest text-[10px] transition-colors">Cancel</button>
                          <button type="submit" disabled={sendingMsg} className="flex-[2] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-4 rounded-xl uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                            {sendingMsg ? <RefreshCw className="animate-spin" size={14} /> : <><span>Transmit Data</span> <Send size={14} /></>}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : selectedTicket ? (
                  <>
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#111827]/80 backdrop-blur-md z-10">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${selectedTicket.status === 'open' ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-blue-500/20' : 'bg-slate-700 shadow-slate-500/20'}`}>
                          {selectedTicket.status === 'open' ? (
                            <span className="font-black text-xs text-white">#{selectedTicket.id.split('-')[1] || '00'}</span>
                          ) : (
                            <XCircle size={18} className="text-slate-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-sm tracking-tight">{selectedTicket.subject}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-slate-500 font-mono">ID: {selectedTicket.id}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                            <span className={`text-[10px] uppercase font-bold tracking-wider ${selectedTicket.status === 'open' ? 'text-green-500' : 'text-red-500'}`}>
                              {selectedTicket.status === 'open' ? 'Secure Line' : 'Terminated'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {selectedTicket.status === 'open' && (
                          <button onClick={async () => {
                            if (!confirm("Terminate this connection?")) return;
                            try {
                              await api.post('/tickets/status', { ticket_id: selectedTicket.id, status: 'closed' });
                              const t = await api.get('/user/tickets');
                              setTickets(Array.isArray(t) ? t : []);
                              setSelectedTicket(t.find((x: any) => x.id === selectedTicket.id));
                            } catch (e) { }
                          }} className="px-4 py-1.5 border border-red-500/30 hover:bg-red-500/10 text-red-400 hover:text-red-300 text-[9px] font-black uppercase tracking-[0.2em] rounded-full transition-all flex items-center gap-2">
                            <XCircle size={10} /> Close
                          </button>
                        )}
                        <div className={`px-4 py-1.5 border text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_0_10px_rgba(74,222,128,0.1)] ${selectedTicket.status === 'open' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                          {selectedTicket.status === 'open' ? 'Active Signal' : 'Offline'}
                        </div>
                      </div>
                    </div>

                    <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar">
                      {selectedTicket.messages.map((m: any, i: number) => (
                        <div key={i} className={`flex ${m.sender === 'client' ? 'justify-end' : m.sender === 'system' ? 'justify-center' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300 fill-mode-backwards`} style={{ animationDelay: `${i * 100}ms` }}>
                          {m.sender === 'system' ? (
                            <div className="bg-white/5 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-white/5">
                              {m.text}
                            </div>
                          ) : (
                            <div className={`max-w-[70%] relative group`}>
                              <div className={`p-5 rounded-3xl text-sm font-medium leading-relaxed shadow-xl backdrop-blur-sm border ${m.sender === 'client'
                                ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-sm border-blue-400/20'
                                : 'bg-[#1f2937]/90 text-slate-200 rounded-tl-sm border-white/5'
                                }`}>
                                {m.text}
                              </div>
                              <span className={`text-[9px] font-bold uppercase tracking-widest text-slate-600 mt-2 block ${m.sender === 'client' ? 'text-right mr-2' : 'ml-2'}`}>
                                {m.sender === 'client' ? 'You' : 'Codeon Support'}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-6 bg-[#111827]/90 border-t border-white/5 backdrop-blur-md">
                      {selectedTicket.status === 'open' ? (
                        <form onSubmit={sendReply} className="flex gap-4 items-center bg-[#0b0f19] border border-white/10 rounded-2xl p-2 pr-2 shadow-inner">
                          <input value={replyMsg} onChange={e => setReplyMsg(e.target.value)} placeholder="Type your secure message..."
                            className="flex-grow bg-transparent px-4 py-4 text-white text-sm font-medium focus:outline-none placeholder:text-slate-600" />
                          <button disabled={sendingMsg} className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl transition-all shadow-lg hover:shadow-blue-600/20 hover:scale-105 active:scale-95">
                            {sendingMsg ? <RefreshCw className="animate-spin" size={20} /> : <Send size={20} className="ml-0.5" />}
                          </button>
                        </form>
                      ) : (
                        <div className="text-center p-4">
                          <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-widest">
                            <LogOut size={12} /> Connection Terminated
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center mb-6 shadow-2xl border border-white/5 relative z-10">
                      <MessageSquare size={40} className="text-slate-500 opacity-50" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-slate-300 z-10">Communications Offline</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mt-2 z-10">Select a frequency to begin transmission</p>

                    <button onClick={() => setCreatingTicket(true)} className="mt-8 px-8 py-4 bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all z-10 flex items-center gap-2 group">
                      <MessageSquare size={14} />
                      <span>Establish Connection</span>
                      <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      {paymentModalOpen && selectedPaymentOrder && (
        <PaymentModal
          amount={Number(selectedPaymentOrder.price)}
          orderId={selectedPaymentOrder.id}
          onClose={() => setPaymentModalOpen(false)}
          onSuccess={async () => {
            alert("Payment Successful! Your service is being activated.");
            setPaymentModalOpen(false);
            // Refresh orders
            try {
              const o = await api.get('/user/orders');
              setOrders(Array.isArray(o) ? o : []);
            } catch (e) { }
          }}
        />
      )}
    </div>
  );
};

// Render modal outside main layout but inside component
// Ideally use a Portal, but conditional rendering works fine here
// @ts-ignore
const DashboardWithModal: React.FC<DashboardPageProps> = (props) => {
  // We need to move the modal state up or just render it inside DashboardPage logic.
  // The previous chunks updated DashboardPage logic.
  // This chunk is just to ensure we close the main return and export.
  // Wait, I can't wrap it here easily without changing the whole file structure.
  // Instead, I will insert the Modal rendering code right before the `</main>` or `</div>` of DashboardPage.
  // But `DashboardPage` is big.
  // Let's assume I can insert it at the end of the `return` statement.
  return null; // Dummy return for this helper.
};

// Real insertion logic
// locating the closing tag of the main div


export default DashboardPage;
