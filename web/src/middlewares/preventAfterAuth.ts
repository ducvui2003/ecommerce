import getServerSession from '@/components/auth/getServerSession';
import { HOME_PAGE } from '@/constraint/variable';
import { matchPath } from '@/lib/http';
import { Middleware } from '@/types/middleware.type';
import { NextRequest, NextResponse } from 'next/server';

const routesPreventAfterAuth: string[] = [
  '/login',
  '/register',
  '/forgot-password',
];

const middlewarePreventAfterAuth: Middleware = async (
  req: NextRequest,
  _,
  session,
) => {
  const path = req.nextUrl.pathname;
  if (matchPath(path, routesPreventAfterAuth)) {
    if (session == null) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(HOME_PAGE, req.url));
    }
  }

  return undefined;
};
export default middlewarePreventAfterAuth;
