import React from 'react';
import { Download } from 'lucide-react';

const STEPS = [
  "Upar INSTALL APP dabao",
  "Browser ke popup me Install confirm karo",
  "App home screen par aa jayegi — koi download nahi",
  "Kholo aur khelna shuru karo 🎉"
];

export default function Instructions() {
  return (
    <section className="instructions-section">
      <h2 className="section-title">
        <Download className="text-orange" size={22} />
        <span>Install Kaise Karein?</span>
      </h2>

      <div className="glass-card instructions-card">
        <div className="steps-list">
          {STEPS.map((step, idx) => (
            <div key={idx} className="step-item">
              <div className="step-number">{idx + 1}</div>
              <div className="step-text">{step}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
