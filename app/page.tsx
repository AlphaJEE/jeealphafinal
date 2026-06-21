"use client";

import Link from "next/link";
import IITBombaySketch from "@/components/IITBombaySketch";

const marqueeItems = [
  { value: "10k+", label: "Predictions made" },
  { value: "100%", label: "Free forever" },
  { value: "#1", label: "Trusted predictor" },
  { value: "0", label: "Ads. Ever." },
  { value: "V4", label: "Alpha Engine" },
  { value: "2K+", label: "Community members" },
  { value: "10k+", label: "Predictions made" },
  { value: "100%", label: "Free forever" },
  { value: "#1", label: "Trusted predictor" },
  { value: "0", label: "Ads. Ever." },
  { value: "V4", label: "Alpha Engine" },
  { value: "2K+", label: "Community members" },
];

const tools = [
  {
    href: "/percentile",
    tag: "JEE Main",
    title: "Percentile Predictor",
    desc: "Enter your raw score to instantly predict your JEE Main percentile using the V4 Alpha Engine with multi-factor rank interpolation.",
    color: "#badbee",
    num: "01",
  },
  {
    href: "/advanced",
    tag: "JEE Advanced",
    title: "Rank Predictor",
    desc: "Estimate your JEE Advanced All India Rank based on your score. Powered by real historical data from previous years.",
    color: "#d5fad3",
    num: "02",
  },
  {
    href: "/neet",
    tag: "NEET UG",
    title: "NEET Predictor",
    desc: "Get your NEET rank prediction with the Hopium Module — adjust variance for best-case and worst-case scenarios.",
    color: "#efecca",
    num: "03",
  },
  {
    href: "/analytics",
    tag: "Analytics",
    title: "JEE Advanced Analytics",
    desc: "Interactive charts showing real score distributions, cutoffs, and trends. Understand exactly where you stand.",
    color: "#badbee",
    num: "04",
  },
];

