"use client";

import { useState, useRef, useEffect } from "react";
import HopiumSlider from "@/components/HopiumSlider";
import { useToast } from "@/components/ToastProvider";

export default function PercentilePage() {
  const [marks, setMarks] = useState("");
  const [hopium, setHopium] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    rank: string | null;
    percentile: string | null;
    label: string;
    bucket: string;
    topStats?: { candidates: string };
  }>({
    rank: null,
    percentile: null,
    label: "Awaiting Input",
    bucket: "Standby",
  });
  const { showToast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);

  const predict = async () => {
    const score = parseFloat(marks);
    if (isNaN(score) || score < 0 || score > 360) {
      showToast(
        "Invalid Score",
        "JEE Main score must be between 0 and 360.",
        "error",
      );
      return;
    }

    setLoading(true);
    setResult((prev) => ({ ...prev, label: "Calculating..." }));

    try {
      const payload = { marks: score, hopium_factor: hopium };
      const resp = await fetch("https://digiadvanced.com/directpredict.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) throw new Error("API error");
      const data = await resp.json();

      if (data.error) throw new Error(data.error);

      setResult({
        rank: data.predicted_rank || data.rank || "—",
        percentile: data.percentile
          ? parseFloat(data.percentile).toFixed(4) + "%"
          : "—",
        label: "JEE Main Predicted Rank",
        bucket: data.bucket || data.category || "Computed",
        topStats: { candidates: data.total_candidates || "~12 Lakhs" },
      });
    } catch {
      showToast(
        "API Unavailable",
        "Could not reach prediction server. Try again shortly.",
        "error",
      );
      setResult((prev) => ({
        ...prev,
        label: "Error — Try Again",
        bucket: "API Error",
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
              <p className="text-code-label text-[#3d3b34] uppercase tracking-widest mb-3">
                V4 Alpha Engine
              </p>
              <h1 className="text-display-large text-[#0f0e0b]">
                JEE Main Predictor
              </h1>
              <p className="text-body-large text-[#3d3b34] mt-3">
                Multi-Factor Rank Interpolation
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://score.alphajee.online"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-[11px]"
                style={{
                  borderColor: "#0f0e0b",
                  color: "#0f0e0b",
                  padding: "10px 20px",
                }}
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
              {/* Score input */}
              <div className="mb-8">
                <label className="block text-code-micro text-[#9d937c] uppercase tracking-widest mb-3">
                  Your Expected Score (0–360)
                </label>
                <div className="flex flex-col sm:flex-row apple-input overflow-hidden">
                  <input
                    type="number"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    placeholder="E.g. 250"
                    min="0"
                    max="360"
                    onKeyDown={(e) => e.key === "Enter" && predict()}
                    className="bg-transparent px-4 py-3 sm:px-5 sm:py-4 text-xl sm:text-2xl flex-1 w-full focus:outline-none text-[#0f0e0b] dark:text-[#f9f9f0] font-akkurat font-bold"
                  />
                  <button
                    onClick={predict}
                    disabled={loading}
                    className={`predict-button w-full sm:w-auto mt-3 sm:mt-0 sm:ml-2 ${loading ? 'opacity-60' : ''}`}
                    style={{ background: 'var(--dynamic-primary)' }}
                  >
                    {loading ? '...' : 'Predict'}
                  </button>
                </div>
              </div>

              {/* Hopium slider */}
              <div className="pt-6 border-t border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10">
                <HopiumSlider
                  value={hopium}
                  onChange={setHopium}
                  score={parseFloat(marks) || 0}
                />
              </div>
            </div>

            {/* Info box */}
            <div className="p-6 border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 bg-[#d5fad3]">
              <p className="text-code-micro text-[#3d3b34] uppercase tracking-widest mb-2">
                About the Engine
              </p>
              <p className="text-body-small text-[#21201c] leading-relaxed">
                The V4 Alpha Engine applies a dynamic multiplier to historical
                data, scaling with candidate density at each score bracket.
                Adjust the Hopium Module to simulate exam-day variance.
              </p>
            </div>
          </div>

          {/* Right: Result card */}
          <div className="lg:col-span-7 flex h-full">
            <div
              ref={resultRef}
              className={`result-chrome-card w-full p-8 md:p-12 flex flex-col justify-center items-center text-center ${loading ? "animate-pulse" : ""}`}
            >
              {/* Top stats (shown after result) */}
              {result.rank && result.topStats && (
                <div className="w-full flex justify-between items-center mb-10">
                  <div className="text-left">
                    <span className="text-code-micro text-[#9d937c] uppercase tracking-widest block mb-1">
                      Total Candidates
                    </span>
                    <span className="text-heading-2xl font-bold text-[#0f0e0b] dark:text-[#f9f9f0]">
                      {result.topStats.candidates}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 border border-[#0f0e0b]/15 dark:border-[#f9f9f0]/15">
                    <span className="flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-[#0f0e0b] dark:bg-[#f9f9f0]"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0f0e0b] dark:bg-[#f9f9f0]"></span>
                    </span>
                    <span className="text-code-micro text-[#9d937c] uppercase tracking-widest">
                      AlphaJEE Main Model
                    </span>
                  </div>
                </div>
              )}

              {/* Main display */}
              <div className="mb-10 w-full">
                <p
                  className="text-code-label uppercase tracking-widest mb-4"
                  style={{ color: "var(--dynamic-primary)" }}
                >
                  {result.label}
                </p>
                <div
                  className="font-akkurat leading-none drop-shadow-lg text-[#0f0e0b] dark:text-[#f9f9f0]"
                  style={{
                    fontSize: result.rank ? "clamp(48px, 8vw, 88px)" : "64px",
                    fontWeight: 700,
                  }}
                >
                  {result.rank || "---"}
                </div>
              </div>

              {/* Secondary stats */}
              {result.rank && (
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-[#badbee]/20 border border-[#badbee]/40 p-4 text-center">
                    <span className="text-code-micro text-[#3d3b34] uppercase tracking-widest block mb-1">
                      Percentile
                    </span>
                    <span className="text-subheading font-bold text-[#0f0e0b] dark:text-[#f9f9f0] font-akkurat">
                      {result.percentile || "—"}
                    </span>
                  </div>
                  <div className="bg-[#d5fad3]/30 border border-[#d5fad3]/60 p-4 text-center">
                    <span className="text-code-micro text-[#3d3b34] uppercase tracking-widest block mb-1">
                      Algorithm
                    </span>
                    <span className="text-body-small font-bold text-[#0f0e0b] dark:text-[#f9f9f0] uppercase block mt-1">
                      {result.bucket}
                    </span>
                  </div>
                </div>
              )}

              {!result.rank && (
                <p className="text-body-small text-[#9d937c] mt-4">
                  Enter your score and press Predict to see your estimated rank.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Explainer */}
        <div className="mt-20 border-t border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 pt-16">
          <h2 className="text-display-medium text-[#0f0e0b] dark:text-[#f9f9f0] mb-8 max-w-2xl">
            Why is AlphaJEE the most accurate JEE Main predictor?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0f0e0b]/10 dark:bg-[#f9f9f0]/10">
            {[
              {
                title: "Multiplier Extrapolation",
                desc: "Dynamically applies a sliding multiplier to past data, reflecting the increasing candidate density as scores lower.",
                color: "#badbee",
              },
              {
                title: "The Hopium Module",
                desc: "Unique variance slider to simulate stricter or relaxed competitive outcomes. Adjust for exam-day conditions.",
                color: "#d5fad3",
              },
              {
                title: "+4/−1 Validation",
                desc: "Logic automatically prevents mathematically impossible score inputs, giving precise rank ranges for elite brackets.",
                color: "#efecca",
              },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-[#f9f9f0] dark:bg-[#0f0e0b]">
                <div
                  className="inline-block px-3 py-1 text-code-micro uppercase tracking-widest text-[#0f0e0b] mb-4"
                  style={{
                    backgroundColor: item.color,
                    borderRadius: "9999px",
                  }}
                >
                  0{i + 1}
                </div>
                <h3 className="text-heading-2xl text-[#0f0e0b] dark:text-[#f9f9f0] mb-3">
                  {item.title}
                </h3>
                <p className="text-body-base text-[#9d937c] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 p-10">
            <p className="text-body-base text-[#9d937c] italic leading-relaxed">
              "To M: I hope you're reading this. I know the pressure is heavy,
              but you've done great, more than any score could ever show. I'm
              still here if you need to talk. I hope you find your way back and
              not lose yourself pleaseeee."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
