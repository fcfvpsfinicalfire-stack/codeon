import React from 'react';
import { Server as ServerIcon, ShieldCheck, Activity } from 'lucide-react';

interface ServerStatusProps {
    server: {
        node_name: string;
        ip_address: string;
        port: number;
        status: string;
    };
}

export const ServerStatus: React.FC<ServerStatusProps> = ({ server }) => {
    return (
        <div className="bg-[#05080f] rounded-xl p-4 border border-white/5 font-mono text-[10px] space-y-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 blur-[30px] rounded-full group-hover:bg-green-500/10 transition-all"></div>

            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
                <Activity size={14} className="text-green-500" />
                <span className="text-green-500 font-bold uppercase tracking-wider">Live Connection</span>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold">NODE</span>
                <span className="text-white font-bold bg-white/5 px-2 py-0.5 rounded">{server.node_name}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold">IP ADDR</span>
                <span className="text-blue-400 font-bold hover:text-blue-300 cursor-copy select-all">{server.ip_address}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold">PORT</span>
                <span className="text-white font-bold">{server.port}</span>
            </div>
        </div>
    );
};
