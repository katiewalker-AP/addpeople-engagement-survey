// ─── Survey types ──────────────────────────────────────────────────────────────

export type QuestionType = 'MULTIPLE_CHOICE' | 'SCALE_5' | 'SCALE_10' | 'OPEN_TEXT';

export interface Question {
  id: string;
  type: QuestionType;
  section: string;
  text: string;
  options?: string[];
  scaleLabels?: { left: string; right: string };
  placeholder?: string;
}

export interface SurveyAnswers {
  q1: string | null;
  q2: number | null;
  q3: number | null;
  q4: number | null;
  q5: number | null;
  q6: number | null;
  q7: number | null;
  q8: number | null;
  q9: number | null;
  q10: number | null;
  q11: number | null;
  q12: number | null;
  q13: string;
}

export interface SubmissionPayload {
  responseId: string;
  timestamp: string;
  team: string;
  leadership: number;
  values: number;
  empowerment: number;
  performance: number;
  recognition: number;
  roleDesign: number;
  growth: number;
  continuousImprovement: number;
  futureConfidence: number;
  belonging: number;
  enpsScore: number;
  improvementSuggestion: string;
}

// ─── Results types ─────────────────────────────────────────────────────────────

export interface SurveyResponse {
  timestamp: string;
  team: string;
  leadership: number;
  values: number;
  empowerment: number;
  performance: number;
  recognition: number;
  roleDesign: number;
  growth: number;
  continuousImprovement: number;
  futureConfidence: number;
  belonging: number;
  enpsScore: number;
  improvementSuggestion: string;
  responseId: string;
}

export interface PillarScore {
  key: keyof Omit<SurveyResponse, 'timestamp' | 'team' | 'enpsScore' | 'improvementSuggestion' | 'responseId'>;
  label: string;
  question: string;
  avg: number;
  distribution: [number, number, number, number, number]; // counts for 1-5
  count: number;
}

export interface ENPSData {
  score: number;
  promoters: number;
  passives: number;
  detractors: number;
  total: number;
  distribution: number[]; // index 0-10
}

export interface TeamScore {
  team: string;
  avg: number;
  count: number;
}

export interface ResultsData {
  responses: SurveyResponse[];
  totalResponses: number;
  overallEngagement: number;
  pillarScores: PillarScore[];
  teamScores: TeamScore[];
  enps: ENPSData;
  feedbackItems: { text: string; timestamp: string }[];
}
