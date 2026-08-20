import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getAuthenticatedUser } from '../../../lib/auth';
import { generateId } from '../../../utils/helper';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const education = await db.getCollection('education');
    return NextResponse.json(education || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 });
  }
}

export async function POST(request) {
  const user = getAuthenticatedUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const newItem = { id: generateId(), ...data };
    await db.addItem('education', newItem);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create education entry' }, { status: 500 });
  }
}

export async function PUT(request) {
  const user = getAuthenticatedUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const data = await request.json();
    const updated = await db.updateItem('education', id, data);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update education entry' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const user = getAuthenticatedUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await db.deleteItem('education', id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete education entry' }, { status: 500 });
  }
}
