'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler);

const OVERALL_BUCKET_LABELS = [
  "-20--15","-15--10","-10--5","-5-0","0-5","5-10","10-15","15-20","20-25","25-30",
  "30-35","35-40","40-45","45-50","50-55","55-60","60-65","65-70","70-75","75-80",
  "80-85","85-90","90-95","95-100","100-105","105-110","110-115","115-120","120-125",
  "125-130","130-135","135-140","140-145","145-150","150-155","155-160","160-165",
  "165-170","170-175","175-180","180-185","185-190","190-195","195-200","200-205",
  "205-210","210-215","215-220","220-225","225-230","230-235","235-240","240-245",
  "245-250","250-255","255-260","260-265","265-270","270-275","275-280","280-285",
  "285-290","290-295","300-305","305-310","325-330",
];

const SUBJECT_BUCKET_LABELS = [
  "-10--5","-5-0","0-5","5-10","10-15","15-20","20-25","25-30","30-35","35-40",
  "40-45","45-50","50-55","55-60","60-65","65-70","70-75","75-80","80-85","85-90",
  "90-95","95-100","100-105",
];

const parseRangeStart = (rangeStr: string) => {
  if (rangeStr.startsWith('-')) {
    const m = rangeStr.match(/^-(\d+)/);
    return m ? -parseInt(m[1]) : 0;
  }
  return parseInt(rangeStr.split('-')[0]);
};

function getSortedData(segmentObj: Record<string, { provisionalCount: number }>, bucketLabels: string[]) {
  const sorted = bucketLabels
    .filter(l => segmentObj && segmentObj[l])
    .sort((a, b) => parseRangeStart(a) - parseRangeStart(b));
  return { labels: sorted, data: sorted.map(k => segmentObj[k].provisionalCount) };
}

const CHART_COLORS = {
  overall:   { bg: 'rgba(186,219,238,0.55)', border: '#badbee' },
  physics:   { bg: 'rgba(213,250,211,0.55)', border: '#d5fad3' },
  chemistry: { bg: 'rgba(239,236,202,0.55)', border: '#efecca' },
  maths:     { bg: 'rgba(186,219,238,0.4)',  border: '#badbee' },
};

const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0f0e0b',
      titleColor: '#f9f9f0',
      bodyColor: '#9d937c',
      borderColor: 'rgba(249,249,240,0.1)',
      borderWidth: 1,
      titleFont: { family: 'Akkurat Mono, monospace', size: 11 },
      bodyFont:  { family: 'Akkurat Mono, monospace', size: 10 },
      padding: 12,
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(15,14,11,0.05)' },
      ticks: { color: '#9d937c', font: { family: 'Akkurat Mono, monospace', size: 9 }, maxRotation: 45, maxTicksLimit: 14 },
    },
    y: {
      grid: { color: 'rgba(15,14,11,0.05)' },
      ticks: {
        color: '#9d937c',
        font: { family: 'Akkurat Mono, monospace', size: 9 },
        callback: (v: any) => v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v,
      },
    },
  },
};

type AdvData = {
  data: {
    examShiftToDisplay?: string;
    comparativeScores: {
      overall?: Array<{ overallSegments?: Record<string, { provisionalCount: number }>; _id?: string }>;
      Physics?:    Array<{ segments?: Record<string, { provisionalCount: number }> }>;
      Chemistry?:  Array<{ segments?: Record<string, { provisionalCount: number }> }>;
      Maths?:      Array<{ segments?: Record<string, { provisionalCount: number }> }>;
    };
    candidateData?: {
      categoryWiseData?: Record<string, { totalCandidates: number; allottedSeats?: number }>;
      genderData?: { male?: number; female?: number };
    };
  };
};

type ActiveChart = 'overall' | 'physics' | 'chemistry' | 'maths';

