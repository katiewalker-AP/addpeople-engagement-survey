'use client';

import { useState } from 'react';
import type { Question } from '@/lib/types';
import Scale5 from './Scale5';
import Scale10 from './Scale10';
import MultipleChoice from './MultipleChoice';
import OpenText from './OpenText';

interface Props {
  question:     Question;
  questionNumber: number;
  initialValue: string | number | null | undefined;
  onNext:       (value: string | number) => void;
  isLast:       boolean;
  isSubmitting: boolean;
  submitError:  string | null;
}

export default function QuestionScreen({
  question, questionNumber, initialValue, onNext, isLast, isSubmitting, submitError,
}: Props) {
  const [value, setValue] = useState<string | number | null>(
    initialValue !== undefined ? (initialValue as string | number | null) : null,
  );

  const canProceed = question.type === 'OPEN_TEXT' || value !== null;

  const handleSubmit = () => {
    if (!canProceed) return;
    onNext(value ?? '');
  };

  return (
    <div className="flex flex-col flex-1 px-5 sm:px-6 pt-8 pb-10 max-w-2xl mx-auto w-full screen-enter">
      {/* Section chip */}
      <span className="inline-block mb-4 text-xs font-sans font-medium text-[#999] uppercase tracking-widest">
        {question.section}
      </span>

      {/* Question text */}
      <h2 className="font-sans text-xl sm:text-2xl font-semibold text-deep-blue mb-8 leading-snug">
        {question.text}
      </h2>

      {/* Input */}
      <div className="flex-1 mb-8">
        {question.type === 'MULTIPLE_CHOICE' && (
          <MultipleChoice
            options={question.options ?? []}
            value={value as string | null}
            onChange={(v) => setValue(v)}
          />
        )}
        {question.type === 'SCALE_5' && (
          <Scale5
            value={value as number | null}
            onChange={(v) => setValue(v)}
          />
        )}
        {question.type === 'SCALE_10' && (
          <Scale10
            value={value as number | null}
            onChange={(v) => setValue(v)}
            minLabel={question.scaleLabels?.left ?? ''}
            maxLabel={question.scaleLabels?.right ?? ''}
          />
        )}
        {question.type === 'OPEN_TEXT' && (
          <OpenText
            value={(value as string) ?? ''}
            onChange={(v) => setValue(v)}
            placeholder={question.placeholder}
          />
        )}
      </div>

      {/* Error */}
      {submitError && (
        <div className="bg-[#fff0ee] border border-orange rounded-xl px-5 py-4 mb-5 flex items-start gap-3">
          <svg className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9v4a1 1 0 102 0V9a1 1 0 10-2 0zm0-3.5a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-sans text-sm font-medium text-deep-blue mb-0.5">Submission failed</p>
            <p className="font-sans text-sm text-[#4a5568]">{submitError}</p>
          </div>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handleSubmit}
        disabled={!canProceed || isSubmitting}
        className={[
          'w-full sm:w-auto sm:self-start px-8 py-4 rounded-xl font-sans font-semibold text-base transition-all',
          canProceed && !isSubmitting
            ? 'bg-electric-blue text-white hover:opacity-90 active:scale-[0.98]'
            : 'bg-border text-[#999] cursor-not-allowed',
        ].join(' ')}
      >
        {isLast ? (isSubmitting ? 'Submitting…' : 'Submit') : 'Next →'}
      </button>
    </div>
  );
}
