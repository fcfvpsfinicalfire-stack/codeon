
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle, ShieldCheck, CreditCard, Box } from 'lucide-react';
import { Button } from './Button';

interface TrustStatus {
    step: "ORDER_CREATED" | "PAYMENT_SUBMITTED" | "UNDER_REVIEW" | "ACTIVE" | "REJECTED";
    verified: boolean;
    message: string;
    updatedAt: string;
    rejectionById?: string;
}

interface OrderProgressTimelineProps {
    status: TrustStatus;
    onResubmit: () => void;
}

const STEPS = [
    { key: "ORDER_CREATED", label: "Order Placed", icon: Box },
    { key: "PAYMENT_SUBMITTED", label: "Payment Submitted", icon: CreditCard },
    { key: "UNDER_REVIEW", label: "Admin Review", icon: ShieldCheck },
    { key: "ACTIVE", label: "Service Active", icon: CheckCircle }
];

export const OrderProgressTimeline: React.FC<OrderProgressTimelineProps> = ({ status, onResubmit }) => {

    const currentStepIndex = STEPS.findIndex(s => s.key === status.step);

    // Derived Index for "Rejected" -> it usually halts at Under Review or Payment Submitted
    // But let's verify visual logic. Only show Rejected special UI.
    const isRejected = status.step === 'REJECTED';

    // If rejected, we show up to Payment Submitted or Under Review as "active" but RED.
    // Let's assume Rejected implies we passed "Payment Submitted" but failed "Under Review".
    // So actively 2 steps done.
    const effectiveIndex = isRejected ? 2 : (currentStepIndex === -1 ? 0 : currentStepIndex);

    // Helper for visual state
    const getStepState = (index: number) => {
        if (isRejected && index === 2) return 'rejected'; // The step that failed
        if (index < effectiveIndex) return 'completed';
        if (index === effectiveIndex) return 'current';
        return 'upcoming';
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                {isRejected ? (
                    <span className="text-red-500 flex items-center gap-2"><AlertTriangle size={20} /> Verification Failed</span>
                ) : (
                    <span className="text-emerald-400 flex items-center gap-2"><ShieldCheck size={20} /> Real-time Status</span>
                )}
            </h3>

            <div className="relative">
                {/* Vertical Line for Mobile / Horizontal for Desktop could be done, sticking to vertical list per user request */}
                <div className="space-y-8 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-[1.15rem] top-2 bottom-2 w-0.5 bg-white/10" />

                    {STEPS.map((step, index) => {
                        const stepState = getStepState(index);
                        const isCompleted = stepState === 'completed';
                        const isCurrent = stepState === 'current';
                        const isRejectedStep = stepState === 'rejected';

                        return (
                            <div key={step.key} className="relative z-10 flex gap-4 min-h-[40px]">
                                {/* Icon Bubble */}
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2
                                    transition-all duration-500
                                    ${isCompleted ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : ''}
                                    ${isCurrent ? 'bg-primary-500/20 border-primary-500 text-primary-400 animate-pulse-slow ring-4 ring-primary-500/10' : ''}
                                    ${isRejectedStep ? 'bg-red-500/20 border-red-500 text-red-500' : ''}
                                    ${stepState === 'upcoming' ? 'bg-white/5 border-white/10 text-white/30' : ''}
                                `}>
                                    <step.icon size={18} />
                                </div>

                                {/* Content */}
                                <div className={`pt-1.5 transition-opacity duration-300 ${stepState === 'upcoming' ? 'opacity-50' : 'opacity-100'}`}>
                                    <h4 className={`font-medium ${isCurrent ? 'text-primary-400' : isRejectedStep ? 'text-red-400' : 'text-gray-200'}`}>
                                        {step.label}
                                    </h4>

                                    {(isCurrent || isRejectedStep || isCompleted) && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="text-sm text-gray-400 mt-1"
                                        >
                                            {isCurrent && status.message}
                                            {isRejectedStep && status.message}
                                            {/* Completed steps don't need msg unless last one */}
                                            {isCompleted && index === effectiveIndex - 1 && !isCurrent && !isRejectedStep && "Completed"}
                                        </motion.div>
                                    )}

                                    {isRejectedStep && (
                                        <div className="mt-3">
                                            <Button size="sm" variant="primary" onClick={onResubmit} className="bg-red-600 hover:bg-red-500 border-none">
                                                Resubmit Payment
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Last Updated Footer */}
            {!isRejected && status.step !== 'ACTIVE' && (
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    Updates automatically. Last checked just now.
                </div>
            )}
        </div>
    );
};
