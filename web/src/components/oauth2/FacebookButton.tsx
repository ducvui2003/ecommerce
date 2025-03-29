'use client';
import ClientIcon from '@/components/ClientIcon';
import { HOME_PAGE } from '@/constraint/variable';
import { signIn } from 'next-auth/react';
import React from 'react';

const FacebookButton = () => {
  return (
    <ClientIcon
      icon="logos:facebook"
      className="hover:text-gray-300 hover:opacity- 40 hover:cursor-pointer"
      size={40}
      onClick={() =>
        signIn('facebook', {
          callbackUrl: HOME_PAGE,
        })
      }
    />
  );
};

export default FacebookButton;
