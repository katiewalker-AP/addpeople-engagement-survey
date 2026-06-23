import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions, ALLOWED_EMAILS } from '@/lib/auth';
import LoginButton from './LoginButton';

export const metadata = { title: 'Sign In · Add People Engagement Results' };

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.email && ALLOWED_EMAILS.includes(session.user.email)) {
    redirect('/results');
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo/header */}
        <div className="flex items-center gap-3 justify-center mb-10">
          <span className="w-3 h-3 rounded-full bg-yellow" />
          <span className="font-serif text-deep-blue text-xl tracking-tight">
            Add People
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
          <h1 className="font-serif text-2xl text-deep-blue mb-2 text-center">
            Engagement Results
          </h1>
          <p className="font-sans text-[#4a5568] text-sm text-center mb-8 leading-relaxed">
            Sign in with your Add People Google account to view survey results.
          </p>

          <LoginButton />

          <p className="mt-6 text-center text-xs font-sans text-[#999] leading-relaxed">
            Access is restricted to authorised team members.
          </p>
        </div>
      </div>
    </div>
  );
}
