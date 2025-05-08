'use client';

import { Session } from '@/app/api/auth/session/type';
import { AuthState } from '@/features/auth/auth.slice';
import { useAppSelector } from '@/hooks/use-store';
import { getCurrentUnix, isSessionExpired } from '@/lib/auth.helper';
import { useEffect, useState } from 'react';

type SessionState = {
  status: 'authentication' | 'un-authentication';
  error: string | null;
  session: AuthState | null;
};

/**
 * Get session by call to next server
 * Check in Store before call to next server
 * @returns session
 */

const useSession = () => {
  const [session, setSession] = useState<SessionState>({
    error: null,
    session: null,
    status: 'un-authentication',
  });
  const { accessToken, user, expiresAt } = useAppSelector(
    (state) => state.authSlice,
  );

  const fetchSession = async (abort: AbortController) => {
    const response = await fetch('/api/auth/session', {
      method: 'GET',
      signal: abort.signal,
    });

    // session exist => refresh token not expired
    if (response.ok) {
      const currentSession: Session = await response.json();
      if (!isSessionExpired(currentSession))
        // access token not expired
        setSession({
          error: null,
          session: currentSession,
          status: 'authentication',
        });
      else {
        // access token expired => refresh new token
        const responseFromRefresh = await fetch('/api/auth/refresh', {
          method: 'POST',
          signal: abort.signal,
        });

        if (responseFromRefresh.status !== 200) {
          // refresh token failed
          // logout in server to clear session
          await fetch('/api/auth/logout', {
            method: 'DELETE',
          });
          setSession({
            error: 'Refresh token failed',
            session: null,
            status: 'un-authentication',
          });
        } else {
          // refresh token success
          // save session
          const bodyFromRefresh: Session = await responseFromRefresh.json();
          await fetch('/api/auth/session', {
            method: 'POST',
            body: JSON.stringify(bodyFromRefresh),
            signal: abort.signal,
          });
          setSession({
            error: null,
            session: bodyFromRefresh,
            status: 'authentication',
          });
        }
      }
    } else {
      // session not exist => refresh token expired
      setSession({
        error: 'Session not exist',
        session: null,
        status: 'un-authentication',
      });
    }
  };

  useEffect(() => {
    if (accessToken && expiresAt && expiresAt > getCurrentUnix()) {
      setSession({
        error: null,
        session: {
          user: user,
          accessToken: accessToken,
          expiresAt: expiresAt,
        },
        status: 'authentication',
      });
      return;
    }
    const controller = new AbortController();
    fetchSession(controller);
    () => {
      controller.abort();
    };
  }, []);

  return session;
};

export default useSession;
