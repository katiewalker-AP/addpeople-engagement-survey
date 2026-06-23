import type { ResultsData } from '@/lib/types';
import { trafficLightENPS } from '@/lib/trafficLight';

interface Props { data: ResultsData }

export default function ENPSTab({ data }: Props) {
  const { enps } = data;
  const tl       = trafficLightENPS(enps.score);
  const total    = enps.total || 1;

  const promotersPct  = Math.round((enps.promoters  / total) * 100);
  const passivesPct   = Math.round((enps.passives   / total) * 100);
  const detractorsPct = Math.round((enps.detractors / total) * 100);
  const maxDist       = Math.max(...enps.distribution, 1);

  return (
    <div className="space-y-6">
      {/* eNPS score card */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-start gap-6 mb-6">
          <div
            className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center flex-shrink-0"
            style={{ background: tl.hex }}
          >
            <span className="font-sans text-4xl font-bold text-white leading-none">{enps.score}</span>
            <span className="font-sans text-xs text-white/80 mt-1">eNPS</span>
          </div>
          <div className="flex-1">
            <h2 className="font-sans font-semibold text-deep-blue text-lg mb-1">
              Employee Net Promoter Score
            </h2>
            <p className="font-sans text-sm text-[#4a5568] leading-relaxed mb-2">
              eNPS = Promoters % − Detractors %. Score: <strong style={{ color: tl.hex }}>{tl.label}</strong>
            </p>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <BandCard label="Promoters" count={enps.promoters} pct={promotersPct} detail="Scores 9–10" color="#1a7a40" />
              <BandCard label="Passives"  count={enps.passives}  pct={passivesPct}  detail="Scores 7–8"  color="#f0c040" textColor="#5a3e00" />
              <BandCard label="Detractors" count={enps.detractors} pct={detractorsPct} detail="Scores 0–6" color="#c0392b" />
            </div>
          </div>
        </div>

        {/* Stacked bar */}
        <div>
          <div className="flex h-6 rounded-full overflow-hidden">
            {promotersPct  > 0 && <div className="h-full transition-all" style={{ width: `${promotersPct}%`,  background: '#1a7a40' }} />}
            {passivesPct   > 0 && <div className="h-full transition-all" style={{ width: `${passivesPct}%`,   background: '#f0c040' }} />}
            {detractorsPct > 0 && <div className="h-full transition-all" style={{ width: `${detractorsPct}%`, background: '#c0392b' }} />}
          </div>
          <div className="flex justify-between mt-2 text-xs font-sans text-[#4a5568]">
            <span>Promoters {promotersPct}%</span>
            <span>Passives {passivesPct}%</span>
            <span>Detractors {detractorsPct}%</span>
          </div>
        </div>
      </div>

      {/* Score distribution */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h3 className="font-sans font-semibold text-deep-blue mb-5">Score Distribution (0–10)</h3>
        <div className="flex items-end gap-1.5 h-32">
          {enps.distribution.map((count, score) => {
            const heightPct = (count / maxDist) * 100;
            const color     = score >= 9 ? '#1a7a40' : score >= 7 ? '#f0c040' : '#c0392b';
            return (
              <div key={score} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                <span className="text-xs font-sans text-[#4a5568] leading-none">{count || ''}</span>
                <div className="w-full rounded-t-sm transition-all duration-700" style={{ height: `${heightPct}%`, background: color, minHeight: count > 0 ? '4px' : '0' }} />
                <span className="text-xs font-sans text-[#999]">{score}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs font-sans text-[#999] border-t border-border pt-4">
          {enps.total} total eNPS responses
        </p>
      </div>

      {/* Benchmark context */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h3 className="font-sans font-semibold text-deep-blue mb-4">eNPS Benchmarks</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Excellent', range: '40+',    color: '#1a7a40' },
            { label: 'Good',      range: '20–40',  color: '#27ae60' },
            { label: 'Needs work', range: '0–20',  color: '#f0c040', text: '#5a3e00' },
            { label: 'Poor',      range: 'Below 0', color: '#c0392b' },
          ].map((b) => (
            <div
              key={b.label}
              className={`rounded-xl p-3 ${enps.score >= (b.label === 'Excellent' ? 40 : b.label === 'Good' ? 20 : b.label === 'Needs work' ? 0 : -200) && enps.score < (b.label === 'Excellent' ? 200 : b.label === 'Good' ? 40 : b.label === 'Needs work' ? 20 : 0) ? 'ring-2' : ''}`}
              style={{
                background: `${b.color}18`,
                borderColor: b.color,
              }}
            >
              <span className="font-sans font-semibold text-sm block" style={{ color: b.text ?? b.color }}>{b.label}</span>
              <span className="font-sans text-xs" style={{ color: b.text ?? b.color }}>{b.range}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BandCard({ label, count, pct, detail, color, textColor }: {
  label: string; count: number; pct: number; detail: string; color: string; textColor?: string;
}) {
  return (
    <div className="rounded-xl p-3 text-center" style={{ background: `${color}18` }}>
      <p className="font-sans text-2xl font-bold" style={{ color: textColor ?? color }}>{pct}%</p>
      <p className="font-sans text-xs font-semibold mt-0.5" style={{ color: textColor ?? color }}>{label}</p>
      <p className="font-sans text-xs text-[#4a5568] mt-1">{count} people</p>
      <p className="font-sans text-[10px] text-[#999] mt-0.5">{detail}</p>
    </div>
  );
}
