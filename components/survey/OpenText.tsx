'use client';

import { useState } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function OpenText({ value, onChange, placeholder }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        rows={5}
        className={[
          'w-full px-5 py-4 rounded-xl border-2 font-sans text-base text-deep-blue bg-white resize-none outline-none transition-all placeholder:text-[#bbb] leading-relaxed',
          focused ? 'border-electric-blue' : 'border-border',
        ].join(' ')}
      />
      <p className="mt-2 text-xs font-sans text-[#999]">
        Optional — skip with the button below if you prefer.
      </p>
    </div>
  );
}
