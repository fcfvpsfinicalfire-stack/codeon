
import React, { useState } from 'react';
import { api } from '../lib/api';
import { UserPlus, Mail, Lock, ArrowRight, RefreshCw, User, ShieldCheck } from 'lucide-react';

interface RegisterPageProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');

    setLoading(true);
    setError('');

    try {
      await api.register(formData.name, formData.email, formData.password);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-[#111827] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>

          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-600/20">
              <UserPlus className="text-blue-500" size={32} />
            </div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">Create Account</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Join Codeon Hosting</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-xs font-bold uppercase text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Name</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-[#0b0f19] border border-white/10 rounded-2xl py-3.5 pl-14 pr-6 text-white focus:outline-none focus:border-blue-500 transition-all text-sm font-medium"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-[#0b0f19] border border-white/10 rounded-2xl py-3.5 pl-14 pr-6 text-white focus:outline-none focus:border-blue-500 transition-all text-sm font-medium"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full bg-[#0b0f19] border border-white/10 rounded-2xl py-3.5 pl-14 pr-6 text-white focus:outline-none focus:border-blue-500 transition-all text-sm font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Confirm Password</label>
              <div className="relative">
                <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="w-full bg-[#0b0f19] border border-white/10 rounded-2xl py-3.5 pl-14 pr-6 text-white focus:outline-none focus:border-blue-500 transition-all text-sm font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center space-x-3 uppercase tracking-widest text-xs transition-all active:scale-95 group mt-4"
            >
              {loading ? <RefreshCw className="animate-spin" size={18} /> : <span>Create Account</span>}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              Already have an account? <button onClick={onSwitchToLogin} className="text-blue-500 hover:underline">Sign In</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
