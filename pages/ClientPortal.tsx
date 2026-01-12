import React, { useState, useEffect, useRef } from 'react';
import { api } from '../lib/api';
import {
    LayoutDashboard, Package, CreditCard, MessageSquare, Settings, LogOut,
    Server, Activity, Plus, X, Send, Cpu, Shield, AlertCircle, ChevronRight,
    Globe, Lock, Search, Bell, Book, Users, Wifi, HardDrive, Terminal, CheckCircle,
    ChevronLeft, User, Headphones, PartyPopper, ExternalLink, Command
} from 'lucide-react';
import { OrderCard } from '../components/OrderCard';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { PaymentModal } from '../components/PaymentModal';

interface ClientPortalProps {
    onLogout: () => void;
}

const translations = {
    en: {
        portal: "Command",
        dashboard: "Overview",
        services: "Nodes",
        billing: "Finance",
        tickets: "Uplink",
        settings: "Identity",
        network: "Network",
        security: "Security",
        knowledge: "Intel"
    },
    si: {
        portal: "පෝටලය",
        dashboard: "පුවරුව",
        services: "සේවා",
        billing: "බිල්පත්",
        tickets: "සහාය",
        settings: "සැකසුම්",
        network: "ජාලය",
        knowledge: "දැනුම",
        security: "ආරක්ෂාව"
    }
};

