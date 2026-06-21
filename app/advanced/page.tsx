'use client';

import { useState, useRef } from 'react';
import HopiumSlider from '@/components/HopiumSlider';
import { useToast } from '@/components/ToastProvider';

const POOL_MAP: Record<string, string> = {
  'CRL': '~2.5 Lakhs',
  'OBC': '~75k Candidates',
  'EWS': '~35k Candidates',
  'SC':  '~40k Candidates',
  'ST':  '~15k Candidates'
};

/* Historical JEE Advanced score → rank interpolation table as ultimate local fallback */
const ADV_RANK_TABLE: Array<{ score: number; rank: number }> = [
  { score: 355, rank: 3 }, { score: 340, rank: 12 }, { score: 325, rank: 35 },
  { score: 310, rank: 95 }, { score: 300, rank: 185 }, { score: 290, rank: 360 },
  { score: 280, rank: 580 }, { score: 270, rank: 850 }, { score: 260, rank: 1200 },
  { score: 250, rank: 1700 }, { score: 240, rank: 2300 }, { score: 230, rank: 3000 },
  { score: 220, rank: 3900 }, { score: 210, rank: 4900 }, { score: 200, rank: 6100 },
  { score: 190, rank: 7500 }, { score: 180, rank: 9200 }, { score: 170, rank: 11000 },
  { score: 160, rank: 13000 }, { score: 150, rank: 15200 }, { score: 140, rank: 17500 },
  { score: 130, rank: 19800 }, { score: 120, rank: 22000 }, { score: 110, rank: 24500 },
  { score: 100, rank: 27000 }, { score: 90,  rank: 30000 }, { score: 80,  rank: 33500 },
  { score: 70,  rank: 37500 }, { score: 60,  rank: 41500 }, { score: 50,  rank: 45000 },
  { score: 40,  rank: 48000 }, { score: 30,  rank: 51000 }, { score: 20,  rank: 53000 },
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
  const [category, setCategory] = useState('CRL');
  const [engine, setEngine] = useState<'data' | 'hist'>('data');
  const [dataSource, setDataSource] = useState<'prov' | 'mog'>('prov');
  const [hopium, setHopium] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [result, setResult] = useState<{
    rank: string | null;
    crlRank: string | null;
    label: string;
    bucket: string;
    status: 'standby' | 'success' | 'failed' | 'not-qualified';
    pool: string;
  }>({ 
    rank: null, 
    crlRank: null, 
    label: 'Awaiting Input', 
    bucket: 'Standby',
    status: 'standby',
    pool: POOL_MAP['CRL']
  });

  const { showToast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);

  const predict = async () => {
    const score = parseFloat(marks);
    if (isNaN(score) || score < 0 || score > 360) {
      showToast('Invalid Score', 'JEE Advanced score must be between 0 and 360.', 'error');
      return;
    }

    setLoading(true);
    setResult(prev => ({ ...prev, label: 'Processing Data...', status: 'standby' }));

    // Dynamic Hopium Calculation from old JS logic
    const maxInfluence = 13 + (7 * (score / 360));
    const effectiveHopium = (hopium * (maxInfluence * 2)) / 100;

    const payload = {
      score,
      hopiumVal: effectiveHopium,
      rawHopium: hopium,
      category,
      keyType: dataSource
    };

    try {
      let finalData: any = {};

      if (engine === 'hist') {
        const response = await fetch('https://predictor.akashdeep122a.workers.dev/api/adv-static', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error("Server rejected request");
        finalData = await response.json();
      } else {
        // Data-driven Engine Routing
        if (category === 'CRL') {
          const response = await fetch('https://predictor.akashdeep122a.workers.dev/api/adv-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (!response.ok) throw new Error("Server rejected request");
          finalData = await response.json();
        } else {
          // Concurrent fetch for Category Data and CRL Data
          const [catRes, crlRes] = await Promise.all([
            fetch('https://predictor.akashdeep122a.workers.dev/api/adv-static', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            }),
            fetch('https://predictor.akashdeep122a.workers.dev/api/adv-data', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...payload, category: 'CRL' })
            })
          ]);

          if (!catRes.ok || !crlRes.ok) throw new Error("Engines rejected the request");
          const catData = await catRes.json();
          const crlData = await crlRes.json();

          if (!catData.success || !crlData.success) {
            throw new Error(catData.error || crlData.error || "Engine compilation error");
          }

          finalData = {
            success: true,
            rankRange: catData.rankRange,
            crlRange: crlData.rankRange,
            bucketText: catData.bucketText
          };
        }
      }

      // Handle Qualification Cutoff Enforcements
      if (finalData.rankRange === "N/A" || finalData.rankRange === "Not Qualified") {
        setResult({
          rank: "NOT CLEARED",
          crlRank: null,
          label: "Qualification Status",
          bucket: finalData.bucketText || 'Score is below cut-off limits.',
          status: 'not-qualified',
          pool: POOL_MAP[category] || '~2.5 Lakhs'
        });
        showToast('Score Too Low', finalData.bucketText || 'Score is below cut-off limits.', 'error');
        return;
      }

      setResult({
        rank: finalData.rankRange,
        crlRank: finalData.crlRange && finalData.crlRange !== finalData.rankRange ? finalData.crlRange : null,
        label: category === 'CRL' ? "Expected All India Rank (CRL)" : `Expected Category Rank (${category})`,
        bucket: finalData.bucketText || (engine === 'data' ? 'Mathematical Segment Model' : 'Historical Interpolation'),
        status: 'success',
        pool: POOL_MAP[category] || '~2.5 Lakhs'
      });

    } catch (err: any) {
      /* Local interpolation fallback */
      const rankVal = interpolateRank(score, hopium);
      setResult({
        rank: rankVal.toLocaleString('en-IN'),
        crlRank: null,
        label: category === 'CRL' ? 'Expected Rank (Local Fallback)' : `Expected Category Rank (Fallback)`,
        bucket: 'Local Engine (Offline)',
        status: 'success',
        pool: POOL_MAP[category] || '~2.5 Lakhs'
      });
      showToast('API Offline', 'Showing local fallback calculation.', 'error');
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
              <p className="text-code-label text-[#3d3b34] uppercase tracking-widest mb-3">Alpha Engine V4</p>
              <h1 className="text-display-large text-[#0f0e0b]">JEE Advanced Rank</h1>
              <p className="text-body-large text-[#3d3b34] mt-3">Data-Backed Air Extrapolation</p>
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
            
            {/* Advanced Routing Controls */}
            <div className="flex flex-col sm:flex-row gap-4 p-4 bg-[#f9f9f0] dark:bg-[#21201c] border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 anim-fade-up">
              
              <div className={`flex flex-col items-center w-full transition-opacity duration-300 ${engine === 'hist' ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                <span className="text-[9px] uppercase font-black tracking-widest text-[#9d937c] mb-2 block">Data Source</span>
                <div className="bg-[#f0f0e8] dark:bg-[#1a1915] p-1.5 rounded-2xl border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 inline-flex relative w-full shadow-inner">
                  <div 
                    className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#00d084] rounded-xl transition-transform duration-300 ease-out shadow-md"
                    style={{ transform: dataSource === 'prov' ? 'translateX(0)' : 'translateX(100%)', left: '6px' }}
                  />
                  <button 
                    onClick={() => setDataSource('prov')}
                    className={`flex-1 relative z-10 py-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${dataSource === 'prov' ? 'text-black' : 'text-[#9d937c]'}`}
                  >
                    Provisional
                  </button>
                  <button 
                    onClick={() => setDataSource('mog')}
                    className={`flex-1 relative z-10 py-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${dataSource === 'mog' ? 'text-black' : 'text-[#9d937c]'}`}
                  >
                    MOG Data
                  </button>
                </div>
              </div>

              <div className="hidden sm:block w-px bg-[#0f0e0b]/10 dark:bg-[#f9f9f0]/10"></div>

              <div className="flex flex-col items-center w-full">
                <span className="text-[9px] uppercase font-black tracking-widest text-[#9d937c] mb-2 block">Prediction Engine</span>
                <div className="bg-[#f0f0e8] dark:bg-[#1a1915] p-1.5 rounded-2xl border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 inline-flex relative w-full shadow-inner">
                  <div 
                    className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-blue-500 rounded-xl transition-transform duration-300 ease-out shadow-md"
                    style={{ transform: engine === 'data' ? 'translateX(0)' : 'translateX(100%)', left: '6px' }}
                  />
                  <button 
                    onClick={() => setEngine('data')}
                    className={`flex-1 relative z-10 py-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${engine === 'data' ? 'text-white' : 'text-[#9d937c]'}`}
                  >
                    Data Based
                  </button>
                  <button 
                    onClick={() => setEngine('hist')}
                    className={`flex-1 relative z-10 py-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${engine === 'hist' ? 'text-white' : 'text-[#9d937c]'}`}
                  >
                    Historical
                  </button>
                </div>
              </div>

            </div>

            <div className="bg-[#f9f9f0] dark:bg-[#21201c] p-8 border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 anim-fade-up">
              
              <div className="mb-6">
                <label className="block text-[11px] font-black text-[#9d937c] uppercase tracking-widest mb-3">Reservation Category</label>
                <div className="relative">
                  <select 
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      if (marks) predict();
                    }}
                    className="w-full bg-[#f0f0e8] dark:bg-[#1a1915] border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 text-[#0f0e0b] dark:text-[#f9f9f0] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="CRL">General / Common Rank List (CRL)</option>
                    <option value="OBC">OBC-NCL Category</option>
                    <option value="EWS">General-EWS Category</option>
                    <option value="SC">Scheduled Caste (SC)</option>
                    <option value="ST">Scheduled Tribe (ST)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#9d937c]">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-[11px] font-black text-[#9d937c] uppercase tracking-widest mb-3">
                  Your Expected Score (0–360)
                </label>
                <div className="flex apple-input overflow-hidden border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 rounded-xl bg-[#f0f0e8] dark:bg-[#1a1915]">
                  <input
                    type="number"
                    value={marks}
                    onChange={e => setMarks(e.target.value)}
                    placeholder="E.g. 185"
                    min="0"
                    max="360"
                    onKeyDown={e => e.key === 'Enter' && predict()}
                    className="bg-transparent px-5 py-4 text-xl flex-1 focus:outline-none text-[#0f0e0b] dark:text-[#f9f9f0] font-mono font-bold"
                  />
                  <button
                    onClick={predict}
                    disabled={loading}
                    className="px-6 m-1.5 text-white text-xs font-black uppercase tracking-widest rounded-[10px] transition-all active:scale-95 shadow-md disabled:opacity-60"
                    style={{ background: 'var(--dynamic-primary)' }}
                  >
                    {loading ? 'CALC...' : 'Predict'}
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10">
                <HopiumSlider value={hopium} onChange={setHopium} score={parseFloat(marks) || 0} />
              </div>
            </div>

          </div>

          {/* Result card */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className={`result-chrome-card w-full p-8 md:p-12 flex flex-col justify-center items-center text-center anim-scale-in h-full ${loading ? 'animate-pulse' : ''}`}>
              
              {result.status !== 'standby' && (
                <div className="w-full flex justify-between items-start mb-8 transition-opacity duration-300">
                  <div className="text-left">
                    <span className="block text-[#9d937c] text-[9px] uppercase font-black tracking-widest mb-1">Total Candidates Pool</span>
                    <span className="text-lg font-black text-[#0f0e0b] dark:text-[#f9f9f0]">{result.pool}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 py-1.5 pl-3 pr-2 bg-[#f0f0e8] dark:bg-[#1a1915] border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 rounded-xl shadow-inner backdrop-blur-sm">
                    <div className="flex flex-col text-right">
                      <span className="block text-[#9d937c] text-[8px] uppercase font-black tracking-[0.15em] leading-none mb-1">Alphajee.online</span>
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-[11px] font-black text-[#0f0e0b] dark:text-[#f9f9f0]">{engine === 'data' ? 'V4 Data Model' : 'Hist Model'}</span>
                        <span className="flex h-1.5 w-1.5 relative">
                          <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-blue-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-10 w-full">
                <p className="uppercase tracking-widest text-[11px] font-black mb-4" style={{ color: result.status === 'not-qualified' ? '#ef4444' : 'var(--dynamic-primary)' }}>
                  {result.label}
                </p>
                
                <div
                  className={`leading-none font-black font-mono drop-shadow-lg ${result.status === 'not-qualified' ? 'text-red-500 text-[3rem] md:text-[5rem] tracking-tight' : 'text-[#0f0e0b] dark:text-[#f9f9f0] text-[4rem] md:text-[5.5rem]'}`}
                >
                  {result.rank || '---'}
                </div>
              </div>

              {result.crlRank && result.status === 'success' && (
                <div className="border border-[#0f0e0b]/20 dark:border-[#f9f9f0]/20 rounded-2xl p-5 w-full shadow-inner bg-black/5 dark:bg-white/5 transition-all duration-500">
                  <span className="block text-[10px] uppercase font-black tracking-widest mb-2" style={{ color: "var(--dynamic-primary)" }}>Expected All India Rank (CRL)</span>
                  <span className="text-2xl md:text-3xl font-black text-[#0f0e0b] dark:text-[#f9f9f0] font-mono block">{result.crlRank}</span>
                </div>
              )}

              {result.status !== 'standby' && (
                <div className="mt-8 text-center text-[10px] text-[#9d937c] font-bold uppercase tracking-widest border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 px-4 py-2 rounded-full">
                  Bucket: {result.bucket}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Explainer */}
        <div className="mt-20 bg-[#f9f9f0] dark:bg-[#161b22] rounded-3xl p-8 md:p-12 border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 shadow-lg relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-[#0f0e0b] dark:text-[#f9f9f0] mb-6 tracking-tight">Why is AlphaJEE the Most Accurate Rank Predictor?</h2>
            
            <div className="mb-10">
              <p className="text-[#9d937c] leading-relaxed mb-4">
                {engine === 'data' 
                  ? "Unlike basic predictors that output static guesswork or linear estimations, the Alpha Engine is entirely data-driven, calculating your exact placement using a mathematically-proven segment model."
                  : "Unlike basic predictors that output static data, the Alpha Engine scales historical performance trends with a dynamic algorithmic multiplier."
                }
              </p>
              <p className="text-[#9d937c] leading-relaxed mb-4">
                {engine === 'data'
                  ? "By aggregating the candidate pool (~2.5 Lakhs) and distributing them across strict 5-mark buckets, our algorithm computes the true density of students at your specific score. This inverse logarithmic calculation provides mathematically valid bounds."
                  : "By aggregating the candidate pool and extrapolating exact bracket thresholds from variance data, our tool generates realistic rank ranges instead of arbitrary numbers."
                }
              </p>
            </div>

            <hr className="border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 my-10" />

            <h3 className="text-2xl font-bold text-[#0f0e0b] dark:text-[#f9f9f0] mb-6">How the Engine Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-[#f0f0e8] dark:bg-[#1a1915] p-6 rounded-2xl border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10">
                <h4 className="text-blue-500 font-bold mb-2 uppercase text-sm tracking-wide">
                  {engine === 'data' ? '1. Empirical Data Segments' : '1. Multiplier Extrapolation'}
                </h4>
                <p className="text-[#9d937c] text-sm leading-relaxed">
                  {engine === 'data' 
                    ? "The algorithm maps your score against historical segmented distributions, dynamically computing rank bounds based on exact candidate clustering inside 5-mark intervals."
                    : "The algorithm dynamically applies a sliding multiplier to past data, mathematically reflecting the increasing density of candidates as scores lower."
                  }
                </p>
              </div>
              <div className="bg-[#f0f0e8] dark:bg-[#1a1915] p-6 rounded-2xl border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10">
                <h4 className="text-green-500 font-bold mb-2 uppercase text-sm tracking-wide">2. The Hopium Module</h4>
                <p className="text-[#9d937c] text-sm leading-relaxed">Adjust our unique 'Variance' slider to test algorithmic boundaries. This simulates stricter or more relaxed competitive outcomes by mathematically shifting the baseline constants.</p>
              </div>
              <div className="bg-[#f0f0e8] dark:bg-[#1a1915] p-6 rounded-2xl border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10">
                <h4 className="text-orange-500 font-bold mb-2 uppercase text-sm tracking-wide">
                  {engine === 'data' ? '3. Mathematical Precision' : '3. Top-End Validation'}
                </h4>
                <p className="text-[#9d937c] text-sm leading-relaxed">
                  {engine === 'data'
                    ? "Our top-tier logic calculates exact inverse logarithms for dense brackets, completely preventing mathematically impossible data outputs and guaranteeing high accuracy."
                    : "Our top-tier logic automatically prevents mathematically impossible score inputs, giving you the precise, exact rank ranges for the elite brackets."
                  }
                </p>
              </div>
            </div>

            <div className="mt-24 mb-12 text-center px-6">
              <div className="inline-block p-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 w-full max-w-2xl mb-8"></div>
              <p className="text-[#9d937c] text-xs italic font-medium tracking-wide leading-relaxed max-w-xl mx-auto opacity-80">
                "To Rakshit: I hope you're reading this. I know the pressure is heavy, but you've done great, more than any score could ever show. I wish you were here to fight the battle. I'm still here if you need to talk, and I hope you find your way back and not lose yourself pleaseeee."
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

