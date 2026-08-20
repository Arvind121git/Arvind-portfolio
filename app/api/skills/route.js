import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getAuthenticatedUser } from '../../../lib/auth';
import { generateId } from '../../../utils/helper';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const skills = await db.getCollection('skills');
    return NextResponse.json(skills || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(request) {
  const user = getAuthenticatedUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const newSkill = { id: generateId(), ...data };
    await db.addItem('skills', newSkill);
    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}

export async function PUT(request) {
  const user = getAuthenticatedUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const data = await request.json();
    const updated = await db.updateItem('skills', id, data);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const user = getAuthenticatedUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await db.deleteItem('skills', id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
  }
}
