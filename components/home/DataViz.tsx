"use client";

import { useEffect, useRef, useState } from "react";
import { buildCurve } from "@/lib/percentile";
import { useInView, Reveal } from "./primitives";

/* ---------------- Marks vs Percentile (self-drawing) ---------------- */
function PercentileCurve() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(1400);

  const W = 520;
  const H = 300;
  const PAD = 28;
  const curve = buildCurve(W, H, PAD);

  useEffect(() => {
    if (pathRef.current) setLen(Math.ceil(pathRef.current.getTotalLength()));
  }, []);

  const annotations = [
    { m: 100, label: "87%ile" },
    { m: 180, label: "98.9%ile" },
    { m: 250, label: "99.9%ile" },
  ];

  return (
    <div ref={ref} className="glass rounded-3xl p-6 sm:p-8">
      <p className="font-akkurat text-[10px] uppercase tracking-[0.2em] text-[var(--ovi-muted)] mb-1">
        The Curve
      </p>
      <h3 className="font-season text-2xl sm:text-3xl text-[var(--ovi-cream)] mb-6">
        Marks → Percentile
      </h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <defs>
          <linearGradient id="dv-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#badbee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#badbee" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 25, 50, 75, 100].map((p) => {
          const y = curve.ys(p);
          return (
            <g key={p}>
              <line x1={PAD} x2={W - PAD} y1={y} y2={y} stroke="rgba(15,14,11,0.06)" />
              <text x={4} y={y + 3} fill="#9d937c" fontSize="9" fontFamily="monospace">
                {p}
              </text>
            </g>
          );
        })}

        <path
          d={`${curve.d} L ${W - PAD} ${H - PAD} L ${PAD} ${H - PAD} Z`}
          fill="url(#dv-area)"
          opacity={inView ? 1 : 0}
          style={{ transition: "opacity 1.2s ease 0.6s" }}
        />
        <path
          ref={pathRef}
          d={curve.d}
          fill="none"
          stroke="var(--ovi-cream)"
          strokeWidth="3"
          strokeLinecap="round"
          className={`draw-path ${inView ? "is-drawn" : ""}`}
          style={{ ["--path-len" as any]: len }}
        />

        {annotations.map((a, i) => {
          const pt = curve.point(a.m);
          return (
            <g
              key={a.m}
              opacity={inView ? 1 : 0}
              style={{ transition: `opacity 0.6s ease ${1 + i * 0.25}s` }}
            >
              <circle cx={pt.x} cy={pt.y} r="4" fill="var(--ovi-bg)" stroke="var(--ovi-cream)" strokeWidth="2" />
              <text
                x={pt.x}
                y={pt.y - 12}
                fill="#3d3b34"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {a.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ---------------- Rank distribution bell curve with user marker ------- */
function RankBellCurve() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(1400);

  const W = 520;
  const H = 300;
  const PAD = 28;
  const mu = W / 2;
  const sigma = W / 9;
  const peak = H - PAD - 12;

  const bell = (x: number) =>
    H - PAD - (peak - PAD) * Math.exp(-((x - mu) ** 2) / (2 * sigma ** 2));

  const userX = mu + sigma * 1.7;
  const userY = bell(userX);

  let d = `M ${PAD} ${bell(PAD).toFixed(1)}`;
  for (let x = PAD; x <= W - PAD; x += 4) d += ` L ${x} ${bell(x).toFixed(1)}`;

  useEffect(() => {
    if (pathRef.current) setLen(Math.ceil(pathRef.current.getTotalLength()));
  }, []);

  return (
    <div ref={ref} className="glass rounded-3xl p-6 sm:p-8">
      <p className="font-akkurat text-[10px] uppercase tracking-[0.2em] text-[#16a34a] mb-1">
        The Field
      </p>
      <h3 className="font-season text-2xl sm:text-3xl text-[var(--ovi-cream)] mb-6">
        Where you land
      </h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <defs>
          <linearGradient id="bell-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d5fad3" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#d5fad3" stopOpacity="0" />
          </linearGradient>
        </defs>

        <line x1={PAD} x2={W - PAD} y1={H - PAD} y2={H - PAD} stroke="rgba(15,14,11,0.1)" />
        <path
          d={`${d} L ${W - PAD} ${H - PAD} L ${PAD} ${H - PAD} Z`}
          fill="url(#bell-area)"
          opacity={inView ? 1 : 0}
          style={{ transition: "opacity 1.2s ease 0.5s" }}
        />
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="#16a34a"
          strokeWidth="3"
          strokeLinecap="round"
          className={`draw-path ${inView ? "is-drawn" : ""}`}
          style={{ ["--path-len" as any]: len }}
        />

        {/* user marker */}
        <g opacity={inView ? 1 : 0} style={{ transition: "opacity 0.6s ease 1.4s" }}>
          <line
            x1={userX}
            x2={userX}
            y1={userY}
            y2={H - PAD}
            stroke="var(--ovi-cream)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <circle cx={userX} cy={userY} r="6" fill="var(--ovi-cream)" />
          <circle cx={userX} cy={userY} r="11" fill="none" stroke="var(--ovi-cream)" strokeOpacity="0.35" />
          <rect x={userX - 22} y={userY - 34} width="44" height="20" rx="10" fill="var(--ovi-cream)" />
          <text x={userX} y={userY - 20} fill="var(--ovi-bg)" fontSize="10" fontFamily="monospace" fontWeight="700" textAnchor="middle">
            YOU
          </text>
        </g>

        <text x={mu} y={H - 8} fill="#9d937c" fontSize="9" fontFamily="monospace" textAnchor="middle">
          median rank
        </text>
        <text x={W - PAD} y={H - 8} fill="#9d937c" fontSize="9" fontFamily="monospace" textAnchor="end">
          top ranks →
        </text>
      </svg>
    </div>
  );
}

export default function DataViz() {
  return (
    <section className="relative max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
      <Reveal className="mb-14 max-w-2xl">
        <p className="font-akkurat text-[11px] uppercase tracking-[0.25em] text-[var(--ovi-muted)] mb-4">
          Data, visualised
        </p>
        <h2 className="font-season text-[clamp(28px,3.6vw,50px)] leading-[1] text-[var(--ovi-cream)]">
          We don't describe the data. We draw it.
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Reveal delay={0}>
          <PercentileCurve />
        </Reveal>
        <Reveal delay={120}>
          <RankBellCurve />
        </Reveal>
      </div>
    </section>
  );
}
