import React from 'react';
import { Download, ArrowRight, BarChart2, Play, Zap, Shield, Package } from 'lucide-react';

export default function Hero({ onInstallClick, onOpenModal }) {
  return (
    <section className="hero-section">
      <div className="instant-tag">
        <Zap size={14} className="text-orange" />
        <span>INSTANT INSTALL</span>
      </div>

      <h1 className="hero-title">
        Sanwariya<span className="text-orange">Boss</span>
      </h1>

      <p className="hero-subtitle">
        Live matka results, charts aur markets — ek hi app me.
      </p>

      {/* Main Hero Install Container */}
      <div className="hero-install-box">
        <button
          onClick={() => onInstallClick("Hero Section")}
          className="gradient-btn main-install-btn"
        >
          <span className="btn-sub-label">Android · APK · Notifications ON</span>
          <span className="btn-main-label">
            <Download size={20} />
            <span>INSTALL APP</span>
            <ArrowRight size={20} />
          </span>
        </button>

        <div className="install-guarantees">
          <div className="guarantee-item">
            <Shield size={13} className="text-orange" />
            <span>100% Safe</span>
          </div>
          <div className="guarantee-item">
            <Package size={13} className="text-orange" />
            <span>No Download</span>
          </div>
          <div className="guarantee-item">
            <Zap size={13} className="text-orange" />
            <span>0 MB</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-value">1L+</div>
          <div className="stat-label">PLAYERS</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-value">4.8</div>
          <div className="stat-label">RATING</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-value">24/7</div>
          <div className="stat-label">SUPPORT</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-value">0 MB</div>
          <div className="stat-label">SIZE</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="hero-actions-grid">
        <button
          onClick={() => onOpenModal("Charts", "Charts, results and betting are available only in the app")}
          className="action-btn"
        >
          <BarChart2 size={18} className="text-orange" />
          <span>CHARTS</span>
        </button>
        <button
          onClick={() => onOpenModal("Play Now", "Charts, results and betting are available only in the app")}
          className="action-btn"
        >
          <Play size={18} className="text-orange" fill="#f96d00" />
          <span>PLAY NOW</span>
        </button>
      </div>
    </section>
  );
}
