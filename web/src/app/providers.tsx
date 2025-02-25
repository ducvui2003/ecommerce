'use client';
import { Toaster } from '@/components/ui/toaster';
import { RefreshTokenResType } from '@/types/auth.type';
import { SessionProvider } from 'next-auth/react';
import React, { useState } from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <main>
          <Toaster />
          <div>{children}</div>
        </main>
      </SessionProvider>
    </>
  );
};

export default Providers;
