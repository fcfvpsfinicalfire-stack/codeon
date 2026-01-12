import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { X, CreditCard, Lock, Upload, FileText, CheckCircle, Smartphone } from 'lucide-react';
import { api } from '../lib/api';

// Initialize Stripe with Vite env var
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!stripeKey) console.error("Stripe Key Missing! Restart Vite.");
const stripePromise = loadStripe(stripeKey || "");

const CheckoutForm = ({ amount, orderId, onSuccess, onClose }: { amount: number; orderId: string, onSuccess: () => void, onClose: () => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('http://localhost:5000/api/payments/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('codeon_jwt')}`
                },
                body: JSON.stringify({ amount, orderId }),
            });

            if (!res.ok) throw new Error('Failed to Initialize Payment');

            const { clientSecret } = await res.json();

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                },
            });

            if (result.error) {
                setError(result.error.message || 'Payment failed');
            } else if (result.paymentIntent?.status === 'succeeded') {
                onSuccess();
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-4 border border-gray-700 rounded bg-[#0f1016]">
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#ffffff',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: { color: '#ef4444' },
                    },
                }} />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-gray-400 hover:text-white transition">Cancel</button>
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase tracking-wider text-xs flex items-center gap-2 disabled:opacity-50"
                >
                    {loading ? 'Processing...' : <><Lock size={14} /> Pay LKR {amount.toLocaleString()}</>}
                </button>
            </div>
        </form>
    );
};

const UploadSlipForm = ({ amount, orderId, onSuccess, onClose }: { amount: number; orderId: string, onSuccess: () => void, onClose: () => void }) => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return alert("Please select a file.");

        setLoading(true);
        try {
            await api.submitPayment({
                orderId: orderId.toString(),
                amount: amount.toString(),
                date: new Date(date).toISOString(),
                method: 'BANK_TRANSFER',
                file: file
            });
            onSuccess();
        } catch (error: any) {
            console.error(error);
            alert("Upload Failed: " + (error.message || "Unknown Error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Bank Details Card */}
            <div className="bg-blue-900/10 border border-blue-500/30 p-4 rounded-xl mb-4">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <FileText size={14} /> Transfer To:
                </h4>
                <div className="space-y-1 text-xs text-slate-300 font-mono">
                    <p className="flex justify-between"><span>Bank:</span> <span className="text-white font-bold">NDB Bank Gamapaha</span></p>
                    <p className="flex justify-between"><span>A/C:</span> <span className="text-white font-bold">115512117084</span></p>
                    <p className="flex justify-between"><span>Name:</span> <span className="text-white font-bold">M.P.W.wijerathna</span></p>
                    <p className="flex justify-between"><span>Ref:</span> <span className="text-white font-bold">INV-{orderId}</span></p>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full bg-[#0f1016] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upload Slip / Screenshot</label>
                <div className={`border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center transition-colors ${file ? 'bg-green-500/10 border-green-500/50' : 'hover:bg-white/5 hover:border-white/20'}`}>
                    <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="slip-upload"
                    />
                    <label htmlFor="slip-upload" className="cursor-pointer flex flex-col items-center">
                        <Upload size={24} className={file ? "text-green-500" : "text-slate-500"} />
                        <span className="mt-2 text-xs font-bold text-slate-400">{file ? file.name : "Click to Select File"}</span>
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-gray-400 hover:text-white transition text-xs font-bold uppercase">Cancel</button>
                <button
                    type="submit"
                    disabled={loading || !file}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold uppercase tracking-wider text-xs flex items-center gap-2 disabled:opacity-50 shadow-lg"
                >
                    {loading ? 'Uploading...' : <><CheckCircle size={14} /> Submit for Verification</>}
                </button>
            </div>
        </form>
    );
};

export const PaymentModal = ({ amount, orderId, onClose, onSuccess }: { amount: number; orderId: string, onClose: () => void, onSuccess: () => void }) => {
    const [mode, setMode] = useState<'upload' | 'card'>('upload');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="bg-[#1a1d24] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>

                <div className="p-5 border-b border-white/10 flex justify-between items-center bg-[#15181e]">
                    <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
                        <CreditCard className="text-blue-500" size={20} /> Payment Gateway
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-transform hover:rotate-90">
                        <X size={20} />
                    </button>
                </div>

                {/* TABS */}
                <div className="flex p-2 bg-[#15181e] gap-2">
                    <button
                        onClick={() => setMode('upload')}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${mode === 'upload' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white/5'}`}
                    >
                        <Upload size={14} /> Upload Receipt
                    </button>
                    <button
                        onClick={() => setMode('card')}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${mode === 'card' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white/5'}`}
                    >
                        <CreditCard size={14} /> Card Payment
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6 flex justify-between items-end">
                        <div>
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Total Amount</p>
                            <p className="text-3xl font-black text-white italic tracking-tighter">LKR {amount.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-500 font-mono">INV-{orderId}</p>
                        </div>
                    </div>

                    {mode === 'upload' ? (
                        <UploadSlipForm amount={amount} orderId={orderId} onClose={onClose} onSuccess={onSuccess} />
                    ) : (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm amount={amount} orderId={orderId} onClose={onClose} onSuccess={onSuccess} />
                        </Elements>
                    )}
                </div>

                <div className="p-4 bg-[#15181e] border-t border-white/5 text-center">
                    <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1 font-bold uppercase tracking-widest">
                        <Lock size={10} /> {mode === 'upload' ? 'Manual Verification Required' : 'Encrypted by Stripe'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PaymentModal;
