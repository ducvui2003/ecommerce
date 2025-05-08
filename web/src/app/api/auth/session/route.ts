import { AUTH_SESSION_COOKIE } from '@/app/api/auth/session/const';
import { Session } from '@/app/api/auth/session/type';
import { getSession, setSession } from '@/lib/auth.helper';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Save session from req to cookie
 * @param req session
 * @returns 200
 */

const POST = async (req: Request, response: NextResponse) => {
  const data: Session = await req.json();
  const cookieStore = await cookies();

  setSession(data, undefined, cookieStore);

  return NextResponse.json(null, { status: 200 });
};

/**
 * Get current session
 * @returns session from cookie
 * 200: success
 * 400: session not exist
 */

const GET = async () => {
  const cookieStore = await cookies();

  // session
  const cookieValue = getSession(cookieStore);

  if (cookieValue) return NextResponse.json(cookieValue, { status: 200 });
  return NextResponse.json(null, { status: 400 });
};

export { GET, POST };
