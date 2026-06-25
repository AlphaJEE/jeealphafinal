"use client";

import Link from "next/link";
import SmoothScroll from "@/components/home/SmoothScroll";
import Hero from "@/components/home/Hero";
import DataViz from "@/components/home/DataViz";
import HopiumShowcase from "@/components/home/HopiumShowcase";
import Team from "@/components/home/Team";
import Ecosystem from "@/components/home/Ecosystem";
import { SpotlightCard, Reveal, CountUp, Magnetic } from "@/components/home/primitives";

const features = [
  { label: "Zero Paywalls", desc: "Every single feature is free. No login required. No premium tiers." },
  { label: "Real Data", desc: "We aggregate actual exam performance data — not guesses or coaching estimates." },
  { label: "Hopium Module", desc: "Our variance slider lets you simulate strict and relaxed competitive outcomes." },
  { label: "No Ads", desc: "The site stays clean because we hate ads as much as you do. Community-funded only." },
  { label: "Open Ecosystem", desc: "Developers can collaborate and build on the AlphaJEE infrastructure." },
  { label: "Built by Aspirants", desc: "Every tool was built by someone who sat the same exams. We know what you need." },
];

const stats = [
  { to: 1, suffix: " Lakh+", label: "Users" },
  { to: 2, suffix: "M+", label: "Predictions" },
  { to: 97, suffix: "%", label: "Accuracy" },
  { to: 100, suffix: "%", label: "Free, forever" },
];

export default function HomePage() {
  return (
    <div className="home-premium relative min-h-screen overflow-hidden">
      <SmoothScroll />
      <Hero />

      {/* ── STAT BAND (count-up on view) ── */}
      <section id="stats" className="relative border-y border-[var(--ovi-line)]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-y-10">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 90} className="text-center">
              <p className="font-season text-[clamp(34px,4vw,56px)] font-semibold text-[var(--ovi-cream)] leading-none tabular-nums">
                <CountUp to={s.to} duration={1700} />
                <span className="text-[var(--ovi-muted)]">{s.suffix}</span>
              </p>
              <p className="font-akkurat text-[10px] uppercase tracking-[0.2em] text-[var(--ovi-cream-dim)] mt-3">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── DATA VIZ ── */}
      <div id="viz"><DataViz /></div>

      {/* ── HOPIUM SHOWCASE ── */}
      <div id="hopium"><HopiumShowcase /></div>

      {/* ── OVIQO ECOSYSTEM ── */}
      <Ecosystem />

      {/* ── WHY ALPHAJEE ── */}
      <section className="relative max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        <Reveal className="mb-14 max-w-xl">
          <p className="font-akkurat text-[11px] uppercase tracking-[0.25em] text-[var(--ovi-muted)] mb-4">
            Why AlphaJEE
          </p>
          <h2 className="font-season text-[clamp(34px,5vw,64px)] leading-[0.98] text-[var(--ovi-cream)]">
            Built different, for a reason.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Reveal key={i} delay={(i % 3) * 90}>
              <SpotlightCard className="glass rounded-2xl p-8 h-full" tilt={false}>
                <div className="w-8 h-8 rounded-full bg-[#0f0e0b] flex items-center justify-center mb-6">
                  <span className="font-akkurat text-[#f9f9f0] text-[10px]">0{i + 1}</span>
                </div>
                <h3 className="font-season text-2xl text-[var(--ovi-cream)] mb-3">{f.label}</h3>
                <p className="font-season text-[var(--ovi-muted)] leading-relaxed">{f.desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <Team />

      {/* ── COMMUNITY (dark, as before) ── */}
      <section className="relative bg-[#0f0e0b] py-28">
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 text-center">
          <Reveal>
            <p className="font-akkurat text-[11px] uppercase tracking-[0.25em] text-[var(--ovi-muted)] mb-5">
              Community
            </p>
            <h2 className="font-season text-[clamp(30px,4vw,58px)] leading-[1] text-[#f9f9f0] mb-6">
              Join serious aspirants.
            </h2>
            <p className="font-season text-xl text-[var(--ovi-muted)] max-w-xl mx-auto mb-10">
              Real-time updates, score discussion, and a community that actually
              shows up — on Reddit and LinkedIn.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Magnetic strength={0.35}>
                <a
                  href="https://reddit.com/r/alphajee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ backgroundColor: "#d5fad3", color: "#0f0e0b", borderColor: "#d5fad3" }}
                >
                  r/alphajee on Reddit
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a
                  href="https://www.linkedin.com/company/oviguide/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ borderColor: "rgba(249,249,240,0.3)", color: "#f9f9f0" }}
                >
                  OviGuide LinkedIn
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
