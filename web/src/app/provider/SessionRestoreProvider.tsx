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
    if (session) dispatch(setAuthState(session));
  }, [dispatch]);
  return <>{children}</>;
};

export default SessionRestoreProvider;
