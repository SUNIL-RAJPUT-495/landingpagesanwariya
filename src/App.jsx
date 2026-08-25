import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MarketsList from './components/MarketsList';
import Instructions from './components/Instructions';
import Footer from './components/Footer';
import InstallModal from './components/InstallModal';
import StickyBottomBar from './components/StickyBottomBar';
import './index.css';

const APK_URL = "/app-release.apk";

export default function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: 'Install The App',
    message: 'Charts, results and betting are available only in the app'
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

  // Main install trigger (PWA prompt + APK download fallback)
  const handleInstallApp = async (source) => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
          return;
        }
      } catch (err) {
        console.error("PWA prompt error:", err);
      }
    }

    // Direct APK Download
    const link = document.createElement('a');
    link.href = APK_URL;
    link.download = 'app-release.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
