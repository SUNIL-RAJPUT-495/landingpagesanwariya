import React from 'react';
import logoImg from '../assets/logo.jpeg';

export default function Header() {
  return (
    <header className="site-header">
      <a href="/" className="logo-brand">
        <img src={logoImg} alt="Sanwariya Boss Logo" className="logo-img" />
        <div className="logo-text">
          <span>Sanwariya</span>
          <span className="logo-badge">Boss</span>
        </div>
      </a>
      
      <div className="live-indicator">
        <span className="live-dot"></span>
        <span>LIVE</span>
      </div>
    </header>
  );
}

