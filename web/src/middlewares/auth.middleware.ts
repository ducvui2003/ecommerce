import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import envConfig from '@/config/env.config';

// ✅ Create a function that returns a middleware handler
export const authMiddleware = withAuth(
  function middleware(req: NextRequest) {
    console.log('Auth Middleware Executed');
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next(); // Continue if authenticated
  },
  {
    secret: envConfig.NEXT_PUBLIC_AUTH_SECRET,
    pages: {
      signIn: '/login',
    },
    callbacks: {
      authorized({ token }) {
        return !!token; // ✅ Allow access if token exists
      },
    },
  },
);
export default authMiddleware;
