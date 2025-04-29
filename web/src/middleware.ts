import authMiddleware from '@/middlewares/auth.middleware';
import middlewarePreventLogin from '@/middlewares/prevent-login.middleware';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextResponse } from 'next/server';

const routesNeedAuth: string[] = ['/user/info'];

const routesForUser: string[] = [];

const routesForSeller: string[] = [];

const routesForAdmin: string[] = [];

const routesPreventAfterAuth: string[] = [
  '/login',
  '/register',
  '/forgot-password',
];

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent,
) {
  const path = req.nextUrl.pathname;

  if (routesPreventAfterAuth.includes(path)) {
    const result = middlewarePreventLogin(req);
    if (!result) return result;
  }

  if (routesNeedAuth.includes(path)) {
    const result = authMiddleware()(req, event);
    if (!result) return result;
  }

  if (routesForUser.includes(path)) {
    const result = authMiddleware('USER')(req, event);
    if (!result) return result;
  }

  if (routesForSeller.includes(path)) {
    const result = authMiddleware('SELLER')(req, event);
    if (!result) return result;
  }

  if (routesForAdmin.includes(path)) {
    const result = authMiddleware('ADMIN')(req, event);
    if (!result) return result;
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/', '/login', '/register', '/forgot-password', '/user/info'],
};
