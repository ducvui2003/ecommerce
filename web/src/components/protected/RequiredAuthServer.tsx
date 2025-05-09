import React, { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { HOME_PAGE } from '@/constraint/variable';
import { getAccessToken } from '@/lib/http.server';

type Mode = 'redirect' | 'forbidden' | 'hide';

interface RequiredAuthServerProps {
  children: ReactNode;
  mode?: Mode;
}

export default async function RequiredAuthServer({
  children,
  mode = 'redirect',
}: RequiredAuthServerProps) {
  const session = await getAccessToken();

  if (!session) {
    switch (mode) {
      case 'redirect':
        redirect(HOME_PAGE); // Redirect to login page
        return null;
      case 'forbidden':
        return <h1 className="text-center text-red-500">403 - Forbidden</h1>;
      case 'hide':
        return null;
    }
  }

  return <>{children}</>;
}