export default function AnalyticsPage() {
  const [data, setData]           = useState<AdvData | null>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);
  const [active, setActive]       = useState<ActiveChart>('overall');
  const [fetchSource, setFetchSource] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('https://digiadvanced.com/get-scores.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'get_latest' }),
        });
        if (!r.ok) throw new Error('remote failed');
        const d = await r.json();
        if (!d?.data?.comparativeScores) throw new Error('invalid');
        setData(d);
        setFetchSource('Live Data');
      } catch {
        try {
          const r = await fetch('/advdata.json');
          const d = await r.json();
          setData(d);
          setFetchSource('Cached Data');
        } catch {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getChartData = () => {
    if (!data) return null;
    const comp = data.data.comparativeScores;

    switch (active) {
      case 'overall': {
        const arr = comp.overall;
        if (!arr?.length) return null;
        const segments = arr[0].overallSegments;
        if (!segments) return null;
        const { labels, data: vals } = getSortedData(segments, OVERALL_BUCKET_LABELS);
        return { labels, datasets: [{ data: vals, backgroundColor: CHART_COLORS.overall.bg, borderColor: CHART_COLORS.overall.border, borderWidth: 1.5, borderRadius: 0 }] };
      }
      case 'physics': {
        const arr = comp.Physics;
        if (!arr?.length) return null;
        const segments = arr[0].segments;
        if (!segments) return null;
        const { labels, data: vals } = getSortedData(segments, SUBJECT_BUCKET_LABELS);
        return { labels, datasets: [{ data: vals, backgroundColor: CHART_COLORS.physics.bg, borderColor: CHART_COLORS.physics.border, borderWidth: 1.5, borderRadius: 0 }] };
      }
      case 'chemistry': {
        const arr = comp.Chemistry;
        if (!arr?.length) return null;
        const segments = arr[0].segments;
        if (!segments) return null;
        const { labels, data: vals } = getSortedData(segments, SUBJECT_BUCKET_LABELS);
        return { labels, datasets: [{ data: vals, backgroundColor: CHART_COLORS.chemistry.bg, borderColor: CHART_COLORS.chemistry.border, borderWidth: 1.5, borderRadius: 0 }] };
      }
      case 'maths': {
        const arr = comp.Maths;
        if (!arr?.length) return null;
        const segments = arr[0].segments;
        if (!segments) return null;
        const { labels, data: vals } = getSortedData(segments, SUBJECT_BUCKET_LABELS);
        return { labels, datasets: [{ data: vals, backgroundColor: CHART_COLORS.maths.bg, borderColor: CHART_COLORS.maths.border, borderWidth: 1.5, borderRadius: 0 }] };
      }
    }
  };

  const stats = data ? (() => {
    const comp = data.data.comparativeScores;
    const arr = comp.overall;
    if (!arr?.length) return null;
    const segs = arr[0].overallSegments;
    if (!segs) return { total: '—', peak: '—', shift: data.data.examShiftToDisplay || '—' };
    let total = 0, peak = '', maxCount = 0;
    for (const [k, v] of Object.entries(segs)) {
      total += v.provisionalCount;
      if (v.provisionalCount > maxCount) { maxCount = v.provisionalCount; peak = k; }
    }
    return { total: total.toLocaleString('en-IN'), peak, shift: data.data.examShiftToDisplay || '—' };
  })() : null;

  const chartData = getChartData();
  const comp = data?.data.comparativeScores;

  const tabs: { key: ActiveChart; label: string; color: string; available: boolean }[] = [
    { key: 'overall',   label: 'Overall',   color: '#badbee', available: !!(comp?.overall?.length   && comp.overall[0].overallSegments) },
    { key: 'physics',   label: 'Physics',   color: '#d5fad3', available: !!(comp?.Physics?.length   && comp.Physics[0].segments) },
    { key: 'chemistry', label: 'Chemistry', color: '#efecca', available: !!(comp?.Chemistry?.length && comp.Chemistry[0].segments) },
    { key: 'maths',     label: 'Maths',     color: '#badbee', available: !!(comp?.Maths?.length     && comp.Maths[0].segments) },
  ];

  return (
    <div className="bg-[#f9f9f0] dark:bg-[#0f0e0b] min-h-screen">
      {/* Header */}
      <div className="bg-[#badbee] pt-28 pb-16 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="anim-fade-up">
            <p className="text-code-label text-[#3d3b34] uppercase tracking-widest mb-3">JEE Advanced</p>
            <h1 className="text-display-large text-[#0f0e0b]">Analytics Dashboard</h1>
            <p className="text-body-large text-[#3d3b34] mt-3">Real score distributions from official data</p>
          </div>
          {fetchSource && (
            <div className="anim-fade-in flex items-center gap-2 px-4 py-2 bg-[#0f0e0b]/8 border border-[#0f0e0b]/15" style={{ borderRadius: '9999px' }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-[#0f0e0b] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0f0e0b]" />
              </span>
              <span className="text-code-micro text-[#3d3b34] uppercase tracking-widest">{fetchSource}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {loading && (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="w-10 h-10 border-2 border-[#0f0e0b] dark:border-[#f9f9f0] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-code-label text-[#9d937c] uppercase tracking-widest">Loading analytics data...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-32">
            <p className="text-body-base text-[#9d937c] mb-6">Could not load analytics data from the server.</p>
            <button onClick={() => window.location.reload()} className="btn-primary">Retry</button>
          </div>
        )}

        {!loading && !error && data && (
          <>
            {/* Stat cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0f0e0b]/10 dark:bg-[#f9f9f0]/10 mb-12">
                {[
                  { label: 'Exam Shift',       value: stats.shift },
                  { label: 'Total Students',    value: stats.total },
                  { label: 'Peak Score Range',  value: stats.peak  },
                ].map((s, i) => (
                  <div key={i} className="bg-[#f9f9f0] dark:bg-[#0f0e0b] p-8 anim-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                    <p className="text-code-micro text-[#9d937c] uppercase tracking-widest mb-2">{s.label}</p>
                    <p className="text-display-medium text-[#0f0e0b] dark:text-[#f9f9f0] font-akkurat">{s.value || '—'}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tabs */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => tab.available && setActive(tab.key)}
                  disabled={!tab.available}
                  className={`px-4 py-2 text-code-micro uppercase tracking-widest transition-all ${
                    !tab.available ? 'opacity-30 cursor-not-allowed' :
                    active === tab.key ? 'text-[#0f0e0b]' : 'text-[#9d937c] hover:text-[#0f0e0b] dark:hover:text-[#f9f9f0]'
                  }`}
                  style={{
                    background: active === tab.key && tab.available ? tab.color : 'transparent',
                    borderRadius: '9999px',
                    border: `1px solid ${active === tab.key && tab.available ? tab.color : 'rgba(15,14,11,0.15)'}`,
                  }}
                >
                  {tab.label}
                  {!tab.available && <span className="ml-1 opacity-60">(live only)</span>}
                </button>
              ))}
            </div>

            {/* Chart */}
            {chartData ? (
              <div className="bg-[#f9f9f0] dark:bg-[#0f0e0b] border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 p-6 md:p-8 anim-scale-in">
                <p className="text-code-label text-[#9d937c] uppercase tracking-widest mb-6">
                  {active === 'overall' ? 'Overall Score Distribution' : `${active.charAt(0).toUpperCase() + active.slice(1)} Score Distribution`}
                </p>
                <div style={{ height: '380px' }}>
                  <Bar
                    data={chartData}
                    options={{
                      ...baseChartOptions,
                      plugins: {
                        ...baseChartOptions.plugins,
                        tooltip: {
                          ...baseChartOptions.plugins.tooltip,
                          callbacks: { label: (ctx: any) => ` ${ctx.parsed.y.toLocaleString('en-IN')} students` },
                        },
                      },
                    } as any}
                  />
                </div>
              </div>
            ) : (
              <div className="border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 p-16 text-center bg-[#f9f9f0] dark:bg-[#0f0e0b]">
                <p className="text-code-label text-[#9d937c] uppercase tracking-widest mb-3">Subject data requires live connection</p>
                <p className="text-body-small text-[#9d937c]">Switch to Overall tab to view cached data, or check back when the live API is reachable.</p>
              </div>
            )}

            {/* Category breakdown */}
            {data.data.candidateData?.categoryWiseData && (
              <div className="mt-12">
                <p className="text-code-label text-[#9d937c] uppercase tracking-widest mb-6">Category-wise Breakdown</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#0f0e0b]/10 dark:bg-[#f9f9f0]/10">
                  {Object.entries(data.data.candidateData.categoryWiseData).map(([cat, info]) => (
                    <div key={cat} className="bg-[#f9f9f0] dark:bg-[#0f0e0b] p-6">
                      <p className="text-code-micro text-[#9d937c] uppercase tracking-widest mb-2">{cat}</p>
                      <p className="text-subheading font-bold text-[#0f0e0b] dark:text-[#f9f9f0] font-akkurat">
                        {info.totalCandidates.toLocaleString('en-IN')}
                      </p>
                      {info.allottedSeats && (
                        <p className="text-code-micro text-[#9d937c] mt-1">{info.allottedSeats.toLocaleString('en-IN')} seats</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-16 p-8 border border-[#0f0e0b]/10 dark:border-[#f9f9f0]/10 bg-[#efecca]/30">
              <p className="text-code-micro text-[#9d937c] uppercase tracking-widest mb-2">Note</p>
              <p className="text-body-small text-[#3d3b34] dark:text-[#9d937c] leading-relaxed">
                This data represents provisional score distribution from official JEE Advanced results. Analysis is for informational purposes only. Data sourced from official JoSAA/NTA records.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
