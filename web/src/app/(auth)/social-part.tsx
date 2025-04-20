import FacebookButton from '@/components/oauth2/FacebookButton';
import GoogleButton from '@/components/oauth2/GoogleButton';
import React from 'react';

const SocialPart = () => {
  return (
    <div>
      <span className="text-center block py-2 text-sm">Hoặc đăng nhập với</span>
      <div className="flex justify-evenly">
        <GoogleButton />
        <FacebookButton />
      </div>
    </div>
  );
};

export default SocialPart;
