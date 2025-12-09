

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// Page components
import PricingPage from './pages/PricingPage';
import VPSPage from './pages/VPSPage';
import DedicatedServerPage from './pages/DedicatedServerPage';
import DiscordBotHostingPage from './pages/DiscordBotHostingPage';
import WebHostingPage from './pages/WebHostingPage';
import GameServersPage from './pages/GameServersPage';
import ContactPage from './pages/ContactPage';

// Homepage sections
import LoadingScreen from './components/LoadingScreen';
import NotificationBanner from './components/NotificationBanner';
import MainHero from './components/MainHero';
import TrustBadges from './components/TrustBadges';
import SolutionsShowcase from './components/SolutionsShowcase';
import WhyChooseUs from './components/WhyChooseUs';
import OurPlatform from './components/OurPlatform';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import JoinDiscord from './components/JoinDiscord';
import AdvancedFeatures from './components/AdvancedFeatures';
import Locations from './components/Locations';
import SimplePricingPlans from './components/SimplePricingPlans';
import GrowthMetrics from './components/GrowthMetrics';


export interface Plan {
  name: string;
  price: string;
  ram?: string;
  cpu?: string;
  ssd?: string;
  paypalLink?: string;
  [key: string]: any; // Allow other properties
}

export type Page = 'home' | 'pricing' | 'vps' | 'dedicated' | 'discord' | 'webhosting' | 'gameservers' | 'contact';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Simulate loading for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);
  

  if (isLoading) {
    return <LoadingScreen />;
  }

  const HomePageContent: React.FC = () => (
    <>
      <MainHero setPage={setPage} />
      <TrustBadges />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SolutionsShowcase setPage={setPage} />
      </div>
      <WhyChooseUs />
      <OurPlatform />
      <GrowthMetrics />
      <AdvancedFeatures />
      <Locations />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SimplePricingPlans setPage={setPage} />
      </div>
      <Testimonials />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FAQ />
        <JoinDiscord />
      </div>
    </>
  );

  return (
    <div className="bg-dark-bg text-white min-h-screen font-sans animate-fade-in relative overflow-x-hidden">
        <div className="absolute inset-0 z-0 opacity-20 animate-plexus-pan"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='https://i.postimg.cc/XqrZ3t7H/image.png' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%2317182B' fill-opacity='0.4'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7-7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`,
            }}
        ></div>
        <div className="absolute inset-0 z-0 opacity-50 animate-grid-pan"
            style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '120px 120px',
            }}
      ></div>

      <Header setPage={setPage} />
      <NotificationBanner />
      
      <main className="relative z-10">
        {page === 'home' && <HomePageContent />}
        {page === 'pricing' && <PricingPage />}
        {page === 'gameservers' && <GameServersPage />}
        {page === 'vps' && <VPSPage />}
        {page === 'dedicated' && <DedicatedServerPage />}
        {page === 'discord' && <DiscordBotHostingPage />}
        {page === 'webhosting' && <WebHostingPage />}
        {page === 'contact' && <ContactPage />}
      </main>

      <Footer setPage={setPage}/>
    </div>
  );
};

export default App;