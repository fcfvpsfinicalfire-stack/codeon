
import React, { useState, useEffect } from 'react';
import { api } from './lib/api';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import GameSelector from './components/GameSelector';
import Partners from './components/Partners';
import Footer from './components/Footer';
import ExclusiveFeatures from './components/ExclusiveFeatures';
import ControlPanelSection from './components/ControlPanelSection';
import TestimonialsSection from './components/TestimonialsSection';
import HostingResources from './components/HostingResources';
import FAQSection from './components/FAQSection';
import DiscordBanner from './components/DiscordBanner';
import FloatingAction from './components/FloatingAction';

import DashboardPage from './pages/DashboardPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import RegisterPage from './pages/RegisterPage';
import MinecraftHostingPage from './pages/MinecraftHostingPage';
import ArkHostingPage from './pages/ArkHostingPage';
import FiveMHostingPage from './pages/FiveMHostingPage';
import RustHostingPage from './pages/RustHostingPage';
import ClientPortal from './pages/ClientPortal';
import CompanyPage from './pages/CompanyPage';
import DirectOrderPage from './pages/DirectOrderPage';
import WebHostingPage from './pages/WebHostingPage';
import DedicatedHostingPage from './pages/DedicatedHostingPage';

const App: React.FC = () => {
  const [view, setView] = useState<string>('home');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  useEffect(() => {
    // Check local session
    const localUser = api.getCurrentUser();
    if (localUser) {
      setUser(localUser);
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    setView(userData.role === 'admin' ? 'admin' : 'portal');
  };

  const renderContent = () => {
    if (loading) return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Connecting to Backbone...</p>
        </div>
      </div>
    );

    switch (view) {
      case 'home':
        return (
          <>
            <Hero />
            <StatsStrip />
            <GameSelector onViewChange={setView} />
            <ExclusiveFeatures />
            <ControlPanelSection />
            <TestimonialsSection />
            <Partners />
            <HostingResources onViewChange={setView} />
            <FAQSection onViewChange={setView} />
            <DiscordBanner />
          </>
        );
      case 'minecraft': return <MinecraftHostingPage onOrderPlan={(p) => { setSelectedPlan({ ...p, game: 'minecraft' }); setView('checkout'); }} />;
      case 'ark': return <ArkHostingPage onOrderPlan={(p) => { setSelectedPlan({ ...p, game: 'ark' }); setView('checkout'); }} />;
      case 'fivem': return <FiveMHostingPage onOrderPlan={(p) => { setSelectedPlan({ ...p, game: 'fivem' }); setView('checkout'); }} />;
      case 'rust': return <RustHostingPage onOrderPlan={(p) => { setSelectedPlan({ ...p, game: 'rust' }); setView('checkout'); }} />;
      case 'web': return <WebHostingPage onOrderPlan={(p) => { setSelectedPlan({ ...p, game: 'web' }); setView('checkout'); }} />;
      case 'dedicated': return <DedicatedHostingPage onOrderPlan={(p) => { setSelectedPlan({ ...p, game: 'dedicated' }); setView('checkout'); }} />;

      // REPLACED OLD CHECKOUT WITH NEW DIRECT ORDER SYSTEM
      case 'checkout':
        return <DirectOrderPage
          onBack={() => setView('home')}
          initialGame={selectedPlan?.game || 'minecraft'}
          initialPlanId={selectedPlan?.id}
        />;
      case 'company': return <CompanyPage />;

      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setView('register')} onSwitchToAdmin={() => setView('admin-login')} />;

      case 'admin-login':
        return <AdminLoginPage onLoginSuccess={handleLoginSuccess} />;

      case 'register':
        // Register is same as Login in Google Auth flow, but we can keep the page or redirect
        return <RegisterPage onSuccess={() => setView('login')} onSwitchToLogin={() => setView('login')} />;

      case 'dashboard':
        if (!user) return <LoginPage onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setView('register')} />;
        // LEGACY DASHBOARD - KEEPING FOR BACKUP IF NEEDED
        return <DashboardPage onViewChange={setView} />;

      case 'portal':
        if (!user) return <LoginPage onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setView('register')} />;
        return <ClientPortal onLogout={() => { api.logout(); setView('home'); }} />;

      case 'admin':
        if (!user || user.role !== 'admin') return <AdminLoginPage onLoginSuccess={handleLoginSuccess} />;
        return <AdminDashboard />;

      case 'order': return <DirectOrderPage onBack={() => setView('home')} />;

      default: return <Hero />;
    }
  };

  const hideLayout = ['dashboard', 'admin', 'login', 'admin-login', 'register', 'checkout', 'portal', 'order'].includes(view);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-[#0f172a]">
      {!hideLayout && (
        <Navbar
          onViewChange={(v) => {
            setView(v);
            window.scrollTo(0, 0);
          }}
          currentView={view}
        />
      )}
      <main className="flex-grow">{renderContent()}</main>
      {!hideLayout && <Footer onViewChange={setView} />}
      <FloatingAction />
    </div>
  );
};

export default App;
