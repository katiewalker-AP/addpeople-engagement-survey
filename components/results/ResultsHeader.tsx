'use client';

import { signOut } from 'next-auth/react';

interface Props {
  userName:      string;
  responseCount: number;
  loading:       boolean;
}

export default function ResultsHeader({ userName, responseCount, loading }: Props) {
  return (
    <header
      className="bg-deep-blue px-4 sm:px-6 flex items-center justify-between gap-4"
      style={{ height: '70px' }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="pulse-dot w-2.5 h-2.5 rounded-full bg-yellow flex-shrink-0" />
        <span className="font-serif text-white text-base sm:text-lg tracking-tight truncate">
          Add People · Employee Engagement
        </span>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {!loading && (
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-xs font-sans text-white">
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm-5 6a5 5 0 0110 0H3z" />
            </svg>
            {responseCount} {responseCount === 1 ? 'response' : 'responses'}
          </span>
        )}

        <span className="hidden sm:inline text-white/60 text-xs font-sans truncate max-w-[140px]">
          {userName}
        </span>

        <button
          onClick={() => signOut({ callbackUrl: '/results/login' })}
          className="text-white/70 hover:text-white text-xs font-sans transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
