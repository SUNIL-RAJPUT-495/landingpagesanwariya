import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MarketsList from './components/MarketsList';
import Instructions from './components/Instructions';
import Footer from './components/Footer';
import StickyBottomBar from './components/StickyBottomBar';
import './index.css';

export default function App() {
  // Direct APK Download function
  const handleDownloadApk = () => {
    const link = document.createElement('a');
    link.href = '/base.apk';
    link.setAttribute('download', 'base.apk');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      <Header />

      <main>
        <Hero
          onInstallClick={handleDownloadApk}
          onOpenModal={handleDownloadApk}
        />

        <MarketsList
          onMarketClick={handleDownloadApk}
        />

        <Instructions />
      </main>

      <Footer />

      <StickyBottomBar
        onInstallClick={handleDownloadApk}
      />
    </div>
  );
}

