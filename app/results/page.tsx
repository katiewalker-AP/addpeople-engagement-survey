import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions, ALLOWED_EMAILS } from '@/lib/auth';
import ResultsDashboard from '@/components/results/ResultsDashboard';
import AccessDenied from '@/components/results/AccessDenied';

export const metadata = { title: 'Engagement Results · Add People' };

export default async function ResultsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/results/login');
  }

  if (!ALLOWED_EMAILS.includes(session.user?.email ?? '')) {
    return <AccessDenied email={session.user?.email ?? ''} />;
  }

  return (
    <ResultsDashboard
      userName={session.user?.name ?? session.user?.email ?? 'User'}
      userEmail={session.user?.email ?? ''}
    />
  );
}
