import ClientIcon from '@/components/ClientIcon';
import React from 'react';

const CartButton = () => {
  return (
    <div className="relative">
      <ClientIcon icon={'lucide:shopping-cart'} size={24} />
      <span className="absolute -top-0 -right-0 size-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 text-center text-[10px] leading-[20px] text-white">
        0
      </span>
    </div>
  );
};

export default CartButton;
