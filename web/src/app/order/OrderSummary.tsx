import React from 'react'
import { currency } from '@/lib/utils'
import Link from 'next/link'

type OrderSummaryProps = {
  subtotal: number
  discount: number
  total: number
  onCheckout: () => void
}

export default function OrderSummary({ subtotal, discount, total, onCheckout }: OrderSummaryProps) {
  return (
    <div className="space-y-4 text-sm">
      <div className="flex justify-between border-b pb-2 text-muted-foreground">
        <span>Tổng tiền tạm tính</span>
        <span className="font-semibold text-black">{currency(subtotal)}</span>
      </div>

      <div className="flex justify-between text-green-600">
        <span>Giảm giá trực tiếp</span>
        <span className="font-semibold">- {currency(discount)}</span>
      </div>

      <div className="flex justify-between text-base font-semibold text-muted-foreground">
        <span className="text-gray-700">Tổng tiền đơn hàng</span>
        <span className="text-primary">{currency(total)}</span>
      </div>

      <button
        className="w-full rounded-md bg-primary text-white py-2 font-semibold hover:bg-orange-500 transition"
    
      >
        Đặt hàng
      </button> 

      <div className="text-center text-sm text-muted-foreground">
        Hoặc{' '}
        <Link href="/cart" className="text-primary hover:underline font-medium">
          Quay lại giỏ hàng
        </Link>
      </div>
    </div>
  )
}
