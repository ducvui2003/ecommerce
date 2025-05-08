import { AUTH_SESSION_COOKIE } from '@/app/api/auth/session/const';
import { Session } from '@/app/api/auth/session/type';
import {
  calculateExpiredDate,
  getSession,
  isSessionExpired,
  setSession,
} from '@/lib/auth.helper';
import authService from '@/service/auth.service';
import { cookies } from 'next/headers';

const getServerSession = async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const currentSession = getSession(cookieStore);

  // Session not exist
  if (!currentSession) return null;
  // access token not expired

  if (!isSessionExpired(currentSession)) return currentSession;

  // access token expired => refresh token
  const responseFromServer = await authService.renewToken(
    currentSession.refreshToken,
  );

  // refresh token failed => delete token in cookie
  if (!responseFromServer) {
    console.log('delete');
    cookieStore.delete(AUTH_SESSION_COOKIE);
    return null;
  }

  // refresh token success => save token in cookie
  const { accessToken, refreshToken, expiresAt, ...props } = responseFromServer;

  const newSession: Session = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    expiresAt: expiresAt,
    user: props,
  };

  setSession(newSession, cookieStore);

  return newSession;
};

export default getServerSession;
