import React from 'react';
import { Shield, Package, ExternalLink, CreditCard, Clock, Terminal, FolderOpen, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { ServerStatus } from './ServerStatus';
import { OrderProgressTimeline } from './OrderProgressTimeline';
import { api } from '../lib/api';
import { useEffect, useState } from 'react';

interface OrderCardProps {
    order: any;
    onUploadClick: (id: string) => void;
    onToggleRenew?: (id: number) => void; // Optional for backward compatibility
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onUploadClick, onToggleRenew }) => {
    const isPending = order.status !== 'active';
    const isVerifying = order.payment_status === 'submitted' || order.status === 'verifying';
    const isRejected = order.payment_status === 'rejected';

    const [trustStatus, setTrustStatus] = useState<any>(null);
    const [loadingTrust, setLoadingTrust] = useState(false);

    // Polling Logic for Trust Status
    useEffect(() => {
        if (!isPending) return; // Stop polling if active

        const fetchStatus = async () => {
            try {
                const status = await api.getTrustStatus(order.id);
                setTrustStatus(status);
            } catch (e) { console.error("Trust poll failed", e); }
        };

        fetchStatus(); // Initial call
        const interval = setInterval(fetchStatus, 15000); // Poll every 15s

        return () => clearInterval(interval);
    }, [isPending, order.id]);

    return (
        <div className="group bg-[#0b0f19] hover:bg-[#101522] border border-white/5 hover:border-blue-500/30 rounded-[2rem] p-6 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[50px] rounded-full transition-all ${isRejected ? 'bg-red-600/10' : isPending ? 'bg-amber-600/5 group-hover:bg-amber-600/10' : 'bg-blue-600/5 group-hover:bg-blue-600/10'}`}></div>

            <div className="relative z-10 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="bg-blue-900/20 text-blue-400 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                        {order.plan_name || order.plan || 'Unknown Node'}
                    </div>
                    <div className={`w-2 h-2 rounded-full ${order.status === 'active' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : isRejected ? 'bg-red-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`}></div>
                </div>

                {/* Info */}
                <div className="space-y-4">
                    <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Status</p>
                        <p className={`text-sm font-black uppercase italic ${order.status === 'active' ? 'text-white' : isRejected ? 'text-red-500' : 'text-amber-500'}`}>
                            {order.status === 'active' ? 'Operational' : isVerifying ? 'Under Review' : isRejected ? 'Payment Rejected' : 'Pending Payment'}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Order ID</p>
                            <p className="text-xs font-mono text-slate-300">{order.order_code || order.id}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Price</p>
                            <p className="text-sm font-bold text-white">LKR {order.price_lkr || order.price}</p>
                        </div>
                    </div>

                    {/* Auto-Renew Toggle */}
                    {order.status === 'active' && onToggleRenew && (
                        <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2">
                                <RefreshCw size={14} className={order.auto_renew ? "text-green-500" : "text-slate-500"} />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Auto-Renew</span>
                            </div>
                            <button
                                onClick={() => onToggleRenew(order.id)}
                                className={`w-10 h-5 rounded-full relative transition-colors ${order.auto_renew ? 'bg-green-500' : 'bg-slate-700'}`}
                            >
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${order.auto_renew ? 'left-6' : 'left-1'}`}></div>
                            </button>
                        </div>
                    )}
                </div>

                {/* Server Status if Active */}
                {order.status === 'active' && order.server && (
                    <ServerStatus server={order.server} />
                )}
            </div>

            {/* Actions */}
            <div className="mt-6 relative z-10">
                {isPending ? (
                    <>
                        {/* Improved Trust UI */}
                        {(isVerifying || isRejected || trustStatus?.step === 'UNDER_REVIEW') && trustStatus ? (
                            <div className="mt-4">
                                <OrderProgressTimeline status={trustStatus} onResubmit={() => onUploadClick(order.id)} />
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {/* Only show upload button if NOT verifying or if specifically rejected (handled inside timeline but fallback here) */}
                                {(!isVerifying && !trustStatus) && (
                                    <Button fullWidth onClick={() => onUploadClick(order.id)} icon={CreditCard} className={isRejected ? "bg-red-600 hover:bg-red-500" : ""}>
                                        {isRejected ? "Resubmit Payment" : "Upload Receipt"}
                                    </Button>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        <Button fullWidth variant="secondary" className="text-xs" icon={Terminal} onClick={() => window.open('https://panel.codeon.lk', '_blank')}>
                            Game Panel
                        </Button>
                        <Button fullWidth variant="secondary" className="text-xs" icon={FolderOpen} onClick={() => window.open('https://panel.codeon.lk/files', '_blank')}>
                            Files
                        </Button>
                    </div>
                )}
            </div>
        </div >
    );
};
