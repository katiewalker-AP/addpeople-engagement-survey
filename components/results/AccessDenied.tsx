'use client';

import { signOut } from 'next-auth/react';

interface Props {
  email: string;
}

export default function AccessDenied({ email }: Props) {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="w-16 h-16 rounded-full bg-[#fff0ee] border-2 border-orange flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>

        <h1 className="font-serif text-2xl text-deep-blue mb-3">Access denied</h1>
        <p className="font-sans text-[#4a5568] text-sm mb-2 leading-relaxed">
          <span className="font-medium text-deep-blue">{email}</span> is not authorised to view these results.
        </p>
        <p className="font-sans text-[#999] text-xs mb-8 leading-relaxed">
          Contact your Add People People team if you believe this is an error.
        </p>

        <button
          onClick={() => signOut({ callbackUrl: '/results/login' })}
          className="px-6 py-3 bg-deep-blue text-white font-sans font-medium rounded-xl hover:opacity-90 transition-all text-sm"
        >
          Sign out and try a different account
        </button>
      </div>
    </div>
  );
}
