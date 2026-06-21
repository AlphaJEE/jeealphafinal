'use client';

import { useEffect, useRef } from 'react';

interface HopiumSliderProps {
  value: number;
  onChange: (val: number) => void;
  score?: number;
}

export default function HopiumSlider({ value, onChange, score = 0 }: HopiumSliderProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const getColors = (val: number) => {
    if (val < -0.01) {
      const ratio = Math.min(Math.abs(val) / 0.5, 1);
      return {
        primary: `color-mix(in sRGB, #3b82f6 ${(1 - ratio) * 100}%, #ef4444)`,
        glow: `color-mix(in sRGB, rgba(59,130,246,0.1) ${(1 - ratio) * 100}%, rgba(239,68,68,0.2))`,
        track: `linear-gradient(90deg, #ef4444, transparent)`,
        gradient: `linear-gradient(90deg, #7f1d1d, #ef4444, #fca5a5)`,
        skull: ratio,
        rocket: 0,
        neutral: 1 - ratio,
        tint: `rgba(239,68,68,${0.03 * ratio})`,
      };
    } else if (val > 0.01) {
      const ratio = Math.min(val / 0.5, 1);
      return {
        primary: `color-mix(in sRGB, #3b82f6 ${(1 - ratio) * 100}%, #22c55e)`,
        glow: `color-mix(in sRGB, rgba(59,130,246,0.1) ${(1 - ratio) * 100}%, rgba(34,197,94,0.2))`,
        track: `linear-gradient(90deg, transparent, #22c55e)`,
        gradient: `linear-gradient(90deg, #064e3b, #10b981, #6ee7b7)`,
        skull: 0,
        rocket: ratio,
        neutral: 1 - ratio,
        tint: `rgba(34,197,94,${0.03 * ratio})`,
      };
    } else {
      return {
        primary: '#0f0e0b',
        glow: 'rgba(15,14,11,0.06)',
        track: 'transparent',
        gradient: 'linear-gradient(90deg, #0f0e0b, #3d3b34, #9d937c)',
        skull: 0,
        rocket: 0,
        neutral: 1,
        tint: 'transparent',
      };
    }
  };

  useEffect(() => {
    const root = document.documentElement;

    const applyColors = () => {
      const isDark = root.classList.contains('dark');
      const colors = getColors(value);
      const percent = ((value + 0.5) / 1) * 100;

      let primary = colors.primary;
      let gradient = colors.gradient;
      let primaryText = '#f9f9f0';

      if (isDark && Math.abs(value) <= 0.01) {
        primary = '#f9f9f0';
        gradient = 'linear-gradient(90deg, #f9f9f0, #9d937c, #3d3b34)';
        primaryText = '#0f0e0b';
      }

      root.style.setProperty('--thumb-pos-pct', `${percent}`);
      root.style.setProperty('--dynamic-primary', primary);
      root.style.setProperty('--dynamic-primary-text', primaryText);
      root.style.setProperty('--dynamic-glow', colors.glow);
      root.style.setProperty('--track-gradient', colors.track);
      root.style.setProperty('--dynamic-gradient', gradient);
      root.style.setProperty('--skull-opacity', String(colors.skull));
      root.style.setProperty('--rocket-opacity', String(colors.rocket));
      root.style.setProperty('--neutral-opacity', String(colors.neutral));
      root.style.setProperty('--bg-tint', colors.tint);
    };

    applyColors();

    const observer = new MutationObserver(applyColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [value]);

  const maxInfluence = 13 + (7 * (score / 720));
  const currentImpact = value * (maxInfluence * 2);
  const displayVal = (currentImpact > 0 ? '+' : '') + currentImpact.toFixed(1) + '%';

  return (
    <div ref={rootRef}>
      <div className="flex justify-between items-end mb-2">
        <div>
          <h3 className="text-code-label text-[#0f0e0b] dark:text-[#f9f9f0] uppercase tracking-widest font-semibold">Hopium Module</h3>
          <p className="text-code-micro text-[#9d937c] uppercase mt-1">
            Rank Variance: <span className="font-akkurat" style={{ color: 'var(--dynamic-primary)' }}>{displayVal}</span>
          </p>
        </div>
      </div>

      <div className="slider-area">
        <span className="slider-deco left-0 text-red-500 font-akkurat text-[10px] font-bold tracking-widest" style={{fontSize:'10px'}}>↓</span>
        <span className="slider-deco right-0 text-green-600 font-akkurat text-[10px] font-bold tracking-widest" style={{fontSize:'10px'}}>↑</span>
        <div className="slider-track">
          <div className="slider-track-pattern"></div>
        </div>
        <div className="slider-thumb">
          <span className="thumb-emoji skull-thumb text-[#f9f9f0] font-akkurat font-bold" style={{fontSize:'11px'}}>−</span>
          <span className="thumb-emoji neutral-thumb text-[#f9f9f0] font-akkurat font-bold" style={{fontSize:'11px'}}>◆</span>
          <span className="thumb-emoji rocket-thumb text-[#f9f9f0] font-akkurat font-bold" style={{fontSize:'11px'}}>+</span>
        </div>
        <input
          type="range"
          min="-0.5"
          max="0.5"
          value={value}
          step="0.01"
          onChange={e => onChange(parseFloat(e.target.value))}
          className="slider-hidden-input"
        />
      </div>

      <div className="flex justify-between px-2 mt-[-10px] pb-2">
        <span className="text-code-micro text-red-500 uppercase">Stricter (Harder)</span>
        <span className="text-code-micro text-green-600 uppercase">Relaxed (Easier)</span>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => onChange(0)}
          className="text-code-micro text-[#9d937c] hover:text-[#0f0e0b] dark:hover:text-[#f9f9f0] uppercase tracking-widest transition-colors border border-current px-5 py-2"
          style={{ borderRadius: '9999px' }}
        >
          Reset to Neutral
        </button>
      </div>
    </div>
  );
}
