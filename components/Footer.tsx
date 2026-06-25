import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#21201c] text-[#f9f9f0] mt-30">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <img
                src="/favicon.png"
                alt="AlphaJEE"
                className="w-6 h-6 rounded-sm ml-2"
              />
              <span className="font-dopis text-lg font-semibold">AlphaJEE</span>
            </div>
            <p className="text-body-base text-[#9d937c] max-w-sm leading-relaxed">
              The most trusted, 100% free JEE ecosystem. Built by aspirants, for
              aspirants. No ads. No paywalls. Just honest data.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a
                href="https://reddit.com/r/alphajee"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9d937c] hover:text-[#f9f9f0] transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.362.759-.591 1.267-.591.907 0 1.643.735 1.643 1.642 0 .684-.42 1.267-1.018 1.512.01.125.015.251.015.378 0 2.68-3.033 4.854-6.775 4.854-3.742 0-6.775-2.174-6.775-4.854 0-.127.005-.253.015-.378-.598-.245-1.018-.828-1.018-1.512 0-.907.736-1.642 1.643-1.642.508 0 .959.23 1.267.591 1.194-.856 2.85-1.418 4.674-1.488l.8-3.747 2.598.547c.01-.322.274-.582.597-.582zM12 11.23a4.032 4.032 0 0 0-3.328 1.734.283.283 0 0 0 .306.403 3.46 3.46 0 0 1 2.843-1.48 3.46 3.46 0 0 1 2.843 1.48.283.283 0 0 0 .306-.403A4.032 4.032 0 0 0 12 11.23zm-3.5 1.734c-.604 0-1.094.49-1.094 1.093 0 .604.49 1.094 1.093 1.094.604 0 1.094-.49 1.094-1.094 0-.603-.49-1.093-1.094-1.093zm7 0c-.604 0-1.094.49-1.094 1.093 0 .604.49 1.094 1.093 1.094.604 0 1.094-.49 1.094-1.094 0-.603-.49-1.093-1.094-1.093z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/oviguide/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OviGuide on LinkedIn"
                className="text-[#9d937c] hover:text-[#f9f9f0] transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.73v20.53C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.73C24 .78 23.2 0 22.22 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <p className="text-code-label text-[#9d937c] uppercase tracking-widest mb-6">
              Tools
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/percentile"
                className="text-body-small text-[#f9f9f0]/70 hover:text-[#f9f9f0] transition-colors"
              >
                JEE Main Predictor
              </Link>
              <Link
                href="/advanced"
                className="text-body-small text-[#f9f9f0]/70 hover:text-[#f9f9f0] transition-colors"
              >
                JEE Advanced Predictor
              </Link>
              <Link
                href="/neet"
                className="text-body-small text-[#f9f9f0]/70 hover:text-[#f9f9f0] transition-colors"
              >
                NEET Predictor
              </Link>
              <Link
                href="/analytics"
                className="text-body-small text-[#f9f9f0]/70 hover:text-[#f9f9f0] transition-colors"
              >
                Analytics Dashboard
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-code-label text-[#9d937c] uppercase tracking-widest mb-6">
              Company
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/team"
                className="text-body-small text-[#f9f9f0]/70 hover:text-[#f9f9f0] transition-colors"
              >
                Our Team
              </Link>
              <a
                href="https://oviguide.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-small text-[#f9f9f0]/70 hover:text-[#f9f9f0] transition-colors"
              >
                OviGuide
              </a>
              <Link
                href="/policy"
                className="text-body-small text-[#f9f9f0]/70 hover:text-[#f9f9f0] transition-colors"
              >
                Developer Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(249,249,240,0.08)" }}
        >
          <p className="text-code-micro text-[#9d937c] uppercase tracking-widest">
            © 2026 AlphaJEE Syndicate. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d5fad3] animate-pulse"></span>
            <span className="text-code-micro text-[#9d937c] uppercase tracking-widest">
              V4 Alpha Engine Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
