"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum smooth-scroll for the homepage. Mounted client-side only.
 * Also handles in-page hash links (e.g. the navbar "Team" -> /#team) so they
 * glide to the section with an offset for the fixed navbar, and honours a hash
 * present on initial load. Respects prefers-reduced-motion by skipping entirely.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const NAV_OFFSET = -88;

    // Smooth-scroll same-page hash links (navbar "Team", etc.)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const path = href.slice(0, hashIndex);
      // only intercept links that point at the current page
      if (path !== "" && path !== "/" && path !== window.location.pathname) return;
      const el = document.getElementById(href.slice(hashIndex + 1));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: NAV_OFFSET });
      history.pushState(null, "", href);
    };
    document.addEventListener("click", onClick);

    // Honour a hash on initial load (e.g. arriving at /#team from another page)
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        requestAnimationFrame(() =>
          lenis.scrollTo(el, { offset: NAV_OFFSET, immediate: false }),
        );
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
