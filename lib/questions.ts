// ─────────────────────────────────────────────────────────────────────────────
// SURVEY CONTENT CONFIG
// Edit all question text, options, and screen copy here.
// ─────────────────────────────────────────────────────────────────────────────

import type { Question } from './types';

export const INTRO = {
  heading:      'Help us make Add People a better place to work',
  body:         "This takes around 3 minutes and is completely anonymous. Your honest answers help us understand what's working and where we can improve.",
  timeEstimate: '3 minutes',
  journeySteps: ['Your team', 'Engagement', 'Your voice'],
  cta:          "Let's go →",
};

export const THANK_YOU = {
  heading: 'Thank you — your voice matters.',
  body:    'Your response has been submitted anonymously and will help shape how we work.',
};

export const SECTIONS = [
  { label: 'About you',        shortLabel: 'About you' },
  { label: 'Your engagement',  shortLabel: 'Engagement' },
  { label: 'Your voice',       shortLabel: 'Your voice' },
];

export const SCALE_5_LABELS = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
];

export const QUESTIONS: Question[] = [
  // ── Section 0: About you ──────────────────────────────────────────────────
  {
    id:      'q1',
    type:    'MULTIPLE_CHOICE',
    section: 'About you',
    text:    'Which team do you primarily belong to?',
    options: [
      'Client Development',
      'Ecommerce Technical / Product',
      'Ecommerce Service',
      'Head Office - Finance',
      'Head Office - People',
      'Head Office - Marketing',
      'Head Office - Technical',
      'Lead Generation Product',
      'Lead Generation Service',
      'SEO Product',
      'SEO Service',
      'Sales Inbound',
      'Sales Service Outbound',
      'Sales International',
      'Sales Shopping',
      'Social Media',
    ],
  },

  // ── Section 1: Your engagement (Q2–Q11) ───────────────────────────────────
  {
    id:      'q2',
    type:    'SCALE_5',
    section: 'Your engagement',
    text:    'Leadership — I understand where the company is heading and feel inspired by our direction.',
    scaleLabels: { left: 'Strongly disagree', right: 'Strongly agree' },
  },
  {
    id:      'q3',
    type:    'SCALE_5',
    section: 'Your engagement',
    text:    'Values — Our values are reflected in the decisions people make every day.',
    scaleLabels: { left: 'Strongly disagree', right: 'Strongly agree' },
  },
  {
    id:      'q4',
    type:    'SCALE_5',
    section: 'Your engagement',
    text:    'Empowerment — I have the freedom and trust to make decisions that help me do my best work.',
    scaleLabels: { left: 'Strongly disagree', right: 'Strongly agree' },
  },
  {
    id:      'q5',
    type:    'SCALE_5',
    section: 'Your engagement',
    text:    'Performance — I receive useful feedback that helps me improve and grow.',
    scaleLabels: { left: 'Strongly disagree', right: 'Strongly agree' },
  },
  {
    id:      'q6',
    type:    'SCALE_5',
    section: 'Your engagement',
    text:    'Recognition — Great work is recognised and celebrated here.',
    scaleLabels: { left: 'Strongly disagree', right: 'Strongly agree' },
  },
  {
    id:      'q7',
    type:    'SCALE_5',
    section: 'Your engagement',
    text:    'Role Design — I have the clarity, tools and support I need to be successful in my role.',
    scaleLabels: { left: 'Strongly disagree', right: 'Strongly agree' },
  },
  {
    id:      'q8',
    type:    'SCALE_5',
    section: 'Your engagement',
    text:    'Growth — I have opportunities to learn, develop and progress my career.',
    scaleLabels: { left: 'Strongly disagree', right: 'Strongly agree' },
  },
  {
    id:      'q9',
    type:    'SCALE_5',
    section: 'Your engagement',
    text:    "Continuous Improvement — We're encouraged to challenge how things are done and suggest better ways of working.",
    scaleLabels: { left: 'Strongly disagree', right: 'Strongly agree' },
  },
  {
    id:      'q10',
    type:    'SCALE_5',
    section: 'Your engagement',
    text:    "Future Confidence — I'm confident the company is making the right decisions for long-term success.",
    scaleLabels: { left: 'Strongly disagree', right: 'Strongly agree' },
  },
  {
    id:      'q11',
    type:    'SCALE_5',
    section: 'Your engagement',
    text:    'Belonging — I feel valued, respected and included as part of the team.',
    scaleLabels: { left: 'Strongly disagree', right: 'Strongly agree' },
  },

  // ── Section 2: Your voice (Q12–Q13) ───────────────────────────────────────
  {
    id:      'q12',
    type:    'SCALE_10',
    section: 'Your voice',
    text:    'Advocacy — On a scale of 0 to 10, how likely are you to recommend Add People as a great place to work?',
    scaleLabels: { left: 'Not at all likely', right: 'Extremely likely' },
  },
  {
    id:          'q13',
    type:        'OPEN_TEXT',
    section:     'Your voice',
    text:        'If you could improve one thing about working here, what would it be?',
    placeholder: 'Be honest — this is read carefully and taken seriously',
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length; // 13
export const SECONDS_PER_QUESTION = 14; // ~3 min total
export const TOTAL_SECONDS = TOTAL_QUESTIONS * SECONDS_PER_QUESTION; // 182s ≈ 3 min

/** Map from question index to section index (0, 1, or 2). */
export function getSectionIndex(qIndex: number): number {
  if (qIndex === 0) return 0;
  if (qIndex <= 10) return 1;
  return 2;
}
