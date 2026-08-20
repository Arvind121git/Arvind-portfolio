import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getAuthenticatedUser } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const about = await db.getCollection('about');
    return NextResponse.json(about || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 });
  }
}

export async function PUT(request) {
  const user = getAuthenticatedUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const current = await db.getCollection('about') || {};
    const updated = await db.setCollection('about', { ...current, ...data });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 });
  }
}
