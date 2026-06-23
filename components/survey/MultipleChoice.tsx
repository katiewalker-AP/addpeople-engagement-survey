'use client';

interface Props {
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}

export default function MultipleChoice({ options, value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {options.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={[
              'w-full px-5 py-4 rounded-xl border-2 text-left font-sans text-base transition-all',
              selected
                ? 'bg-deep-blue border-deep-blue text-white font-medium'
                : 'bg-white border-border text-deep-blue hover:bg-[#f0f3ff] hover:border-electric-blue',
            ].join(' ')}
          >
            <span className="flex items-center gap-3">
              <span
                className={[
                  'w-4 h-4 rounded-full border-2 flex-shrink-0',
                  selected ? 'border-white bg-white' : 'border-border',
                ].join(' ')}
              />
              {option}
            </span>
          </button>
        );
      })}
    </div>
  );
}
