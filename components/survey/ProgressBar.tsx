'use client';

import { useEffect, useState } from 'react';
import { SECTIONS, TOTAL_QUESTIONS, TOTAL_SECONDS, getSectionIndex } from '@/lib/questions';

interface Props {
  currentIndex: number;
  total: number;
  sectionIndex: number;
  startTime: number | null;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function ProgressBar({ currentIndex, total, sectionIndex, startTime }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);

  useEffect(() => {
    if (!startTime) return;
    const update = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setSecondsLeft(Math.max(0, TOTAL_SECONDS - elapsed));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [startTime]);

  const progress = ((currentIndex + 1) / total) * 100;
  const section  = SECTIONS[sectionIndex];

  return (
    <div
      className="sticky top-0 z-40 bg-white border-b border-border"
      style={{ height: 'var(--header-h, 64px)' }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between px-4 sm:px-6 h-[calc(var(--header-h,64px)-4px)]">
        <div className="flex items-center gap-3">
          <span className="text-sm font-sans font-medium text-deep-blue">
            {currentIndex + 1} <span className="text-[#999] font-normal">of {total}</span>
          </span>
          <span className="hidden sm:inline-block h-4 w-px bg-border" />
          <span className="hidden sm:inline text-sm font-sans text-[#4a5568]">{section.label}</span>
        </div>

        {/* Section dots */}
        <div className="flex items-center gap-1.5">
          {SECTIONS.map((s, i) => (
            <div
              key={s.label}
              className={`rounded-full transition-all ${
                i === sectionIndex
                  ? 'w-4 h-2 bg-electric-blue'
                  : i < sectionIndex
                  ? 'w-2 h-2 bg-deep-blue'
                  : 'w-2 h-2 bg-border'
              }`}
            />
          ))}
        </div>

        <span className="text-sm font-sans text-[#4a5568] tabular-nums">
          ⏱ {formatTime(secondsLeft)}
        </span>
      </div>

      {/* Progress fill */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
        <div
          className="h-full bg-electric-blue progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
