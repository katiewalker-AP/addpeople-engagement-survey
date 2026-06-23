import type { ResultsData, SurveyResponse, PillarScore, ENPSData, TeamScore } from './types';

const SHEET_ID  = process.env.GOOGLE_SHEETS_ID!;
const API_KEY   = process.env.GOOGLE_SHEETS_API_KEY!;
const RANGE     = "'Form responses 1'!A:O";

// Column order from Apps Script:
// A Timestamp, B Team, C Leadership, D Values, E Empowerment, F Performance,
// G Recognition, H Role Design, I Growth, J Continuous Improvement,
// K Future Confidence, L Belonging, M eNPS Score, N Improvement Suggestion, O Response ID

export async function fetchSheetData(): Promise<ResultsData> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(RANGE)}?key=${API_KEY}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    const body = await res.text().catch(() => '(unreadable)');
    throw new Error(`Sheets API ${res.status}: ${body}`);
  }

  const json = await res.json() as { values?: string[][] };
  const rows: string[][] = json.values ?? [];

  // Skip header row if present
  const dataRows = rows.length > 0 && isNaN(Number(rows[0][2])) ? rows.slice(1) : rows;

  const responses: SurveyResponse[] = dataRows
    .filter((row) => row.length >= 13 && row[1]?.trim())
    .map((row) => ({
      timestamp:             row[0] ?? '',
      team:                  row[1] ?? '',
      leadership:            parseNum(row[2]),
      values:                parseNum(row[3]),
      empowerment:           parseNum(row[4]),
      performance:           parseNum(row[5]),
      recognition:           parseNum(row[6]),
      roleDesign:            parseNum(row[7]),
      growth:                parseNum(row[8]),
      continuousImprovement: parseNum(row[9]),
      futureConfidence:      parseNum(row[10]),
      belonging:             parseNum(row[11]),
      enpsScore:             parseNum(row[12]),
      improvementSuggestion: row[13] ?? '',
      responseId:            row[14] ?? '',
    }));

  return computeResults(responses);
}

function parseNum(val: string | undefined): number {
  const n = Number(val);
  return isNaN(n) ? 0 : n;
}

// ─── Computation ──────────────────────────────────────────────────────────────

const PILLARS: Array<{ key: keyof SurveyResponse; label: string; question: string }> = [
  { key: 'leadership',            label: 'Leadership',            question: 'I understand where the company is heading and feel inspired by our direction.' },
  { key: 'values',                label: 'Values',                question: 'Our values are reflected in the decisions people make every day.' },
  { key: 'empowerment',           label: 'Empowerment',           question: 'I have the freedom and trust to make decisions that help me do my best work.' },
  { key: 'performance',           label: 'Performance',           question: 'I receive useful feedback that helps me improve and grow.' },
  { key: 'recognition',           label: 'Recognition',           question: 'Great work is recognised and celebrated here.' },
  { key: 'roleDesign',            label: 'Role Design',           question: 'I have the clarity, tools and support I need to be successful in my role.' },
  { key: 'growth',                label: 'Growth',                question: 'I have opportunities to learn, develop and progress my career.' },
  { key: 'continuousImprovement', label: 'Continuous Improvement', question: "We're encouraged to challenge how things are done and suggest better ways of working." },
  { key: 'futureConfidence',      label: 'Future Confidence',     question: "I'm confident the company is making the right decisions for long-term success." },
  { key: 'belonging',             label: 'Belonging',             question: 'I feel valued, respected and included as part of the team.' },
];

function computeResults(responses: SurveyResponse[]): ResultsData {
  const total = responses.length;

  // Pillar scores
  const pillarScores: PillarScore[] = PILLARS.map(({ key, label, question }) => {
    const vals = responses.map((r) => r[key] as number).filter((v) => v > 0);
    const avg  = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    const dist: [number, number, number, number, number] = [0, 0, 0, 0, 0];
    vals.forEach((v) => { if (v >= 1 && v <= 5) dist[v - 1]++; });
    return { key: key as PillarScore['key'], label, question, avg, distribution: dist, count: vals.length };
  });

  // Overall engagement: mean of all pillar averages
  const engagementAvgs = pillarScores.map((p) => p.avg).filter((a) => a > 0);
  const overallEngagement = engagementAvgs.length
    ? engagementAvgs.reduce((a, b) => a + b, 0) / engagementAvgs.length
    : 0;

  // eNPS
  const enpsVals = responses.map((r) => r.enpsScore).filter((v) => v >= 0 && v <= 10);
  const promoters  = enpsVals.filter((v) => v >= 9).length;
  const passives   = enpsVals.filter((v) => v >= 7 && v <= 8).length;
  const detractors = enpsVals.filter((v) => v <= 6).length;
  const enpsTotal  = enpsVals.length;
  const enpsScore  = enpsTotal
    ? Math.round((promoters / enpsTotal - detractors / enpsTotal) * 100)
    : 0;
  const dist10 = Array.from({ length: 11 }, (_, i) => enpsVals.filter((v) => v === i).length);

  const enps: ENPSData = {
    score: enpsScore, promoters, passives, detractors, total: enpsTotal, distribution: dist10,
  };

  // Team scores — only teams with ≥2 responses
  const teamMap: Record<string, number[]> = {};
  responses.forEach((r) => {
    if (!r.team) return;
    if (!teamMap[r.team]) teamMap[r.team] = [];
    const avg = PILLARS.map(({ key }) => r[key] as number).filter((v) => v > 0);
    if (avg.length) teamMap[r.team].push(avg.reduce((a, b) => a + b, 0) / avg.length);
  });

  const teamScores: TeamScore[] = Object.entries(teamMap)
    .filter(([, vals]) => vals.length >= 2)
    .map(([team, vals]) => ({
      team,
      avg:   vals.reduce((a, b) => a + b, 0) / vals.length,
      count: vals.length,
    }))
    .sort((a, b) => b.avg - a.avg);

  // Feedback — newest first, non-empty only
  const feedbackItems = responses
    .filter((r) => r.improvementSuggestion?.trim())
    .map((r) => ({ text: r.improvementSuggestion.trim(), timestamp: r.timestamp }))
    .reverse();

  return { responses, totalResponses: total, overallEngagement, pillarScores, teamScores, enps, feedbackItems };
}
