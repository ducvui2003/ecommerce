'use client';
import React from 'react';
import { currency } from '@/lib/utils';
import Link from 'next/link';

type OrderSummaryProps = {
  subtotal: number;
  discount: number;
  total: number;
};

export default function OrderSummary({
  subtotal,
  discount,
  total,
}: OrderSummaryProps) {
  return (
    <div className="space-y-4 text-sm">
      <div className="text-muted-foreground flex justify-between border-b pb-2">
        <span>Tổng tiền tạm tính</span>
        <span className="font-semibold text-black">{currency(subtotal)}</span>
      </div>

      <div className="flex justify-between text-green-600">
        <span>Giảm giá trực tiếp</span>
        <span className="font-semibold">- {currency(discount)}</span>
      </div>

      <div className="text-muted-foreground flex justify-between text-base font-semibold">
        <span className="text-gray-700">Tổng tiền đơn hàng</span>
        <span className="text-primary">{currency(total)}</span>
      </div>

      <button
        type="submit"
        form="order-form"
        className="bg-primary w-full rounded-md py-2 font-semibold text-white transition hover:bg-orange-500"
      >
        Đặt hàng
      </button>

      <div className="text-muted-foreground text-center text-sm">
        Hoặc{' '}
        <Link href="/cart" className="text-primary font-medium hover:underline">
          Quay lại giỏ hàng
        </Link>
      </div>
    </div>
  );
}
