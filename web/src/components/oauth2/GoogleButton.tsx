'use client';
import ClientIcon from '@/components/ClientIcon';
import { HOME_PAGE } from '@/constraint/variable';
import React from 'react';

const GoogleButton = () => {
  return (
    <ClientIcon
      icon="flat-color-icons:google"
      className="hover:opacity- 40 hover:cursor-pointer hover:text-gray-300"
      size={40}
      // onClick={() =>
      //   signIn('google', {
      //     callbackUrl: HOME_PAGE,
      //   })
      // }
    />
  );
};

export default GoogleButton;
