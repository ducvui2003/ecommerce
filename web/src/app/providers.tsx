'use client';
import { Toaster } from '@/components/ui/toaster';
import { clientAccessToken, clientRefreshToken } from '@/lib/http';
import { TokenType } from '@/types/token';
import React, { useState } from 'react';

const Providers = ({
  initToken,
  children,
}: {
  initToken?: TokenType | undefined;
  children: React.ReactNode;
}) => {
  // use state chỉ rendẻ duy nhất 1 lần trong life cycle
  useState(() => {
    if (typeof window !== 'undefined' && initToken) {
      clientAccessToken.value = initToken.accessToken;
      clientRefreshToken.value = initToken.refreshToken;
    }
  });
  return (
    <>
      <main>
        <Toaster />
        <div>{children}</div>
      </main>
    </>
  );
};

export default Providers;
