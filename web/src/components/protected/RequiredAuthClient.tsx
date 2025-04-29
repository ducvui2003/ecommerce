'use client';
import { Role } from '@/types/auth.type';
import { useSession } from 'next-auth/react';
import React from 'react';

type Mode = 'hide' | 'disable' | 'blur-sm' | 'none';

// Prevent guest use component for user authenticated
// Work in server component
// Component will hide if user authenticated

type RequiredAuthClient = {
  children?: React.ReactNode;
  mode?: Mode;
  role?: Role[];
};

const RequiredAuthClient = ({
  children,
  mode = 'none',
  role = ['USER'],
}: RequiredAuthClient) => {
  const { data: session, status } = useSession();
  if (status !== 'authenticated' || role.includes(session.user.role as Role)) {
    switch (mode) {
      case 'hide':
        return null; // Completely remove element
      case 'disable':
        return <div className="pointer-events-none opacity-50">{children}</div>; // Disable element
      case 'blur-sm':
        return <div className="blur-xs filter">{children}</div>; // Blur effect
      case 'none':
        return <>{children}</>;
    }
  }

  return <>{children}</>;
};
export default RequiredAuthClient;
