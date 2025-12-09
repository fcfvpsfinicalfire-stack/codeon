import React from 'react';
import { Plan, Page } from '../App';

interface CheckoutPageProps {
  plan: Plan;
  setPage: (page: Page) => void;
}

const SpecItem: React.FC<{ icon: string; label: string; value?: string }> = ({ icon, label, value }) => (
    <div className="flex justify-between items-center py-3 border-b border-white/10">
        <div className="flex items-center space-x-3">
            <i className={`fa-solid ${icon} text-purple-300 w-5 text-center`}></i>
            <span className="text-gray-300">{label}</span>
        </div>
        {value && <span className="font-bold text-white">{value}</span>}
    </div>
);

const CheckoutPage: React.FC<CheckoutPageProps> = ({ plan, setPage }) => {
    // A default URL in case a plan doesn't have a specific link
    const DEFAULT_PAYPAL_URL = "https://www.paypal.com/ncp/payment/H8ZBV9EGCMVKC";
    const paymentUrl = plan.paypalLink || DEFAULT_PAYPAL_URL;

    return (
        <div className="py-16 md:py-24 max-w-4xl mx-auto">
             <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
                    Complete Your Order
                </h1>
                <p className="mt-4 text-lg text-gray-400">
                    You're just one step away from launching your new server.
                </p>
            </div>

            <div className="bg-card-bg-solid/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl shadow-black/30 overflow-hidden grid md:grid-cols-2">
                {/* Left Side: Order Summary */}
                <div className="p-8 border-b md:border-b-0 md:border-r border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                    <div className="space-y-2">
                        <SpecItem icon="fa-gamepad" label="Product" value={plan.name} />
                        {plan.ram && <SpecItem icon="fa-memory" label="Memory (RAM)" value={plan.ram} />}
                        {plan.cpu && <SpecItem icon="fa-microchip" label="CPU" value={plan.cpu} />}
                        {plan.ssd && <SpecItem icon="fa-hard-drive" label="NVMe SSD Storage" value={plan.ssd} />}
                        <SpecItem icon="fa-shield-halved" label="DDoS Protection" value="Included" />
                        <SpecItem icon="fa-rocket" label="Setup" value="Instant" />
                    </div>
                </div>

                {/* Right Side: Payment */}
                <div className="p-8 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Payment</h2>
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-300 text-lg">Total Due Today</span>
                            <span className="text-3xl font-extrabold text-purple-300">LKR {plan.price}</span>
                        </div>
                        <a 
                            href={paymentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center space-x-3 bg-[#0070BA] text-white font-bold py-4 rounded-lg text-lg hover:opacity-90 transition-opacity"
                        >
                           <i className="fa-brands fa-paypal"></i>
                           <span>Pay with PayPal</span>
                        </a>
                        <p className="text-xs text-gray-500 mt-3 text-center">You will be redirected to the official PayPal website to complete your payment securely.</p>
                    </div>

                    <div className="mt-8 text-center bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                        <h3 className="font-semibold text-white">What happens next?</h3>
                        <p className="text-sm text-purple-200 mt-2">
                            Once your payment is complete, our automated system will instantly create your server. You'll receive an email with all the details. This system is powered by our custom automation engine.
                        </p>
                    </div>
                </div>
            </div>

             <div className="text-center mt-12">
                <button onClick={() => setPage('pricing')} className="text-gray-400 hover:text-white transition-colors">
                    <i className="fa-solid fa-arrow-left mr-2"></i>
                    Back to Plans
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;