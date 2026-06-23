import type { ResultsData } from '@/lib/types';
import { trafficLightScore } from '@/lib/trafficLight';

interface Props { data: ResultsData }

export default function TeamBreakdownTab({ data }: Props) {
  const { teamScores } = data;

  if (!teamScores.length) {
    return (
      <div className="bg-white rounded-2xl border border-border p-8 text-center">
        <p className="font-sans text-[#4a5568] text-sm">
          No teams have enough responses yet. Teams need at least 2 responses to appear here.
        </p>
      </div>
    );
  }

  const maxAvg = Math.max(...teamScores.map((t) => t.avg));

  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="font-sans font-semibold text-deep-blue text-lg">Team Engagement Scores</h2>
          <p className="font-sans text-xs text-[#999] mt-1">
            Average engagement score across all 10 pillars. Only teams with 2+ responses are shown.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {teamScores.map((team) => {
          const tl  = trafficLightScore(team.avg);
          const pct = (team.avg / maxAvg) * 100;
          return (
            <div key={team.team}>
              <div className="flex items-center justify-between mb-1.5 gap-4">
                <span className="font-sans text-sm text-deep-blue min-w-0 truncate">{team.team}</span>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs font-sans text-[#999]">{team.count} responses</span>
                  <span className="font-sans text-sm font-semibold" style={{ color: tl.hex }}>
                    {team.avg.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="h-3 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: tl.hex }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-xs font-sans text-[#999] border-t border-border pt-4">
        Bar length is relative to the highest-scoring team in this response set.
      </p>
    </div>
  );
}
