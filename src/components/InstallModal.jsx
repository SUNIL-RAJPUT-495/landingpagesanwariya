import React from 'react';
import { X, Download, ArrowRight, Shield, Zap, Package } from 'lucide-react';
import logoImg from '../assets/logo.jpeg';

export default function InstallModal({ isOpen, onClose, onInstall, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="modal-top-header">
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>

          <img src={logoImg} alt="Sanwariya Boss Logo" className="modal-logo-img" />

          <h3 className="modal-header-title">{title || "Install The App"}</h3>
          <p className="modal-header-sub">
            {message || "Charts, results and betting are available only in the app"}
          </p>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <button 
            onClick={() => onInstall("Modal")}
            className="gradient-btn modal-install-btn"
          >
            <span className="btn-sub-label">Android · APK · Notifications ON</span>
            <span className="btn-main-label">
              <Download size={18} />
              <span>INSTALL APP</span>
              <ArrowRight size={18} />
            </span>
          </button>

          <div className="modal-guarantees">
            <div className="guarantee-item">
              <Shield size={12} className="text-orange" />
              <span>100% Safe</span>
            </div>
            <div className="guarantee-item">
              <Zap size={12} className="text-orange" />
              <span>Instant Install</span>
            </div>
            <div className="guarantee-item">
              <Package size={12} className="text-orange" />
              <span>No Download</span>
            </div>
          </div>

          <button className="modal-dismiss-btn" onClick={onClose}>
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
