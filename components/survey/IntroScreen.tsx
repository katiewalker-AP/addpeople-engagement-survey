'use client';

import { INTRO } from '@/lib/questions';

interface Props {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header bar */}
      <header className="bg-deep-blue px-6 py-4 flex items-center gap-3">
        <span className="pulse-dot w-2.5 h-2.5 rounded-full bg-yellow flex-shrink-0" />
        <span className="font-serif text-white text-lg tracking-tight">
          Add People · Employee Engagement
        </span>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl screen-enter">

          {/* Time badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-1.5 text-sm font-sans text-[#4a5568] mb-8">
            <span>⏱</span>
            <span>{INTRO.timeEstimate}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-deep-blue leading-tight mb-5">
            {INTRO.heading}
          </h1>

          <p className="font-sans text-[#4a5568] text-base sm:text-lg leading-relaxed mb-10">
            {INTRO.body}
          </p>

          {/* Journey steps */}
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-1">
            {INTRO.journeySteps.map((step, i) => (
              <div key={step} className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2">
                  <span className="w-5 h-5 rounded-full bg-deep-blue text-white text-xs flex items-center justify-center font-sans font-medium flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm font-sans text-deep-blue whitespace-nowrap">{step}</span>
                </div>
                {i < INTRO.journeySteps.length - 1 && (
                  <svg className="w-4 h-4 text-[#bbb] flex-shrink-0" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={onStart}
            className="w-full sm:w-auto px-10 py-4 bg-electric-blue text-white font-sans font-semibold text-lg rounded-xl hover:opacity-90 active:scale-[0.98] transition-all"
          >
            {INTRO.cta}
          </button>

          <p className="mt-6 text-xs font-sans text-[#999]">
            Your response is completely anonymous — no names, emails, or devices are recorded.
          </p>
        </div>
      </main>
    </div>
  );
}
