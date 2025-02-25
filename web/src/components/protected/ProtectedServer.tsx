import { getAccessToken } from '@/lib/http';
import React, { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { HOME_PAGE } from '@/constraint/variable';

type Mode = 'redirect' | 'forbidden' | 'hide';

interface ProtectedServerProps {
  children: ReactNode;
  mode?: Mode;
}

export default async function ProtectedServer({
  children,
  mode = 'redirect',
}: ProtectedServerProps) {
  const session = await getAccessToken();

  if (!session) {
    switch (mode) {
      case 'redirect':
        redirect(HOME_PAGE); // Redirect to login page
        return null;
      case 'forbidden':
        return <h1 className="text-red-500 text-center">403 - Forbidden</h1>;
      case 'hide':
        return null;
    }
  }

  return <>{children}</>;
}
