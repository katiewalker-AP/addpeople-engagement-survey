import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, ALLOWED_EMAILS } from '@/lib/auth';
import { fetchSheetData } from '@/lib/sheets';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!ALLOWED_EMAILS.includes(session.user.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const data = await fetchSheetData();
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[/api/results]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
