import { AUTH_SESSION_COOKIE } from '@/app/api/auth/session/const';
import { Session } from '@/app/api/auth/session/type';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const calculateRemainTime = (unix: number): number => {
  const expiresAt = unix * 1000;
  const now = Date.now();

  return expiresAt - now;
};

const calculateExpiredDate = (unix: number): Date => {
  return new Date(unix * 1000);
};

const setSession = (session: Session, cookieStore: ReadonlyRequestCookies) => {
  cookieStore.set(AUTH_SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    path: '/',
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
  });
};

const getSession = (cookieStore: ReadonlyRequestCookies): Session | null => {
  const cookieValue = cookieStore.get(AUTH_SESSION_COOKIE)?.value;
  if (!cookieValue) return null;
  const currentSession: Session = JSON.parse(cookieValue);
  return {
    ...currentSession,
    expires: new Date(currentSession.expires),
  };
};

export { calculateRemainTime, setSession, getSession, calculateExpiredDate };
