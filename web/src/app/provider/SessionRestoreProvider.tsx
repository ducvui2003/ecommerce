import useSession from '@/components/auth/useSession';
import { setAuthState } from '@/features/auth/auth.slice';
import { useAppDispatch } from '@/hooks/use-store';
import { ReactNode, useEffect } from 'react';

type SessionRestoreProviderProps = {
  children?: ReactNode;
};

const SessionRestoreProvider = ({ children }: SessionRestoreProviderProps) => {
  const { session, error, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session) {
      console.log('handle save session to store');
      dispatch(setAuthState(session));
    }
  }, [dispatch, session]);
  return <>{children}</>;
};

export default SessionRestoreProvider;
