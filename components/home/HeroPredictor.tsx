"use client";

import { useEffect, useRef, useState } from "react";
import {
  percentileFromMarks,
  rankFromPercentile,
  formatRank,
  buildCurve,
} from "@/lib/percentile";

const W = 460;
const H = 240;
const PAD = 16;
const curve = buildCurve(W, H, PAD);

export default function HeroPredictor() {
  const [targetMarks, setTargetMarks] = useState(182);
  const [animMarks, setAnimMarks] = useState(182);
  const raf = useRef(0);

  // Glide the animated marks toward the slider value -> point + number move together.
  useEffect(() => {
    const tick = () => {
      setAnimMarks((cur) => {
        const next = cur + (targetMarks - cur) * 0.18;
        return Math.abs(next - targetMarks) < 0.05 ? targetMarks : next;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [targetMarks]);

  const pct = percentileFromMarks(animMarks);
  const rank = rankFromPercentile(pct);
  const pt = curve.point(animMarks);
  const clipW = pt.x;

  return (
    <div className="gradient-ring w-full">
      <div className="glass rounded-3xl p-5 sm:p-7">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#0f0e0b] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0f0e0b]" />
            </span>
            <span className="font-akkurat text-[10px] uppercase tracking-[0.2em] text-[var(--ovi-muted)]">
              Live · Alpha Engine
            </span>
          </div>
          <span className="font-akkurat text-[10px] uppercase tracking-[0.2em] text-[var(--ovi-muted)]">
            JEE Main
          </span>
        </div>

        {/* Big readout */}
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <p className="font-akkurat text-[10px] uppercase tracking-[0.2em] text-[var(--ovi-muted)] mb-1">
              Estimated Percentile
            </p>
            <div className="font-season leading-none text-[var(--ovi-cream)] tabular-nums">
              <span className="text-[clamp(42px,5vw,62px)] font-semibold">
                {pct.toFixed(pct >= 99.9 ? 3 : 2)}
              </span>
              <span className="text-[var(--ovi-muted)] text-2xl font-semibold ml-1">%</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-akkurat text-[10px] uppercase tracking-[0.2em] text-[var(--ovi-muted)] mb-1">
              Est. AIR
            </p>
            <p className="font-akkurat text-[var(--ovi-cream)] text-xl sm:text-2xl font-bold tabular-nums">
              {formatRank(rank)}
            </p>
          </div>
        </div>

        {/* Live curve */}
        <div className="relative">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto"
            preserveAspectRatio="none"
            role="img"
            aria-label="Marks versus percentile curve"
          >
            <defs>
              <linearGradient id="hp-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#badbee" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#badbee" stopOpacity="0" />
              </linearGradient>
              <clipPath id="hp-clip">
                <rect x="0" y="0" width={clipW} height={H} />
              </clipPath>
            </defs>

            {/* gridlines */}
            {[0, 25, 50, 75, 100].map((p) => {
              const y = curve.ys(p);
              return (
                <line
                  key={p}
                  x1={PAD}
                  x2={W - PAD}
                  y1={y}
                  y2={y}
                  stroke="rgba(15,14,11,0.06)"
                  strokeWidth="1"
                />
              );
            })}

            {/* filled area up to the current point */}
            <path
              d={`${curve.d} L ${W - PAD} ${H - PAD} L ${PAD} ${H - PAD} Z`}
              fill="url(#hp-area)"
              clipPath="url(#hp-clip)"
            />

            {/* full curve (dim) + drawn-to-point (bright) */}
            <path d={curve.d} fill="none" stroke="rgba(15,14,11,0.16)" strokeWidth="2" />
            <path
              d={curve.d}
              fill="none"
              stroke="var(--ovi-cream)"
              strokeWidth="2.5"
              clipPath="url(#hp-clip)"
            />

            {/* vertical guide */}
            <line
              x1={pt.x}
              x2={pt.x}
              y1={pt.y}
              y2={H - PAD}
              stroke="rgba(15,14,11,0.35)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />

            {/* moving point */}
            <circle cx={pt.x} cy={pt.y} r="9" fill="rgba(15,14,11,0.1)" />
            <circle cx={pt.x} cy={pt.y} r="4.5" fill="var(--ovi-bg)" stroke="var(--ovi-cream)" strokeWidth="2.5" />
          </svg>
          <div className="flex justify-between mt-1 px-1">
            <span className="font-akkurat text-[9px] text-[var(--ovi-muted)]">0</span>
            <span className="font-akkurat text-[9px] text-[var(--ovi-muted)]">marks →</span>
            <span className="font-akkurat text-[9px] text-[var(--ovi-muted)]">300</span>
          </div>
        </div>

        {/* Slider control */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-akkurat text-[10px] uppercase tracking-[0.2em] text-[var(--ovi-muted)]">
              Drag your marks
            </span>
            <span className="font-akkurat text-[var(--ovi-cream)] text-sm font-bold tabular-nums">
              {Math.round(targetMarks)} <span className="text-[var(--ovi-muted)]">/ 300</span>
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={300}
            step={1}
            value={targetMarks}
            onChange={(e) => setTargetMarks(Number(e.target.value))}
            className="ovi-range"
            aria-label="Your JEE Main marks"
          />
        </div>

        <a
          href="/percentile"
          className="mt-5 flex items-center justify-center gap-2 w-full rounded-full bg-[#0f0e0b] hover:bg-[#3d3b34] text-[#f9f9f0] font-akkurat text-[11px] uppercase tracking-[0.2em] font-bold py-3.5 transition-colors"
        >
          Run the full prediction
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
