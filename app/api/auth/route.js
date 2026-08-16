import { NextResponse } from 'next/server';
import { signToken } from '../../../lib/jwt';
import { getAuthenticatedUser } from '../../../lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@arvind.dev';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (email === adminEmail && password === adminPassword) {
      const user = { email: adminEmail, role: 'admin', name: 'Arvind Kumar' };
      const token = signToken(user, 24);

      const response = NextResponse.json({ success: true, user, token });
      response.cookies.set('portfolio_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export async function GET(request) {
  const user = getAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json({ user });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('portfolio_token');
  return response;
}
