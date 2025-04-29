import envConfig from '@/config/env.config';
import logger from '@/lib/logger';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const middlewarePreventLogin = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: envConfig.NEXT_PUBLIC_AUTH_SECRET,
  });

  if (token) {
    return null;
  }

  return NextResponse.next();
};
export default middlewarePreventLogin;
