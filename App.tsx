
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PricingSection from './components/PricingSection';
import OrderModal from './components/OrderModal';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import MouseParticles from './components/MouseParticles';
import CartDrawer from './components/CartDrawer';
import PanelShowcase from './components/PanelShowcase';
import TeamSection from './components/TeamSection';
import LocationSelector from './components/LocationSelector';
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './components/LoginScreen';
import PartnerToast from './components/PartnerToast';
import UpdateBanner from './components/UpdateBanner';
import RamCalculator from './components/RamCalculator';
import FeaturesGrid from './components/FeaturesGrid';
import FAQSection from './components/FAQSection';
import PartnersSection from './components/PartnersSection';
import { Plan, SiteNotification, BillingCycle } from './types';

export type Page = 'home' | 'team' | 'minecraft' | 'rust' | 'ark' | 'mta' | 'nodejs' | 'cloud' | 'dedicated' | 'partners';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState<Page>('home');
  const [cart, setCart] = useState<Plan[]>([]);
  const [currency, setCurrency] = useState<'LKR' | 'EUR'>('LKR');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('MONTHLY');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<SiteNotification[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    const auth = localStorage.getItem('codeon-auth-token');
    if (auth) {
      setIsLoggedIn(true);
    }

    const storedNotifs = JSON.parse(localStorage.getItem('codeon-notifs') || '[]');
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const validNotifs = storedNotifs.filter((n: SiteNotification) => n.timestamp > thirtyDaysAgo);
    setNotifications(validNotifs);
    localStorage.setItem('codeon-notifs', JSON.stringify(validNotifs));

    return () => clearTimeout(timer);
  }, []);

  const addNotification = (message: string) => {
    const newNotif: SiteNotification = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      timestamp: Date.now(),
      type: 'order'
    };
    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    localStorage.setItem('codeon-notifs', JSON.stringify(updated));
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('codeon-auth-token', 'valid-' + Date.now());
  };

  const addToCart = (plan: Plan) => {
    setCart(prev => [...prev, { ...plan, id: `${plan.id}-${Date.now()}` }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  if (isLoading) return <LoadingScreen />;
  if (!isLoggedIn) return <LoginScreen onLogin={handleLoginSuccess} />;

  const renderContent = () => {
    switch (page) {
      case 'team': return <TeamSection />;
      case 'partners': return <PartnersSection />;
      case 'minecraft':
      case 'rust':
      case 'ark':
      case 'mta':
      case 'nodejs':
      case 'cloud':
      case 'dedicated':
        return (
          <div className="pt-32 pb-32 min-h-screen">
            <PricingSection 
              onAddToCart={addToCart} 
              forcedCategory={page.toUpperCase() as any} 
              currency={currency}
              billingCycle={billingCycle}
              setBillingCycle={setBillingCycle}
            />
          </div>
        );
      default:
        return (
          <>
            <Hero onAddToCart={addToCart} />
            <UpdateBanner />
            <FeaturesGrid />
            <div id="pricing" className="py-20">
              <PricingSection 
                onAddToCart={addToCart} 
                currency={currency} 
                billingCycle={billingCycle}
                setBillingCycle={setBillingCycle}
              />
            </div>
            <RamCalculator onOrder={addToCart} currency={currency} />
            <LocationSelector />
            <PanelShowcase />
            <FAQSection />
            <TeamSection />
          </>
        );
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#030712] selection:bg-blue-500/30 text-white relative font-sans overflow-x-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(3, 7, 18, 0.95), rgba(3, 7, 18, 0.98)), url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center'
      }}
    >
      <MouseParticles />
      <Navbar 
        cartCount={cart.length} 
        onOpenCart={() => setIsCartOpen(true)} 
        setPage={setPage} 
        currentPage={page}
        currency={currency}
        setCurrency={setCurrency}
        notifications={notifications}
      />
      
      <main className="animate-in fade-in duration-1000">
        {renderContent()}
      </main>

      <Footer />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        currency={currency}
        billingCycle={billingCycle}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsOrderModalOpen(true);
        }}
      />

      {isOrderModalOpen && cart.length > 0 && (
        <OrderModal 
          cart={cart} 
          currency={currency}
          billingCycle={billingCycle}
          onClose={() => setIsOrderModalOpen(false)}
          onClearCart={clearCart}
          onOrderSuccess={() => addNotification("Order Placed: Manual review starting now.")}
        />
      )}

      <ChatBot />
      <PartnerToast />
    </div>
  );
};

export default App;
