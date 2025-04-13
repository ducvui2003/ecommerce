import ClientIcon from '@/components/ClientIcon';
import React from 'react';

const CartButton = () => {
  return (
    <div className="relative">
      <ClientIcon icon={'lucide:shopping-cart'} size={24} />
      <span className="absolute rounded-full text-center leading-[20px]  size-5 bg-red-500 -top-0 -translate-y-1/2 -right-0 translate-x-1/2 text-[10px] text-white">
        0
      </span>
    </div>
  );
};

export default CartButton;