const ClientPortal: React.FC<ClientPortalProps> = ({ onLogout }) => {
    const [lang, setLang] = useState<'en' | 'si'>('en');
    const [user, setUser] = useState<any>(null);
    const [view, setView] = useState<'dashboard' | 'nodes' | 'billing' | 'tickets' | 'settings' | 'network' | 'security' | 'knowledge'>('dashboard');

    // Data
    const [orders, setOrders] = useState<any[]>([]);
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Ticket State
    const [showNewTicket, setShowNewTicket] = useState(false);
    const [newTicketData, setNewTicketData] = useState({ subject: '', message: '' });
    const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
    const [replyMessage, setReplyMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Settings State
    const [settingsData, setSettingsData] = useState({ name: '', currentPassword: '', newPassword: '' });
    const [loginHistory, setLoginHistory] = useState<any[]>([]);

    // Live Console State
    const [consoleLogs, setConsoleLogs] = useState<string[]>([
        "> Initializing secure uplink...",
        "> Establishing handshake with host node...",
        "> Verifying user credentials...",
        "> Access granted. Welcome back, Commander.",
    ]);

    // Welcome Banner State
    const [showWelcome, setShowWelcome] = useState(false);

    // Toast State
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    useEffect(() => {
        // Welcome Logic
        const params = new URLSearchParams(window.location.search);
        const isWelcome = params.get('welcome') === 'true';
        const hasSeenWelcome = localStorage.getItem('codeon_welcome_seen');

        if (isWelcome && !hasSeenWelcome) {
            setShowWelcome(true);
            localStorage.setItem('codeon_welcome_seen', 'true');
            window.history.replaceState({}, '', window.location.pathname);
        }
    }, []);

    useEffect(() => {
        // Simulated Live Logs
        const interval = setInterval(() => {
            const msgs = [
                "> Ping check: 24ms to nearest relay.",
                "> System health: Optimal.",
                "> Encrypted packet received.",
                "> Background sync complete.",
                "> Node heartbeat detected."
            ];
            const msg = msgs[Math.floor(Math.random() * msgs.length)];
            setConsoleLogs(prev => [...prev.slice(-4), msg]);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const init = async () => {
            try {
                const u = api.getCurrentUser();
                if (!u) {
                    window.location.href = '/login';
                    return;
                }
                setUser(u);
                setSettingsData(prev => ({ ...prev, name: u.name || '' }));

                const [o, t, n, h] = await Promise.all([
                    api.getMyOrders(),
                    api.getMyTickets(),
                    api.getNotifications(),
                    api.getLoginHistory()
                ]);

                setOrders(Array.isArray(o) ? o : []);
                setTickets(Array.isArray(t) ? t : []);
                setNotifications(n.notifications || []);
                setUnreadCount(n.unreadCount || 0);
                setLoginHistory(Array.isArray(h) ? h : []);
            } catch (e) {
                console.error("Portal Sync Error", e);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    // Payment Modal State
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [payOrder, setPayOrder] = useState<any>(null);

    const handleUploadClick = (orderId: string | number) => {
        const order = orders.find(o => o.id === orderId);
        if (order) {
            setPayOrder(order);
            setShowPaymentModal(true);
        }
    };

    const handlePaymentSuccess = () => {
        setShowPaymentModal(false);
        setPayOrder(null);
        showToast("Payment Submitted! Verification in progress.", 'success');
        api.getMyOrders().then(o => setOrders(Array.isArray(o) ? o : []));
    };

    const handleToggleRenew = async (orderId: number) => {
        try {
            // Optimistic update
            const order = orders.find(o => o.id === orderId);
            if (!order) return;
            const newStatus = !order.auto_renew;
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, auto_renew: newStatus } : o));

            const res = await api.toggleAutoRenew(orderId);
            // Reconcile if needed, but usually redundant if success
        } catch (e) {
            showToast("Failed to toggle auto-renew", 'error');
            // Revert on error
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, auto_renew: !o.auto_renew } : o));
        }
    };

    const handleCreateTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.createTicket(newTicketData.subject, newTicketData.message);
            const t = await api.getMyTickets();
            setTickets(t);
            setShowNewTicket(false);
            setNewTicketData({ subject: '', message: '' });
            showToast("Uplink Established (Ticket Created)", 'success');
        } catch (error) {
            showToast("Failed to create ticket.", 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleReplyTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyMessage.trim() || !selectedTicket) return;

        try {
            const res = await api.replyTicket(selectedTicket.id, replyMessage);
            const updatedMessages = typeof res.messages === 'string' ? JSON.parse(res.messages) : res.messages;

            setSelectedTicket({ ...selectedTicket, messages: updatedMessages });
            setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, messages: updatedMessages, status: res.status } : t));
            setReplyMessage('');
        } catch (error) {
            console.error(error);
            showToast("Transmission Failed", 'error');
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.updateProfile(settingsData);
            if (res.success) {
                setUser(res.user);
                localStorage.setItem('codeon_user', JSON.stringify(res.user));
                showToast("Identity Configuration Saved", 'success');
                setSettingsData({ ...settingsData, currentPassword: '', newPassword: '' });
            }
        } catch (error) {
            showToast("Auth Failure. Check password.", 'error');
        } finally {
            setLoading(false);
        }
    };

    // Calculate Dashboard Stats
    const activeNodes = orders.filter(o => o.status === 'active').length;
    const openTickets = tickets.filter(t => t.status === 'open').length;

    // Scroll to bottom on chat update
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedTicket]);

    if (loading && !user) return (
        <div className="min-h-screen bg-[#030508] flex items-center justify-center text-blue-500 font-mono tracking-widest text-xs">
            <Activity className="animate-spin mr-2" /> SYSTEM INITIALIZATION SEQUENCE...
        </div>
    );

    return (
        <div className="flex h-screen bg-[#030508] text-white font-sans selection:bg-blue-500/30 overflow-hidden font-outfit">
            {showPaymentModal && payOrder && (
                <PaymentModal
                    amount={payOrder.price_lkr || payOrder.price}
                    orderId={payOrder.id}
                    onClose={() => setShowPaymentModal(false)}
                    onSuccess={handlePaymentSuccess}
                />
            )}

            {/* TOAST NOTIFICATION */}
            {toast && (
                <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-top-4 fade-in duration-300">
                    <div className={`flex items-center gap-4 px-6 py-4 rounded-xl border backdrop-blur-xl shadow-2xl ${toast.type === 'success' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                        <div className={`p-2 rounded-full ${toast.type === 'success' ? 'bg-blue-500/20' : 'bg-red-500/20'}`}>
                            {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                        </div>
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest">{toast.type === 'success' ? 'System Success' : 'System Alert'}</h4>
                            <p className="text-[10px] font-mono opacity-80">{toast.message}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* SIDEBAR: GLASSMOPHISM */}
            <aside className="w-72 bg-[#05080f]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col z-50 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <div className="p-8 border-b border-white/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <Command size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black uppercase italic tracking-tighter text-white leading-none">Codeon <span className="text-blue-500">CMD</span></h1>
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Console V2.1</p>
                        </div>
                    </div>
                    {/* User Card */}
                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-black">
                            {user?.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[9px] font-mono text-green-500">LINK ACTIVE</span>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest px-4 mb-2">Modules</p>
                    <SidebarItem icon={LayoutDashboard} label={translations[lang].dashboard} active={view === 'dashboard'} onClick={() => { setView('dashboard'); setSelectedTicket(null); }} />
                    <SidebarItem icon={Package} label={translations[lang].services} active={view === 'nodes'} onClick={() => { setView('nodes'); setSelectedTicket(null); }} badge={activeNodes > 0 ? activeNodes : undefined} />
                    <SidebarItem icon={CreditCard} label={translations[lang].billing} active={view === 'billing'} onClick={() => { setView('billing'); setSelectedTicket(null); }} />

                    <div className="my-6 border-t border-white/5"></div>

                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest px-4 mb-2">Systems</p>
                    <SidebarItem icon={MessageSquare} label={translations[lang].tickets} badge={openTickets > 0 ? openTickets : undefined} active={view === 'tickets'} onClick={() => { setView('tickets'); setSelectedTicket(null); }} />
                    <SidebarItem icon={Wifi} label={translations[lang].network} active={view === 'network'} onClick={() => { setView('network'); setSelectedTicket(null); }} />
                    <SidebarItem icon={Shield} label={translations[lang].security} active={view === 'security'} onClick={() => { setView('security'); setSelectedTicket(null); }} />

                    <div className="mt-8 mx-4">
                        <a href="https://control.codeon.codes" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 hover:border-blue-500/50 transition-all group">
                            <div className="flex items-center gap-3">
                                <Terminal size={18} className="text-blue-400" />
                                <div>
                                    <div className="text-xs font-bold text-white uppercase tracking-wider">Game Panel</div>
                                    <div className="text-[9px] text-blue-400">Manage Instances</div>
                                </div>
                            </div>
                            <ExternalLink size={12} className="text-blue-500 opacity-50 group-hover:opacity-100" />
                        </a>
                    </div>
                </nav>

                <div className="p-6 border-t border-white/5">
                    <SidebarItem icon={Settings} label={translations[lang].settings} active={view === 'settings'} onClick={() => { setView('settings'); setSelectedTicket(null); }} />
                    <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors uppercase tracking-widest mt-2 hover:pl-6">
                        <LogOut size={16} /> Disconnect
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 overflow-y-auto relative bg-[#030508]">
                {/* Background Grid & Ambience */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none sticky top-0"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none fixed"></div>

                <div className="p-8 md:p-12 max-w-7xl mx-auto relative z-10 min-h-screen pb-32">

                    {/* PAGE HEADER */}
                    <header className="flex items-center justify-between mb-12">
                        <div>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-blue-500 mb-2">
                                <Activity size={12} className="animate-pulse" /> SYSTEM: ONLINE
                                <span className="text-slate-600">|</span>
                                LATENCY: 24ms
                            </div>
                            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">
                                {view === 'dashboard' ? 'Mission Control' :
                                    view === 'nodes' ? 'Fleet Management' :
                                        view === 'billing' ? 'Financial ' :
                                            view === 'tickets' ? 'Comms Uplink' :
                                                'Configuration'}
                            </h2>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Notifications */}
                            <div className="relative group z-50">
                                <button className="w-12 h-12 bg-[#0b0f19] border border-white/10 rounded-xl flex items-center justify-center hover:border-blue-500/50 transition-colors">
                                    <Bell size={20} className="text-slate-400 group-hover:text-white" />
                                    {unreadCount > 0 && <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
                                </button>

                                {/* Helper Dropdown Logic same as before... */}
                            </div>
                        </div>
                    </header>

                    {/* CONTENT VIEWS */}
                    {view === 'dashboard' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Stats Row */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <StatCard icon={Server} label="Active Nodes" value={String(activeNodes)} sub="Operational" color="blue" />
                                <StatCard icon={Activity} label="Uptime" value="99.9%" sub="System Nominal" color="green" />
                                <StatCard icon={MessageSquare} label="Support" value={String(openTickets)} sub="Active Tickets" color="purple" />
                                <StatCard icon={CreditCard} label="Balance" value="LKR 0.00" sub="Next Bill: 01/05" color="cyan" />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Recent Deployments */}
                                <div className="lg:col-span-2 bg-[#0b0f19]/80 backdrop-blur-sm border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-lg font-black uppercase italic tracking-wider text-white">Active Deployments</h3>
                                        <Button onClick={() => setView('nodes')} className="h-8 text-[10px] px-4">View All</Button>
                                    </div>
                                    <div className="space-y-4">
                                        {orders.slice(0, 3).map(order => (
                                            <div key={order.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors group cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                                                        <Server size={18} />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white text-sm">{order.plan_name}</div>
                                                        <div className="text-[10px] text-slate-500 font-mono tracking-wider">ID: {order.order_code}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                                                        {order.status}
                                                    </div>
                                                    <ChevronRight size={14} className="text-slate-600 group-hover:text-white" />
                                                </div>
                                            </div>
                                        ))}
                                        {orders.length === 0 && (
                                            <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
                                                <Package size={32} className="mx-auto text-slate-600 mb-3 opacity-50" />
                                                <p className="text-slate-500 text-xs">No active deployments found.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Live Console Logs */}
                                <div className="bg-black border border-white/10 rounded-3xl p-6 font-mono text-xs relative overflow-hidden flex flex-col">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse"></div>
                                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                                        <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">System Log</span>
                                        <div className="flex gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-2 opacity-80 overflow-hidden">
                                        {consoleLogs.map((log, i) => (
                                            <div key={i} className="text-blue-400 animate-in slide-in-from-left-2 fade-in duration-300">
                                                <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                                                {log}
                                            </div>
                                        ))}
                                        <div className="animate-pulse text-blue-500 font-bold">_</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {view === 'nodes' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {orders.map(order => (
                                    <OrderCard key={order.id} order={order} onUploadClick={handleUploadClick} onToggleRenew={handleToggleRenew} />
                                ))}
                            </div>
                            {orders.length === 0 && (
                                <div className="text-center py-20 bg-white/5 border border-white/5 rounded-3xl">
                                    <h3 className="text-xl font-bold text-white mb-2">No Services Found</h3>
                                    <Button onClick={() => window.location.href = '/'} className="mt-4">Deploy New Instance</Button>
                                </div>
                            )}
                        </div>
                    )}

                    {view === 'tickets' && (
                        <div className="h-[600px] flex bg-[#0b0f19] border border-white/5 rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-2xl">
                            {/* User List */}
                            <div className={`${selectedTicket ? 'hidden md:flex' : 'flex'} w-full md:w-80 flex-col border-r border-white/5 bg-[#05080f]`}>
                                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#05080f]">
                                    <h3 className="font-bold text-white text-xs uppercase tracking-widest">Inboxes</h3>
                                    <button onClick={() => setShowNewTicket(true)} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"><Plus size={14} /></button>
                                </div>

                                {showNewTicket && (
                                    <div className="p-4 bg-blue-900/10 border-b border-blue-500/20">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-bold text-blue-400">New Transmisson</span>
                                            <button onClick={() => setShowNewTicket(false)}><X size={12} className="text-blue-400" /></button>
                                        </div>
                                        <form onSubmit={handleCreateTicket} className="space-y-3">
                                            <input className="w-full bg-black/40 border border-blue-500/30 rounded px-2 py-1.5 text-xs text-white" placeholder="Subject" value={newTicketData.subject} onChange={e => setNewTicketData({ ...newTicketData, subject: e.target.value })} />
                                            <textarea className="w-full bg-black/40 border border-blue-500/30 rounded px-2 py-1.5 text-xs text-white" placeholder="Message" value={newTicketData.message} onChange={e => setNewTicketData({ ...newTicketData, message: e.target.value })} rows={3} />
                                            <Button type="submit" loading={loading} className="w-full py-1.5 text-[10px]">Send</Button>
                                        </form>
                                    </div>
                                )}

                                <div className="flex-1 overflow-y-auto">
                                    {tickets.map(t => (
                                        <div key={t.id} onClick={() => setSelectedTicket(t)} className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${selectedTicket?.id === t.id ? 'bg-blue-900/10 border-l-2 border-l-blue-500' : 'border-l-2 border-l-transparent'}`}>
                                            <div className="flex justify-between mb-1">
                                                <span className={`text-xs font-bold truncate pr-2 ${selectedTicket?.id === t.id ? 'text-white' : 'text-slate-400'}`}>{t.subject}</span>
                                                <span className={`text-[9px] font-black uppercase ${t.status === 'open' ? 'text-green-500' : 'text-slate-600'}`}>{t.status}</span>
                                            </div>
                                            <div className="text-[10px] text-slate-500 truncate font-mono">ID: #{t.id}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Chat Area */}
                            {selectedTicket ? (
                                <div className="flex-1 flex flex-col bg-[#0b0f19] relative">
                                    <header className="p-4 border-b border-white/5 flex justify-between items-center bg-[#0b0f19]/95 backdrop-blur z-10">
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => setSelectedTicket(null)} className="md:hidden text-slate-400"><ChevronLeft size={18} /></button>
                                            <div>
                                                <h3 className="text-sm font-bold text-white mb-0.5">{selectedTicket.subject}</h3>
                                                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Encrypted Connection
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-bold uppercase text-slate-400 border border-white/5">
                                            {selectedTicket.priority || 'Normal'} Priority
                                        </div>
                                    </header>

                                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                        {selectedTicket.messages?.map((msg: any, i: number) => {
                                            const isUser = msg.sender === 'client' || msg.sender === 'user';
                                            return (
                                                <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[80%] p-4 rounded-xl text-sm font-medium leading-relaxed shadow-lg ${isUser ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-[#1a1f2e] text-slate-300 border border-white/5 rounded-tl-none'}`}>
                                                        {msg.message}
                                                        <div className={`text-[9px] mt-2 opacity-50 font-mono text-right uppercase tracking-wider`}>{new Date(msg.created_at || Date.now()).toLocaleTimeString()}</div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <div ref={chatEndRef} />
                                    </div>

                                    <form onSubmit={handleReplyTicket} className="p-4 border-t border-white/5 bg-[#0b0f19]">
                                        <div className="relative">
                                            <input value={replyMessage} onChange={e => setReplyMessage(e.target.value)} placeholder="Enter secure message..." className="w-full bg-[#05080f] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors" />
                                            <button type="submit" disabled={!replyMessage.trim()} className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                                <Send size={16} />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div className="hidden md:flex flex-1 items-center justify-center flex-col text-slate-600 bg-[#0b0f19]">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                        <Wifi size={24} className="opacity-50 animate-pulse" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-50">Secure Uplink Established</p>
                                    <p className="text-[10px] opacity-30 mt-1">Select a frequency to begin transmission.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

// HELPER COMPONENTS
const SidebarItem = ({ icon: Icon, label, active, onClick, badge }: any) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all mb-1 group relative overflow-hidden ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
    >
        {active && <div className="absolute left-0 top-0 h-full w-1 bg-white/30"></div>}
        <div className="flex items-center gap-3 relative z-10">
            <Icon size={18} className={`${active ? 'text-white' : 'text-slate-500 group-hover:text-blue-400 transition-colors'}`} />
            {label}
        </div>
        {badge && <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-md min-w-[20px] text-center font-black relative z-10 shadow-lg shadow-red-500/40">{badge}</span>}
    </button>
);

const StatCard = ({ icon: Icon, label, value, sub, color }: any) => {
    const colors: any = {
        blue: "text-blue-500 border-blue-500/20 bg-blue-500/10",
        green: "text-green-500 border-green-500/20 bg-green-500/10",
        cyan: "text-cyan-500 border-cyan-500/20 bg-cyan-500/10",
        purple: "text-purple-500 border-purple-500/20 bg-purple-500/10"
    };

    return (
        <div className="bg-[#0b0f19] border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${colors[color]} transition-all group-hover:scale-110`}>
                <Icon size={24} />
            </div>
            <h3 className="text-3xl font-black text-white italic tracking-tighter mb-1">{value}</h3>
            <div className="flex justify-between items-end">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</p>
                <p className="text-[10px] text-slate-600 font-mono bg-white/5 px-2 py-0.5 rounded">{sub}</p>
            </div>
        </div>
    );
};

export default ClientPortal;
