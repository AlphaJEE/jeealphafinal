"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/percentile", label: "JEE Main" },
  { href: "/advanced", label: "JEE Advanced" },
  { href: "/neet", label: "NEET" },
  { href: "/oviqo", label: "Oviqo" },
  { href: "/#team", label: "Team" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("color-theme");
      if (saved === "dark") {
        setDark(true);
        document.documentElement.classList.add("dark");
      } else {
        setDark(false);
        document.documentElement.classList.remove("dark");
      }
    } catch {}
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("color-theme", next ? "dark" : "light");
    } catch {}
  };

  const SunIcon = () => (
    <svg
      className="w-[15px] h-[15px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="5" />
      <path
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      />
    </svg>
  );

  const MoonIcon = () => (
    <svg className="w-[15px] h-[15px]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-start pt-4 px-4">
      {/* ── Desktop pill navbar ── */}
      <nav
        className="navbar-pill hidden lg:grid w-full max-w-[1180px]"
        style={{
          gridTemplateColumns: "auto 1fr auto",
          height: "52px",
          padding: "0 8px 0 20px",
          alignItems: "center",
        }}
      >
        {/* Left: Logo (use favicon) */}
        <Link
          href="/"
          className="flex items-center gap-2.5 pr-6"
          style={{ borderRight: "1px solid rgba(15,14,11,0.12)" }}
        >
          <div className="flex items-center gap-2.5">
            <Image
              src="/favicon.png"
              alt="AlphaJEE"
              width={24}
              height={24}
              className="rounded-sm"
            />
            <span
              className="font-dopis font-bold text-[15px] tracking-tight text-[#0f0e0b] dark:text-[#f9f9f0] whitespace-nowrap"
              style={{
                fontFamily: "Dopis Light, Dopis, sans-serif",
                fontWeight: 700,
              }}
            >
              AlphaJEE
              <span
                className="text-[#9d937c] ml-1.5 text-[12px]"
                style={{ fontWeight: 400 }}
              >
                by OviGuide
              </span>
            </span>
          </div>
        </Link>

        {/* Center: Links */}
        <div className="flex items-center justify-center gap-0.5 px-4">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-[12.5px] font-akkura transition-colors duration-150 whitespace-nowrap rounded-none ${
                  active
                    ? "text-[#0f0e0b] dark:text-[#f9f9f0] font-semibold"
                    : "text-[#9d937c] hover:text-[#0f0e0b] dark:hover:text-[#f9f9f0]"
                }`}
                style={{ position: "relative" }}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-current" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div
          className="flex items-center gap-2 pl-6"
          style={{ borderLeft: "1px solid rgba(15,14,11,0.12)" }}
        >
          {mounted && (
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center text-[#9d937c] hover:text-[#0f0e0b] dark:hover:text-[#f9f9f0] transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
          )}
          <a
            href="https://oviguide.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              height: "36px",
              borderRadius: "9999px",
              padding: "0 20px",
              fontSize: "11px",
            }}
          >
            OviGuide
            <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </nav>

      {/* ── Mobile pill navbar ── */}
      <div className="lg:hidden w-full flex flex-col gap-0">
        <nav
          className="navbar-pill flex items-center justify-between w-full px-4"
          style={{ height: "50px" }}
        >
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/favicon.png"
              alt="AlphaJEE"
              width={20}
              height={20}
              className="rounded-sm"
            />
            <span
              className="font-dopis text-[15px] font-light text-[#0f0e0b] dark:text-[#f9f9f0] whitespace-nowrap"
              style={{
                fontFamily: "Dopis Light, Dopis, sans-serif",
                fontWeight: 300,
              }}
            >
              AlphaJEE
              <span className="text-[#9d937c] ml-1.5 text-[12px]">by OviGuide</span>
            </span>
          </Link>
          <div className="flex items-center gap-1">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center text-[#9d937c]"
                aria-label="Toggle theme"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 flex items-center justify-center text-[#0f0e0b] dark:text-[#f9f9f0]"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            className="bg-[#f9f9f0] dark:bg-[#0f0e0b] border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 mt-1"
            style={{ borderRadius: "12px" }}
          >
            <div className="flex flex-col py-2">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-5 py-3 text-[14px] font-season flex items-center justify-between transition-colors ${
                      active
                        ? "text-[#0f0e0b] dark:text-[#f9f9f0] font-semibold bg-[#f0efe6] dark:bg-[#21201c]"
                        : "text-[#9d937c] hover:text-[#0f0e0b] dark:hover:text-[#f9f9f0]"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0f0e0b] dark:bg-[#f9f9f0]" />
                    )}
                  </Link>
                );
              })}
              <div className="px-4 pt-2 pb-3 border-t border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 mt-1">
                <a
                  href="https://oviguide.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center"
                  style={{ borderRadius: "8px" }}
                >
                  OviGuide
                  <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
