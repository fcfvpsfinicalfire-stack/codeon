import React, { ButtonHTMLAttributes } from 'react';
import { LucideIcon, RefreshCw } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    icon?: LucideIcon;
    loading?: boolean;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    icon: Icon,
    loading,
    fullWidth,
    className,
    disabled,
    ...props
}) => {
    const baseStyles = "py-4 px-6 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/25",
        secondary: "bg-white text-slate-900 hover:bg-slate-200 shadow-lg shadow-white/10",
        outline: "bg-transparent border border-white/10 text-white hover:border-white/20 hover:bg-white/5",
        ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
        danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
            disabled={loading || disabled}
            {...props}
        >
            {loading ? <RefreshCw className="animate-spin" size={16} /> : Icon && <Icon size={16} />}
            {children}
        </button>
    );
};
