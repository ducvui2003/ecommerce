import { NextResponse } from 'next/server';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import envConfig from '@/config/env.config';

export const authMiddleware = withAuth(
  function middleware(req: NextRequestWithAuth) {
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  },
  {
    secret: envConfig.NEXT_PUBLIC_AUTH_SECRET,
    pages: {
      signIn: '/login',
    },
    callbacks: {
      authorized({ token }) {
        return !!token;
      },
    },
  },
);
export default authMiddleware;
