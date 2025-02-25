'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

type Mode = 'hide' | 'disable' | 'blur' | 'none';

const ProtectedClient = ({
  children,
  mode = 'none',
}: {
  children: React.ReactNode;
  mode: Mode;
}) => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading...</p>;

  if (!session) {
    switch (mode) {
      case 'hide':
        return null; // Completely remove element
      case 'disable':
        return <div className="opacity-50 pointer-events-none">{children}</div>; // Disable element
      case 'blur':
        return <div className="filter blur-sm">{children}</div>; // Blur effect
      case 'none':
      default:
        return <>{children}</>;
    }
  }

  return <>{children}</>;
};
export default ProtectedClient;
