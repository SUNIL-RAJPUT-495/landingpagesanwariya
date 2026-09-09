import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MarketsList from './components/MarketsList';
import Instructions from './components/Instructions';
import Footer from './components/Footer';
import InstallModal from './components/InstallModal';
import StickyBottomBar from './components/StickyBottomBar';
import './index.css';

export default function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: 'Install SanwariyaBoss Web App',
    message: 'https://sawariya.sanwariyaboss.fun/ ko apne mobile home screen par App ki tarah install karein.'
  });

  // Listen for PWA beforeinstallprompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Main install trigger for PWA (Web App)
  const handleInstallApp = async (source) => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
          return;
        }
      } catch (err) {
        console.error("PWA prompt error:", err);
      }
    }

    // Open PWA Install Modal guide if native prompt isn't ready
    setModalState({
      isOpen: true,
      title: 'Install SanwariyaBoss Web App',
      message: 'Website https://sawariya.sanwariyaboss.fun/ ko Mobile Home Screen par install karein:'
    });
  };

  const handleOpenModal = (title, message) => {
    setModalState({
      isOpen: true,
      title,
      message
    });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleMarketClick = (marketName) => {
    handleOpenModal(
      'Install The App',
      `Open ${marketName} in the app for charts and betting.`
    );
  };

  return (
    <div className="app-container">
      <Header />

      <main>
        <Hero
          onInstallClick={handleInstallApp}
          onOpenModal={handleOpenModal}
        />

        <MarketsList
          onMarketClick={handleMarketClick}
        />

        <Instructions />
      </main>

      <Footer />

      <StickyBottomBar
        onInstallClick={handleInstallApp}
      />

      <InstallModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onInstall={handleInstallApp}
        title={modalState.title}
        message={modalState.message}
      />
    </div>
  );
}
