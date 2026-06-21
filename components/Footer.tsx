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
                href="https://discord.gg/QYzZcMDBHY"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9d937c] hover:text-[#f9f9f0] transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.054-3.03.076.076 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
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
              <Link
                href="/legends"
                className="text-body-small text-[#f9f9f0]/70 hover:text-[#f9f9f0] transition-colors"
              >
                Wall of Legends
              </Link>
              <Link
                href="/updates"
                className="text-body-small text-[#f9f9f0]/70 hover:text-[#f9f9f0] transition-colors"
              >
                Updates
              </Link>
              <Link
                href="/donate"
                className="text-body-small text-[#f9f9f0]/70 hover:text-[#f9f9f0] transition-colors"
              >
                Support Us
              </Link>
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
