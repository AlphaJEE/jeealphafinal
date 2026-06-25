// Local, instant JEE Main marks -> percentile model.
// Used by the hero live-predictor and the data-viz curves so the homepage
// demonstrates the engine without any network round-trip. The production
// predictors still call the Alpha Engine worker; this is a faithful demo curve.

export const TOTAL_CANDIDATES = 1_400_000;

// Anchor table: [rawMarks (out of 300), percentile]. Monotonic.
const ANCHORS: Array<[number, number]> = [
  [0, 0],
  [20, 12],
  [40, 30],
  [60, 52],
  [80, 72],
  [100, 87],
  [120, 93.5],
  [140, 96.4],
  [160, 98.0],
  [180, 98.9],
  [200, 99.4],
  [220, 99.72],
  [240, 99.86],
  [260, 99.945],
  [280, 99.986],
  [300, 100],
];

/** Piecewise-linear percentile from raw marks (0..300). */
export function percentileFromMarks(marks: number): number {
  const m = Math.max(0, Math.min(300, marks));
  for (let i = 0; i < ANCHORS.length - 1; i++) {
    const [m0, p0] = ANCHORS[i];
    const [m1, p1] = ANCHORS[i + 1];
    if (m <= m1) {
      const t = (m - m0) / (m1 - m0);
      return p0 + t * (p1 - p0);
    }
  }
  return 100;
}

/** Expected All India Rank from a percentile. */
export function rankFromPercentile(pct: number): number {
  const r = Math.round(((100 - pct) / 100) * TOTAL_CANDIDATES);
  return Math.max(1, r);
}

export function rankFromMarks(marks: number): number {
  return rankFromPercentile(percentileFromMarks(marks));
}

/** Format a rank Indian-style with separators. */
export function formatRank(r: number): string {
  return Math.round(r).toLocaleString("en-IN");
}

/**
 * Build a smooth SVG path string (Catmull-Rom -> cubic bezier) for the
 * marks-vs-percentile curve inside a [width x height] viewBox.
 * Returns the `d` attribute plus a sampler that maps marks -> {x,y}.
 */
export function buildCurve(width: number, height: number, pad = 0) {
  const xs = (marks: number) => pad + (marks / 300) * (width - pad * 2);
  const ys = (pct: number) => height - pad - (pct / 100) * (height - pad * 2);

  const pts = ANCHORS.map(([m, p]) => ({ x: xs(m), y: ys(p) }));

  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }

  const point = (marks: number) => ({
    x: xs(marks),
    y: ys(percentileFromMarks(marks)),
  });

  return { d, point, xs, ys };
}
