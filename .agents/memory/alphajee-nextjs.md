---
name: AlphaJEE Next.js migration
description: Key decisions and quirks from the HTML→Next.js 14 App Router migration
---

## Port
Must run on port 5000 (`next dev --port 5000`). Replit webview requires this.

## Dark mode theme script
**Rule:** Use `dangerouslySetInnerHTML` in `<head>` with `suppressHydrationWarning` on both `<html>` and `<body>`.
**Why:** `next/script` with `strategy="beforeInteractive"` crashes the App Router with "Cannot read properties of undefined (reading 'call')". The hydration warning from `dangerouslySetInnerHTML` is suppressed and non-blocking.
**How to apply:** Keep the one-liner inline script — do not convert to `next/script`.

## Font paths
- Season Serif: `/fonts/season/SeasonCollectionVF-TRIAL.ttf` (variable font, weight 335 for hero)
- Akkurat Mono: `/fonts/akkurat/AkkuratMono-Regular/AkkuratMono-Regular.ttf` (subdirectory — NOT flat)
- Dopis Light: `/fonts/dopis/Dopis-Light.woff2` (flat directory)

## Design constraints
- Border radius: sharp (0px) or pill (9999px) only — no intermediate values
- Palette: cream `#efecca`, mint `#d5fad3`, blue `#badbee`, black `#0f0e0b`, coal `#21201c`, white `#f9f9f0`, ash `#3d3b34`, tan `#9d937c`
