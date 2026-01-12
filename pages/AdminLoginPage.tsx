import React, { useState } from 'react';
import { api } from '../lib/api';
import { ShieldAlert, ArrowRight, RefreshCw, AlertCircle, Lock, Mail } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: (user: any) => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.login(email, password);

      if (response.user?.role !== 'admin') {
        setError('Access Denied: Not a Root Account.');
        setLoading(false);
        return;
      }

      onLoginSuccess(response.user);
    } catch (err: any) {
      setError('System Fault: ' + (err.message || 'Invalid Credentials'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-[#111827] border border-red-500/20 rounded-[2.5rem] p-10 shadow-3xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]"></div>

          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-red-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-600/20">
              <ShieldAlert className="text-red-500" size={40} />
            </div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">Root Protocol</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Internal Node Control</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-[10px] font-black uppercase text-center flex items-center justify-center space-x-2 animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[9px] font-black text-red-500 uppercase tracking-widest ml-4">Root Identity</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-red-900/20 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-red-500 transition-all text-sm font-bold"
                  placeholder="admin@codeon.lk"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-red-500 uppercase tracking-widest ml-4">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password" required
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-red-900/20 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-red-500 transition-all text-sm font-bold"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-5 rounded-2xl shadow-xl flex items-center justify-center space-x-3 uppercase tracking-widest text-xs transition-all active:scale-95 group mt-4"
            >
              {loading ? <RefreshCw className="animate-spin" size={18} /> : <span>Authenticate Root Access</span>}
            </button>
          </form>
        </div>

        <button
          onClick={() => window.location.href = '/'}
          className="mt-8 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors flex items-center mx-auto space-x-2"
        >
          <ArrowRight size={14} className="rotate-180" />
          <span>Back to Operations</span>
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPage;
