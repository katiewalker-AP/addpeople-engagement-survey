'use client';

import { SCALE_5_LABELS } from '@/lib/questions';

interface Props {
  value: number | null;
  onChange: (value: number) => void;
}

export default function Scale5({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {SCALE_5_LABELS.map((label, i) => {
        const score    = i + 1;
        const selected = value === score;
        return (
          <button
            key={label}
            onClick={() => onChange(score)}
            className={[
              'w-full px-5 py-4 rounded-xl border-2 text-left font-sans font-medium text-base transition-all',
              selected
                ? 'bg-deep-blue border-deep-blue text-white'
                : 'bg-white border-border text-deep-blue hover:bg-[#f0f3ff] hover:border-electric-blue',
            ].join(' ')}
          >
            <span className="flex items-center gap-3">
              <span
                className={[
                  'w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-semibold',
                  selected
                    ? 'border-white bg-white text-deep-blue'
                    : 'border-border text-[#999]',
                ].join(' ')}
              >
                {score}
              </span>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
