import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getAuthenticatedUser } from '../../../lib/auth';
import { generateId } from '../../../utils/helper';
import { validateContactForm } from '../../../utils/validation';

export async function GET(request) {
  const user = getAuthenticatedUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const messages = await db.getCollection('messages');
    return NextResponse.json(messages || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { isValid, errors } = validateContactForm(data);

    if (!isValid) {
      return NextResponse.json({ error: 'Validation failed', errors }, { status: 400 });
    }

    const newMessage = {
      id: generateId(),
      name: data.name,
      email: data.email,
      subject: data.subject || 'New Contact Request',
      message: data.message,
      createdAt: new Date().toISOString(),
    };

    await db.addItem('messages', newMessage);
    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const user = getAuthenticatedUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await db.deleteItem('messages', id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
