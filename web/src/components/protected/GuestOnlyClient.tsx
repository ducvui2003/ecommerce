'use client';
import { HOME_PAGE } from '@/constraint/variable';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

type GuestOnlyProps = {
  children?: React.ReactNode;
};

// Prevent user authenticated use component for guest
// Work in clint component
// Component will hide if user authenticated
const GuestOnlyClient = ({ children }: GuestOnlyProps) => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return null;
  }

  return children;
};

export default GuestOnlyClient;
