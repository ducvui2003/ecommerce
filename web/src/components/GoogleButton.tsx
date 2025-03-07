'use client';
import ClientIcon from '@/components/ClientIcon';
import { signIn } from 'next-auth/react';
import React from 'react';

const GoogleLogin = () => {
  return (
    <ClientIcon
      icon="flat-color-icons:google"
      className="hover:text-gray-300 hover:opacity- 40 hover:cursor-pointer"
      size={40}
      onClick={() => signIn('google')}
    />
  );
};

export default GoogleLogin;
