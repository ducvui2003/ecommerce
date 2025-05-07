'use client';

import { Session } from '@/app/api/auth/session/type';
import { useEffect, useState } from 'react';

type SessionState = {
  status: 'authentication' | 'un-authentication';
  error: string | null;
  session: Session | null;
};

/**
 * Get session by call to next server
 * @returns session
 */

const useSession = () => {
  const [session, setSession] = useState<SessionState>({
    error: null,
    session: null,
    status: 'un-authentication',
  });
  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch('/api/auth/session', {
        method: 'GET',
      });

      // session exist => refresh token not expired
      if (response.ok) {
        const body: Session = await response.json();
        if (body.expires.getTime() < Date.now())
          // access token not expired
          setSession({
            error: null,
            session: body,
            status: 'authentication',
          });
        else {
          // access token expired => refresh new token
          const responseFromRefresh = await fetch('/api/auth/refresh', {
            method: 'POST',
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
    fetchSession();
  }, []);

  return session;
};

export default useSession;
