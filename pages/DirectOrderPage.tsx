import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { RefreshCw, Shield, Zap, Server, CreditCard, CheckCircle2, ChevronRight, Activity, ArrowRight, User, Mail, Lock, Cpu, HardDrive, Disc, Code, Terminal } from 'lucide-react';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';

interface DirectOrderPageProps {
    onBack: () => void;
    initialGame?: string;
    initialPlanId?: string;
}

const DirectOrderPage: React.FC<DirectOrderPageProps> = ({ onBack, initialGame, initialPlanId }) => {
    const [loading, setLoading] = useState(false);

    // Selection State
    const [selectedGame, setSelectedGame] = useState(initialGame || 'minecraft');
    const [selectedPlan, setSelectedPlan] = useState(initialPlanId || '');
    const [price, setPrice] = useState(0);

    // User State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<any>(null);

    // Meta State
    const [address, setAddress] = useState('');
    const [tel, setTel] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
    const [idempotencyKey] = useState(() => Math.random().toString(36).substring(2) + Date.now().toString(36));

    // Stepper State
    const [step, setStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    useEffect(() => {
        // Pre-fill price
        if (initialGame && initialPlanId && PLANS[initialGame]) {
            const p = PLANS[initialGame].find((x: any) => x.id === initialPlanId);
            if (p) setPrice(p.price);
        }

        const u = api.getCurrentUser();
        if (u) {
            setUser(u);
            setName(u.name);
            setEmail(u.email);
            setStep(2);
            if (initialGame) setStep(2);
            if (initialPlanId) setStep(3);
        } else {
            if (initialGame) setStep(2);
            if (initialPlanId) setStep(3);
        }
    }, []);

    const moveToStep = (s: number) => {
        if (s > step) setCompletedSteps([...completedSteps, step]);
        setStep(s);
    }

    // PRICING MATRIX
    const PLANS: any = {
        'minecraft': [
            { id: '1gb', name: 'Coal Tier - 1GB', price: 300, cpu: '0.5 Core', category: 'Starter' },
            { id: '2gb', name: 'Iron Tier - 2GB', price: 600, cpu: '1 Core', category: 'Starter' },
            { id: '4gb', name: 'Gold Tier - 4GB', price: 1000, cpu: '1 Core', popular: true, category: 'Standard' },
            { id: '6gb', name: 'Redstone Tier - 6GB', price: 1600, cpu: '1.5 Cores', category: 'Standard' },
            { id: '8gb', name: 'Lapis Tier - 8GB', price: 1800, cpu: '2 Cores', category: 'Performance' },
            { id: '10gb', name: 'Quartz Tier - 10GB', price: 2400, cpu: '2.5 Cores', category: 'Performance' },
            { id: '12gb', name: 'Diamond Tier - 12GB', price: 2800, cpu: '3 Cores', category: 'Performance' },
            { id: '16gb', name: 'Emerald Tier - 16GB', price: 3200, cpu: '4 Cores', category: 'Extreme' },
            { id: '20gb', name: 'Amethyst Tier - 20GB', price: 4200, cpu: '5 Cores', category: 'Extreme' },
            { id: '24gb', name: 'Beacon Tier - 24GB', price: 6600, cpu: '6 Cores', category: 'Extreme' },
            { id: '32gb', name: 'Nether Star - 32GB', price: 7800, cpu: '8 Cores', category: 'Extreme' },
            { id: '64gb', name: 'End Crystal - 64GB', price: 12000, cpu: '10 Cores', category: 'Ultimate' },
        ],
        'ark': [
            { id: 'survivor', name: 'Survivor - 16GB', price: 3500, cpu: 'Ryzen 9 5950X', category: 'Standard' },
            { id: 'tribe', name: 'Tribe Leader - 32GB', price: 6500, cpu: 'Ryzen 9 7950X3D', popular: true, category: 'Extreme' },
        ],
        'fivem': [
            { id: 'city', name: 'City Starter - 8GB', price: 2800, cpu: 'Intel i9 14900K', category: 'Standard' },
            { id: 'rp', name: 'RP King - 16GB', price: 5200, cpu: 'Intel i9 14900K', popular: true, category: 'Extreme' },
        ],
        'rust': [
            { id: 'naked', name: 'Naked Spawn - 10GB', price: 3000, cpu: 'Ryzen 9 7950X', category: 'Standard' },
            { id: 'clan', name: 'Clan Base - 24GB', price: 6000, cpu: 'Ryzen 9 7950X', popular: true, category: 'Extreme' },
        ]
    };

    const handleGameSelect = (game: string) => {
        setSelectedGame(game);
        setSelectedPlan('');
        setPrice(0);
        moveToStep(2);
    };

    const handlePlanSelect = (planId: string) => {
        setSelectedPlan(planId);
        const plan = PLANS[selectedGame].find((p: any) => p.id === planId);
        if (plan) setPrice(plan.price);
        moveToStep(3);
    };

    // Loading State
    const [loadingStep, setLoadingStep] = useState<string>('');

    // Auth State
    const [authMode, setAuthMode] = useState<'register' | 'login'>('register');

    // Smart Auth
    const [accountStatus, setAccountStatus] = useState<'unknown' | 'exists' | 'new'>('unknown');
    const [emailCheckLoading, setEmailCheckLoading] = useState(false);

    const handleEmailBlur = async () => {
        if (!email || accountStatus !== 'unknown') return;
        setEmailCheckLoading(true);
        try {
            const res = await api.checkEmail(email);
            setAccountStatus(res.exists ? 'exists' : 'new');
            if (authMode === 'register' && res.exists) setAuthMode('login');
        } catch (e) {
            console.error(e);
        } finally {
            setEmailCheckLoading(false);
        }
    };

    const handleAuthBeforeContinue = async () => {
        if (!email) return alert("Please enter your email address.");

        setLoading(true);
        try {
            let res: any;
            if (authMode === 'login') {
                if (!password) return alert("Password is required.");
                res = await api.login(email, password);
            } else {
                if (!name) return alert("Name is required.");
                res = await api.register(name, email, password);
            }

            if (res.token) {
                api.setAuthToken(res.token);
                setUser(res.user);
                setStep(4);
            }
        } catch (e: any) {
            console.error("Auth Error Details:", e);
            alert(e.error || e.message || "Authentication failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleOrder = async () => {
        if (!selectedPlan) return alert("Please select a plan.");
        if (!email) return alert("Email is required.");
        if (authMode === 'register' && !name && !user) return alert("Name is required.");
        if (!user && authMode === 'login' && !password) return alert("Password is required.");

        setLoading(true);
        setLoadingStep("Preparing Order...");

        try {
            const gameLabel = selectedGame.charAt(0).toUpperCase() + selectedGame.slice(1);
            const planObj = PLANS[selectedGame].find((p: any) => p.id === selectedPlan);
            const planName = `${gameLabel} - ${planObj.name}`;
            const ramMatch = planObj.name.match(/(\d+)GB/);
            const ram = ramMatch ? ramMatch[1] : '4';

            if (!user) {
                await new Promise(r => setTimeout(r, 800));
                setLoadingStep(authMode === 'register' ? "Setting up Account..." : "Verifying Credentials...");
            }

            await new Promise(r => setTimeout(r, 800));
            setLoadingStep("Allocating Resources...");

            const response = await api.createOrder({
                plan_name: planName,
                price: price,
                serviceType: selectedGame,
                ram: ram,
                address: address || 'N/A',
                tel: tel || 'N/A',
                payment_method: paymentMethod,
                email,
                clientName: name,
                password,
                idempotencyKey
            });

            if (response.error && response.requiresLogin) {
                setLoading(false);
                alert("Account exists! Please sign in.");
                setAuthMode('login');
                setStep(3);
                return;
            }

            setLoadingStep("Finalizing...");
            await new Promise(r => setTimeout(r, 800));

            if (response.token) {
                api.setAuthToken(response.token);
                window.location.href = `/ClientPortal?welcome=true&pay_order=${response.orderId}`;
            } else {
                if (response.existing) {
                    window.location.href = '/ClientPortal';
                } else {
                    window.location.href = '/login';
                }
            }

        } catch (error: any) {
            console.error(error);
            setLoading(false);
            setLoadingStep('');
            alert(`Order Failed: ${error.error || error.message || "Unknown System Error"}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#030508] text-white font-sans selection:bg-blue-500/30 overflow-hidden relative">
            {/* AMBIENT BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 flex flex-col xl:flex-row gap-16 items-start">

                {/* BACK BUTTON */}
                <div className="absolute top-8 left-6 md:left-0 md:-ml-20">
                    <button onClick={onBack} className="p-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                        <ArrowRight size={20} className="rotate-180 text-slate-400 group-hover:text-white" />
                    </button>
                </div>

                {/* LEFT: MAIN CONFIGURATOR */}
                <div className="w-full xl:w-2/3 space-y-12">
                    <header className="mb-10 pl-2">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="px-2 py-0.5 rounded bg-blue-600/20 border border-blue-500/30 text-[10px] font-mono text-blue-400 uppercase tracking-widest">System Ready</div>
                            <div className="h-px w-20 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                            Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Deployment</span>
                        </h1>
                        <p className="text-slate-400 font-medium mt-2 max-w-lg">Configure your high-performance instance. Automated provisioning sequence initiated.</p>
                    </header>

                    {/* VIRTUAL STEPPER */}
                    <div className="flex items-center justify-between relative mb-16">
                        {/* Line */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -z-10"></div>
                        <div className="absolute top-1/2 left-0 h-0.5 bg-blue-600 transition-all duration-700 -z-10" style={{ width: `${(step - 1) * 33}%` }}></div>

                        {[
                            { id: 1, label: "Platform", icon: Terminal },
                            { id: 2, label: "Hardware", icon: Cpu },
                            { id: 3, label: "Identity", icon: User },
                            { id: 4, label: "Launch", icon: Disc }
                        ].map((s) => (
                            <div key={s.id} onClick={() => s.id < step && setStep(s.id)} className={`flex flex-col items-center gap-3 cursor-pointer group`}>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step >= s.id ? 'bg-[#030508] border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'bg-[#030508] border-white/10 text-slate-600'}`}>
                                    <s.icon size={20} />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${step >= s.id ? 'text-white' : 'text-slate-600'}`}>{s.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* STEPS CONTENT */}
                    <div className="relative min-h-[400px]">

                        {/* STEP 1: GAME SELECTION */}
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-left-8 duration-500 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.keys(PLANS).map(g => (
                                    <button
                                        key={g}
                                        onClick={() => handleGameSelect(g)}
                                        className={`group relative h-40 rounded-3xl border transition-all duration-300 overflow-hidden flex items-center justify-center ${selectedGame === g ? 'bg-blue-600/10 border-blue-500 ring-1 ring-blue-500/50' : 'bg-[#0a0f1a] border-white/5 hover:border-white/20 hover:bg-[#131b2e]'}`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="relative z-10 flex flex-col items-center gap-4">
                                            <div className="p-3 rounded-xl bg-[#030508] border border-white/10 group-hover:border-blue-500/50 transition-colors shadow-xl">
                                                <Server size={32} className={`transition-colors ${selectedGame === g ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'}`} />
                                            </div>
                                            <div>
                                                <h3 className="font-black uppercase tracking-wider text-sm text-center">{g}</h3>
                                                <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">High Performance</p>
                                            </div>
                                        </div>
                                        {/* Tech Details */}
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* STEP 2: PLAN SELECTION */}
                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-4">
                                {PLANS[selectedGame].map((p: any) => (
                                    <div
                                        key={p.id}
                                        onClick={() => handlePlanSelect(p.id)}
                                        className={`relative p-1 rounded-[2rem] transition-all duration-300 group cursor-pointer ${selectedPlan === p.id ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-transparent hover:bg-white/10'}`}
                                    >
                                        <div className="bg-[#0a0f1a] rounded-[1.8rem] p-6 h-full border border-white/5 relative overflow-hidden">
                                            {/* Glow */}
                                            {p.popular && <div className="absolute -right-12 top-6 bg-blue-600 text-[10px] font-black uppercase tracking-widest text-white px-12 py-1 rotate-45 shadow-lg">Popular</div>}

                                            <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                                                <div className="flex items-center gap-6 w-full md:w-auto">
                                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-[#030508] shadow-inner`}>
                                                        <div className={`text-2xl font-black italic ${selectedPlan === p.id ? 'text-blue-400' : 'text-slate-600'}`}>
                                                            {p.name.match(/(\d+)GB/)[1]}
                                                            <span className="text-[10px] not-italic block -mt-1 text-center opacity-50">GB RAM</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className={`text-lg font-black uppercase italic ${selectedPlan === p.id ? 'text-white' : 'text-slate-300'}`}>{p.name.split('-')[0]}</h3>
                                                            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] uppercase font-bold text-slate-500">{p.category}</span>
                                                        </div>

                                                        <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                                                            <span className="flex items-center gap-1.5"><Cpu size={12} /> {p.cpu}</span>
                                                            <span className="flex items-center gap-1.5"><HardDrive size={12} /> NVMe Gen4</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                                    <div className="text-right">
                                                        <div className="text-2xl font-black text-white">LKR {p.price.toLocaleString()}</div>
                                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Monthly Billing</div>
                                                    </div>
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${selectedPlan === p.id ? 'bg-blue-500 border-blue-500 text-white' : 'bg-transparent border-white/10 text-slate-600'}`}>
                                                        <ChevronRight size={20} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* STEP 3: IDENTITY */}
                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500 bg-[#0a0f1a] border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-10 opacity-5"><User size={200} /></div>

                                {user ? (
                                    <div className="relative z-10 text-center py-10">
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 mx-auto flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-blue-600/30 mb-6">
                                            {user.name.charAt(0)}
                                        </div>
                                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Welcome Back, {user.name}</h3>
                                        <p className="text-slate-400 mb-8 max-w-md mx-auto">Your secure session is active. Proceed to deployment configuration.</p>
                                        <Button onClick={() => setStep(4)} className="bg-white text-black hover:bg-slate-200 w-auto px-10 py-4">Confirm Identity & Continue</Button>
                                        <button onClick={() => { api.logout(); setUser(null); }} className="block mx-auto mt-4 text-xs text-slate-500 hover:text-white underline">Sign in as different user</button>
                                    </div>
                                ) : (
                                    <div className="relative z-10 max-w-lg mx-auto">
                                        <div className="flex bg-[#030508] p-1 rounded-xl mb-8 border border-white/10">
                                            <button onClick={() => setAuthMode('register')} className={`flex-1 py-3 px-4 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${authMode === 'register' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>New Access ID</button>
                                            <button onClick={() => setAuthMode('login')} className={`flex-1 py-3 px-4 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${authMode === 'login' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>Existing Login</button>
                                        </div>

                                        <div className="space-y-5">
                                            {authMode === 'register' && (
                                                <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                                                    <InputField icon={User} placeholder="Full Name (e.g. Commander Shepard)" value={name} onChange={e => setName(e.target.value)} />
                                                    <div className="relative">
                                                        <InputField
                                                            icon={Mail}
                                                            placeholder="Secure Email Link"
                                                            value={email}
                                                            onChange={e => setEmail(e.target.value)}
                                                            onBlur={handleEmailBlur}
                                                            type="email"
                                                        />
                                                        {emailCheckLoading && <RefreshCw className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 animate-spin" size={16} />}
                                                    </div>
                                                    <InputField icon={Lock} placeholder="Create Password" value={password} onChange={e => setPassword(e.target.value)} type="password" />
                                                    <p className="text-[10px] text-slate-500 pl-2 opacity-70">Encryption level: 256-bit. Data remains private.</p>
                                                </div>
                                            )}

                                            {authMode === 'login' && (
                                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                                                    <InputField icon={Mail} placeholder="Registered Email" value={email} onChange={e => setEmail(e.target.value)} onBlur={handleEmailBlur} type="email" />
                                                    <InputField icon={Lock} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" />
                                                </div>
                                            )}

                                            <Button onClick={handleAuthBeforeContinue} className="w-full mt-6 py-4 bg-white text-black hover:bg-slate-200">
                                                {authMode === 'register' ? 'Initialize Account' : 'Authenticate Session'}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* STEP 4: REVIEW */}
                        {step === 4 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-8">
                                <div className="bg-[#0a0f1a] border border-white/5 rounded-[2rem] p-8">
                                    <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-6">Payment Vector</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div onClick={() => setPaymentMethod('Bank Transfer')} className={`p-6 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'Bank Transfer' ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.1)]' : 'bg-[#030508] border-white/10 opacity-60 hover:opacity-100'}`}>
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'Bank Transfer' ? 'border-blue-500' : 'border-slate-600'}`}>
                                                    {paymentMethod === 'Bank Transfer' && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
                                                </div>
                                                <span className="font-bold text-white">Manual Transfer</span>
                                            </div>
                                            <p className="text-xs text-slate-400 pl-10 leading-relaxed">Direct deposit to NDB Bank.<br />Reference ID required after order.</p>
                                        </div>

                                        <div onClick={() => setPaymentMethod('Buy Me a Coffee')} className={`p-6 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'Buy Me a Coffee' ? 'bg-yellow-500/10 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.1)]' : 'bg-[#030508] border-white/10 opacity-60 hover:opacity-100'}`}>
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'Buy Me a Coffee' ? 'border-yellow-500' : 'border-slate-600'}`}>
                                                    {paymentMethod === 'Buy Me a Coffee' && <div className="w-3 h-3 rounded-full bg-yellow-500"></div>}
                                                </div>
                                                <span className="font-bold text-white">Online Payment</span>
                                            </div>
                                            <p className="text-xs text-slate-400 pl-10 leading-relaxed">Secure checkout via Buy Me a Coffee.<br />Instant verification supported.</p>
                                        </div>
                                    </div>

                                    {paymentMethod === 'Bank Transfer' && (
                                        <div className="mt-6 p-6 bg-[#030508] rounded-xl border border-white/5 font-mono text-xs text-slate-300">
                                            <p className="mb-1"><span className="text-slate-500 uppercase tracking-widest mr-4">Bank:</span> NDB Bank Gamapaha</p>
                                            <p className="mb-1"><span className="text-slate-500 uppercase tracking-widest mr-4">Account:</span> <span className="text-white font-bold text-sm">115512117084</span></p>
                                            <p><span className="text-slate-500 uppercase tracking-widest mr-4">Name:</span> M.P.W.wijerathna</p>
                                        </div>
                                    )}
                                </div>

                                <Button size="xl" onClick={handleOrder} disabled={loading} loading={loading} className="w-full text-lg">
                                    {loading ? loadingStep : 'INITIALIZE DEPLOYMENT SEQUENCE'}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: HOLOGRAPHIC SUMMARY */}
                <div className="w-full xl:w-1/3 sticky top-12 hidden xl:block">
                    <div className="relative group">
                        {/* Holographic Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>

                        <div className="relative bg-[#05080f]/90 backdrop-blur-xl border border-blue-500/30 p-8 rounded-[2rem] shadow-2xl overflow-hidden">
                            {/* Scanline */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(59,130,246,0.05)_50%,transparent_100%)] h-[200%] w-full animate-[scan_6s_linear_infinite] pointer-events-none"></div>

                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Payload Manifest</h3>
                                <div className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-[9px] font-bold text-green-500 rounded uppercase tracking-wider">Secure</div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/5 rounded-lg text-blue-400"><Server size={18} /></div>
                                        <div>
                                            <div className="text-xs font-bold text-white uppercase tracking-wider">Protocol</div>
                                            <div className="text-[10px] text-slate-500 capitalize">{selectedGame} Server</div>
                                        </div>
                                    </div>
                                    <CheckCircle2 size={16} className="text-green-500" />
                                </div>

                                {selectedPlan && (
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/5 rounded-lg text-purple-400"><Cpu size={18} /></div>
                                            <div>
                                                <div className="text-xs font-bold text-white uppercase tracking-wider">Resources</div>
                                                <div className="text-[10px] text-slate-500">{PLANS[selectedGame].find((p: any) => p.id === selectedPlan)?.name}</div>
                                            </div>
                                        </div>
                                        <CheckCircle2 size={16} className="text-green-500" />
                                    </div>
                                )}

                                <div className="pt-6 border-t border-white/5">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total cost</span>
                                        <span className="text-3xl font-black italic text-white tracking-tighter">
                                            LKR {price.toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-[9px] text-right text-slate-500 mt-1 uppercase tracking-wider">Billed Monthly</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DirectOrderPage;
