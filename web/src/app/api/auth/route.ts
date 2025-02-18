import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constraint/variable';
import { serialize } from 'cookie';

export async function POST(request: Request) {
  const res = await request.json();
  const accessToken = res.accessToken;
  const refreshToken = res.refreshToken;

  if (!accessToken || !refreshToken) {
    return Response.json(
      { message: 'sessionToken is required' },
      { status: 400 },
    );
  }

  const accessTokenCookie = serialize(ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    path: '/',
  });

  const refreshTokenCookie = serialize(REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    path: '/',
  });

  return Response.json(
    { res },
    {
      status: 200,
      headers: {
        'Set-Cookie': `${accessTokenCookie}, ${refreshTokenCookie}`,
      },
    },
  );
}
