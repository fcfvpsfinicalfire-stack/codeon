
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import FloatingAction from './components/FloatingAction';
import ExclusiveFeatures from './components/ExclusiveFeatures';
import HostingResources from './components/HostingResources';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import DiscordBanner from './components/DiscordBanner';
import Footer from './components/Footer';
import MinecraftHostingPage from './pages/MinecraftHostingPage';
import CheckoutPage from './pages/CheckoutPage';
import RustHostingPage from './pages/RustHostingPage';
import ArkHostingPage from './pages/ArkHostingPage';
import FiveMHostingPage from './pages/FiveMHostingPage';
import ArticlePage from './pages/ArticlePage';
import FAQPage from './pages/FAQPage';
import ControlPage from './pages/ControlPage';
import HardwareLocationsPage from './pages/HardwareLocationsPage';
import PartnersPage from './pages/PartnersPage';
import KnowledgebasePage from './pages/KnowledgebasePage';
import BlogPage from './pages/BlogPage';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'minecraft' | 'checkout' | 'rust' | 'ark' | 'fivem' | 'article' | 'faq' | 'control' | 'hardware' | 'partners' | 'knowledgebase' | 'blog'>('home');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleNavigateToCheckout = (plan: any) => {
    setSelectedPlan(plan);
    setView('checkout');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-[#0f172a]">
      <div className="absolute top-0 left-0 w-full h-[800px] custom-gradient -z-10" />
      
      <div className="bg-blue-600/90 py-2 text-center text-xs font-semibold tracking-wide uppercase z-50">
        🚀 New: AI-Powered Game Recommendations launched! <button className="underline ml-2 hover:text-white/80">Try it now</button>
      </div>

      <Navbar onViewChange={setView} currentView={view} />
      
      <main className="flex-grow">
        {view === 'home' && (
          <>
            <Hero />
            <ExclusiveFeatures />
            <HostingResources onViewChange={setView} />
            <Partners />
            <TestimonialsSection />
            <FAQSection onViewChange={setView} />
            <DiscordBanner />
          </>
        )}
        {view === 'minecraft' && <MinecraftHostingPage onOrderPlan={handleNavigateToCheckout} />}
        {view === 'checkout' && <CheckoutPage plan={selectedPlan} onBack={() => {
          // Dynamic back navigation based on plan type
          if (selectedPlan?.gameType === 'rust') setView('rust');
          else if (selectedPlan?.gameType === 'ark') setView('ark');
          else if (selectedPlan?.gameType === 'fivem') setView('fivem');
          else setView('minecraft');
        }} />}
        {view === 'rust' && <RustHostingPage onOrderPlan={handleNavigateToCheckout} />}
        {view === 'ark' && <ArkHostingPage onOrderPlan={handleNavigateToCheckout} />}
        {view === 'fivem' && <FiveMHostingPage onOrderPlan={handleNavigateToCheckout} />}
        {view === 'article' && <ArticlePage />}
        {view === 'faq' && <FAQPage />}
        {view === 'control' && <ControlPage />}
        {view === 'hardware' && <HardwareLocationsPage />}
        {view === 'partners' && <PartnersPage />}
        {view === 'knowledgebase' && <KnowledgebasePage />}
        {view === 'blog' && <BlogPage />}
      </main>

      <Footer />
      <FloatingAction />
    </div>
  );
};

export default App;
