import ClientProvider from '@/app/provider/ClientProvider';
import getServerSession from '@/components/auth/getServerSession';
import { ReactNode } from 'react';
type ServerProviderProps = {
  children: ReactNode;
};

const ServerProvider = async ({ children }: ServerProviderProps) => {
  const session = await getServerSession();
  return (
    <ClientProvider accessToken={session?.accessToken ?? ''}>
      {children}
    </ClientProvider>
  );
};

export default ServerProvider;
