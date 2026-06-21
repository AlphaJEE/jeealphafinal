'use client';

import { useState } from 'react';
import HopiumSlider from '@/components/HopiumSlider';
import { useToast } from '@/components/ToastProvider';

export default function NeetPage() {
  const [marks, setMarks] = useState('');
  const [hopium, setHopium] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    rank: string | null;
    percentile: string | null;
    label: string;
    bucket: string;
  }>({ rank: null, percentile: null, label: 'Awaiting Input', bucket: 'Standby' });
  const { showToast } = useToast();

  const predict = async () => {
    const score = parseFloat(marks);
    if (isNaN(score) || score < 0 || score > 720) {
      showToast('Invalid Score', 'NEET score must be between 0 and 720.', 'error');
      return;
    }

    setLoading(true);
    setResult(prev => ({ ...prev, label: 'Calculating...' }));

    try {
      // Updated payload to match the new Cloudflare Worker
      const payload = { score: score, hopiumVal: hopium }; 
      
      // Updated endpoint to point to your new Edge router
      const resp = await fetch('https://predictor.akashdeep122a.workers.dev/api/neet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();
      
      // Worker returns success: false and an error string if validation fails (e.g. impossible scores)
      if (!resp.ok || !data.success) {
        throw new Error(data.error || 'Failed to connect to the Alpha Engine.');
      }

      // Map the new Worker JSON keys to your UI state
      setResult({
        rank: data.rankRange,
        percentile: data.percentile,
        label: 'NEET Predicted Rank',
        bucket: data.bucketText,
      });
      
    } catch (error: any) {
      showToast('Prediction Error', error.message, 'error');
      setResult({
        rank: null,
        percentile: null,
        label: 'Calculation Failed',
        bucket: 'Error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f9f9f0] dark:bg-[#0f0e0b] min-h-screen">
      {/* Header */}
      <div className="bg-[#badbee] pt-28 pb-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-code-label text-[#3d3b34] uppercase tracking-widest mb-3">Alpha Engine</p>
              <h1 className="text-display-large text-[#0f0e0b]">NEET Predictor</h1>
              <p className="text-body-large text-[#3d3b34] mt-3">Multi-Factor Rank Interpolation</p>
            </div>
            <a
              href="https://score.alphajee.online"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex-shrink-0"
              style={{ borderColor: '#0f0e0b', color: '#0f0e0b', padding: '10px 20px', fontSize: '11px' }}
            >
              Calculate Score First
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Input */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#f9f9f0] dark:bg-[#21201c] p-8 border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10">
              <div className="mb-8">
                <label className="block text-code-micro text-[#9d937c] uppercase tracking-widest mb-3">
                  Your Expected Score (0–720)
                </label>
                <div className="flex apple-input overflow-hidden">
                  <input
                    type="number"
                    value={marks}
                    onChange={e => setMarks(e.target.value)}
                    placeholder="E.g. 640"
                    min="0"
                    max="720"
                    onKeyDown={e => e.key === 'Enter' && predict()}
                    className="bg-transparent px-5 py-4 text-2xl flex-1 focus:outline-none text-[#0f0e0b] dark:text-[#f9f9f0] font-akkurat font-bold"
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

            <div className="p-6 bg-[#d5fad3] border border-[#0f0e0b]/10">
              <p className="text-code-micro text-[#3d3b34] uppercase tracking-widest mb-2">About the Engine</p>
              <p className="text-body-small text-[#21201c] leading-relaxed">
                Unlike basic predictors that output static data, the Alpha Engine scales historical NEET performance trends with a dynamic algorithmic multiplier. Accounts for NTA normalisation mechanics across ~22.79 Lakh candidates.
              </p>
            </div>
          </div>

          {/* Result */}
          <div className="lg:col-span-7 flex h-full">
            <div className={`result-chrome-card w-full p-8 md:p-12 flex flex-col justify-center items-center text-center ${loading ? 'animate-pulse' : ''}`}>
              {result.rank && (
                <div className="w-full flex justify-between items-center mb-10">
                  <div className="text-left">
                    <span className="text-code-micro text-[#9d937c] uppercase tracking-widest block mb-1">Total Candidates</span>
                    <span className="text-heading-2xl font-bold text-[#0f0e0b] dark:text-[#f9f9f0]">~22.79 Lakhs</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 border border-[#0f0e0b]/15 dark:border-[#f9f9f0]/15">
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-[#0f0e0b] dark:bg-[#f9f9f0]"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0f0e0b] dark:bg-[#f9f9f0]"></span>
                    </span>
                    <span className="text-code-micro text-[#9d937c] uppercase tracking-widest">AlphaJEE NEET Model</span>
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
                  <div className="bg-[#badbee]/20 border border-[#badbee]/40 p-4 text-center">
                    <span className="text-code-micro text-[#3d3b34] uppercase tracking-widest block mb-1">General Percentile</span>
                    <span className="text-subheading font-bold text-[#0f0e0b] dark:text-[#f9f9f0] font-akkurat">{result.percentile || '—'}</span>
                  </div>
                  <div className="bg-[#d5fad3]/30 border border-[#d5fad3]/60 p-4 text-center">
                    <span className="text-code-micro text-[#3d3b34] uppercase tracking-widest block mb-1">Algorithm</span>
                    <span className="text-body-small font-bold text-[#0f0e0b] dark:text-[#f9f9f0] uppercase block mt-1">{result.bucket}</span>
                  </div>
                </div>
              )}

              {!result.rank && (
                <p className="text-body-small text-[#9d937c] mt-4">
                  Enter your score and press Predict to see your estimated NEET rank.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Explainer */}
        <div className="mt-20 border-t border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 pt-16">
          <h2 className="text-display-medium text-[#0f0e0b] dark:text-[#f9f9f0] mb-10 max-w-2xl">
            How the NEET Predictor works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0f0e0b]/10 dark:bg-[#f9f9f0]/10">
            {[
              { tag: '#badbee', title: 'Multiplier Extrapolation', desc: 'Dynamically applies a sliding multiplier to past data, mathematically reflecting increasing candidate density as scores lower.' },
              { tag: '#d5fad3', title: 'The Hopium Module', desc: 'Adjust the variance slider to simulate stricter or more relaxed competitive outcomes based on exam difficulty.' },
              { tag: '#efecca', title: '+4/−1 Validation', desc: 'Logic automatically prevents mathematically impossible score inputs, giving precise rank ranges for elite brackets.' },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-[#f9f9f0] dark:bg-[#0f0e0b]">
                <div className="inline-block px-3 py-1 text-code-micro uppercase tracking-widest text-[#0f0e0b] mb-4" style={{ backgroundColor: item.tag, borderRadius: '9999px' }}>
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