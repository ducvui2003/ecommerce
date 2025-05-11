"use client"

import React from 'react';
import CartPage from '@/app/cart/page1';
import { useGetCartQuery } from '@/features/cart/cart.api';

export default function Page() {
  const { data: cart, isLoading } = useGetCartQuery();

  return (
    <div>
      <span>{cart?.id}</span>
    </div>
  );
}
