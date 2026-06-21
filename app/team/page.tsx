import Link from "next/link";

const redditPostUrl =
  "https://www.reddit.com/r/alphajee/comments/1u6o4aa/psa_the_truth_about_alphajee_the_hostile_takeover/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button";

/* ─── Narendra's contributions shown as a rich list ─── */
const narendraContributions = [
  "redesigned the complete site from scratch , improved sites ui/ux ,maintaining best infrastructure to scale alphajee and handles design and ui/ux part at alphajee",
];

type TeamMember = {
  initial: string;
  name: string;
  role: string;
  tag: string;
  accent: string;
  isCriminal: boolean;
  isPremium?: boolean;
  showCriminalBadge?: boolean; // ← NEW: optional flag to hide the badge
  domain: string;
  contributions: string | string[];
  email: string;
  reddit: string;
  portfolio?: string;
  note?: string;
};

const team: TeamMember[] = [
  {
    initial: "D",
    name: "Dizzy",
    role: "Founder & CEO",
    tag: "Leadership",
    accent: "#badbee",
    isCriminal: false,
    domain:
      "The entire AlphaJEE vision, infrastructure, and ecosystem. Direct owner of the primary mission and all core products.",
    contributions:
      "Built and maintains the Alpha Engine predictors, the analytics dashboard, the core website, and all backend infrastructure. The original architect of the AlphaJEE brand and community.",
    email: "dizzy@alphajee.online",
    reddit: "u/Dizzy-Attitude-8174",
  },
  {
    initial: "N",
    name: "Narendra",
    role: "Lead Designer & Front-End Developer",
    tag: "Design & Dev",
    accent: "#d5fad3",
    isCriminal: false,
    isPremium: true,
    domain:
      "UI/UX design, front-end engineering, and the complete visual identity of AlphaJEE. Makes every pixel intentional and every interaction feel premium.",
    contributions: narendraContributions,
    email: "narendrameesala18@gmail.com",
    reddit: "u/National_Mobile_5137",
    portfolio: "https://github.com/meesalasainarendra",
  },
  {
    initial: "D",
    name: "Dikshit RJ",
    role: "CTO",
    tag: "Engineering",
    accent: "#d5fad3",
    isCriminal: true,
    domain:
      "All technical architecture, backend infrastructure, and core algorithmic systems.",
    contributions:
      "Engineered the proprietary Jtestify analytics engine, managed heavy backend infrastructure handling millions of requests, and co-developed the fackNTA tool.",
    email: "dikshitrj@alphajee.online",
    reddit: "u/white-9igga",
  },
  {
    initial: "A",
    name: "Ayush",
    role: "Head of development",
    tag: "lead dev",
    accent: "#dc2626",
    isCriminal: true,
    // ← Badge hidden, rest of criminal styling kept
    domain:
      " oversees the development team,ensure the code quality and maintainability, and manages the dev part of the project",
    contributions:
      " lead dev at alphajee , helped in geting code quality and maintainability, and manages the dev part at  alphajee",
    email: "",
    reddit: "",
    portfolio: "",
  },
  {
    initial: "S",
    name: "Samarth",
    role: "Core Developer & Strategic Board",
    tag: "Strategy",
    accent: "#d5fad3",
    isCriminal: true,
    domain:
      "Long-term trajectory and objective guidance. Operates in the daily coding grind while providing tie-breaking perspectives during leadership disagreements.",
    contributions:
      "Provided crucial early-stage prototypes, unified project planning, and deep architectural debugging. Co-developed the fackNTA tool and set up foundational operational workflows.",
    email: "samarth@alphajee.online",
    reddit: "u/sciron2",
    portfolio: "https://www.linkedin.com/in/samarthravishankar1/",
  },
];

/* ─── Reddit SVG icon ─── */
function RedditIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

