import { AUTH_SESSION_COOKIE } from '@/app/api/auth/session/const';
import { Session } from '@/app/api/auth/session/type';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { NextResponse } from 'next/server';

const calculateExpiredDate = (unix: number): Date => {
  return new Date(unix * 1000);
};

const setSession = (
  session: Session,
  response?: NextResponse,
  cookieStore?: ReadonlyRequestCookies,
) => {
  if (response)
    response.cookies.set(AUTH_SESSION_COOKIE, JSON.stringify(session), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
  if (cookieStore) {
    cookieStore.set(AUTH_SESSION_COOKIE, JSON.stringify(session), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
  }
};

const getSession = (cookieStore: ReadonlyRequestCookies): Session | null => {
  const cookieValue = cookieStore.get(AUTH_SESSION_COOKIE)?.value;
  if (!cookieValue) return null;
  const currentSession: Session = JSON.parse(cookieValue);
  return {
    ...currentSession,
  };
};

const getCurrentUnix = (): number => {
  return Math.floor(Date.now() / 1000);
};
/**
 * Check session is expired?
 * @param currentSession
 * @returns if session is expired, return true, otherwise return false
 */
const isSessionExpired = (currentSession: Session) => {
  // Convert both the session expiration time and current time to UTC
  const expiresUTC = currentSession.expiresAt; // Get expiration time in milliseconds (UTC)
  const currentUTC = Math.floor(Date.now() / 1000); // Get current time in milliseconds (UTC)
  return expiresUTC < currentUTC;
};

export {
  setSession,
  getSession,
  calculateExpiredDate,
  getCurrentUnix,
  isSessionExpired,
};
