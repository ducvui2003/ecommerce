import ServerProvider from '@/app/provider/ServerProvider';
import StoreProvider from '@/app/provider/StoreProvider';
import { Toaster } from '@/components/ui/sonner';

import React from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <ServerProvider>
        <main className="relative">
          <Toaster position="bottom-right" richColors />
          {children}
        </main>
      </ServerProvider>
    </StoreProvider>
  );
};

export default Providers;
