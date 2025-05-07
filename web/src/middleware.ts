import { Session } from '@/app/api/auth/session/type';
import getServerSession from '@/components/auth/getServerSession';
import middlewares from '@/middlewares';
import { Middleware } from '@/types/middleware.type';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

// Define route patterns for different roles
const routesNeedAuth: string[] = ['/user/info'];

const routesForUser: string[] = ['/user/*splat'];

const routesForSeller: string[] = ['/seller/*splat'];

const routesForAdmin: string[] = ['/admin/*splat'];

const routesPreventAfterAuth: string[] = [
  '/login',
  '/register',
  '/forgot-password',
];

const middlewareChain = async (
  req: NextRequest,
  event: NextFetchEvent,
  handlers: Middleware[],
  session: Session | null,
) => {
  for (const handle of handlers) {
    const res = await handle(req, event, session);
    if (res && (res.redirected || !res.ok)) {
      return res;
    }
  }
  return undefined;
};

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent,
) {
  const session = await getServerSession();
  const res = await middlewareChain(req, event, middlewares, session);
  if (res) return res;
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/user/info',
    '/admin/:path*',
    '/seller/:path*',
  ],
};
