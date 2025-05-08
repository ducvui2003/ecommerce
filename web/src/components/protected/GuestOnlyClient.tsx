'use client';
import useSession from '@/components/auth/useSession';
import { HOME_PAGE } from '@/constraint/variable';
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
  const { status } = useSession();

  if (status === 'authentication') {
    return null;
  }

  return children;
};

export default GuestOnlyClient;
