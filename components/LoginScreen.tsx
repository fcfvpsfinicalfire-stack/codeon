
import React, { useState, useEffect } from 'react';
import { BrandLogo } from './Icons';
import { User } from '../types';

interface LoginScreenProps {
  onLogin: (userData: User) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'INITIAL' | 'VERIFYING' | 'SUCCESS'>('INITIAL');
  const [isRobotChecked, setIsRobotChecked] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (step === 'VERIFYING') {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('SUCCESS'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [step]);

  const handleVerify = () => {
    if (!isRobotChecked) return;
    setStep('VERIFYING');
  };

  const handleEnter = () => {
    const mockUser: User = {
      id: 'guest-' + Math.random().toString(36).substr(2, 9),
      username: 'Visitor_' + Math.floor(Math.random() * 9999),
      discriminator: '0001',
      avatar: 'https://ui-avatars.com/api/?name=Visitor&background=3b82f6&color=fff&bold=true'
    };
    onLogin(mockUser);
  };

  return (
    <div className="fixed inset-0 bg-[#030712] z-[400] flex items-center justify-center p-6 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] bg-cover" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>
      
      <div className="relative w-full max-w-md glass border border-white/10 rounded-[3.5rem] p-12 text-center shadow-3xl animate-in zoom-in-95 duration-700 z-10">
        <div className="animate-float mb-10">
           <BrandLogo className="w-24 h-24 mx-auto" />
        </div>
        
        <h2 className="text-3xl font-black text-white uppercase tracking-[0.2em] mb-2">Infrastructure Portal</h2>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mb-12 leading-relaxed opacity-60">
          Verification Required for Entry
        </p>
        
        <div className="space-y-6">
          {step === 'INITIAL' && (
            <>
              <div 
                onClick={() => setIsRobotChecked(!isRobotChecked)}
                className={`p-6 bg-white/5 border rounded-3xl flex items-center gap-6 cursor-pointer transition-all ${isRobotChecked ? 'border-blue-500/50 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'border-white/10 hover:border-white/20'}`}
              >
                <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${isRobotChecked ? 'bg-blue-600 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'border-white/20'}`}>
                  {isRobotChecked && <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <div className="text-left">
                  <span className="block text-[11px] font-black text-white uppercase tracking-widest">I am not a robot</span>
                  <span className="block text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-1">Verification provided by CodeOn Shield</span>
                </div>
                <div className="ml-auto">
                   <svg className="w-8 h-8 text-blue-500/20" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                   </svg>
                </div>
              </div>

              <button 
                onClick={handleVerify}
                disabled={!isRobotChecked}
                className={`w-full py-5 rounded-3xl flex items-center justify-center gap-3 font-black uppercase tracking-[0.25em] text-[12px] transition-all shadow-xl active:scale-95 disabled:opacity-30 disabled:grayscale group ${isRobotChecked ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30' : 'bg-white/5 text-gray-600 border border-white/10'}`}
              >
                Access Portal
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </>
          )}

          {step === 'VERIFYING' && (
            <div className="py-8 space-y-6">
              <div className="relative w-20 h-20 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="36" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray={226.2} 
                    strokeDashoffset={226.2 - (226.2 * progress) / 100} 
                    className="text-blue-500 transition-all duration-300 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-black text-white">{progress}%</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Analyzing Behavioral Patterns</h4>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] animate-pulse">Running heuristic analysis...</p>
              </div>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="py-6 space-y-8 animate-in fade-in zoom-in-90 duration-500">
              <div className="w-20 h-20 bg-green-500/10 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-2">Verification Passed</h4>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Welcome back to CodeOn Infrastructure.</p>
              </div>
              <button 
                onClick={handleEnter}
                className="w-full py-5 bg-green-600 hover:bg-green-500 text-white rounded-3xl font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl shadow-green-600/30 transition-all active:scale-95"
              >
                Initialize Session
              </button>
            </div>
          )}
        </div>

        <div className="mt-16 flex flex-col items-center gap-2">
           <span className="text-[9px] font-black text-gray-800 uppercase tracking-[0.4em]">Protected by CodeOn Shield v2.4</span>
           <div className="flex gap-2">
             <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping" />
             <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping [animation-delay:0.2s]" />
             <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping [animation-delay:0.4s]" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
