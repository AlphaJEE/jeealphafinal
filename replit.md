# AlphaJEE — Next.js 14 App

Full-stack JEE/NEET prediction ecosystem migrated from HTML/CSS/JS to **Next.js 14 App Router + React 18 + Tailwind CSS 3 + TypeScript**.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3 with custom design tokens
- **Language**: TypeScript
- **Charts**: Chart.js 4 + react-chartjs-2
- **Port**: 5000

## Design System (Aptos Network-inspired)

- **Fonts**: Season Serif (display), Akkurat Mono (mono), Dopis Light (UI)
- **Colors**: cream `#efecca`, mint `#d5fad3`, blue `#badbee`, black `#0f0e0b`, coal `#21201c`
- **Border radius**: sharp (0px) or pill (9999px) only — no intermediate values
- **Font weights**: Season Serif at weight 335 for hero display text

## Routes

| Path | Description |
|------|-------------|
| `/` | Home — hero with IIT Bombay sketch |
| `/percentile` | JEE Main percentile predictor |
| `/advanced` | JEE Advanced rank predictor |
| `/neet` | NEET rank predictor |
| `/analytics` | Analytics dashboard with charts |
| `/legends` | Wall of Legends (donors) |
| `/team` | Our Team page |
| `/donate` | Donation page (Razorpay) |
| `/updates` | YouTube updates feed |
| `/policy` | Privacy policy |

## APIs

- Prediction: `https://digiadvanced.com/directpredict.php`
- Analytics: `https://digiadvanced.com/get-scores.php`
- Local fallback: `/advdata.json`
- Payments: Razorpay (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` env vars)

## Running

```bash
npm run dev   # starts on port 5000
npm run build # production build
npm start     # production server on port 5000
```

## User preferences

- Premium, minimal design — Aptos Network aesthetic
- No placeholder or mocked data; always use real APIs with fallbacks
- Preserve all existing functionality from the original HTML site
- No ads, no paywalls — free forever
