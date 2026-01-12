import React, { useState } from 'react';
import { api } from '../lib/api';
import { ArrowRight, AlertCircle, ShieldCheck, Mail, Lock } from 'lucide-react';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';

interface LoginPageProps {
  onLoginSuccess: (user: any) => void;
  onSwitchToRegister: () => void;
  onSwitchToAdmin?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onSwitchToRegister, onSwitchToAdmin }) => {
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
      // alert("Welcome " + response.user.name); 
      onLoginSuccess(response.user);
    } catch (err: any) {
      console.error(err);
      setError('Login failed: ' + (err.message || 'Please submit valid credentials.'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030508] flex items-center justify-center p-4 font-sans relative overflow-hidden font-outfit">
      {/* AMBIENT BACKGROUND */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/10 blur-[150px] rounded-full -z-0"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -z-0"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-[#0b0f19] border border-white/10 rounded-[2.5rem] p-10 shadow-sky-900/10 shadow-2xl overflow-hidden relative backdrop-blur-sm">
          {/* Cyberpunk Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>

          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-inner group">
              <ShieldCheck className="text-blue-400 group-hover:scale-110 transition-transform duration-500" size={40} />
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-2">Access Portal</h1>
            <div className="flex items-center justify-center gap-2 opacity-60">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em]">Secure Client Node</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-[10px] font-black uppercase text-center flex items-center justify-center space-x-2 animate-pulse">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <InputField
              label="DIGITAL IDENTITY (EMAIL)"
              type="email"
              icon={Mail}
              placeholder="client@codeon.lk"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <InputField
              label="ACCESS KEY"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              disabled={loading}
              fullWidth
              loading={loading}
              className="mt-6 py-5 text-sm shadow-blue-900/20 shadow-xl"
            >
              ESTABLISH CONNECTION
            </Button>

            <div className="pt-8 border-t border-white/5 text-center">
              <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em] mb-4">No Active Node?</p>
              <button type="button" onClick={onSwitchToRegister} className="w-full py-3 rounded-xl border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 text-slate-400 hover:text-blue-400 text-[10px] font-black uppercase tracking-widest transition-all">
                Initialize New Registration
              </button>

              {onSwitchToAdmin && (
                <button type="button" onClick={onSwitchToAdmin} className="mt-6 text-slate-500 hover:text-red-500 text-[9px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 w-full">
                  <Lock size={10} /> Administrative Access
                </button>
              )}
            </div>
          </form>
        </div>

        <button
          onClick={() => window.location.href = '/'}
          className="mt-8 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors flex items-center mx-auto space-x-2"
        >
          <ArrowRight size={14} className="rotate-180" />
          <span>Abort Sequence</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
