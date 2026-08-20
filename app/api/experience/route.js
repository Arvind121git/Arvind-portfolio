import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getAuthenticatedUser } from '../../../lib/auth';
import { generateId } from '../../../utils/helper';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const experience = await db.getCollection('experience');
    return NextResponse.json(experience || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
  }
}

export async function POST(request) {
  const user = getAuthenticatedUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const newItem = { id: generateId(), ...data };
    await db.addItem('experience', newItem);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create experience entry' }, { status: 500 });
  }
}

export async function PUT(request) {
  const user = getAuthenticatedUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const data = await request.json();
    const updated = await db.updateItem('experience', id, data);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update experience entry' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const user = getAuthenticatedUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await db.deleteItem('experience', id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete experience entry' }, { status: 500 });
  }
}
