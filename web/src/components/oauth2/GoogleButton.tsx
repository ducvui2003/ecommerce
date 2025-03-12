'use client';
import ClientIcon from '@/components/ClientIcon';
import { HOME_PAGE } from '@/constraint/variable';
import { signIn } from 'next-auth/react';
import React from 'react';

const GoogleButton = () => {
  return (
    <ClientIcon
      icon="flat-color-icons:google"
      className="hover:text-gray-300 hover:opacity- 40 hover:cursor-pointer"
      size={40}
      onClick={() =>
        signIn('google', {
          callbackUrl: HOME_PAGE,
        })
      }
    />
  );
};

export default GoogleButton;
