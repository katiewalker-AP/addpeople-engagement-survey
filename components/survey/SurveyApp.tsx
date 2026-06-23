'use client';

import { useState, useCallback, useRef } from 'react';
import { QUESTIONS, TOTAL_QUESTIONS, getSectionIndex } from '@/lib/questions';
import type { SurveyAnswers, SubmissionPayload } from '@/lib/types';
import IntroScreen from './IntroScreen';
import ProgressBar from './ProgressBar';
import QuestionScreen from './QuestionScreen';
import ThankYou from './ThankYou';

type Screen =
  | { type: 'intro' }
  | { type: 'question'; index: number }
  | { type: 'submitting' }
  | { type: 'thankyou' }
  | { type: 'error'; message: string };

function generateResponseId(): string {
  return (Date.now().toString(36) + Math.random().toString(36).slice(2, 8)).toUpperCase();
}

const EMPTY_ANSWERS: SurveyAnswers = {
  q1: null, q2: null, q3: null, q4: null, q5: null, q6: null,
  q7: null, q8: null, q9: null, q10: null, q11: null, q12: null, q13: '',
};

export default function SurveyApp() {
  const [screen, setScreen] = useState<Screen>({ type: 'intro' });
  const [answers, setAnswers] = useState<SurveyAnswers>(EMPTY_ANSWERS);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  const handleStart = useCallback(() => {
    startTimeRef.current = Date.now();
    setScreen({ type: 'question', index: 0 });
  }, []);

  const handleAnswer = useCallback(async (questionIndex: number, value: string | number) => {
    const q = QUESTIONS[questionIndex];
    const updatedAnswers = { ...answers, [q.id]: value } as SurveyAnswers;
    setAnswers(updatedAnswers);

    if (questionIndex < TOTAL_QUESTIONS - 1) {
      setScreen({ type: 'question', index: questionIndex + 1 });
      return;
    }

    // Last question — submit
    setIsSubmitting(true);
    setSubmitError(null);

    const payload: SubmissionPayload = {
      responseId:            generateResponseId(),
      timestamp:             new Date().toISOString(),
      team:                  updatedAnswers.q1 ?? '',
      leadership:            updatedAnswers.q2 ?? 0,
      values:                updatedAnswers.q3 ?? 0,
      empowerment:           updatedAnswers.q4 ?? 0,
      performance:           updatedAnswers.q5 ?? 0,
      recognition:           updatedAnswers.q6 ?? 0,
      roleDesign:            updatedAnswers.q7 ?? 0,
      growth:                updatedAnswers.q8 ?? 0,
      continuousImprovement: updatedAnswers.q9 ?? 0,
      futureConfidence:      updatedAnswers.q10 ?? 0,
      belonging:             updatedAnswers.q11 ?? 0,
      enpsScore:             updatedAnswers.q12 ?? 0,
      improvementSuggestion: updatedAnswers.q13 ?? '',
    };

    try {
      const res = await fetch('/api/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      setScreen({ type: 'thankyou' });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [answers]);

  const showProgress = screen.type === 'question';
  const currentIndex = screen.type === 'question' ? screen.index : 0;

  return (
    <>
      {showProgress && (
        <ProgressBar
          currentIndex={currentIndex}
          total={TOTAL_QUESTIONS}
          sectionIndex={getSectionIndex(currentIndex)}
          startTime={startTimeRef.current}
        />
      )}

      {screen.type === 'intro' && <IntroScreen onStart={handleStart} />}

      {screen.type === 'question' && (
        <div className="flex flex-col min-h-[calc(100vh-var(--header-h,64px))]">
          <QuestionScreen
            key={screen.index}
            question={QUESTIONS[screen.index]}
            questionNumber={screen.index + 1}
            initialValue={answers[QUESTIONS[screen.index].id as keyof SurveyAnswers]}
            onNext={(value) => handleAnswer(screen.index, value as string | number)}
            isLast={screen.index === TOTAL_QUESTIONS - 1}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        </div>
      )}

      {screen.type === 'thankyou' && <ThankYou />}

      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cream/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-border border-t-electric-blue rounded-full animate-spin" />
            <p className="font-sans text-sm text-[#4a5568]">Submitting your response…</p>
          </div>
        </div>
      )}
    </>
  );
}
