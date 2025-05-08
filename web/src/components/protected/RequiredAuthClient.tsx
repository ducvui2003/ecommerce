'use client';
import useSession from '@/components/auth/useSession';
import { Role } from '@/types/auth.type';
import React, { useMemo } from 'react';

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
  role,
}: RequiredAuthClient) => {
  const { status, session } = useSession();

  const shouldRestrict = useMemo(() => {
    if (status !== 'authentication') return true;
    if (!session?.user) return true;
    if (role && !role.includes(session.user.role)) return true;
    return false;
  }, [session, status, role]);

  if (shouldRestrict) {
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
