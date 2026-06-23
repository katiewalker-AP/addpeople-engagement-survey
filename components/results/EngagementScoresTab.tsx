import type { ResultsData } from '@/lib/types';
import { trafficLightScore } from '@/lib/trafficLight';

interface Props { data: ResultsData }

const DIST_COLORS = ['#c0392b', '#e67e22', '#f0c040', '#27ae60', '#1a7a40'];
const DIST_LABELS = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

export default function EngagementScoresTab({ data }: Props) {
  return (
    <div className="space-y-6">
      {data.pillarScores.map((pillar) => {
        const tl    = trafficLightScore(pillar.avg);
        const total = pillar.distribution.reduce((a, b) => a + b, 0) || 1;

        return (
          <div key={pillar.key} className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-sans font-semibold text-deep-blue text-lg mb-1">{pillar.label}</h3>
                <p className="font-sans text-sm text-[#4a5568] leading-relaxed">{pillar.question}</p>
              </div>
              <div
                className="flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center"
                style={{ background: tl.hex }}
              >
                <span className="font-sans text-xl font-bold text-white leading-none">{pillar.avg.toFixed(1)}</span>
                <span className="font-sans text-[10px] text-white/80 mt-0.5">/ 5</span>
              </div>
            </div>

            {/* Stacked bar */}
            <div className="flex h-4 rounded-full overflow-hidden gap-px mb-3">
              {pillar.distribution.map((count, i) => {
                const pct = (count / total) * 100;
                if (pct === 0) return null;
                return (
                  <div
                    key={i}
                    className="h-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: DIST_COLORS[i] }}
                    title={`${DIST_LABELS[i]}: ${count}`}
                  />
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {DIST_LABELS.map((label, i) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: DIST_COLORS[i] }} />
                  <span className="text-xs font-sans text-[#4a5568]">
                    {label} ({pillar.distribution[i]})
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs font-sans text-[#999]">{pillar.count} responses</p>
          </div>
        );
      })}
    </div>
  );
}
