'use client';

import { useState } from 'react';
import HopiumSlider from '@/components/HopiumSlider';
import { useToast } from '@/components/ToastProvider';

/* Historical JEE Advanced score → rank interpolation table
   Compiled from 2022-2024 official data. Used as local fallback. */
const ADV_RANK_TABLE: Array<{ score: number; rank: number }> = [
  { score: 355, rank: 3 },
  { score: 340, rank: 12 },
  { score: 325, rank: 35 },
  { score: 310, rank: 95 },
  { score: 300, rank: 185 },
  { score: 290, rank: 360 },
  { score: 280, rank: 580 },
  { score: 270, rank: 850 },
  { score: 260, rank: 1200 },
  { score: 250, rank: 1700 },
  { score: 240, rank: 2300 },
  { score: 230, rank: 3000 },
  { score: 220, rank: 3900 },
  { score: 210, rank: 4900 },
  { score: 200, rank: 6100 },
  { score: 190, rank: 7500 },
  { score: 180, rank: 9200 },
  { score: 170, rank: 11000 },
  { score: 160, rank: 13000 },
  { score: 150, rank: 15200 },
  { score: 140, rank: 17500 },
  { score: 130, rank: 19800 },
  { score: 120, rank: 22000 },
  { score: 110, rank: 24500 },
  { score: 100, rank: 27000 },
  { score: 90,  rank: 30000 },
  { score: 80,  rank: 33500 },
  { score: 70,  rank: 37500 },
  { score: 60,  rank: 41500 },
  { score: 50,  rank: 45000 },
  { score: 40,  rank: 48000 },
  { score: 30,  rank: 51000 },
  { score: 20,  rank: 53000 },
];

function interpolateRank(score: number, hopium: number): number {
  const sorted = [...ADV_RANK_TABLE].sort((a, b) => b.score - a.score);
  if (score >= sorted[0].score) return Math.round(sorted[0].rank * (1 + hopium));
  if (score <= sorted[sorted.length - 1].score) return Math.round(sorted[sorted.length - 1].rank * (1 + hopium));

  let upper = sorted[0], lower = sorted[sorted.length - 1];
  for (const entry of sorted) {
    if (entry.score >= score) lower = entry;
    if (entry.score <= score && entry.score > upper.score) upper = entry;
  }
  if (lower.score === upper.score) return Math.round(lower.rank * (1 + hopium));
  const t = (score - lower.score) / (upper.score - lower.score);
  const rank = lower.rank + t * (upper.rank - lower.rank);
  return Math.max(1, Math.round(rank * (1 + hopium)));
}

