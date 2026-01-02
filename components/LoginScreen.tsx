
import React, { useState } from 'react';
import { BrandLogo } from './Icons';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRobotChecked, setIsRobotChecked] = useState(false);

  const handleVerification = () => {
    if (!isRobotChecked) return;
    setIsProcessing(true);
    // Simulated security handshake
    setTimeout(() => {
      onLogin();
      setIsProcessing(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-[#030712] z-[400] flex items-center justify-center p-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-600/10 blur-[200px] rounded-full" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at center, transparent 0%, #030712 90%), url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000')`,
          backgroundSize: 'cover'
        }} />
      </div>
      
      <div className="relative w-full max-w-md glass border border-white/10 rounded-[3.5rem] p-12 text-center shadow-3xl animate-in zoom-in-95 duration-700">
        <div className="animate-float mb-10">
           <BrandLogo className="w-24 h-24 mx-auto" />
        </div>
        
        <h2 className="text-3xl font-black text-white uppercase tracking-[0.2em] mb-2">System Check</h2>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mb-12 leading-relaxed opacity-60">
          CodeOn Infrastructure Gatekeeper
        </p>
        
        <div className="space-y-6">
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-left">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Awaiting Verification</span>
             </div>
             <p className="text-[9px] text-gray-500 font-bold uppercase leading-relaxed">
               Please initiate the verification process to access the infrastructure portal and pricing modules.
             </p>
          </div>

          {/* Robot Checkup Section */}
          <div 
            onClick={() => !isProcessing && setIsRobotChecked(!isRobotChecked)}
            className={`p-4 bg-white/5 border rounded-2xl flex items-center gap-4 cursor-pointer transition-all ${isRobotChecked ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/10 hover:border-white/20'}`}
          >
            <div className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${isRobotChecked ? 'bg-blue-600 border-blue-600' : 'border-white/20'}`}>
              {isRobotChecked && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">this check up for confirm you are not a robot</span>
            <div className="ml-auto">
               <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
               </svg>
            </div>
          </div>

          <button 
            onClick={handleVerification}
            disabled={isProcessing || !isRobotChecked}
            className={`w-full py-5 rounded-3xl flex flex-col items-center justify-center gap-1 font-black uppercase tracking-[0.2em] text-[11px] transition-all shadow-xl active:scale-95 disabled:opacity-50 group ${isRobotChecked ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-blue-600/20 hover:from-blue-500 hover:to-indigo-600' : 'bg-white/5 text-gray-700'}`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Processing...
              </span>
            ) : (
              <>
                <span>CodeOn Verification Login</span>
                <span className="text-[8px] opacity-60">Click to Verify Identity</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-16 text-[9px] font-black text-gray-800 uppercase tracking-[0.4em]">
           Protected by CodeOn Shield v2.4
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
