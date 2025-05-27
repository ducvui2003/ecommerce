'use client';

import React, { Fragment, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ClientIcon from '@/components/ClientIcon';
import {
  useDeleteCartItemMutation,
  useGetCartQuery,
} from '@/features/cart/cart.api';
import { Separator } from '@/components/ui/separator';
import { currency } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trash2, X } from 'lucide-react';
import Image from 'next/image';

const CartDropdown = () => {
  const { data, isSuccess } = useGetCartQuery();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const handleDeleteCartItem = async (cartItemId: string) => {
    try {
      await deleteCartItem(cartItemId);
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="cursor-pointer hover:opacity-50"
        >
          <div className="bg-muted size-11 rounded-full border border-gray-200 p-3">
            <div className="relative">
              <ClientIcon icon={'lucide:shopping-cart'} size={22} />
              <span className="border-muted bg-accent absolute -top-2 -right-2.5 size-5 place-content-center rounded-full border-2 text-center text-[10px] text-white">
                {data && isSuccess ? data.cartItems.length : 0}
              </span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96" align="end" sideOffset={12}>
          {data && data.cartItems.length > 0 && isSuccess ? (
            <div className="p-4">
              {data.cartItems.map((cartItem) => (
                <Fragment key={cartItem.id}>
                  <div className="grid w-full grid-cols-4">
                    <Image
                      src="/images/product.png"
                      className="border-muted rounded-md border"
                      width={64}
                      height={64}
                      alt={cartItem.product.name}
                    />
                    <div className="col-span-3 flex flex-col">
                      <div className="space-y-1">
                        <h4 className="truncate text-sm leading-none font-medium">
                          {cartItem.product.name}
                        </h4>
                        {cartItem.option && (
                          <p className="text-muted-foreground text-sm">
                            Dung tích: {cartItem.option.name}
                          </p>
                        )}
                      </div>
                      <div className="mt-auto grid h-5 grid-cols-10 items-center space-x-4 text-sm">
                        <div className="col-span-5">
                          {currency(
                            cartItem.product.salePrice ??
                              cartItem.product.basePrice +
                                (cartItem.option!.price ?? 0),
                          )}
                        </div>
                        <Separator orientation="vertical" />
                        <div className="col-span-2 flex items-center text-center">
                          <X className="size-4" /> {cartItem.quantity}
                        </div>
                        <Separator orientation="vertical" />
                        <Trash2
                          className="text-muted-foreground hover:text-destructive size-4 cursor-pointer"
                          onClick={() => handleDeleteCartItem(cartItem.id)}
                        />
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-4 mb-6 w-full" />
                </Fragment>
              ))}
              <Button className="w-full py-5 text-base">
                <Link href="/cart">Xem giỏ hàng</Link>
              </Button>
            </div>
          ) : (
            <div
              key="no-data"
              className="h-24 w-full place-content-center text-center text-base"
            >
              Chưa có sản phẩm nào trong giỏ hàng
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default CartDropdown;
