import type { ResultsData } from '@/lib/types';
import { trafficLightScore, trafficLightENPS } from '@/lib/trafficLight';

interface Props { data: ResultsData }

export default function OverviewTab({ data }: Props) {
  const { overallEngagement, totalResponses, pillarScores, enps } = data;
  const tl = trafficLightScore(overallEngagement);
  const tlEnps = trafficLightENPS(enps.score);

  const sorted = [...pillarScores].sort((a, b) => b.avg - a.avg);
  const top    = sorted[0];
  const lowest = sorted[sorted.length - 1];

  return (
    <div className="space-y-8">
      {/* Metric cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <MetricCard label="Overall Engagement" value={overallEngagement.toFixed(2)} sub="out of 5" color={tl.hex} />
        <MetricCard label="eNPS Score" value={enps.score.toString()} sub={tlEnps.label} color={tlEnps.hex} />
        <MetricCard label="Total Responses" value={totalResponses.toString()} sub="submitted" color="#173340" />
        {top    && <MetricCard label="Top Pillar"    value={top.label}    sub={`${top.avg.toFixed(2)} avg`}    color="#27ae60" />}
        {lowest && <MetricCard label="Lowest Pillar" value={lowest.label} sub={`${lowest.avg.toFixed(2)} avg`} color="#e67e22" />}
      </div>

      {/* Engagement gauge */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="font-sans font-semibold text-deep-blue mb-6">Overall Engagement Score</h2>
        <div className="flex items-end gap-6 mb-8">
          <div
            className="w-24 h-24 rounded-full flex flex-col items-center justify-center flex-shrink-0"
            style={{ background: tl.hex }}
          >
            <span className="font-sans text-3xl font-bold text-white leading-none">{overallEngagement.toFixed(1)}</span>
            <span className="font-sans text-xs text-white/80 mt-1">out of 5</span>
          </div>
          <div>
            <p className="font-sans text-sm text-[#4a5568] leading-relaxed">
              Average across all 10 engagement pillars. <span className="font-medium" style={{ color: tl.hex }}>{tl.label}</span>.
            </p>
          </div>
        </div>

        {/* All pillars sorted */}
        <div className="space-y-3">
          {sorted.map((p) => {
            const ptl = trafficLightScore(p.avg);
            const pct = (p.avg / 5) * 100;
            return (
              <div key={p.key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-sans text-deep-blue">{p.label}</span>
                  <span className="text-sm font-sans font-medium" style={{ color: ptl.hex }}>
                    {p.avg.toFixed(2)}
                  </span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: ptl.hex }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <p className="font-sans text-xs text-[#999] mb-2 uppercase tracking-wide">{label}</p>
      <p className="font-sans text-2xl font-bold" style={{ color }}>{value}</p>
      <p className="font-sans text-xs text-[#4a5568] mt-1">{sub}</p>
    </div>
  );
}
