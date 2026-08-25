import React from 'react';
import { Download, ArrowRight } from 'lucide-react';

export default function StickyBottomBar({ onInstallClick }) {
  return (
    <div className="sticky-bottom-bar">
      <div className="sticky-bar-inner">
        <button 
          onClick={() => onInstallClick("Sticky Bottom Bar")}
          className="gradient-btn sticky-install-btn"
        >
          <span className="btn-sub-label">Android · APK · Notifications ON</span>
          <span className="btn-main-label">
            <Download size={18} />
            <span>INSTALL APP</span>
            <ArrowRight size={18} />
          </span>
        </button>
      </div>
    </div>
  );
}