export default function AdvancedPage() {
  const [marks, setMarks] = useState('');
  const [hopium, setHopium] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    rank: string | null;
    category: string;
    label: string;
    source?: string;
  }>({ rank: null, category: 'Standby', label: 'Awaiting Input' });
  const { showToast } = useToast();

  const predict = async () => {
    const score = parseFloat(marks);
    if (isNaN(score) || score < 0 || score > 360) {
      showToast('Invalid Score', 'JEE Advanced score should be between 0 and 360.', 'error');
      return;
    }

    setLoading(true);
    setResult(prev => ({ ...prev, label: 'Calculating...' }));

    /* Try live API first */
    try {
      const resp = await fetch('https://digiadvanced.com/directpredict.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ marks: score, hopium_factor: hopium, exam: 'advanced' }),
      });
      if (!resp.ok) throw new Error('api error');
      const d = await resp.json();
      if (d.error) throw new Error(d.error);

      let category = 'General';
      if (score >= 300) category = 'Top 100 Territory';
      else if (score >= 250) category = 'Top 500 Bracket';
      else if (score >= 200) category = 'IIT Qualifier Zone';
      else if (score >= 150) category = 'Border Zone';
      else category = 'Below Cutoff Risk';

      setResult({
        rank: d.predicted_rank || d.rank || interpolateRank(score, hopium).toLocaleString('en-IN'),
        category,
        label: 'JEE Advanced Predicted Rank',
        source: 'Live API',
      });
    } catch {
      /* Local interpolation fallback */
      const rank = interpolateRank(score, hopium);

      let category = 'General';
      if (score >= 300) category = 'Top 100 Territory';
      else if (score >= 250) category = 'Top 500 Bracket';
      else if (score >= 200) category = 'IIT Qualifier Zone';
      else if (score >= 150) category = 'Border Zone';
      else category = 'Below Cutoff Risk';

      setResult({
        rank: rank.toLocaleString('en-IN'),
        category,
        label: 'JEE Advanced Predicted Rank',
        source: 'Local Engine',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f9f9f0] dark:bg-[#0f0e0b] min-h-screen">
      {/* Header */}
      <div className="bg-[#d5fad3] pt-28 pb-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="anim-fade-up">
              <p className="text-code-label text-[#3d3b34] uppercase tracking-widest mb-3">Advanced Predictor</p>
              <h1 className="text-display-large text-[#0f0e0b]">JEE Advanced Rank</h1>
              <p className="text-body-large text-[#3d3b34] mt-3">Estimate your All India Rank from past data</p>
            </div>
            <a
              href="https://score.alphajee.online"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex-shrink-0"
              style={{ borderColor: '#0f0e0b', color: '#0f0e0b', fontSize: '11px', padding: '10px 20px' }}
            >
              Calculate Score First
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Input panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#f9f9f0] dark:bg-[#21201c] p-8 border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 anim-fade-up">
              <div className="mb-8">
                <label className="block text-code-micro text-[#9d937c] uppercase tracking-widest mb-3">
                  Your Expected Score (0–360)
                </label>
                <div className="flex apple-input overflow-hidden">
                  <input
                    type="number"
                    value={marks}
                    onChange={e => setMarks(e.target.value)}
                    placeholder="E.g. 210"
                    min="0"
                    max="360"
                    onKeyDown={e => e.key === 'Enter' && predict()}
                    className="bg-transparent px-3 sm:px-5 py-4 text-xl sm:text-2xl flex-1 min-w-0 focus:outline-none text-[#0f0e0b] dark:text-[#f9f9f0] font-akkurat font-bold"
                  />
                  <button
                    onClick={predict}
                    disabled={loading}
                    className="px-4 sm:px-8 m-1.5 shrink-0 text-code-micro uppercase tracking-widest transition-all active:scale-95 disabled:opacity-60"
                    style={{ background: 'var(--dynamic-primary)', color: 'var(--dynamic-primary-text, #f9f9f0)', borderRadius: '9999px' }}
                  >
                    {loading ? '...' : 'Predict'}
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10">
                <HopiumSlider value={hopium} onChange={setHopium} score={parseFloat(marks) || 0} />
              </div>
            </div>

            <div className="p-6 bg-[#d5fad3] border border-[#0f0e0b]/10 anim-fade-up anim-fade-up-d2">
              <p className="text-code-micro text-[#3d3b34] uppercase tracking-widest mb-2">About the Engine</p>
              <p className="text-body-small text-[#21201c] leading-relaxed">
                Ranks are interpolated from historical JEE Advanced performance data (2022–2024). The Hopium Module applies a variance factor. Actual results may vary based on paper difficulty and candidate pool.
              </p>
            </div>
          </div>

          {/* Result card */}
          <div className="lg:col-span-7 flex">
            <div className={`result-chrome-card w-full p-8 md:p-12 flex flex-col justify-center items-center text-center anim-scale-in ${loading ? 'animate-pulse' : ''}`}>
              {result.rank && (
                <div className="w-full flex justify-between items-center mb-10">
                  <div className="text-left">
                    <span className="text-code-micro text-[#9d937c] uppercase tracking-widest block mb-1">Total Qualifiers</span>
                    <span className="text-heading-2xl font-bold text-[#0f0e0b] dark:text-[#f9f9f0]">~1.8 Lakhs</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 border border-[#0f0e0b]/15 dark:border-[#f9f9f0]/15" style={{ borderRadius: '9999px' }}>
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-[#0f0e0b] dark:bg-[#f9f9f0] opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0f0e0b] dark:bg-[#f9f9f0]" />
                    </span>
                    <span className="text-code-micro text-[#9d937c] uppercase tracking-widest">{result.source || 'AlphaJEE'}</span>
                  </div>
                </div>
              )}

              <div className="mb-10 w-full">
                <p className="text-code-label uppercase tracking-widest mb-4" style={{ color: 'var(--dynamic-primary)' }}>
                  {result.label}
                </p>
                <div
                  className="font-akkurat leading-none text-[#0f0e0b] dark:text-[#f9f9f0]"
                  style={{ fontSize: result.rank ? 'clamp(48px, 8vw, 88px)' : '64px', fontWeight: 700 }}
                >
                  {result.rank || '---'}
                </div>
              </div>

              {result.rank && (
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-[#d5fad3]/30 border border-[#d5fad3]/60 p-4 text-center">
                    <span className="text-code-micro text-[#3d3b34] uppercase tracking-widest block mb-1">Category</span>
                    <span className="text-body-small font-bold text-[#0f0e0b] dark:text-[#f9f9f0] uppercase">{result.category}</span>
                  </div>
                  <div className="bg-[#badbee]/20 border border-[#badbee]/40 p-4 text-center">
                    <span className="text-code-micro text-[#3d3b34] uppercase tracking-widest block mb-1">Algorithm</span>
                    <span className="text-body-small font-bold text-[#0f0e0b] dark:text-[#f9f9f0] uppercase">Interpolation V4</span>
                  </div>
                </div>
              )}

              {!result.rank && (
                <p className="text-body-small text-[#9d937c] mt-4">
                  Enter your score and press Predict to see your estimated AIR.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Explainer */}
        <div className="mt-20 border-t border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 pt-16">
          <h2 className="text-display-medium text-[#0f0e0b] dark:text-[#f9f9f0] mb-8 max-w-2xl">
            Why use AlphaJEE for JEE Advanced?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0f0e0b]/10 dark:bg-[#f9f9f0]/10">
            {[
              { title: 'Historical Data', desc: 'Score-to-rank mapping built from 3 years of official JEE Advanced results. Updated each cycle.', color: '#d5fad3' },
              { title: 'Hopium Module', desc: 'Unique variance slider to simulate stricter or relaxed competitive outcomes. Adjust for exam-day conditions.', color: '#badbee' },
              { title: 'No Login. No Fees.', desc: 'Use it freely. No account required, no paywall, no coaching affiliate links. Just the data.', color: '#efecca' },
            ].map((item, i) => (
              <div key={i} className={`p-8 bg-[#f9f9f0] dark:bg-[#0f0e0b] anim-fade-up`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="inline-block px-3 py-1 text-code-micro uppercase tracking-widest text-[#0f0e0b] mb-4" style={{ backgroundColor: item.color, borderRadius: '9999px' }}>
                  0{i + 1}
                </div>
                <h3 className="text-heading-2xl text-[#0f0e0b] dark:text-[#f9f9f0] mb-3">{item.title}</h3>
                <p className="text-body-base text-[#9d937c] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
