import { HOME_PAGE, LOGIN_PAGE } from '@/constraint/variable';
import logger from '@/lib/logger';
import authMiddleware from '@/middlewares/auth.middleware';
import middlewarePreventLogin from '@/middlewares/prevent-login.middleware';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextFetchEvent, NextResponse } from 'next/server';

const routesNeedAuth: string[] = [];

const routesPreventAfterAuth: string[] = [
  '/login',
  '/register',
  '/forgot-password',
];

const routes = [...routesNeedAuth, ...routesPreventAfterAuth];

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent,
) {
  const url = req.nextUrl;

  if (
    routesNeedAuth.find((item) => url.pathname.startsWith(item)) !== undefined
  ) {
    logger.info('Auth Middleware Executed');
    const authResponse: NextMiddlewareResult = await authMiddleware(
      req as NextRequestWithAuth,
      event,
    );
    if (authResponse && authResponse.status !== 200)
      return NextResponse.redirect(new URL(LOGIN_PAGE, req.url));
  }

  if (
    routesPreventAfterAuth.find((item) => url.pathname.startsWith(item)) !==
    undefined
  ) {
    logger.info('Prevent Login Executed');
    const response = await middlewarePreventLogin(req);
    if (!response.ok) return NextResponse.redirect(new URL(HOME_PAGE, req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/login', '/register', '/forgot-password'],
};
