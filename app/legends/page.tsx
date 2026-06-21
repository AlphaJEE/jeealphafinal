'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Donator {
  redditID: string;
  amount: number;
  description: string;
  isLegend: boolean;
}

const TIER_CONFIG: Array<{ min: number; label: string; accent: string; border: string }> = [
  { min: 400, label: 'Apex',      accent: '#badbee', border: 'rgba(186,219,238,0.8)' },
  { min: 250, label: 'Elite',     accent: '#d5fad3', border: 'rgba(213,250,211,0.8)' },
  { min: 120, label: 'Patron',    accent: '#efecca', border: 'rgba(239,236,202,0.8)' },
  { min: 80,  label: 'Supporter', accent: '#f9f9f0', border: 'rgba(249,249,240,0.4)' },
  { min: 50,  label: 'Backer',    accent: '#f9f9f0', border: 'rgba(249,249,240,0.25)' },
  { min: 20,  label: 'Contributor', accent: '#f9f9f0', border: 'rgba(249,249,240,0.15)' },
];

function getTier(amount: number) {
  for (const t of TIER_CONFIG) if (amount >= t.min) return t;
  return TIER_CONFIG[TIER_CONFIG.length - 1];
}

export default function LegendsPage() {
  const [donators, setDonators] = useState<Donator[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);

  useEffect(() => {
    fetch('/donators.json')
      .then(r => r.json())
      .then(d => { setDonators(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const legends    = donators.filter(d => d.isLegend);
  const supporters = donators.filter(d => !d.isLegend);

  return (
    <div className="bg-[#f9f9f0] dark:bg-[#0f0e0b] min-h-screen">

      {/* Hero — clean dark, no checkerboard */}
      <div className="bg-[#0f0e0b] pt-28 pb-24 px-5 sm:px-8 relative overflow-hidden">
        {/* Subtle architectural grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(#f9f9f0 1px, transparent 1px), linear-gradient(90deg, #f9f9f0 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{
          background: 'linear-gradient(90deg, #d5fad3, #badbee, #efecca)',
        }} />

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="max-w-3xl">
            <p className="text-code-label text-[#9d937c] uppercase tracking-widest mb-5 anim-fade-up">Wall of Legends</p>
            <h1 className="text-display-large text-[#f9f9f0] mb-6 anim-fade-up anim-fade-up-d1">
              The people who kept<br />the lights on.
            </h1>
            <p className="text-body-large text-[#9d937c] max-w-2xl anim-fade-up anim-fade-up-d2">
              AlphaJEE runs on zero ads. Every rupee here went directly to server costs and keeping the data honest for every aspirant.
            </p>
          </div>
        </div>
      </div>

      {/* Tier legend strip */}
      <div className="bg-[#21201c] border-b border-[#0f0e0b]/20 px-5 sm:px-8 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center gap-6 overflow-x-auto no-scrollbar">
          <span className="text-code-micro text-[#9d937c] uppercase tracking-widest flex-shrink-0">Tiers:</span>
          {TIER_CONFIG.map((t) => (
            <div key={t.label} className="flex items-center gap-2 flex-shrink-0">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.accent }} />
              <span className="text-code-micro text-[#9d937c] uppercase tracking-widest">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16">
        {loading && (
          <div className="text-center py-24">
            <div className="w-8 h-8 border-2 border-[#0f0e0b] dark:border-[#f9f9f0] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-code-label text-[#9d937c] uppercase tracking-widest">Loading legends...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-24">
            <p className="text-body-base text-[#9d937c]">Could not load the list of supporters at this time.</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Legends */}
            {legends.length > 0 && (
              <div className="mb-20">
                <div className="flex items-center gap-6 mb-10">
                  <h2 className="text-display-medium text-[#0f0e0b] dark:text-[#f9f9f0] flex-shrink-0">Legends</h2>
                  <div className="flex-1 h-px bg-[#0f0e0b]/10 dark:bg-[#f9f9f0]/10" />
                  <span className="text-code-micro text-[#9d937c] uppercase tracking-widest flex-shrink-0">{legends.length} patrons</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#0f0e0b]/10 dark:bg-[#f9f9f0]/10">
                  {legends.map((d, i) => {
                    const tier = getTier(d.amount);
                    return (
                      <div
                        key={i}
                        className="bg-[#f9f9f0] dark:bg-[#0f0e0b] p-8 flex flex-col transition-colors duration-200 hover:bg-[#f0efe6] dark:hover:bg-[#21201c]"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <span
                            className="text-code-micro uppercase tracking-widest px-3 py-1"
                            style={{ background: tier.accent, color: '#0f0e0b', borderRadius: '9999px' }}
                          >
                            {tier.label}
                          </span>
                          <span className="font-akkurat text-[11px] text-[#9d937c]">₹{d.amount}</span>
                        </div>
                        <p className="text-heading-2xl text-[#0f0e0b] dark:text-[#f9f9f0] font-bold mb-3 break-all">{d.redditID}</p>
                        {d.description && (
                          <p className="text-body-small text-[#9d937c] leading-relaxed flex-grow">{d.description}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Supporters */}
            {supporters.length > 0 && (
              <div>
                <div className="flex items-center gap-6 mb-10">
                  <h2 className="text-display-medium text-[#0f0e0b] dark:text-[#f9f9f0] flex-shrink-0">Supporters</h2>
                  <div className="flex-1 h-px bg-[#0f0e0b]/10 dark:bg-[#f9f9f0]/10" />
                  <span className="text-code-micro text-[#9d937c] uppercase tracking-widest flex-shrink-0">{supporters.length} contributors</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-[#0f0e0b]/10 dark:bg-[#f9f9f0]/10">
                  {supporters.map((d, i) => {
                    const tier = getTier(d.amount);
                    return (
                      <div
                        key={i}
                        className="bg-[#f9f9f0] dark:bg-[#0f0e0b] p-6 flex flex-col transition-colors duration-200 hover:bg-[#f0efe6] dark:hover:bg-[#21201c]"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: tier.accent }} />
                          <span className="font-akkurat text-[10px] text-[#9d937c]">₹{d.amount}</span>
                        </div>
                        <p className="text-subheading text-[#0f0e0b] dark:text-[#f9f9f0] font-bold break-all">{d.redditID}</p>
                        {d.description && (
                          <p className="text-body-small text-[#9d937c] leading-relaxed mt-2 text-[13px]">{d.description}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-20 bg-[#0f0e0b] p-10 md:p-14">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <p className="text-code-label text-[#9d937c] uppercase tracking-widest mb-3">Join them</p>
                  <h3 className="text-display-medium text-[#f9f9f0]">Support the mission</h3>
                  <p className="text-body-large text-[#9d937c] max-w-lg mt-4">
                    Every rupee keeps AlphaJEE free, ad-free, and honest for the next generation of aspirants.
                  </p>
                </div>
                <Link href="/donate" className="btn-primary flex-shrink-0"
                  style={{ backgroundColor: '#d5fad3', color: '#0f0e0b', borderColor: '#d5fad3' }}>
                  Become a Legend
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
