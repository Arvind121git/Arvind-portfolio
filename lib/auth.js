import { cookies } from 'next/headers';
import { verifyToken } from './jwt';

export function getAuthenticatedUser(request) {
  try {
    // Check Authorization header first
    const authHeader = request.headers.get('authorization') || '';
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const user = verifyToken(token);
      if (user) return user;
    }

    // Check cookies
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('portfolio_token')?.value;
    if (tokenCookie) {
      const user = verifyToken(tokenCookie);
      if (user) return user;
    }

    return null;
  } catch (error) {
    return null;
  }
}
