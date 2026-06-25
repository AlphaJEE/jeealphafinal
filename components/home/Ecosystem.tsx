"use client";

import Link from "next/link";
import { SpotlightCard, Reveal } from "./primitives";

type Product = {
  n: string;
  title: string;
  tag: string;
  tagBg: string;
  tagText: string;
  desc: string;
  action: string;
  href: string;
  external: boolean;
  domain?: string;
  badge?: string;
  /** Drop a logo in /public/ecosystem and point here, e.g. "/ecosystem/oviguide.png" */
  logo?: string;
};

const products: Product[] = [
  {
    n: "01",
    title: "JEE Predictor",
    tag: "JEE Main & Advanced",
    tagBg: "#badbee",
    tagText: "#0f0e0b",
    desc: "Predict your JEE Main percentile and JEE Advanced All India Rank instantly using the V4 Alpha Engine with multi-factor interpolation and real historical data.",
    action: "Try it",
    href: "/percentile",
    external: false,
    domain: "alphajee.com",
    badge: "Part of OviGuide",
    logo: "/favicon.png",
  },
  {
    n: "02",
    title: "OviGuide",
    tag: "OviGuide",
    tagBg: "#cfe8d8",
    tagText: "#15803d",
    desc: "Personalized college guidance across JEE, MHT-CET, KCET, COMEDK, BITSAT and every major counselling — grounded in real cutoffs, not guesswork.",
    action: "Visit",
    href: "https://oviguide.in",
    external: true,
    domain: "oviguide.in",
    logo: "/ecosystem/oviguide.jpeg",
  },
  {
    n: "03",
    title: "OviBattle",
    tag: "OviBattle",
    tagBg: "#f3d4cf",
    tagText: "#c8522a",
    desc: "A real-time arena for serious aspirants. Pick a subject, join a live battle, and climb the ranks head-to-head against peers nationwide.",
    action: "Play",
    href: "https://ovibattle.in",
    external: true,
    domain: "ovibattle.in",
    logo: "/ecosystem/ovibattle.png",
  },
  {
    n: "04",
    title: "NEET Predictor",
    tag: "NEET UG",
    tagBg: "#d5fad3",
    tagText: "#15803d",
    desc: "Get your NEET rank prediction with the Hopium Module — adjust variance for best-case and worst-case scenarios.",
    action: "Try it",
    href: "/neet",
    external: false,
    domain: "alphajee.com",
    badge: "Part of OviGuide",
    logo: "/favicon.png",
  },
];

// TODO: add the Reddit posts that feature these products (title + url).
const redditPosts: { title: string; url: string; sub?: string }[] = [];

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-3 h-3">
      <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
    </svg>
  );
}

