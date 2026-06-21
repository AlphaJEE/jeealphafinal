
'use client';

import { useState, useRef } from "react";
import HopiumSlider from "@/components/HopiumSlider";
import { useToast } from "@/components/ToastProvider";

export default function PercentilePage() {
  const [marks, setMarks] = useState("");
  const [shiftId, setShiftId] = useState("04 - S1");
  const [isProvisional, setIsProvisional] = useState(false);
  const [hopium, setHopium] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [result, setResult] = useState<{
    percentile: string | null;
    rank: string | null;
    label: string;
    bucket: string;
    shiftRank?: string | number;
    totalShifts?: string | number;
    worstCasePct?: string | null;
    worstCaseRank?: string | null;
    p99?: string | number;
    p98?: string | number;
    p90?: string | number;
  }>({
    percentile: null,
    rank: null,
    label: "Awaiting Input",
    bucket: "Standby",
  });
  
  const { showToast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);

  const predict = async () => {
    const score = parseFloat(marks);
    if (isNaN(score) || score < 0 || score > 360) {
      showToast("Invalid Score", "JEE Main score must be between 0 and 360.", "error");
      return;
    }

    setLoading(true);
    setResult((prev) => ({ ...prev, label: "Processing Data..." }));

    try {
      // Security Fingerprint Generation
      const base99 = 5.3;
      const base98 = 9.5;
      const rawToken = `${score}-${shiftId}-${hopium}-${base99}-${base98}`;
      const requestToken = btoa(rawToken);

      const payload = { 
        score, 
        shiftId, 
        hopiumVal: hopium, 
        requestToken, 
        base99, 
        base98,
        keyType: isProvisional ? 'prov' : 'final' // In case you need it for routing later
      };

      const resp = await fetch("https://predictor.akashdeep122a.workers.dev/api/mains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();

      if (!resp.ok || !data.success) {
        throw new Error(data.error || "Failed to connect to the Alpha Engine.");
      }

      setResult({
        percentile: data.percentile,
        rank: data.expectedRank || data.rankRange || "—",
        label: "Estimated Percentile",
        bucket: data.bucketText || "Algorithm",
        shiftRank: data.shiftRank,
        totalShifts: data.totalShifts,
        worstCasePct: data.worstCase,
        worstCaseRank: data.worstCaseRank,
        p99: data.p99_score,
        p98: data.p98_score,
        p90: data.p90_score
      });
    } catch (error: any) {
      showToast("Prediction Error", error.message, "error");
      setResult((prev) => ({
        ...prev,
        label: "Calculation Failed",
        bucket: "Error",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f9f9f0] dark:bg-[#0f0e0b] min-h-screen">
      {/* Header section */}
      <div className="bg-[#badbee] pt-28 pb-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-code-label text-[#3d3b34] uppercase tracking-widest mb-3">V4 Alpha Engine</p>
              <h1 className="text-display-large text-[#0f0e0b]">JEE Main Predictor</h1>
              <p className="text-body-large text-[#3d3b34] mt-3">Multi-Factor Rank Interpolation</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://score.alphajee.online"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-[11px]"
                style={{ borderColor: "#0f0e0b", color: "#0f0e0b", padding: "10px 20px" }}
              >
                Calculate Score First
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Input panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#f9f9f0] dark:bg-[#21201c] p-8 border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10">
              
              {/* Answer Key Toggle & Shift Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-8 border-b border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 gap-6">
                <div>
                  <label className="block text-code-micro text-[#9d937c] uppercase tracking-widest mb-2">Answer Key Source</label>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${isProvisional ? 'text-orange-500' : 'text-[#0f0e0b] dark:text-[#f9f9f0]'}`}>
                      {isProvisional ? 'Provisional Key' : 'Final Key'}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={isProvisional}
                        onChange={(e) => setIsProvisional(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-code-micro text-[#9d937c] uppercase tracking-widest mb-2">Target Shift</label>
                  <select 
                    value={shiftId}
                    onChange={(e) => setShiftId(e.target.value)}
                    className="bg-transparent border border-[#0f0e0b]/20 dark:border-[#f9f9f0]/20 rounded-md p-2 text-sm font-bold text-[#0f0e0b] dark:text-[#f9f9f0] focus:outline-none focus:border-blue-500 w-full sm:w-auto"
                  >
                    <option value="04 - S1">4 April - Shift 1</option>
                    <option value="04 - S2">4 April - Shift 2</option>
                    <option value="05 - S1">5 April - Shift 1</option>
                    <option value="05 - S2">5 April - Shift 2</option>
                    <option value="06 - S1">6 April - Shift 1</option>
                    <option value="06 - S2">6 April - Shift 2</option>
                    <option value="08 - S2">8 April - Shift 2</option>
                    <option value="02 - S1">2 April - Shift 1</option>
                    <option value="02 - S2">2 April - Shift 2</option>
                  </select>
                </div>
              </div>

              {/* Score input */}
              <div className="mb-8">
                <label className="block text-code-micro text-[#9d937c] uppercase tracking-widest mb-3">Your Raw Score (0–300)</label>
                <div className="flex flex-col sm:flex-row apple-input overflow-hidden">
                  <input
                    type="number"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    placeholder="E.g. 163"
                    min="0"
                    max="300"
                    onKeyDown={(e) => e.key === "Enter" && predict()}
                    className="bg-transparent px-4 py-3 sm:px-5 sm:py-4 text-xl sm:text-2xl flex-1 w-full focus:outline-none text-[#0f0e0b] dark:text-[#f9f9f0] font-akkurat font-bold"
                  />
                  <button
                    onClick={predict}
                    disabled={loading}
                    className={`predict-button w-full sm:w-auto mt-3 sm:mt-0 sm:ml-2 ${loading ? 'opacity-60' : ''}`}
                    style={{ background: 'var(--dynamic-primary)', color: '#fff' }}
                  >
                    {loading ? 'CALC...' : 'Predict'}
                  </button>
                </div>
              </div>

              {/* Hopium slider */}
              <div className="pt-6 border-t border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10">
                <HopiumSlider value={hopium} onChange={setHopium} score={parseFloat(marks) || 0} />
              </div>
            </div>

            {/* Base Percentile Anchors */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#f9f9f0] dark:bg-[#21201c] border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 p-4 text-center">
                <p className="text-[10px] font-black text-[#9d937c] uppercase tracking-widest mb-1">99%ile Base</p>
                <p className="text-xl font-mono font-bold text-[#0f0e0b] dark:text-[#f9f9f0]">{result.p99 || '--'}</p>
              </div>
              <div className="bg-[#f9f9f0] dark:bg-[#21201c] border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 p-4 text-center">
                <p className="text-[10px] font-black text-[#9d937c] uppercase tracking-widest mb-1">98%ile Base</p>
                <p className="text-xl font-mono font-bold text-[#0f0e0b] dark:text-[#f9f9f0]">{result.p98 || '--'}</p>
              </div>
              <div className="bg-[#f9f9f0] dark:bg-[#21201c] border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 p-4 text-center">
                <p className="text-[10px] font-black text-[#9d937c] uppercase tracking-widest mb-1">90%ile Base</p>
                <p className="text-xl font-mono font-bold text-[#0f0e0b] dark:text-[#f9f9f0]">{result.p90 || '--'}</p>
              </div>
            </div>

            {/* Info box */}
            <div className="p-6 border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 bg-[#d5fad3]">
              <p className="text-code-micro text-[#3d3b34] uppercase tracking-widest mb-2">About the Engine</p>
              <p className="text-body-small text-[#21201c] leading-relaxed">
                The V4 Alpha Engine applies a dynamic multiplier to historical data, scaling with candidate density at each score bracket. Adjust the Hopium Module to simulate exam-day variance.
              </p>
            </div>
          </div>

          {/* Right: Result card */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div
              ref={resultRef}
              className={`result-chrome-card w-full p-8 md:p-12 flex flex-col justify-center items-center text-center ${loading ? "animate-pulse" : ""}`}
            >
              {/* Top stats */}
              {result.percentile && (
                <div className="w-full flex justify-between items-start mb-10">
                  <div className="text-left">
                    <span className="text-code-micro text-[#9d937c] uppercase tracking-widest block mb-1">Difficulty Tier</span>
                    <span className="text-lg font-black text-[#0f0e0b] dark:text-[#f9f9f0]">
                      {result.shiftRank || '--'}<span className="text-[#9d937c]">/{result.totalShifts || '--'}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 border border-[#0f0e0b]/15 dark:border-[#f9f9f0]/15">
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-[#0f0e0b] dark:bg-[#f9f9f0]"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0f0e0b] dark:bg-[#f9f9f0]"></span>
                    </span>
                    <span className="text-code-micro text-[#9d937c] uppercase tracking-widest">AlphaJEE V4 Model</span>
                  </div>
                </div>
              )}

              {/* Main Percentile Display */}
              <div className="mb-10 w-full">
                <p className="text-code-label uppercase tracking-widest mb-4" style={{ color: "var(--dynamic-primary)" }}>
                  {result.label}
                </p>
                <div className="font-mono leading-none drop-shadow-lg text-[#0f0e0b] dark:text-[#f9f9f0]" style={{ fontSize: result.percentile ? "clamp(60px, 8vw, 104px)" : "64px", fontWeight: 900 }}>
                  {result.percentile ? (
                    <>
                      {result.percentile.replace('%', '')}<span className="text-4xl" style={{ color: "var(--dynamic-primary)" }}>%</span>
                    </>
                  ) : (
                    "---"
                  )}
                </div>
              </div>

              {/* Expected Rank Container */}
              {result.percentile && (
                <div className="border border-[#0f0e0b]/20 dark:border-[#f9f9f0]/20 rounded-2xl p-6 w-full shadow-inner bg-black/5 dark:bg-white/5">
                  <span className="block text-[10px] uppercase font-black tracking-widest mb-2" style={{ color: "var(--dynamic-primary)" }}>Expected All India Rank</span>
                  <span className="text-3xl md:text-4xl font-black text-[#0f0e0b] dark:text-[#f9f9f0] font-mono block">{result.rank}</span>
                </div>
              )}

              {!result.percentile && (
                <p className="text-body-small text-[#9d937c] mt-4">
                  Enter your score and press Predict to see your estimated rank.
                </p>
              )}
            </div>

            {/* Worst Case Scenarios */}
            {result.worstCasePct && (
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
                  <span className="block text-red-500 text-[10px] uppercase font-black tracking-widest mb-2">Worst Percentile</span>
                  <span className="text-xl font-black text-red-500 font-mono">{result.worstCasePct}%</span>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 text-center">
                  <span className="block text-orange-500 text-[10px] uppercase font-black tracking-widest mb-2">Worst Rank Floor</span>
                  <span className="text-xl font-black text-orange-500 font-mono">{result.worstCaseRank}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Explainer */}
        <div className="mt-20 border-t border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 pt-16">
          <h2 className="text-display-medium text-[#0f0e0b] dark:text-[#f9f9f0] mb-8 max-w-2xl">
            Why is AlphaJEE the most accurate JEE Main predictor?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0f0e0b]/10 dark:bg-[#f9f9f0]/10">
            {[
              { title: "Multiplier Extrapolation", desc: "Dynamically applies a sliding multiplier to past data, reflecting the increasing candidate density as scores lower.", color: "#badbee" },
              { title: "The Hopium Module", desc: "Unique variance slider to simulate stricter or relaxed competitive outcomes. Adjust for exam-day conditions.", color: "#d5fad3" },
              { title: "+4/−1 Validation", desc: "Logic automatically prevents mathematically impossible score inputs, giving precise rank ranges for elite brackets.", color: "#efecca" },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-[#f9f9f0] dark:bg-[#0f0e0b]">
                <div className="inline-block px-3 py-1 text-code-micro uppercase tracking-widest text-[#0f0e0b] mb-4" style={{ backgroundColor: item.color, borderRadius: "9999px" }}>
                  0{i + 1}
                </div>
                <h3 className="text-heading-2xl text-[#0f0e0b] dark:text-[#f9f9f0] mb-3">{item.title}</h3>
                <p className="text-body-base text-[#9d937c] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 p-10">
            <p className="text-body-base text-[#9d937c] italic leading-relaxed">
              "To M: I hope you're reading this. I know the pressure is heavy, but you've done great, more than any score could ever show. I'm still here if you need to talk. I hope you find your way back and not lose yourself pleaseeee."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

