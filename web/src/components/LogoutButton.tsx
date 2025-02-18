'use client';
import { Button } from '@/components/ui/button';
import authApiRequest from '@/service/auth.service';
import React from 'react';

const LogoutButton = () => {
  const logout = async () => {
    const response = authApiRequest.logoutFromNextClient();
    console.log(response);
  };
  return (
    <Button
      onClick={() => {
        logout();
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
