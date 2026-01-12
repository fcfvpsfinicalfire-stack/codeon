import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import {
   ShieldAlert, RefreshCw, LogOut, CheckCircle, XCircle,
   Users, AlertTriangle, ExternalLink, X, MessageSquare, Send,
   BarChart3, Activity, Terminal, DollarSign, Server, Search,
   CreditCard, Clock, Lock,
   Globe, Radio, Shield
} from 'lucide-react';

const UPLOADS_URL = `http://${window.location.hostname}:5000/uploads`;

const AdminDashboard: React.FC = () => {
   const [activeTab, setActiveTab] = useState<'overview' | 'pending' | 'clients' | 'tickets' | 'logs'>('overview');
   const [orders, setOrders] = useState<any[]>([]);
   const [tickets, setTickets] = useState<any[]>([]);
   const [clients, setClients] = useState<any[]>([]);
   const [revenueData, setRevenueData] = useState<any>(null);
   const [logs, setLogs] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [actionLoading, setActionLoading] = useState<string | null>(null);
   const [viewingReceipt, setViewingReceipt] = useState<string | null>(null);
   const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

   const showToast = (message: string, type: 'success' | 'error' = 'success') => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
   };

   // Client Details View (Database Link)
   const [selectedClient, setSelectedClient] = useState<string | null>(null);
   const [clientDetails, setClientDetails] = useState<any>(null);
   const [fetchingDetails, setFetchingDetails] = useState(false);

   // Ticket Reply
   const [selectedTicket, setSelectedTicket] = useState<any>(null);
   const [replyMsg, setReplyMsg] = useState('');
   const [sendingMsg, setSendingMsg] = useState(false);

   const fetchData = async () => {
      // setLoading(true); // Don't block UI on poll
      try {
         const [o, t, c, r, l] = await Promise.all([
            api.get('/admin/orders'),
            api.get('/admin/tickets'),
            api.get('/admin/clients'),
            api.get('/admin/revenue'),
            api.get('/admin/logs')
         ]);
         setOrders(Array.isArray(o) ? o : []);
         setTickets(Array.isArray(t) ? t : []);
         setClients(Array.isArray(c) ? c : []);
         setRevenueData(r);
         setLogs(Array.isArray(l) ? l : []);
      } catch (e) {
         console.error(e);
         showToast("System Data Sync Failed. Retrying...", 'error');
      }
      setLoading(false);
   };

   useEffect(() => {
      fetchData();
      const interval = setInterval(fetchData, 10000);
      return () => clearInterval(interval);
   }, []);

   const handleClientClick = async (clientId: string) => {
      setSelectedClient(clientId);
      setFetchingDetails(true);
      setClientDetails(null);
      try {
         const details = await api.get(`/admin/client-details?id=${clientId}`);
         setClientDetails(details);
      } catch (e) {
         console.error(e);
      } finally {
         setFetchingDetails(false);
      }
   };

   const handleAction = async (orderId: string, action: 'approve' | 'reject', email: string) => {
      setActionLoading(orderId);
      try {
         if (action === 'approve') {
            await api.approveOrder(orderId);
            showToast(`Authorization granted for Order #${orderId}`, 'success');
         } else {
            const reason = prompt("Enter rejection reason:", "Invalid receipt");
            if (reason) {
               await api.rejectOrder(orderId, reason);
               showToast(`Order #${orderId} rejected. Client notified.`, 'error');
            } else {
               setActionLoading(null);
               return;
            }
         }
         await fetchData();
      } catch (e) {
         console.error(e);
         showToast("Command Execution Failed", 'error');
      } finally {
         setActionLoading(null);
      }
   };

   const sendTicketReply = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedTicket || !replyMsg) return;
      setSendingMsg(true);
      try {
         await api.post('/admin/tickets/reply', {
            ticketId: selectedTicket.id,
            message: replyMsg
         });
         setReplyMsg('');
         const t = await api.get('/admin/tickets');
         setTickets(Array.isArray(t) ? t : []);
         const updated = t.find((x: any) => x.id === selectedTicket.id);
         if (updated) setSelectedTicket(updated);
         showToast("Comm-link established. Message sent.", 'success');
      } catch (e) {
         showToast("Transmission failed. Check frequency.", 'error');
      } finally {
         setSendingMsg(false);
      }
   };

   const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'verifying');
   const openTickets = tickets.filter(t => t.status === 'open');

   if (loading) return (
      <div className="min-h-screen bg-[#05080f] flex items-center justify-center text-red-600">
         <div className="flex flex-col items-center gap-4">
            <ShieldAlert className="animate-pulse" size={48} />
            <p className="text-[10px] uppercase font-black tracking-[0.5em]">Establishing Root Uplink...</p>
         </div>
      </div>
   );

   return (
      <div className="bg-[#030508] min-h-screen text-white flex flex-col md:flex-row font-sans overflow-hidden font-outfit selection:bg-red-500/30">

         {/* BACKGROUND EFFECTS */}
         <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]"></div>
            <div className="absolute top-[20%] left-[20%] w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
         </div>

         {/* MISSION TOAST */}
         {toast && (
            <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-top-4 fade-in duration-300">
               <div className={`flex items-center gap-4 px-6 py-4 rounded-xl border backdrop-blur-xl shadow-2xl ${toast.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                  <div className={`p-2 rounded-full ${toast.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                     {toast.type === 'success' ? <CheckCircle size={16} /> : <ShieldAlert size={16} />}
                  </div>
                  <div>
                     <h4 className="text-xs font-black uppercase tracking-widest">{toast.type === 'success' ? 'Command Executed' : 'System Alert'}</h4>
                     <p className="text-[10px] font-mono opacity-80">{toast.message}</p>
                  </div>
               </div>
            </div>
         )}

         {/* SIDEBAR */}
         <aside className="w-full md:w-80 bg-[#0a0f1a]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col h-screen sticky top-0 z-50 relative shadow-2xl">
            <div className="p-8 pb-6">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow-lg shadow-red-600/30 border border-white/10 group cursor-pointer hover:scale-105 transition-transform">
                     <ShieldAlert size={24} className="text-white group-hover:rotate-12 transition-transform duration-500" />
                  </div>
                  <div>
                     <h1 className="text-lg font-black italic uppercase tracking-tighter text-white leading-none">ROOT<span className="text-red-600">.ACCESS</span></h1>
                     <div className="flex items-center gap-2 mt-1">
                        <span className="flex w-2 h-2 relative">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Online</p>
                     </div>
                  </div>
               </div>

               <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0f1219] border border-white/5 rounded-2xl p-5 mb-8 shadow-inner relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/10 blur-xl rounded-full group-hover:bg-red-600/20 transition-all duration-500"></div>
                  <div className="relative z-10">
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Secure Session</p>
                     <p className="text-xs font-mono text-slate-300">ID: <span className="text-white">8X-2991-ALPHA</span></p>
                     <div className="mt-3 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-red-600 w-full animate-pulse"></div>
                     </div>
                  </div>
               </div>
            </div>

            <nav className="flex-grow px-6 space-y-2 overflow-y-auto custom-scrollbar">
               {[
                  { id: 'overview', label: 'Command Center', icon: Activity },
                  { id: 'pending', label: 'Pending Clearances', icon: AlertTriangle, count: pendingOrders.length },
                  { id: 'clients', label: 'Client Database', icon: Users },
                  { id: 'tickets', label: 'Support Uplink', icon: MessageSquare, count: openTickets.length, alert: true },
                  { id: 'logs', label: 'System Logs', icon: Terminal }
               ].map(item => (
                  <button
                     key={item.id}
                     onClick={() => setActiveTab(item.id as any)}
                     className={`w-full flex items-center justify-between px-5 py-4 rounded-xl text-xs font-bold transition-all duration-300 group relative overflow-hidden ${activeTab === item.id
                        ? 'bg-gradient-to-r from-red-600/20 to-transparent text-white border-l-2 border-red-500'
                        : 'text-slate-500 hover:bg-white/5 hover:text-slate-200 border-l-2 border-transparent'}`}
                  >
                     <div className="flex items-center gap-4 relative z-10">
                        <item.icon size={18} className={`transition-colors ${activeTab === item.id ? 'text-red-500' : 'group-hover:text-white'}`} />
                        <span className="tracking-wide">{item.label}</span>
                     </div>
                     {item.count ? (
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black min-w-[24px] text-center shadow-lg ${item.alert ? 'bg-red-600 text-white shadow-red-600/20' : 'bg-white/10 text-white'
                           }`}>
                           {item.count}
                        </span>
                     ) : null}
                  </button>
               ))}
            </nav>

            <div className="p-6 border-t border-white/5 bg-[#080c14]/50">
               <button onClick={() => { api.logout(); window.location.href = '/'; }} className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-xl text-xs font-black text-red-500 bg-red-500/5 border border-red-500/10 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all uppercase tracking-widest group shadow-[0_0_20px_rgba(220,38,38,0.1)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                  <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                  <span>Terminate</span>
               </button>
            </div>
         </aside>

         {/* MAIN CONTENT */}
         <main className="flex-grow p-8 md:p-12 overflow-y-auto relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/10 via-[#05080f] to-[#05080f]">

            {/* OVERVIEW TAB (ULTRA-MAX) */}
            {activeTab === 'overview' && (
               <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
                  <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                     <div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2"><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Global</span> Overwatch</h2>
                        <p className="text-slate-400 text-sm font-bold tracking-wide">System-wide surveillance and control.</p>
                     </div>

                     {/* Global Broadcast Input */}
                     <div className="flex-1 max-w-md">
                        <div className="relative group/broadcast">
                           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-red-500">
                              <Radio size={16} className="animate-pulse" />
                           </div>
                           <input
                              type="text"
                              placeholder="INITIATE GLOBAL BROADCAST PROTOCOL..."
                              className="w-full bg-[#0a0f1a] border border-red-500/20 rounded-xl pl-12 pr-4 py-4 text-[10px] font-black text-red-500 placeholder:text-red-500/30 uppercase tracking-[0.1em] focus:outline-none focus:border-red-500 focus:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all"
                           />
                           <button className="absolute inset-y-2 right-2 px-4 bg-red-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-red-500 transition-colors shadow-lg">
                              Send
                           </button>
                        </div>
                     </div>
                  </header>

                  {/* Threat Map / Live Status */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                     <div className="lg:col-span-2 bg-[#0a0f1a]/80 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group h-80">
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center opacity-5 bg-no-repeat grayscale invert group-hover:scale-105 transition-transform duration-[20s]"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a] via-transparent to-[#0a0f1a]"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between">
                           <div className="flex justify-between items-start">
                              <div className="flex items-center gap-3">
                                 <div className="p-2 bg-red-500/10 rounded-lg text-red-500"><Globe size={20} /></div>
                                 <h3 className="text-lg font-black text-white uppercase tracking-tight">Live Threat Map</h3>
                              </div>
                              <div className="flex gap-2">
                                 <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                                 <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest">Attacks Blocked: 9,241</span>
                              </div>
                           </div>

                           <div className="space-y-2">
                              {['192.168.1.105 blocked (SQL Injection)', '10.0.0.42 blocked (DDoS Attempt)', '172.16.0.23 blocked (Brute Force)'].map((log, i) => (
                                 <div key={i} className="flex items-center gap-3 text-[10px] font-mono text-slate-500 border-l-2 border-red-500/20 pl-3">
                                    <span className="text-red-500/50">[{new Date().toLocaleTimeString()}]</span>
                                    {log}
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     {/* Server Health */}
                     <div className="bg-[#0a0f1a]/80 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center items-center text-center">
                        <div className="w-40 h-40 rounded-full border-4 border-white/5 flex items-center justify-center relative mb-6">
                           <div className="absolute inset-0 border-4 border-t-green-500 border-r-green-500/50 border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
                           <div className="text-center">
                              <p className="text-4xl font-black text-white">99.9%</p>
                              <p className="text-[9px] text-green-500 font-bold uppercase tracking-widest">Uptime</p>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full">
                           <div className="bg-white/5 rounded-xl p-3">
                              <p className="text-[9px] text-slate-500 font-bold uppercase">CPU Load</p>
                              <p className="text-white font-black">12%</p>
                           </div>
                           <div className="bg-white/5 rounded-xl p-3">
                              <p className="text-[9px] text-slate-500 font-bold uppercase">RAM Usage</p>
                              <p className="text-white font-black">8.4GB</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  {/* System Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {[
                        { label: 'Total Revenue', val: `$${(revenueData?.total_revenue || 0).toLocaleString()}`, icon: DollarSign, color: 'text-green-400', border: 'group-hover:border-green-500/50', bg: 'group-hover:shadow-green-500/20' },
                        { label: 'Active Clients', val: revenueData?.active_subs || 0, icon: Users, color: 'text-blue-400', border: 'group-hover:border-blue-500/50', bg: 'group-hover:shadow-blue-500/20' },
                        { label: 'Pending Users', val: pendingOrders.length, icon: AlertTriangle, color: 'text-amber-400', border: 'group-hover:border-amber-500/50', bg: 'group-hover:shadow-amber-500/20' },
                        { label: 'System Load', val: '12%', icon: Server, color: 'text-purple-400', border: 'group-hover:border-purple-500/50', bg: 'group-hover:shadow-purple-500/20' },
                     ].map((stat, i) => (
                        <div key={i} className={`bg-[#0a0f1a]/60 backdrop-blur-md border border-white/5 p-6 rounded-3xl relative overflow-hidden group transition-all duration-300 ${stat.border} hover:shadow-2xl ${stat.bg}`}>
                           <div className={`absolute top-0 right-0 p-4 opacity-10 ${stat.color} group-hover:scale-110 transition-transform duration-500`}><stat.icon size={64} /></div>
                           <div className="relative z-10">
                              <div className={`w-10 h-10 mb-4 rounded-xl bg-white/5 flex items-center justify-center ${stat.color} border border-white/5 group-hover:bg-white/10 transition-colors`}>
                                 <stat.icon size={20} />
                              </div>
                              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{stat.label}</p>
                              <p className="text-3xl font-black text-white tracking-tight">{stat.val}</p>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Charts & Logs */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     {/* Revenue Chart */}
                     <div className="lg:col-span-2 bg-[#0a0f1a]/80 border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl backdrop-blur-md">
                        <div className="flex items-center justify-between mb-8">
                           <h3 className="text-lg font-bold text-white flex items-center gap-3">
                              <span className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500"><BarChart3 size={16} /></span>
                              Revenue Analytics
                           </h3>
                           <select className="bg-black/20 border border-white/10 rounded-lg px-3 py-1 text-[10px] text-slate-400 font-bold uppercase outline-none">
                              <option>Last 12 Months</option>
                              <option>Last 30 Days</option>
                           </select>
                        </div>

                        <div className="h-64 flex items-end justify-between gap-3 px-4 py-8 bg-[#05080f]/50 rounded-2xl border border-white/5 relative">
                           {/* Grid Lines */}
                           <div className="absolute inset-0 w-full h-full pointer-events-none opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                           {revenueData?.chart_data?.map((d: any, i: number) => (
                              <div key={i} className="w-full flex flex-col justify-end group z-10 h-full relative" >
                                 <div className="w-full bg-gradient-to-t from-green-600/20 to-green-500/50 group-hover:from-green-500 group-hover:to-green-400 transition-all duration-300 rounded-t-md relative" style={{ height: `${(d.revenue / 20000) * 100}%` }}>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1f2937] text-white text-[9px] font-bold px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none transform translate-y-2 group-hover:translate-y-0 duration-200">
                                       ${d.revenue.toLocaleString()}
                                    </div>
                                 </div>
                                 <div className="mt-2 text-[9px] text-slate-600 font-bold uppercase text-center opacity-0 group-hover:opacity-100 transition-opacity">M{d.month}</div>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Recent Logs (Terminal Style) */}
                     <div className="bg-[#080c14] border border-white/10 rounded-[2.5rem] p-1 flex flex-col shadow-2xl relative overflow-hidden">
                        <div className="bg-[#1f2937] px-6 py-3 flex items-center justify-between rounded-t-[2.3rem]">
                           <div className="flex gap-2">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                           </div>
                           <div className="text-[9px] font-mono text-slate-400 flex items-center gap-2">
                              <Terminal size={10} /> system_log.txt
                           </div>
                        </div>
                        <div className="p-6 font-mono text-[10px] space-y-3 overflow-y-auto max-h-[300px] custom-scrollbar">
                           <div className="text-green-500 mb-4">$ tail -f /var/log/syslog</div>
                           {logs.slice(0, 8).map((log, i) => (
                              <div key={i} className="flex gap-3 group hover:bg-white/5 p-1 -mx-1 rounded transition-colors">
                                 <span className="text-slate-600 w-16 shrink-0 opacity-50">{log.time}</span>
                                 <span className={`w-8 uppercase font-bold ${log.level === 'err' ? 'text-red-500' : log.level === 'warn' ? 'text-amber-500' : 'text-blue-500'}`}>[{log.level}]</span>
                                 <span className="text-slate-300 group-hover:text-white transition-colors break-all">{log.message}</span>
                              </div>
                           ))}
                           <div className="animate-pulse text-green-500">_</div>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* PENDING ORDERS TAB (ULTRA-MAX) */}
            {activeTab === 'pending' && (
               <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                     <div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Pending Clearances</h2>
                        <div className="flex items-center gap-3 mt-2">
                           <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Awaiting Authorization: <span className="text-white">{pendingOrders.length}</span></p>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <button onClick={fetchData} className="px-5 py-3 bg-[#0a0f1a] border border-white/10 rounded-xl hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-500 transition-all group flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest shadow-lg">
                           <RefreshCw size={14} className={`group-hover:rotate-180 transition-transform duration-700 ${loading ? "animate-spin" : ""}`} /> Sync
                        </button>
                     </div>
                  </header>

                  <div className="grid gap-6">
                     {pendingOrders.length === 0 ? (
                        <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[3rem] text-slate-600 uppercase font-black tracking-widest text-xs relative overflow-hidden group bg-[#0a0f1a]/30">
                           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                           <div className="relative z-10">
                              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-500/10 group-hover:scale-110 transition-all duration-500">
                                 <CheckCircle size={32} className="text-slate-700 group-hover:text-green-500 transition-colors" />
                              </div>
                              <p className="text-sm text-slate-400 mb-1">Queue Empty</p>
                              <p className="text-[10px] text-slate-600">All clearances processed successfully.</p>
                           </div>
                        </div>
                     ) : pendingOrders.map(order => (
                        <div key={order.id} className="bg-[#0a0f1a]/80 backdrop-blur-md border border-red-500/20 p-8 rounded-[2.5rem] flex flex-col lg:flex-row items-center justify-between shadow-2xl relative overflow-hidden group transition-all hover:border-red-500/50">
                           <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 group-hover:w-2 transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)]"></div>
                           <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                           <div className="flex items-center space-x-8 w-full lg:w-auto mb-6 lg:mb-0 relative z-10">
                              {order.payment && order.payment.proof_url ? (
                                 <div className="relative group/img cursor-pointer overflow-hidden rounded-2xl w-32 h-32 border-2 border-white/10 group-hover/img:border-red-500/50 transition-colors shadow-lg" onClick={() => setViewingReceipt(`${UPLOADS_URL}/${order.payment.proof_url}`)}>
                                    <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay opacity-0 group-hover/img:opacity-100 transition-opacity z-10"></div>
                                    <img src={`${UPLOADS_URL}/${order.payment.proof_url}`} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700" alt="Proof" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity z-20 backdrop-blur-sm">
                                       <Search size={24} className="text-white drop-shadow-lg" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-[8px] text-center py-1 text-white font-mono uppercase tracking-widest">Exhibit A</div>
                                 </div>
                              ) : (
                                 <div className="w-32 h-32 bg-[#05080f] rounded-2xl flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-600 text-[9px] uppercase font-bold tracking-widest">
                                    <XCircle size={24} className="mb-2 opacity-50" />
                                    No Evidence
                                 </div>
                              )}
                              <div>
                                 <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-lg shadow-red-600/20">Pending Clearance</span>
                                    <p className="text-[10px] text-slate-500 font-mono">ID: <span className="text-slate-300">{order.order_code || order.id}</span></p>
                                 </div>

                                 <h3 className="text-4xl font-black italic text-white flex items-center gap-3 tracking-tighter">
                                    <span>{order.price_lkr || order.price}</span>
                                    <span className="text-xs font-bold text-slate-400 not-italic px-3 py-1 bg-white/5 rounded-lg border border-white/5 uppercase tracking-normal">{order.payment_method || order.payment?.method || 'N/A'}</span>
                                 </h3>
                                 <div className="mt-3 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">{order.user?.email.charAt(0).toUpperCase()}</div>
                                    <p className="text-xs font-bold text-slate-400">{order.user?.email || order.customer_email}</p>
                                 </div>
                              </div>
                           </div>

                           <div className="flex space-x-4 relative z-10">
                              <button
                                 onClick={() => handleAction(order.id, 'approve', order.customer_email)}
                                 disabled={actionLoading === order.id}
                                 className="group/btn bg-green-600 hover:bg-green-500 text-white pl-8 pr-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-green-600/20 active:scale-95 transition-all flex items-center space-x-3 overflow-hidden relative"
                              >
                                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full duration-1000 transform skew-x-12"></div>
                                 {actionLoading === order.id ? <RefreshCw className="animate-spin" size={16} /> : <div className="bg-white/20 p-1 rounded-full"><CheckCircle size={14} /></div>}
                                 <span>Authorize</span>
                              </button>
                              <button
                                 onClick={() => handleAction(order.id, 'reject', order.customer_email)}
                                 disabled={actionLoading === order.id}
                                 className="bg-[#05080f] hover:bg-red-600/10 text-red-500 border border-red-500/20 hover:border-red-500/50 px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center space-x-2 active:scale-95"
                              >
                                 <XCircle size={16} />
                                 <span>Deny</span>
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* CLIENT DATABASE (ULTRA-MAX) */}
            {activeTab === 'clients' && (
               <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                     <div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Global Nodes</h2>
                        <div className="flex items-center gap-3 mt-2">
                           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Entities: <span className="text-white">{clients.length}</span></p>
                        </div>
                     </div>
                     <div className="relative group/search max-w-sm w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within/search:text-red-500 transition-colors">
                           <Search size={16} />
                        </div>
                        <input
                           type="text"
                           placeholder="SEARCH DATABASE..."
                           className="w-full bg-[#0a0f1a] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-[10px] font-black text-white placeholder:text-slate-600 uppercase tracking-widest focus:outline-none focus:border-red-500/50 focus:shadow-[0_0_20px_rgba(220,38,38,0.1)] transition-all"
                        />
                     </div>
                  </header>

                  <div className="bg-[#0a0f1a]/80 backdrop-blur-md border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                     <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
                     <table className="w-full text-left">
                        <thead className="bg-black/20 text-slate-500 text-[9px] font-black uppercase tracking-widest">
                           <tr>
                              <th className="p-8">Client Identity</th>
                              <th className="p-8">Subscription</th>
                              <th className="p-8">Node Status</th>
                              <th className="p-8">Uplink Date</th>
                              <th className="p-8">Control</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                           {clients.map((client: any, i) => (
                              <tr key={i} className="hover:bg-red-600/5 transition-colors group cursor-pointer" onClick={() => handleClientClick(client.id)}>
                                 <td className="p-8">
                                    <div className="flex items-center gap-4">
                                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:from-red-600 group-hover:to-red-800 group-hover:text-white transition-all shadow-lg">
                                          {client.name?.charAt(0) || '?'}
                                       </div>
                                       <div>
                                          <p className="font-bold text-white text-sm group-hover:text-red-400 transition-colors">{client.name || 'Unknown Entity'}</p>
                                          <p className="text-slate-500 text-xs font-mono">{client.email}</p>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="p-8 font-mono text-slate-300">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/5">
                                       <Server size={12} className="text-slate-500" />
                                       <span className="text-[10px] uppercase font-bold text-white">{client.plan || 'Standard'}</span>
                                    </div>
                                 </td>
                                 <td className="p-8">
                                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${client.status === 'active' ? 'bg-green-500/10 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.1)] border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                       <span className={`w-1.5 h-1.5 rounded-full ${client.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                                       {client.status}
                                    </span>
                                 </td>
                                 <td className="p-8 font-mono text-slate-500 text-xs">{new Date(client.joined_at).toLocaleDateString()}</td>
                                 <td className="p-8">
                                    <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase text-slate-400 hover:text-white transition-colors flex items-center gap-2 group/btn">
                                       <span>Access Node</span>
                                       <ExternalLink size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}

            {/* LOGS (Redesigned in Overview, but kept here for specific tab if needed - Using same component style) */}
            {activeTab === 'logs' && (
               <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                  <header>
                     <h2 className="text-4xl font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">System Logs</h2>
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Audit Trail // Strict Retention</p>
                  </header>

                  <div className="bg-[#080c14] border border-white/10 rounded-[2.5rem] p-1 flex flex-col shadow-2xl relative overflow-hidden h-[600px]">
                     <div className="bg-[#1f2937] px-8 py-4 flex items-center justify-between rounded-t-[2.3rem]">
                        <div className="flex gap-2">
                           <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                           <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                           <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
                           <Lock size={12} /> /var/log/auth.log
                        </div>
                     </div>
                     <div className="p-8 font-mono text-xs text-slate-400 overflow-y-auto custom-scrollbar flex-grow">
                        {logs.map((log, i) => (
                           <div key={i} className="flex gap-6 border-b border-white/5 py-3 hover:bg-white/5 px-4 rounded transition-colors group">
                              <span className="text-slate-600 w-24 shrink-0 font-bold opacity-50">{log.time}</span>
                              <span className={`w-16 uppercase font-bold ${log.level === 'err' ? 'text-red-500' : log.level === 'warn' ? 'text-amber-500' : 'text-blue-500'}`}>{log.level}</span>
                              <span className="text-slate-300 group-hover:text-white transition-colors">{log.message}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {/* TICKETS (ULTRA-MAX) */}
            {activeTab === 'tickets' && (
               <div className="h-[calc(100vh-100px)] flex gap-8 animate-in fade-in slide-in-from-right-4">
                  {/* Ticket List */}
                  <div className="w-1/3 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                     {tickets.map(t => (
                        <div
                           key={t.id}
                           onClick={() => setSelectedTicket(t)}
                           className={`p-6 rounded-3xl border cursor-pointer transition-all group relative overflow-hidden ${selectedTicket?.id === t.id
                              ? 'bg-gradient-to-br from-red-600 to-red-800 text-white border-red-500 shadow-2xl shadow-red-900/40 scale-105'
                              : 'bg-[#0a0f1a]/60 backdrop-blur-md border-white/5 hover:border-white/20 hover:bg-[#0a0f1a]'}`}
                        >
                           {selectedTicket?.id === t.id && <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>}
                           <div className="flex justify-between mb-3 relative z-10">
                              <span className={`text-[9px] font-black uppercase tracking-widest ${selectedTicket?.id === t.id ? 'text-white/70' : 'text-slate-500'}`}>ID: {t.id}</span>
                              <div className="flex gap-2">
                                 <span className={`text-[9px] px-1.5 py-0.5 rounded border uppercase font-bold ${t.priority === 'high' ? 'border-red-500 text-red-500' :
                                    t.priority === 'medium' ? 'border-yellow-500 text-yellow-500' :
                                       'border-green-500 text-green-500'
                                    } ${selectedTicket?.id === t.id ? 'bg-white/20 border-transparent text-white' : ''} `}>
                                    {t.priority}
                                 </span>
                                 <span className={`text-[9px] font-mono ${selectedTicket?.id === t.id ? 'text-white/50' : 'text-slate-600'}`}>{new Date(t.updated_at || t.created_at).toLocaleDateString()}</span>
                              </div>
                           </div>
                           <h4 className={`font-bold text-sm mb-3 relative z-10 ${selectedTicket?.id === t.id ? 'text-white' : 'text-slate-200'}`}>{t.subject}</h4>
                           <div className="flex items-center justify-between relative z-10">
                              <p className={`text-[10px] uppercase font-bold tracking-wider ${selectedTicket?.id === t.id ? 'text-white/60' : 'text-slate-500'}`}>{t.category}</p>
                              <div className={`w-2 h-2 rounded-full ${t.status === 'open' ? 'bg-green-500' : t.status === 'closed' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Chat Area */}
                  <div className="w-2/3 bg-[#0a0f1a]/90 backdrop-blur-xl border border-white/5 rounded-[3rem] flex flex-col overflow-hidden relative shadow-2xl">
                     {selectedTicket ? (
                        <>
                           <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#05080f]/50">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                    <span className="font-white font-black text-xs text-white">C</span>
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white">{selectedTicket.user?.email || 'Unknown Client'}</span>
                                    <div className="flex items-center gap-2">
                                       <span className={`w-1.5 h-1.5 rounded-full ${selectedTicket.status === 'open' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                                       <span className={`text-[10px] uppercase font-bold tracking-wider ${selectedTicket.status === 'open' ? 'text-green-500' : 'text-red-500'}`}>
                                          {selectedTicket.status === 'open' ? 'Live Transmission' : 'Channel Closed'}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex items-center gap-4">
                                 {selectedTicket.status !== 'closed' && (
                                    <button
                                       onClick={async () => {
                                          if (!confirm("Close this ticket?")) return;
                                          try {
                                             await api.post('/admin/tickets/close', { ticketId: selectedTicket.id });
                                             fetchData(); // Refresh list
                                             setSelectedTicket(prev => ({ ...prev, status: 'closed' }));
                                             showToast("Protocol Closed. Ticket Archive Locked.", 'success');
                                          } catch (e) { showToast("Failed to terminate protocol.", 'error'); }
                                       }}
                                       className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                                    >
                                       <Shield size={12} /> Close Protocol
                                    </button>
                                 )}
                                 <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-[10px] font-black uppercase tracking-widest">
                                    Admin Mode
                                 </div>
                              </div>
                           </div>

                           <div className="flex-grow p-8 overflow-y-auto space-y-8 custom-scrollbar bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 to-[#05080f]">
                              {selectedTicket.messages && selectedTicket.messages.map((m: any, i: number) => (
                                 <div key={i} className={`flex ${m.sender === 'admin' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                                    <div className={`max-w-[70%] p-5 rounded-3xl text-sm leading-relaxed shadow-lg backdrop-blur-sm border ${m.sender === 'admin'
                                       ? 'bg-gradient-to-br from-red-600 to-red-800 text-white rounded-br-sm border-red-500/30'
                                       : 'bg-[#1f2937]/80 text-slate-200 rounded-bl-sm border-white/5'
                                       }`}>
                                       <div className={`text-[8px] font-black uppercase tracking-[0.2em] mb-3 pb-2 border-b border-white/10 ${m.sender === 'admin' ? 'text-red-200' : 'text-slate-500'}`}>
                                          {m.sender === 'admin' ? 'Root Command' : 'Client Transmission'}
                                       </div>
                                       {m.message || m.text}
                                       <div className="text-[9px] mt-2 opacity-50 text-right font-mono">{new Date(m.created_at || m.timestamp).toLocaleTimeString()}</div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                           <div className="p-6 bg-[#05080f] border-t border-white/5">
                              {selectedTicket.status === 'closed' ? (
                                 <div className="text-center text-slate-500 text-xs font-mono uppercase tracking-widest p-4 border border-dashed border-white/10 rounded-2xl">
                                    // Uplink Terminated //
                                 </div>
                              ) : (
                                 <form onSubmit={sendTicketReply} className="flex gap-4 items-center bg-[#0b0f19] border border-white/10 rounded-2xl p-2 pr-2 shadow-inner group focus-within:border-red-500/50 transition-colors">
                                    <input
                                       value={replyMsg} onChange={e => setReplyMsg(e.target.value)}
                                       placeholder="Type response command..."
                                       className="flex-grow bg-transparent px-6 py-4 text-white text-sm font-medium focus:outline-none placeholder:text-slate-600 font-mono"
                                    />
                                    <button disabled={sendingMsg} className="bg-red-600 hover:bg-red-500 text-white p-4 rounded-xl transition-all shadow-lg shadow-red-600/20 hover:scale-105 active:scale-95">
                                       {sendingMsg ? <RefreshCw className="animate-spin" size={20} /> : <Send size={20} />}
                                    </button>
                                 </form>
                              )}
                           </div>
                        </>
                     ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-700 relative overflow-hidden">
                           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                           <div className="w-24 h-24 rounded-full bg-[#111827] flex items-center justify-center mb-6 shadow-2xl border border-white/5">
                              <MessageSquare size={40} className="text-slate-600 opacity-50" />
                           </div>
                           <p className="text-sm font-black uppercase tracking-[0.3em] opacity-50">Awaiting Signal Selection</p>
                        </div>
                     )}
                  </div>
               </div>
            )}
            {/* SYSTEM LOGS (ULTRA-MAX) */}
            {activeTab === 'logs' && (
               <div className="h-full flex flex-col p-8 bg-[#030508] font-mono text-xs rounded-3xl border border-white/5 relative overflow-hidden shadow-2xl animate-in fade-in duration-500">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-full h-16 bg-gradient-to-b from-[#030508] to-transparent z-10"></div>

                  <div className="mb-6 flex items-center justify-between z-20 sticky top-0 bg-[#030508]/80 backdrop-blur-sm p-2 rounded-lg border border-white/5">
                     <div className="flex items-center gap-3">
                        <Terminal size={14} className="text-green-500" />
                        <span className="text-green-500 font-bold tracking-widest uppercase">root@system:~/logs#</span>
                        <span className="animate-pulse w-2 h-4 bg-green-500 block"></span>
                     </div>
                     <div className="flex gap-4 text-[10px] text-slate-500 font-bold uppercase">
                        <span>Mem: 14%</span>
                        <span>CPU: 3%</span>
                        <span>Net: 1.2Gbps</span>
                     </div>
                  </div>

                  <div className="space-y-1.5 flex-grow overflow-y-auto custom-scrollbar pb-10">
                     {logs.map((log: any, i: number) => (
                        <div key={i} className="flex gap-4 hover:bg-white/5 p-1 rounded transition-colors group">
                           <span className="text-slate-600 w-32 shrink-0">[{new Date(log.timestamp).toISOString()}]</span>
                           <span className={`uppercase font-bold tracking-wider w-16 shrink-0 ${log.level === 'error' ? 'text-red-500' :
                              log.level === 'warn' ? 'text-yellow-500' :
                                 'text-blue-500'
                              }`}>{log.level}</span>
                           <span className="text-slate-300 group-hover:text-white transition-colors">{log.message}</span>
                        </div>
                     ))}
                     {logs.length === 0 && (
                        <div className="text-slate-700 italic">No system activity recorded in current session buffer.</div>
                     )}
                     <div className="animate-pulse text-green-500 bg-green-500/10 inline-block px-1">_</div>
                  </div>
               </div>
            )}
         </main>

         {/* Receipt Modal */}
         {viewingReceipt && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl animate-in zoom-in-95 duration-300">
               <div className="max-w-4xl w-full bg-[#111827] rounded-[3rem] overflow-hidden border border-white/10 relative">
                  <button onClick={() => setViewingReceipt(null)} className="absolute top-6 right-6 z-10 bg-black/50 p-2 rounded-full hover:bg-red-600 transition-colors text-white"><X size={24} /></button>
                  <div className="p-20 flex flex-col items-center">
                     <h3 className="font-black italic uppercase text-slate-500 tracking-[0.5em] mb-8 text-sm">Evidence Exhibit A</h3>
                     <img src={viewingReceipt} className="max-h-[60vh] rounded-2xl shadow-2xl border border-white/10" alt="Proof" />
                     <div className="mt-8 flex gap-4">
                        <a href={viewingReceipt} target="_blank" rel="noreferrer" className="px-8 py-3 bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-colors flex items-center gap-2">
                           <ExternalLink size={14} /> Open Original
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* Client Details Slide-Over (Database Link) */}
         {selectedClient && (
            <div className="fixed inset-y-0 right-0 w-full md:w-[600px] z-[100] bg-[#0b0f19] border-l border-white/10 shadow-4xl p-0 flex flex-col animate-in slide-in-from-right duration-500">
               <div className="p-8 border-b border-white/5 flex items-start justify-between bg-[#0a0f1a]">
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Subject Identity</p>
                     <h2 className="text-3xl font-black text-white italic tracking-tighter">{clientDetails?.profile.name || 'Loading...'}</h2>
                     <p className="text-sm text-slate-400 mt-1">{clientDetails?.profile.email}</p>
                  </div>
                  <button onClick={() => setSelectedClient(null)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
               </div>

               <div className="flex-grow overflow-y-auto p-8 space-y-8">
                  {fetchingDetails ? (
                     <div className="flex items-center justify-center h-40 gap-4 text-slate-500">
                        <RefreshCw className="animate-spin" />
                        <span className="text-xs font-bold uppercase tracking-widest">Decrypting User Data...</span>
                     </div>
                  ) : clientDetails ? (
                     <>
                        {/* Profile Card */}
                        <div className="bg-[#111827] border border-white/5 p-6 rounded-3xl">
                           <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2"><Lock size={14} /> Security Profile</h3>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                 <p className="text-[10px] text-slate-600 uppercase font-bold">Client ID</p>
                                 <p className="font-mono text-sm text-white">{clientDetails.profile.id}</p>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] text-slate-600 uppercase font-bold">Joined</p>
                                 <p className="font-mono text-sm text-white">{new Date(clientDetails.profile.joinDate).toLocaleDateString()}</p>
                              </div>
                              <div className="col-span-2 mt-2 pt-4 border-t border-white/5">
                                 <button className="w-full py-3 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-600/20 hover:border-red-600 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all">
                                    Suspend Account Access
                                 </button>
                              </div>
                           </div>
                        </div>

                        {/* Orders */}
                        <div>
                           <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2"><CreditCard size={14} /> Purchase History</h3>
                           <div className="space-y-3">
                              {clientDetails.orders.map((o: any, i: number) => (
                                 <div key={i} className="bg-[#111827] border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                                    <div>
                                       <p className="font-bold text-white text-sm">{o.product}</p>
                                       <p className="text-[10px] text-slate-500 font-mono">{o.id}</p>
                                    </div>
                                    <div className="text-right">
                                       <p className="font-bold text-white mb-1">{o.price}</p>
                                       <span className="text-[9px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded uppercase font-bold">{o.status}</span>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>

                        {/* Logs */}
                        <div>
                           <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2"><Clock size={14} /> Activity Log</h3>
                           <div className="bg-[#111827] border border-white/5 p-4 rounded-3xl font-mono text-[10px] text-slate-400 space-y-2">
                              {clientDetails.logs.map((L: any, j: number) => (
                                 <div key={j} className="flex gap-4 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                    <span className="text-slate-600">{L.date}</span>
                                    <span className="text-white">{L.action}</span>
                                    <span className="ml-auto opacity-50">{L.ip}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </>
                  ) : (
                     <div className="text-center text-red-500 font-bold">Failed to load payload.</div>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};

export default AdminDashboard;
