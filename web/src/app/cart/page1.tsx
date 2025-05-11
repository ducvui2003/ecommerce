'use client';

import React from 'react';
import { useGetCartQuery } from '@/features/cart/cart.api';

const CartPage = () => {
  const { data: cart, isLoading } = useGetCartQuery();

  if (!cart && !isLoading) {
    return <div>Không thể lấy dữ liệu giỏ hàng. Vui lòng thử lại.</div>;
  }

  return (
    <div>
      <span>{cart?.id}</span>
    </div>
  );
};
export default CartPage;
