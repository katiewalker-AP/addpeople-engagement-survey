import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const endpoint = process.env.FORM_ENDPOINT;
  if (!endpoint) {
    console.log('[dev] FORM_ENDPOINT not set — logging payload only');
    const body = await req.json() as unknown;
    console.log('[dev] payload:', body);
    return NextResponse.json({ status: 'ok' });
  }

  const body = await req.text();

  const upstream = await fetch(endpoint, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  const text = await upstream.text();

  return new NextResponse(text, {
    status: upstream.ok ? 200 : upstream.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
