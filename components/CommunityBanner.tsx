'use client';

import { useState, useEffect } from 'react';

export default function CommunityBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hidden = sessionStorage.getItem('alphajee_banner_hidden');
    if (!hidden) setVisible(true);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('alphajee_banner_hidden', 'true');
  };

  if (!visible) return null;

  return (
    <div className="community-banner" style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom))' }}>
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="flex-shrink-0 w-8 h-8 bg-[#d5fad3] flex items-center justify-center">
          <svg className="w-4 h-4 text-[#0f0e0b]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-code-label text-[#f9f9f0] uppercase tracking-widest">Join the Community</p>
          <p className="text-body-small text-[#9d937c] hidden sm:block">Connect with fellow aspirants on Reddit &amp; Discord</p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <a
          href="https://reddit.com/r/alphajee"
          target="_blank"
          rel="noopener noreferrer"
          className="text-code-micro uppercase tracking-widest px-4 py-1.5 border border-[#f9f9f0]/30 bg-[#f9f9f0]/10 hover:bg-[#f9f9f0]/20 transition-colors text-[#f9f9f0]"
          style={{ borderRadius: '9999px' }}
        >
          r/alphajee
        </a>
        <a
          href="https://discord.gg/QYzZcMDBHY"
          target="_blank"
          rel="noopener noreferrer"
          className="text-code-micro uppercase tracking-widest px-4 py-1.5 border border-[#f9f9f0]/30 bg-[#f9f9f0]/10 hover:bg-[#f9f9f0]/20 transition-colors text-[#f9f9f0]"
          style={{ borderRadius: '9999px' }}
        >
          Discord
        </a>
        <button
          onClick={dismiss}
          className="text-[#9d937c] hover:text-[#f9f9f0] transition-colors p-1"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
