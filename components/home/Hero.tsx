"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import IITBombaySketch from "@/components/IITBombaySketch";
import HeroPredictor from "./HeroPredictor";
import { CountUp, Magnetic } from "./primitives";

const marqueeItems = [
  ["1 Lakh+", "Users"],
  ["2M+", "Predictions"],
  ["97%", "Accuracy"],
  ["100%", "Free forever"],
  ["0", "Ads. Ever."],
  ["OviGuide", "Official product"],
];

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (parallaxRef.current)
          parallaxRef.current.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
        if (copyRef.current)
          copyRef.current.style.transform = `translate3d(0, ${y * 0.06}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-[var(--ovi-hero)] flex flex-col"
      style={{ minHeight: "calc(100svh - 48px)" }}
    >
      {/* cinematic IIT Bombay backdrop — Ken Burns + parallax */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-end"
        aria-hidden="true"
      >
        {/* faint blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,14,11,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15,14,11,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="ken-burns w-[80%] lg:w-[58%] -mr-[6%]">
          <IITBombaySketch
            className="w-full text-[var(--ovi-cream)] opacity-[0.13]"
            style={{ maxHeight: "640px" }}
          />
        </div>
      </div>
      {/* readability gradient */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "var(--ovi-hero-grad)" }}
      />

      <div className="relative z-10 flex-1 flex items-center w-full pt-[92px] pb-[48px]">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-[clamp(28px,4vw,56px)] gap-y-10 items-center">
          {/* Left copy */}
          <div ref={copyRef} className="lg:col-span-7 min-w-0">
            <a
              href="https://oviguide.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 mb-7 anim-fade-up rounded-full bg-[#f5f2ec] hover:bg-[#fffdf9] border border-[#143927]/15 pl-4 pr-3.5 py-2 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#2d4a3e]/75">
                An official product of
              </span>
              <span className="font-season italic text-lg sm:text-xl leading-none text-[#c8522a] group-hover:text-[#b8531a] transition-colors">
                OviGuide
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="self-center h-3 w-3 text-[#c8522a] -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
              >
                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
              </svg>
            </a>

            <h1 className="font-season text-[clamp(40px,5.4vw,76px)] leading-[0.95] tracking-[-0.02em] text-[var(--ovi-cream)] mb-7 anim-fade-up anim-fade-up-d1">
              The Free JEE
              <br />
              <span className="italic">Ecosystem.</span>
            </h1>

            <p className="font-season text-[var(--ovi-cream-dim)] text-xl max-w-md leading-relaxed mb-9 anim-fade-up anim-fade-up-d2">
              Don't read about a predictor. Use one. Drag your marks and watch
              your percentile move — instantly, no login, no paywalls.
            </p>

            <div className="flex flex-wrap items-center gap-3 anim-fade-up anim-fade-up-d3">
              <Magnetic strength={0.35}>
                <Link href="/advanced" className="btn-primary" style={{ backgroundColor: "var(--ovi-cream)", color: "var(--ovi-bg)", borderColor: "var(--ovi-cream)" }}>
                  JEE Advanced Rank
                </Link>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Link href="/oviqo" className="btn-outline" style={{ borderColor: "var(--ovi-cream)", color: "var(--ovi-cream)" }}>
                  The Oviqo Family
                </Link>
              </Magnetic>
            </div>

            {/* count-up stats */}
            <div className="flex items-center gap-7 mt-[clamp(28px,4vh,44px)] pt-7 border-t border-[var(--ovi-line)] anim-fade-up anim-fade-up-d4">
              <div>
                <p className="font-season text-3xl sm:text-4xl font-semibold text-[var(--ovi-cream)] tabular-nums">
                  <CountUp to={1} duration={1400} />
                  <span className="text-[var(--ovi-muted)]"> Lakh+</span>
                </p>
                <p className="font-akkurat text-[9px] uppercase tracking-[0.2em] text-[var(--ovi-cream-dim)] mt-1">
                  Users
                </p>
              </div>
              <div className="w-px h-10 bg-[var(--ovi-line)]" />
              <div>
                <p className="font-season text-3xl sm:text-4xl font-semibold text-[var(--ovi-cream)] tabular-nums">
                  <CountUp to={2} duration={1600} />
                  <span className="text-[var(--ovi-muted)]">M+</span>
                </p>
                <p className="font-akkurat text-[9px] uppercase tracking-[0.2em] text-[var(--ovi-cream-dim)] mt-1">
                  Predictions
                </p>
              </div>
              <div className="w-px h-10 bg-[var(--ovi-line)]" />
              <div>
                <p className="font-season text-3xl sm:text-4xl font-semibold text-[var(--ovi-cream)] tabular-nums">
                  <CountUp to={97} duration={1800} />
                  <span className="text-[var(--ovi-muted)]">%</span>
                </p>
                <p className="font-akkurat text-[9px] uppercase tracking-[0.2em] text-[var(--ovi-cream-dim)] mt-1">
                  Accuracy
                </p>
              </div>
            </div>
          </div>

          {/* Right: live predictor */}
          <div className="lg:col-span-5 min-w-0 w-full anim-fade-up anim-fade-up-d2">
            <HeroPredictor />
          </div>
          </div>
        </div>
      </div>

      {/* marquee */}
      <div className="relative z-10 bg-[#0f0e0b] py-4 ticker-wrapper">
        <div className="ticker-inner items-center gap-10">
          {[...marqueeItems, ...marqueeItems].map(([v, l], i) => (
            <div key={i} className="flex items-center gap-3 flex-shrink-0">
              <span className="font-akkurat text-[#d5fad3] text-[13px] font-bold">{v}</span>
              <span className="font-akkurat text-[9px] text-[var(--ovi-muted)] uppercase tracking-[0.2em]">
                {l}
              </span>
              <span className="text-[var(--ovi-cream-dim)] mx-1 select-none">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
