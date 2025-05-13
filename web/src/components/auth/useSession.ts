'use client';

import { Session } from '@/app/api/auth/session/type';
import { AuthState, setAuthState, setStatus } from '@/features/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { getCurrentUnix, isSessionExpired } from '@/lib/auth.helper';
import { setAccessToken } from '@/lib/http.client';
import { useEffect } from 'react';

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
  const { accessToken, user, expiresAt, status } = useAppSelector(
    (state) => state.authSlice,
  );

  const dispatch = useAppDispatch();

  const fetchSession = async () => {
    dispatch(setStatus('loading'));

    const response = await fetch('/api/auth/session', {
      method: 'GET',
    });
    // session exist => refresh token not expired
    if (response.ok) {
      const currentSession: Session = await response.json();
      if (!isSessionExpired(currentSession)) {
        // access token not expired
        dispatch(
          setAuthState({
            accessToken: currentSession.accessToken,
            expiresAt: currentSession.expiresAt,
            status: 'authenticated',
            user: currentSession.user,
          }),
        );
        setAccessToken(currentSession.accessToken);
      } else {
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
          dispatch(
            setAuthState({
              accessToken: null,
              expiresAt: null,
              status: 'un-authenticated',
              user: null,
            }),
          );
        } else {
          // refresh token success
          // save session
          const bodyFromRefresh: Session = await responseFromRefresh.json();
          await fetch('/api/auth/session', {
            method: 'POST',
            body: JSON.stringify(bodyFromRefresh),
          });
          dispatch(
            setAuthState({
              accessToken: bodyFromRefresh.accessToken,
              expiresAt: bodyFromRefresh.expiresAt,
              status: 'authenticated',
              user: bodyFromRefresh.user,
            }),
          );
          setAccessToken(bodyFromRefresh.accessToken);
        }
      }
    } else {
      // session not exist => refresh token expired
      console.log('token expired');
      dispatch(
        setAuthState({
          accessToken: null,
          expiresAt: null,
          status: 'un-authenticated',
          user: null,
        }),
      );
    }
  };

  useEffect(() => {
    const isTokenValid =
      status === 'authenticated' && expiresAt && expiresAt > getCurrentUnix();
    if (isTokenValid) return;
    fetchSession();
  }, []);

  return { accessToken, user, status };
};

export default useSession;