function ProductCard({ p }: { p: Product }) {
  const Action = p.external ? "a" : (Link as any);
  const actionProps = p.external
    ? { href: p.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: p.href };

  return (
    <SpotlightCard className="glass rounded-3xl overflow-hidden h-full" tilt={false}>
      <div className="relative p-7 sm:p-9 h-full flex flex-col">
        {/* watermark number */}
        <span className="pointer-events-none absolute -right-2 top-2 font-season font-semibold leading-none text-[#0f0e0b]/[0.04] text-[clamp(90px,12vw,150px)] select-none">
          {p.n}
        </span>

        {/* logo + tag */}
        <div className="relative flex items-center gap-3 mb-7">
          <div className="relative w-[52px] h-[52px] rounded-xl bg-white border border-[#0f0e0b]/10 flex items-center justify-center overflow-hidden flex-shrink-0">
            <span className="font-season text-base text-[#0f0e0b]/45">{p.title[0]}</span>
            {p.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.logo}
                alt={p.title}
                className="absolute inset-[7px] object-contain"
                ref={(node) => {
                  // hide if the file is missing/broken (covers the SSR-hydration race)
                  if (node && node.complete && node.naturalWidth === 0) node.style.display = "none";
                }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            )}
          </div>
          <span
            className="font-akkurat text-[9px] uppercase tracking-[0.16em] rounded-full px-3 py-1.5"
            style={{ background: p.tagBg, color: p.tagText }}
          >
            {p.tag}
          </span>
        </div>

        {/* title + desc */}
        <h3 className="relative font-season text-[clamp(28px,3vw,38px)] text-[#0f0e0b] leading-none mb-4">
          {p.title}
        </h3>
        <p className="relative font-season text-[15px] text-[#3d3b34] leading-relaxed max-w-md flex-1">
          {p.desc}
        </p>

        {/* footer */}
        <div className="relative mt-7 flex items-end justify-between gap-3">
          <Action
            {...actionProps}
            className="inline-flex items-center gap-1.5 font-akkurat text-[10px] uppercase tracking-[0.2em] font-bold text-[#0f0e0b] hover:gap-2.5 transition-all"
          >
            {p.action}
            <Arrow />
          </Action>
          <div className="flex items-center gap-2 text-right">
            {p.domain && (
              <span className="font-akkurat text-[10px] text-[#9d937c]">{p.domain}</span>
            )}
            {p.badge && (
              <span className="font-akkurat text-[8px] uppercase tracking-[0.14em] text-[#15803d] bg-[#cfe8d8]/60 rounded-full px-2 py-0.5">
                {p.badge}
              </span>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function Ecosystem() {
  return (
    <section id="oviqo" className="relative bg-[#f0efe6]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        {/* Header */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-7">
            <p className="font-akkurat text-[11px] uppercase tracking-[0.25em] text-[#2a6b4a] mb-4">
              The Oviqo Ecosystem
            </p>
            <h2 className="font-season text-[clamp(34px,5vw,72px)] leading-[0.96] text-[#0f0e0b]">
              Four products.
              <br />
              <span className="italic text-[#2a6b4a]">One mission.</span>
            </h2>
          </div>
          <p className="lg:col-span-5 font-season text-[#3d3b34] text-lg leading-relaxed">
            From rank prediction to choice lists to head-to-head practice — the
            Oviqo family covers every step from your first mock test to your final
            college lock.
          </p>
        </Reveal>

        {/* Family pill */}
        <Reveal delay={80} className="mb-12">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-[#cfe8d8]/50 border border-[#2a6b4a]/20 pl-3.5 pr-4 py-2">
            <svg viewBox="0 0 24 24" fill="#2a6b4a" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M12 1l2.4 6.9L21 9l-5.4 4.2L17.5 21 12 16.8 6.5 21l1.9-7.8L3 9l6.6-1.1L12 1z" />
            </svg>
            <span className="font-akkurat text-[10px] uppercase tracking-[0.16em] text-[#15803d]">
              Joined the family · AlphaJEE is now part of OviGuide
            </span>
          </span>
        </Reveal>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(16px,1.8vw,22px)]">
          {products.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 100}>
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>

        {/* Featured on Reddit */}
        {redditPosts.length > 0 && (
          <div className="mt-16">
            <Reveal className="mb-6">
              <p className="font-akkurat text-[11px] uppercase tracking-[0.25em] text-[#c8522a]">
                Featured on Reddit
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(14px,1.6vw,20px)]">
              {redditPosts.map((post, i) => (
                <Reveal key={post.url} delay={(i % 3) * 80}>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block glass rounded-2xl p-6 h-full hover:border-[#0f0e0b]/20 transition-colors group"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <svg viewBox="0 0 24 24" fill="#ff4500" className="w-5 h-5" aria-hidden="true">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701z" />
                      </svg>
                      <span className="font-akkurat text-[9px] uppercase tracking-[0.16em] text-[#9d937c]">
                        {post.sub || "r/alphajee"}
                      </span>
                    </div>
                    <p className="font-season text-[#0f0e0b] leading-snug group-hover:text-[#c8522a] transition-colors">
                      {post.title}
                    </p>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