export default function TeamPage() {
  return (
    <div className="bg-[#f9f9f0] dark:bg-[#0f0e0b] min-h-screen">
      {/* ── Page Header ── */}
      <div className="bg-[#efecca] pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-code-label text-[#9d937c] uppercase tracking-widest mb-4">
            The Syndicate
          </p>
          <h1 className="text-display-large text-[#0f0e0b]">Our Team</h1>
          <p className="text-body-large text-[#3d3b34] mt-4 max-w-2xl">
            A group of students and engineers who got tired of coaching industry
            nonsense and decided to build something real.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* ══════════════════════════════════════════════
            REDDIT EXPOSÉ BANNER — premium, on-brand
        ══════════════════════════════════════════════ */}
        <div
          className="mb-12 sm:mb-20 relative overflow-hidden"
          style={{
            background: "#0f0e0b",
            border: "1px solid rgba(249,249,240,0.08)",
          }}
        >
          {/* Cream checkerboard texture strip on the left */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{ background: "#efecca" }}
          />

          {/* Subtle diagonal pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#f9f9f0 0,#f9f9f0 1px,transparent 0,transparent 50%)",
              backgroundSize: "12px 12px",
            }}
          />

          <div className="relative pl-8 pr-6 sm:pl-12 sm:pr-10 py-10 sm:py-14">
            <div className="flex flex-col lg:flex-row lg:items-stretch gap-10 lg:gap-16">
              {/* ── Left: text content ── */}
              <div className="flex-1 flex flex-col justify-center">
                {/* eyebrow label */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px" style={{ background: "#dc2626" }} />
                  <span
                    style={{
                      fontFamily: "'Akkurat Mono', monospace",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "#dc2626",
                    }}
                  >
                    PSA · Community Alert · Exposé
                  </span>
                </div>

                {/* headline — Dopis font */}
                <h2
                  style={{
                    fontFamily: "'Dopis Light', sans-serif",
                    fontSize: "clamp(28px, 4vw, 52px)",
                    fontWeight: 300,
                    lineHeight: 1.05,
                    letterSpacing: "-1px",
                    color: "#f9f9f0",
                    marginBottom: "8px",
                  }}
                >
                  The Truth About
                </h2>
                <h2
                  style={{
                    fontFamily: "'Dopis Light', sans-serif",
                    fontSize: "clamp(28px, 4vw, 52px)",
                    fontWeight: 300,
                    lineHeight: 1.05,
                    letterSpacing: "-1px",
                    color: "#efecca",
                    marginBottom: "24px",
                  }}
                >
                  AlphaJEE
                </h2>

                {/* sub headline */}
                <p
                  style={{
                    fontFamily: "'Season Serif', Georgia, serif",
                    fontSize: "clamp(15px, 1.8vw, 19px)",
                    fontWeight: 358,
                    lineHeight: 1.45,
                    color: "rgba(249,249,240,0.55)",
                    maxWidth: "480px",
                    marginBottom: "32px",
                  }}
                >
                  A full breakdown of the hostile takeover attempt — who was
                  involved, what happened, and what comes next for AlphaJEE.
                  Written and posted by the founder.
                </p>

                {/* stat row */}
                <div className="flex items-center gap-6 mb-10">
                  {[
                    { label: "Upvotes", value: "10" },
                    { label: "Comments", value: "9" },
                    { label: "Views", value: "1k+" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p
                        style={{
                          fontFamily: "'Akkurat Mono', monospace",
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "#efecca",
                          lineHeight: 1,
                          marginBottom: "4px",
                        }}
                      >
                        {s.value}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Akkurat Mono', monospace",
                          fontSize: "9px",
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: "rgba(249,249,240,0.3)",
                        }}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={redditPostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 transition-all duration-200 hover:opacity-80 active:scale-[0.97]"
                    style={{
                      background: "#dc2626",
                      color: "#f9f9f0",
                      borderRadius: "9999px",
                      padding: "13px 26px",
                      fontFamily: "'Akkurat Mono', monospace",
                      fontSize: "11px",
                      fontWeight: 400,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      boxShadow: "0 4px 24px rgba(220,38,38,0.25)",
                      textDecoration: "none",
                    }}
                  >
                    <RedditIcon size={14} />
                    Read Full Post →
                  </a>
                  <span
                    style={{
                      fontFamily: "'Akkurat Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "rgba(249,249,240,0.25)",
                    }}
                  >
                    r/alphajee · by u/Dizzy-Attitude-8174
                  </span>
                </div>
              </div>

              {/* ── Right: Reddit post card ── */}
              <div
                className="flex-shrink-0 w-full lg:w-[300px] xl:w-[340px] flex flex-col"
                style={{
                  border: "1px solid rgba(249,249,240,0.1)",
                  background: "rgba(249,249,240,0.04)",
                }}
              >
                {/* card header */}
                <div
                  className="flex items-center gap-2.5 px-5 py-4"
                  style={{ borderBottom: "1px solid rgba(249,249,240,0.07)" }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "#ff4500" }}
                  >
                    <RedditIcon size={14} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Akkurat Mono', monospace",
                        fontSize: "9px",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: "rgba(249,249,240,0.4)",
                        lineHeight: 1,
                        marginBottom: "2px",
                      }}
                    >
                      r/alphajee
                    </p>
                    <p
                      style={{
                        fontFamily: "'Akkurat Mono', monospace",
                        fontSize: "9px",
                        color: "rgba(249,249,240,0.2)",
                        lineHeight: 1,
                      }}
                    >
                      u/Dizzy-Attitude-8174
                    </p>
                  </div>
                  {/* live badge */}
                  <div className="ml-auto flex items-center gap-1.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "#dc2626",
                        boxShadow: "0 0 6px #dc2626",
                        animation: "pulse 2s infinite",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Akkurat Mono', monospace",
                        fontSize: "8px",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: "#dc2626",
                      }}
                    >
                      Live
                    </span>
                  </div>
                </div>

                {/* card body */}
                <div className="flex-1 px-5 py-5">
                  <p
                    style={{
                      fontFamily: "'Season Serif', Georgia, serif",
                      fontSize: "15px",
                      fontWeight: 420,
                      lineHeight: 1.35,
                      color: "#f9f9f0",
                      marginBottom: "12px",
                    }}
                  >
                    PSA: The Truth About AlphaJEE, The Hostile Takeover, and
                    What&apos;s Next
                  </p>
                  <p
                    style={{
                      fontFamily: "'Season Serif', Georgia, serif",
                      fontSize: "12px",
                      fontWeight: 358,
                      lineHeight: 1.55,
                      color: "rgba(249,249,240,0.35)",
                      fontStyle: "italic",
                    }}
                  >
                    &ldquo;I am writing this post to bring complete clarity to
                    the community regarding what has happened…&rdquo;
                  </p>
                </div>

                {/* card footer — vote row */}
                <div
                  className="flex items-center justify-between px-5 py-4"
                  style={{ borderTop: "1px solid rgba(249,249,240,0.07)" }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="flex items-center gap-1"
                      style={{
                        fontFamily: "'Akkurat Mono', monospace",
                        fontSize: "10px",
                        color: "#ff6b6b",
                        letterSpacing: "0.5px",
                      }}
                    >
                      ▲ 10
                    </span>
                    <span
                      style={{
                        fontFamily: "'Akkurat Mono', monospace",
                        fontSize: "10px",
                        color: "rgba(249,249,240,0.25)",
                      }}
                    >
                      9 comments
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Akkurat Mono', monospace",
                      fontSize: "9px",
                      color: "rgba(249,249,240,0.18)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    747 views
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            TEAM GRID
        ══════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-[#0f0e0b]/10 dark:bg-[#f9f9f0]/10">
          {team.map((member, i) => {
            const isPremium = member.isPremium === true;
            // Check if criminal badge should show (defaults to true unless explicitly false)
            const showCriminalBadge =
              member.isCriminal && member.showCriminalBadge !== false;
            return (
              <div
                key={i}
                className="relative group"
                style={{
                  background: member.isCriminal
                    ? "linear-gradient(180deg,rgba(220,38,38,0.07) 0%,rgba(220,38,38,0.02) 100%)"
                    : isPremium
                      ? "linear-gradient(160deg,#0f0e0b 0%,#21201c 100%)"
                      : "#f9f9f0",
                }}
              >
                {/* Accent top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{
                    background: member.isCriminal
                      ? "linear-gradient(90deg,#dc2626,#ef4444,#dc2626)"
                      : isPremium
                        ? `linear-gradient(90deg,${member.accent},#badbee,${member.accent})`
                        : member.accent,
                  }}
                />

                {/* Criminal glow */}
                {member.isCriminal && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at top right,rgba(220,38,38,0.05) 0%,transparent 60%)",
                    }}
                  />
                )}

                {/* Premium shimmer */}
                {isPremium && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at top left,rgba(213,250,211,0.06) 0%,transparent 55%)",
                    }}
                  />
                )}

                <div className="p-6 sm:p-10">
                  {/* Avatar + tags */}
                  <div className="flex items-start justify-between mb-6 sm:mb-8 gap-2">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center font-akkurat text-xl sm:text-2xl font-bold flex-shrink-0"
                      style={{
                        background: member.isCriminal
                          ? "#fecaca"
                          : isPremium
                            ? member.accent
                            : member.accent,
                        border: member.isCriminal
                          ? "2px solid #dc2626"
                          : isPremium
                            ? `2px solid rgba(213,250,211,0.4)`
                            : "none",
                        color: "#0f0e0b",
                      }}
                    >
                      {member.initial}
                    </div>

                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {/* Criminal badge — conditionally rendered */}
                      {showCriminalBadge && (
                        <span
                          className="text-code-micro uppercase tracking-widest px-2.5 py-1 flex items-center gap-1"
                          style={{
                            background: "#dc2626",
                            color: "#fff",
                            borderRadius: "9999px",
                            fontSize: "9px",
                            letterSpacing: "1px",
                            boxShadow: "0 2px 8px rgba(220,38,38,0.3)",
                          }}
                        >
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                          </svg>
                          Criminal
                        </span>
                      )}
                      {/* Tag pill */}
                      <span
                        className="text-code-micro uppercase tracking-widest px-2.5 py-1"
                        style={{
                          background: member.isCriminal
                            ? "rgba(220,38,38,0.1)"
                            : isPremium
                              ? "rgba(213,250,211,0.15)"
                              : member.accent,
                          color: member.isCriminal
                            ? "#dc2626"
                            : isPremium
                              ? member.accent
                              : "#0f0e0b",
                          borderRadius: "9999px",
                          border: member.isCriminal
                            ? "1px solid rgba(220,38,38,0.2)"
                            : isPremium
                              ? `1px solid rgba(213,250,211,0.25)`
                              : "none",
                        }}
                      >
                        {member.tag}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <h3
                    className="text-display-medium mb-1"
                    style={{
                      color: member.isCriminal
                        ? "#991b1b"
                        : isPremium
                          ? "#f9f9f0"
                          : "#0f0e0b",
                    }}
                  >
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p
                    className="text-code-label uppercase tracking-widest mb-6 sm:mb-8"
                    style={{
                      color: isPremium ? "rgba(249,249,240,0.4)" : "#9d937c",
                    }}
                  >
                    {member.role}
                  </p>

                  {/* ── Premium "handcrafted" notice for Narendra ── */}
                  {isPremium && (
                    <div
                      className="mb-6 flex items-center gap-2"
                      style={{
                        borderLeft: `2px solid ${member.accent}`,
                        paddingLeft: "12px",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Akkurat Mono', monospace",
                          fontSize: "9px",
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: member.accent,
                        }}
                      >
                        ✦ Handcrafted contributions — written manually
                      </p>
                    </div>
                  )}

                  {/* Criminal warning — kept for all isCriminal members */}
                  {member.isCriminal && (
                    <div
                      className="mb-6 p-3 sm:p-4 flex items-start gap-3"
                      style={{
                        background: "rgba(220,38,38,0.06)",
                        border: "1px solid rgba(220,38,38,0.15)",
                        borderRadius: "6px",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="2"
                        className="flex-shrink-0 mt-0.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                      <div>
                        <p
                          style={{
                            fontFamily: "'Akkurat Mono', monospace",
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            color: "#dc2626",
                            marginBottom: "4px",
                          }}
                        >
                          Involved in hostile takeover
                        </p>
                        <a
                          href={redditPostUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: "'Akkurat Mono', monospace",
                            fontSize: "9px",
                            letterSpacing: "0.5px",
                            color: "rgba(220,38,38,0.6)",
                            textDecoration: "underline",
                          }}
                        >
                          Read the full exposé →
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Domain & Contributions */}
                  <div className="space-y-5 sm:space-y-6">
                    <div>
                      <p
                        className="text-code-micro uppercase tracking-widest mb-2"
                        style={{
                          color: isPremium
                            ? "rgba(249,249,240,0.3)"
                            : "#9d937c",
                        }}
                      >
                        Domain & Authority
                      </p>
                      <p
                        className="text-body-small leading-relaxed"
                        style={{
                          color: isPremium
                            ? "rgba(249,249,240,0.6)"
                            : "#3d3b34",
                        }}
                      >
                        {member.domain}
                      </p>
                    </div>

                    <div>
                      <p
                        className="text-code-micro uppercase tracking-widest mb-3"
                        style={{
                          color: isPremium
                            ? "rgba(249,249,240,0.3)"
                            : "#9d937c",
                        }}
                      >
                        Key Contributions
                      </p>

                      {Array.isArray(member.contributions) ? (
                        <div className="space-y-3">
                          {(member.contributions as string[]).map((item, j) => (
                            <div key={j} className="flex items-start gap-3">
                              {/* numbered index */}
                              <span
                                style={{
                                  fontFamily: "'Akkurat Mono', monospace",
                                  fontSize: "9px",
                                  fontWeight: 700,
                                  color: isPremium ? member.accent : "#9d937c",
                                  minWidth: "18px",
                                  paddingTop: "2px",
                                  lineHeight: 1,
                                  opacity: 0.9,
                                }}
                              >
                                {String(j + 1).padStart(2, "0")}
                              </span>
                              <p
                                className="text-body-small leading-relaxed"
                                style={{
                                  color: isPremium
                                    ? "rgba(249,249,240,0.65)"
                                    : "#3d3b34",
                                }}
                              >
                                {item}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p
                          className="text-body-small leading-relaxed"
                          style={{
                            color: member.isCriminal
                              ? "rgba(61,59,52,0.55)"
                              : "#3d3b34",
                            textDecoration: member.isCriminal
                              ? "line-through"
                              : "none",
                            textDecorationColor: "rgba(220,38,38,0.3)",
                          }}
                        >
                          {member.contributions as string}
                        </p>
                      )}
                    </div>

                    {/* Note */}
                    {member.note && (
                      <p
                        className="text-code-micro italic"
                        style={{
                          color: "#9d937c",
                          lineHeight: 1.6,
                          borderLeft: "2px solid rgba(157,147,124,0.3)",
                          paddingLeft: "10px",
                        }}
                      >
                        {member.note}
                      </p>
                    )}
                  </div>

                  {/* Card footer */}
                  <div
                    className="mt-6 sm:mt-8 pt-5 sm:pt-6 flex flex-wrap justify-between items-center gap-2"
                    style={{
                      borderTop: isPremium
                        ? "1px solid rgba(249,249,240,0.08)"
                        : "1px solid rgba(15,14,11,0.1)",
                    }}
                  >
                    <a
                      href={`mailto:${member.email}`}
                      className="text-code-micro uppercase tracking-widest break-all transition-opacity hover:opacity-60"
                      style={{
                        color: member.isCriminal
                          ? "rgba(157,147,124,0.45)"
                          : isPremium
                            ? "rgba(249,249,240,0.3)"
                            : "#9d937c",
                        textDecoration: "none",
                      }}
                    >
                      {member.email}
                    </a>
                    {member.portfolio ? (
                      <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-code-micro transition-opacity hover:opacity-70"
                        style={{
                          color: member.isCriminal
                            ? "#dc2626"
                            : isPremium
                              ? member.accent
                              : "#f97316",
                          textDecoration: "none",
                        }}
                      >
                        {member.reddit}
                      </a>
                    ) : (
                      <a
                        href={`https://reddit.com/${member.reddit}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-code-micro transition-opacity hover:opacity-70"
                        style={{
                          color: member.isCriminal
                            ? "#dc2626"
                            : isPremium
                              ? member.accent
                              : "#f97316",
                          textDecoration: "none",
                        }}
                      >
                        {member.reddit}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Join CTA ── */}
        <div className="mt-12 sm:mt-20 bg-[#badbee] p-8 sm:p-12 text-center">
          <p className="text-code-label text-[#3d3b34] uppercase tracking-widest mb-4">
            Open Ecosystem
          </p>
          <h3 className="text-display-medium text-[#0f0e0b] mb-4">
            Want to build with us?
          </h3>
          <p className="text-body-large text-[#3d3b34] max-w-lg mx-auto mb-8">
            We welcome developers who want to contribute to the AlphaJEE
            ecosystem. Read the developer policy first.
          </p>
          <Link
            href="/policy"
            className="btn-primary inline-flex"
            style={{ backgroundColor: "#0f0e0b", color: "#f9f9f0" }}
          >
            Read Developer Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
