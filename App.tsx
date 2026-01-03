
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PricingSection from './components/PricingSection';
import OrderModal from './components/OrderModal';
import Footer from './components/Footer';
import TawkChat from './components/TawkChat';
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
import StatusPage from './components/StatusPage';
import ChatBot from './components/ChatBot';
import { Plan, SiteNotification, BillingCycle, User } from './types';

export type Page = 'home' | 'team' | 'minecraft' | 'rust' | 'ark' | 'mta' | 'nodejs' | 'cloud' | 'dedicated' | 'partners' | 'status';
export type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>('home');
  const [cart, setCart] = useState<Plan[]>([]);
  const [currency, setCurrency] = useState<'LKR' | 'EUR'>('LKR');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('MONTHLY');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<SiteNotification[]>([]);
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('codeon-theme') as Theme) || 'dark');

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('codeon-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const storedNotifs = JSON.parse(localStorage.getItem('codeon-notifs') || '[]');
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      const validNotifs = storedNotifs.filter((n: SiteNotification) => n.timestamp > thirtyDaysAgo);
      setNotifications(validNotifs);
      localStorage.setItem('codeon-notifs', JSON.stringify(validNotifs));

      setTimeout(() => setIsLoading(false), 1500);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light-theme', theme === 'light');
    localStorage.setItem('codeon-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

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

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem('codeon-user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('codeon-user');
    window.location.reload(); 
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
  if (!user) return <LoginScreen onLogin={handleLoginSuccess} />;

  const renderContent = () => {
    switch (page) {
      case 'team': return <TeamSection />;
      case 'partners': return <PartnersSection />;
      case 'status': return <StatusPage />;
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
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-[#030712] text-white' : 'bg-white text-gray-900'} selection:bg-blue-500/30 relative`}>
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {theme === 'dark' ? (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1)_0%,rgba(3,7,18,1)_100%)]" />
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
          </>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(243,244,246,1)_0%,rgba(255,255,255,1)_100%)]" />
        )}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] ${theme === 'light' ? 'invert' : ''}`} />
      </div>

      <div className="relative z-10">
        <Navbar 
          cartCount={cart.length} 
          onOpenCart={() => setIsCartOpen(true)} 
          setPage={setPage}
          currentPage={page}
          currency={currency}
          setCurrency={setCurrency}
          notifications={notifications}
          user={user}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        
        <main>
          {renderContent()}
        </main>

        <Footer />

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          onRemove={removeFromCart}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsOrderModalOpen(true);
          }}
          currency={currency}
          billingCycle={billingCycle}
          theme={theme}
        />

        {isOrderModalOpen && user && (
          <OrderModal 
            cart={cart}
            onClose={() => setIsOrderModalOpen(false)}
            onClearCart={clearCart}
            currency={currency}
            billingCycle={billingCycle}
            onOrderSuccess={() => {
              addNotification(`Order placed successfully for ${cart.length} service(s)`);
            }}
            user={user}
            theme={theme}
          />
        )}

        <PartnerToast />
        <ChatBot />
        <TawkChat />
        <MouseParticles theme={theme} />
      </div>

      <style>{`
        .light-theme .glass {
          background: rgba(0, 0, 0, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        .light-theme .text-white { color: #111827; }
        .light-theme .text-gray-400 { color: #4b5563; }
        .light-theme .text-gray-500 { color: #6b7280; }
        .light-theme .bg-white\\/5 { background-color: rgba(0, 0, 0, 0.05); }
        .light-theme .bg-white\\/10 { background-color: rgba(0, 0, 0, 0.08); }
        .light-theme .border-white\\/5 { border-color: rgba(0, 0, 0, 0.05); }
        .light-theme .border-white\\/10 { border-color: rgba(0, 0, 0, 0.1); }
        .light-theme .bg-gray-950\\/50 { background-color: rgba(255, 255, 255, 0.8); }
        .light-theme .bg-gray-900\\/50 { background-color: rgba(249, 250, 251, 0.9); }
        .light-theme .bg-[#030712] { background-color: #f9fafb; }
        .light-theme .bg-[#0b0e14] { background-color: #ffffff; }
      `}</style>
    </div>
  );
};

export default App;
