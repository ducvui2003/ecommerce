import composeMiddleware from '@/middlewares';
import authMiddleware from '@/middlewares/auth.middleware';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextFetchEvent } from 'next/server';

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent,
) {
  const authResponse = await authMiddleware(req, event);
  if (authResponse) return authResponse;
  return composeMiddleware(req, event);
}

export const config = { matcher: ['/admin/:path*', '/login'] };