const features = [
  {
    label: "Zero Paywalls",
    desc: "Every single feature is free. No login required. No premium tiers.",
  },
  {
    label: "Real Data",
    desc: "We aggregate actual exam performance data — not guesses or coaching estimates.",
  },
  {
    label: "Hopium Module",
    desc: "Our unique variance slider lets you simulate strict and relaxed competitive outcomes.",
  },
  {
    label: "No Ads",
    desc: "The site stays clean because we hate ads as much as you do. Community-funded only.",
  },
  {
    label: "Open Ecosystem",
    desc: "Developers can collaborate and build on the AlphaJEE infrastructure.",
  },
  {
    label: "Built by Aspirants",
    desc: "Every tool was built by someone who sat the same exams. We know what you need.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#f9f9f0] dark:bg-[#0f0e0b] min-h-screen">
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden bg-[#d5fad3] pt-10 sm:pt-4"
        style={{ minHeight: "100svh" }}
      >
        {/* Top checkerboard strip removed per design */}

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-6 lg:pt-12 pb-0 flex flex-col lg:flex-row items-start gap-8 lg:gap-6">
          {/* Left */}
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6 anim-fade-up">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-[#0f0e0b] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0f0e0b]" />
              </span>
              <span className="text-code-label text-[#0f0e0b] uppercase tracking-widest">
                V4 Alpha Engine — Live
              </span>
            </div>

            <h1 className="text-display-hero text-[#0f0e0b] mb-6 anim-fade-up anim-fade-up-d1">
              The Free JEE Ecosystem.
            </h1>

            <p className="text-body-large text-[#21201c] max-w-md leading-relaxed mb-8 anim-fade-up anim-fade-up-d2">
              Predict your JEE Main percentile, JEE Advanced rank, and NEET rank
              — instantly. No login. No paywalls. Just honest data for
              aspirants.
            </p>

            <div className="flex flex-wrap items-center gap-3 anim-fade-up anim-fade-up-d3">
              <Link
                href="/percentile"
                className="btn-primary"
                style={{ backgroundColor: "#0f0e0b", color: "#f9f9f0" }}
              >
                Predict JEE Main
              </Link>
              <Link
                href="/advanced"
                className="btn-outline"
                style={{ borderColor: "#0f0e0b" }}
              >
                JEE Advanced Rank
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-5 mt-10 pt-8 border-t border-[#0f0e0b]/12 anim-fade-up anim-fade-up-d4">
              {[
                { v: "10k+", l: "Predictions" },
                { v: "100%", l: "Free" },
                { v: "#1", l: "Trusted" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-5">
                  {i > 0 && (
                    <div
                      style={{
                        width: "1px",
                        height: "36px",
                        background: "rgba(15,14,11,0.12)",
                      }}
                    />
                  )}
                  <div>
                    <p className="text-display-medium font-bold text-[#0f0e0b]">
                      {s.v}
                    </p>
                    <p className="text-code-micro text-[#3d3b34] uppercase tracking-widest">
                      {s.l}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: IIT Bombay sketch */}
          <div
            className="flex-1 flex justify-center lg:justify-end items-end relative w-full lg:max-w-[560px] anim-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(15,14,11,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15,14,11,0.5) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />
            <IITBombaySketch
              className="relative z-10 w-full text-[#0f0e0b] opacity-65"
              style={{ maxHeight: "360px" }}
            />
          </div>
        </div>

        {/* Marquee strip */}
        <div className="bg-[#0f0e0b] mt-6 py-3 ticker-wrapper">
          <div className="ticker-inner items-center gap-10">
            {marqueeItems.map((s, i) => (
              <div key={i} className="flex items-center gap-3 flex-shrink-0">
                <span className="font-akkurat text-[#d5fad3] text-[13px] font-bold">
                  {s.value}
                </span>
                <span className="text-code-micro text-[#9d937c] uppercase tracking-widest">
                  {s.label}
                </span>
                <span className="text-[#3d3b34] mx-1 select-none">
                  &middot;
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOLS GRID ── */}
      <section
        className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24"
        style={{ color: "var(--color-text)" }}
      >
        <div className="flex items-end justify-between mb-14">
          <div>
            <p
              className="text-code-label uppercase tracking-widest mb-3"
              style={{ color: "var(--color-text-muted)" }}
            >
              The Toolkit
            </p>
            <h2
              className="text-display-large"
              style={{ color: "var(--color-text)" }}
            >
              Every tool you need.
            </h2>
          </div>
          <Link
            href="/analytics"
            className="btn-outline hidden md:inline-flex dark:border-[#f9f9f0]/30 dark:text-[#f9f9f0]"
          >
            View Analytics
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0f0e0b]/10 dark:bg-[#f9f9f0]/10">
          {tools.map((tool, i) => {
            const isComingSoon = tool.href === "/neet";
            if (isComingSoon) {
              return (
                <Link
                  key={i}
                  href={tool.href}
                  className="tool-card group relative p-8 md:p-10 bg-[#f9f9f0] dark:bg-[#0f0e0b] block hover:bg-[#f0efe6] dark:hover:bg-[#21201c]"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="inline-block px-3 py-1 text-code-micro uppercase tracking-widest text-[#0f0e0b]"
                      style={{
                        backgroundColor: tool.color,
                        borderRadius: "9999px",
                      }}
                    >
                      {tool.tag}
                    </div>
                    <span className="font-akkurat text-[11px] text-[#9d937c]">
                      {tool.num}
                    </span>
                  </div>
                  <h3 className="text-display-medium text-[#0f0e0b] dark:text-[#f9f9f0] mb-4">
                    {tool.title}
                  </h3>
                  <p
                    className="text-body-base leading-relaxed max-w-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {tool.desc}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-code-label text-[#0f0e0b] dark:text-[#f9f9f0] uppercase tracking-widest">
                    <span>Coming soon!</span>
                  </div>
                </Link>
              );
            }

            return (
              <Link
                key={i}
                href={tool.href}
                className="tool-card group relative p-8 md:p-10 bg-[#f9f9f0] dark:bg-[#0f0e0b] hover:bg-[#f0efe6] dark:hover:bg-[#21201c] block"
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="inline-block px-3 py-1 text-code-micro uppercase tracking-widest text-[#0f0e0b]"
                    style={{
                      backgroundColor: tool.color,
                      borderRadius: "9999px",
                    }}
                  >
                    {tool.tag}
                  </div>
                  <span className="font-akkurat text-[11px] text-[#9d937c]">
                    {tool.num}
                  </span>
                </div>
                <h3 className="text-display-medium text-[#0f0e0b] dark:text-[#f9f9f0] mb-4">
                  {tool.title}
                </h3>
                <p
                  className="text-body-base leading-relaxed max-w-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {tool.desc}
                </p>
                <div className="mt-8 flex items-center gap-2 text-code-label text-[#0f0e0b] dark:text-[#f9f9f0] uppercase tracking-widest group-hover:gap-4 transition-all duration-200">
                  <span>Try it</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── WHY ALPHAJEE ── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        <div className="mb-14">
          <p className="text-code-label text-[#9d937c] uppercase tracking-widest mb-3">
            Why AlphaJEE
          </p>
          <h2 className="text-display-large text-[#0f0e0b] dark:text-[#f9f9f0] max-w-xl">
            Built different, for a reason.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0f0e0b]/10 dark:bg-[#f9f9f0]/10">
          {features.map((f, i) => (
            <div key={i} className="p-8 md:p-10 bg-[#f9f9f0] dark:bg-[#0f0e0b]">
              <div className="w-7 h-7 bg-[#0f0e0b] dark:bg-[#f9f9f0] flex items-center justify-center mb-6">
                <span className="font-akkurat text-[#f9f9f0] dark:text-[#0f0e0b] text-[10px]">
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-heading-2xl text-[#0f0e0b] dark:text-[#f9f9f0] mb-3">
                {f.label}
              </h3>
              <p className="text-body-base text-[#9d937c] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SCORE CALCULATOR CTA ── */}
      <section className="bg-[#badbee]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <p className="text-code-label text-[#3d3b34] uppercase tracking-widest mb-4">
              Calculate First
            </p>
            <h2 className="text-display-medium text-[#0f0e0b] max-w-xl">
              Need your raw score first? Use the official score calculator.
            </h2>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <a
              href="https://score.alphajee.online"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ backgroundColor: "#0f0e0b", color: "#f9f9f0" }}
            >
              Calculate Raw Score
            </a>
            <Link
              href="/percentile"
              className="btn-outline"
              style={{ borderColor: "#0f0e0b" }}
            >
              I have my score
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ── */}
      <section className="bg-[#0f0e0b] py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 text-center">
          <p className="text-code-label text-[#9d937c] uppercase tracking-widest mb-4">
            Community
          </p>
          <h2 className="text-display-large text-[#f9f9f0] mb-5">
            Join serious aspirants.
          </h2>
          <p className="text-body-large text-[#9d937c] max-w-xl mx-auto mb-10">
            Get real-time updates, discuss scores, and support each other on our
            Reddit community and Discord server.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://reddit.com/r/alphajee"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                backgroundColor: "#d5fad3",
                color: "#0f0e0b",
                borderColor: "#d5fad3",
              }}
            >
              r/alphajee on Reddit
            </a>
            <a
              href="https://discord.gg/QYzZcMDBHY"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ borderColor: "rgba(249,249,240,0.3)" }}
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>

      {/* ── LEGENDS STRIP ── */}
      <section className="bg-[#efecca]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-code-label text-[#9d937c] uppercase tracking-widest mb-3">
              Wall of Legends
            </p>
            <h2 className="text-display-medium text-[#0f0e0b]">
              Keeping us alive.
            </h2>
            <p className="text-body-base text-[#3d3b34] mt-4 max-w-lg">
              AlphaJEE runs on zero ads. These legends kept the servers on and
              the mission alive.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Link
              href="/legends"
              className="btn-primary"
              style={{ backgroundColor: "#0f0e0b", color: "#f9f9f0" }}
            >
              View Wall of Legends
            </Link>
            <Link
              href="/donate"
              className="btn-outline"
              style={{ borderColor: "#0f0e0b" }}
            >
              Support the Mission
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
