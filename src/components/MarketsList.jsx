import React, { useState, useEffect } from 'react';
import { Clock, Activity, RefreshCw } from 'lucide-react';

const API_URL = "https://dpbpssapi.growva.tech/api/markets";

// Default fallback data if offline/loading
const FALLBACK_MARKETS = [
  { name: 'SITA MORNING', timing: '9:40 AM — 10:40 AM', result: '33', status: 'OPEN' },
  { name: 'MILAN MORNING', timing: '10:25 AM — 11:25 AM', result: '47', status: 'OPEN' },
  { name: 'ANDHRA MORNING', timing: '10:35 AM — 11:35 AM', result: '91', status: 'OPEN' },
  { name: 'SRIDEVI', timing: '11:35 AM — 12:35 PM', result: '58', status: 'OPEN' },
  { name: 'KALYAN MORNING', timing: '11:00 AM — 12:02 PM', result: '24', status: 'OPEN' },
  { name: 'MAHADEVI MORNING', timing: '11:30 AM — 12:30 PM', result: '19', status: 'OPEN' },
  { name: 'TIME BAZAR', timing: '01:10 PM — 03:10 PM', result: '83', status: 'OPEN' },
  { name: 'MADHUR DAY', timing: '01:15 PM — 02:15 PM', result: '66', status: 'OPEN' },
  { name: 'SITA DAY', timing: '01:30 PM — 02:30 PM', result: '42', status: 'OPEN' },
  { name: 'MILAN DAY', timing: '03:00 PM — 05:00 PM', result: '90', status: 'OPEN' }
];

export default function MarketsList({ onMarketClick }) {
  const [markets, setMarkets] = useState(FALLBACK_MARKETS);
  const [loading, setLoading] = useState(true);

  // Helper to extract ONLY Center 2-Digit Jodi from API result (e.g. "123-45-678" -> "45")
  const extractCenterJodi = (rawResult) => {
    if (!rawResult || rawResult.includes('***-**-***') || rawResult.includes('***') || rawResult === 'Loading...') {
      return '**';
    }
    const str = String(rawResult).trim();
    const parts = str.split('-');
    if (parts.length >= 2 && parts[1] && parts[1].trim() !== '') {
      return parts[1].trim(); // Returns center 2 digits (Jodi)
    }
    if (str.length === 2) {
      return str;
    }
    return '**';
  };

  const fetchLiveMarkets = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      
      if (data && data.markets && Array.isArray(data.markets)) {
        // Format & filter ONLY markets that have valid live 2-digit results declared!
        const liveDeclared = data.markets
          .map(m => ({
            name: m.name,
            timing: m.timing || 'N/A',
            result: extractCenterJodi(m.result),
            rawResult: m.result,
            status: 'OPEN'
          }))
          .filter(m => m.result !== '**'); // Only keep live declared results

        if (liveDeclared.length > 0) {
          setMarkets(liveDeclared);
        } else {
          // If no results declared yet in API, keep fallback declared markets
          setMarkets(FALLBACK_MARKETS.filter(m => m.result !== '**'));
        }
      }
    } catch (err) {
      console.warn("Using fallback markets list due to fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMarkets();

    // Auto refresh live results every 15 seconds
    const interval = setInterval(fetchLiveMarkets, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="markets-section">
      <div className="section-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          <Activity className="text-orange" size={22} />
          <span>Live Markets</span>
        </h2>
        
        {loading && (
          <RefreshCw size={14} className="text-orange animate-spin" style={{ opacity: 0.8 }} />
        )}
      </div>

      <div className="market-cards-list">
        {markets.map((market, index) => (
          <div
            key={index}
            className="glass-card market-card"
            onClick={() => onMarketClick(market.name)}
          >
            <div className="market-info">
              <div className="market-name">{market.name}</div>
              <div className="market-time">
                <Clock size={13} />
                <span>{market.timing || market.time}</span>
              </div>
            </div>

            <div className="market-right">
              {/* Center 2-Digit Jodi Number Displayed BOLD */}
              <div className="market-result" style={{ letterSpacing: '1px' }}>
                {market.result}
              </div>
              <span className={`status-badge ${market.status.toLowerCase()}`}>
                {market.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
