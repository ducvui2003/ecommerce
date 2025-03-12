import envConfig from '@/config/env.config';
import logger from '@/lib/logger';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

const middlewarePreventLogin = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: envConfig.NEXT_PUBLIC_AUTH_SECRET,
  });

  if (token) {
    return new Response('', {
      status: 400,
      statusText: 'Login success, forward to home page',
    });
  }

  return NextResponse.next();
};
export default middlewarePreventLogin;
