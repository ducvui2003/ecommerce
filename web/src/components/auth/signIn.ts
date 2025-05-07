import { Session } from '@/app/api/auth/session/type';
import { calculateExpiredDate } from '@/lib/auth.helper';
import authService from '@/service/auth.service';

type Credentials = {
  email: string;
  password: string;
};

/**
 * Handle sign in with server
 * if success, call to server component and set cookie
 * if error, throw error
 * @param credentials
 */
const signIn = async (
  credentials: Credentials,
): Promise<{
  accessToken: string;
}> => {
  const response = await authService.login(credentials);
  if (response) {
    const { accessToken, refreshToken, expiresAt, ...props } = response;
    const session: Session = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresAt: expiresAt,
      user: props,
      expires: calculateExpiredDate(expiresAt),
    };
    await fetch(`/api/auth/session`, {
      method: 'POST',
      body: JSON.stringify(session),
    });
    return {
      accessToken: accessToken,
    };
  } else {
    throw new Error('Login Failed');
  }
};
export default signIn;
