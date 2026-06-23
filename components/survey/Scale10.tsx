'use client';

interface Props {
  value: number | null;
  onChange: (value: number) => void;
  minLabel: string;
  maxLabel: string;
}

export default function Scale10({ value, onChange, minLabel, maxLabel }: Props) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-11 gap-1.5 sm:gap-2">
        {Array.from({ length: 11 }, (_, i) => {
          const selected = value === i;
          return (
            <button
              key={i}
              onClick={() => onChange(i)}
              className={[
                'aspect-square rounded-lg border-2 font-sans font-semibold text-sm sm:text-base transition-all flex items-center justify-center',
                selected
                  ? 'bg-deep-blue border-deep-blue text-white'
                  : 'bg-white border-border text-deep-blue hover:bg-[#f0f3ff] hover:border-electric-blue',
              ].join(' ')}
            >
              {i}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between mt-3 px-0.5">
        <span className="text-xs font-sans text-[#4a5568] max-w-[45%] leading-tight">{minLabel}</span>
        <span className="text-xs font-sans text-[#4a5568] max-w-[45%] text-right leading-tight">{maxLabel}</span>
      </div>
    </div>
  );
}
