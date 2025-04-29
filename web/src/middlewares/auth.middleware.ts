import { NextFetchEvent, NextResponse } from 'next/server';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import envConfig from '@/config/env.config';
import { Role } from '@/types/auth.type';

export const authMiddleware = (allowedRole?: Role) => {
  return withAuth(
    function middleware(req: NextRequestWithAuth, event: NextFetchEvent) {
      if (!req.nextauth?.token) {
        if (!allowedRole)
          return NextResponse.redirect(new URL('/login', req.url));
        const role: Role = req.nextauth.token?.role as Role;
        if (allowedRole || role || role !== allowedRole)
          return NextResponse.redirect(new URL('/403', req.url));
      }
      return null;
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
};
export default authMiddleware;
