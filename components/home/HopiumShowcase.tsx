"use client";

import { useEffect, useRef, useState } from "react";
import {
  percentileFromMarks,
  rankFromPercentile,
  formatRank,
} from "@/lib/percentile";
import { Reveal } from "./primitives";

export default function HopiumShowcase() {
  const [marks, setMarks] = useState(176);
  const [variance, setVariance] = useState(0.35); // 0..1

  const [disp, setDisp] = useState({ best: 0, expected: 0, worst: 0, v: 0.35 });
  const raf = useRef(0);

  const expected = rankFromPercentile(percentileFromMarks(marks));
  const best = Math.max(1, Math.round(expected * (1 - 0.5 * variance)));
  const worst = Math.round(expected * (1 + 0.85 * variance));

  useEffect(() => {
    const tick = () => {
      setDisp((d) => {
        const lerp = (a: number, b: number) =>
          Math.abs(b - a) < 0.5 ? b : a + (b - a) * 0.2;
        return {
          best: lerp(d.best, best),
          expected: lerp(d.expected, expected),
          worst: lerp(d.worst, worst),
          v: d.v + (variance - d.v) * 0.2,
        };
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [best, expected, worst, variance]);

  const spread = 42 * disp.v;
  const bestX = 50 - spread;
  const worstX = 50 + spread;

  return (
    <section className="relative max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <Reveal className="lg:col-span-5">
          <p className="font-akkurat text-[11px] uppercase tracking-[0.25em] text-[#9d937c] mb-4">
            The differentiator
          </p>
          <h2 className="font-season text-[clamp(28px,3.6vw,48px)] leading-[1] text-[#0f0e0b] mb-5">
            The Hopium Module.
          </h2>
          <p className="text-[#21201c] text-lg leading-relaxed mb-6 font-season">
            Every other predictor hands you one number and hopes you believe it.
            We let you feel the uncertainty. Drag the variance and watch your
            best-case and worst-case ranks pull apart in real time — modelled on
            exam-day swing, not wishful thinking.
          </p>
          <div className="flex items-center gap-3">
            <span className="font-akkurat text-[10px] uppercase tracking-[0.2em] text-[#9d937c]">
              Score
            </span>
            <input
              type="range"
              min={60}
              max={290}
              value={marks}
              onChange={(e) => setMarks(Number(e.target.value))}
              className="ovi-range flex-1"
              aria-label="Score"
            />
            <span className="font-akkurat text-[#0f0e0b] text-sm font-bold tabular-nums w-10 text-right">
              {marks}
            </span>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal delay={100} className="gradient-ring">
            <div className="glass rounded-3xl p-6 sm:p-9">
              {/* three readouts */}
              <div className="grid grid-cols-3 gap-3 mb-9">
                <div className="text-center">
                  <p className="font-akkurat text-[9px] uppercase tracking-[0.2em] text-[#16a34a] mb-2">
                    Best case
                  </p>
                  <p className="font-akkurat text-[#16a34a] text-lg sm:text-2xl font-bold tabular-nums">
                    {formatRank(disp.best)}
                  </p>
                </div>
                <div className="text-center border-x border-[rgba(15,14,11,0.1)]">
                  <p className="font-akkurat text-[9px] uppercase tracking-[0.2em] text-[#9d937c] mb-2">
                    Expected
                  </p>
                  <p className="font-akkurat text-[#0f0e0b] text-lg sm:text-2xl font-bold tabular-nums">
                    {formatRank(disp.expected)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-akkurat text-[9px] uppercase tracking-[0.2em] text-[#ef4444] mb-2">
                    Worst case
                  </p>
                  <p className="font-akkurat text-[#ef4444] text-lg sm:text-2xl font-bold tabular-nums">
                    {formatRank(disp.worst)}
                  </p>
                </div>
              </div>

              {/* divergence track */}
              <div className="relative h-16">
                <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-[rgba(15,14,11,0.12)]" />
                <div
                  className="absolute top-1/2 h-[6px] -translate-y-1/2 rounded-full"
                  style={{
                    left: `${bestX}%`,
                    width: `${worstX - bestX}%`,
                    background:
                      "linear-gradient(90deg, #16a34a, #9d937c 50%, #ef4444)",
                  }}
                />
                <Marker x={50} color="#0f0e0b" tall />
                <Marker x={bestX} color="#16a34a" />
                <Marker x={worstX} color="#ef4444" />
              </div>

              <div className="flex items-center justify-between mt-7">
                <span className="font-akkurat text-[10px] uppercase tracking-[0.2em] text-[#9d937c]">
                  Variance
                </span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={variance}
                  onChange={(e) => setVariance(Number(e.target.value))}
                  className="ovi-range mx-4 flex-1"
                  aria-label="Variance"
                />
                <span className="font-akkurat text-[#0f0e0b] text-sm font-bold tabular-nums w-12 text-right">
                  ±{Math.round(variance * 100)}%
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Marker({
  x,
  color,
  tall = false,
}: {
  x: number;
  color: string;
  tall?: boolean;
}) {
  return (
    <div
      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      style={{ left: `${x}%` }}
    >
      <span
        className="rounded-full"
        style={{
          width: tall ? 16 : 13,
          height: tall ? 16 : 13,
          background: color,
          boxShadow: `0 0 0 5px ${color}22, 0 4px 12px rgba(15,14,11,0.2)`,
        }}
      />
    </div>
  );
}
