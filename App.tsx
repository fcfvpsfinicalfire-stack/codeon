
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// Page components
import PricingPage from './pages/PricingPage';
import VPSPage from './pages/VPSPage';
import DedicatedServerPage from './pages/DedicatedServerPage';
import DiscordBotHostingPage from './pages/DiscordBotHostingPage';
import WebHostingPage from './pages/WebHostingPage';

// Homepage sections
import RustHero from './components/RustHero';
import GamesWeHost from './components/GamesWeHost';
import WhyChooseUs from './components/WhyChooseUs';
import OurGuarantees from './components/OurGuarantees';
import Locations from './components/Locations';
import ControlPanel from './components/ControlPanel';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import JoinDiscord from './components/JoinDiscord';
import AIAssistant from './components/AIAssistant';

export type Page = 'home' | 'pricing' | 'vps' | 'dedicated' | 'discord' | 'webhosting';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');

  const HomePageContent: React.FC = () => (
    <>
      <GamesWeHost />
      <WhyChooseUs />
      <Locations />
      <Testimonials />
      <JoinDiscord />
    </>
  );

  return (
    <div className="bg-dark-bg text-white min-h-screen font-sans">
      <Header setPage={setPage} />
      
      {page === 'home' && <RustHero setPage={setPage} />}
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {page === 'home' && <HomePageContent />}
        {page === 'pricing' && <PricingPage />}
        {page === 'vps' && <VPSPage />}
        {page === 'dedicated' && <DedicatedServerPage />}
        {page === 'discord' && <DiscordBotHostingPage />}
        {page === 'webhosting' && <WebHostingPage />}
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
};

export default App;