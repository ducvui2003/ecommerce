import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constraint/variable';
import { HttpError } from '@/lib/http';
import authApiRequest from '@/service/auth.service';
import { serialize } from 'cookie';
import { cookies } from 'next/headers';

export async function POST() {
  const cookie = cookies();
  const accessToken = (await cookie).get(ACCESS_TOKEN);
  const refreshToken = (await cookie).get(REFRESH_TOKEN);
  if (!accessToken || !refreshToken) {
    return Response.json(
      { message: 'sessionToken is required' },
      { status: 400 },
    );
  }
  try {
    await authApiRequest.logoutFromNextServer(refreshToken.value);
    const accessTokenCookie = serialize(ACCESS_TOKEN, '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });

    const refreshTokenCookie = serialize(REFRESH_TOKEN, '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });
    return Response.json(
      {
        status: 200,
        message: 'Logout successfully',
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `${accessTokenCookie}, ${refreshTokenCookie}`,
        },
      },
    );
  } catch (e) {
    if (e instanceof HttpError)
      return Response.json({ message: e.payload }, { status: e.status });
    else return Response.json({ message: 'Not recognize' }, { status: 500 });
  }
}
