import React, { InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: LucideIcon;
    error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, icon: Icon, error, className, ...props }) => {
    return (
        <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">{label}</label>
            <div className="relative">
                {Icon && <Icon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />}
                <input
                    className={`w-full bg-[#0b0f19] border border-white/10 rounded-2xl py-4 ${Icon ? 'pl-14' : 'pl-6'} pr-6 text-white focus:outline-none focus:border-blue-500 transition-all text-sm font-bold placeholder:text-slate-700 ${className}`}
                    {...props}
                />
            </div>
            {error && <p className="text-red-500 text-[10px] ml-4 font-bold">{error}</p>}
        </div>
    );
};
