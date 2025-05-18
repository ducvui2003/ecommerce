'use client';

import React, { useMemo, useState } from 'react';
import {
  useChangeQuantityCartItemMutation, useDeleteCartItemMutation,
  useGetCartQuery,
  useToggleCartItemMutation,
} from '@/features/cart/cart.api';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Minus,
  Slash,
  Trash2,
  TicketPercent,
  ChevronRight,
  Heart,
  Percent,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { currency } from '@/lib/utils';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { ChangeQuantityCartItemReqType } from '@/types/cart.type';
import { useGetActivePromotionsQuery } from '@/features/promotion/promotion.api';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export default function Page() {
  const { data: cart } = useGetCartQuery();
  const { data: promotions } = useGetActivePromotionsQuery();
  const [toggleCartItem] = useToggleCartItemMutation();
  const [changeQuantityCartItem] = useChangeQuantityCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const temporaryTotalPrice = useMemo<number>(
    (): number =>
      cart?.cartItems
        .filter((item) => item.selected)
        .reduce((accumulator, currentItem) =>
            accumulator + currentItem.quantity * (
              Number(currentItem.product.salePrice ?? currentItem.product.basePrice) + Number(currentItem.option.price)
            ), 0,
        )!,
    [cart],
  );

  const handleToggleCartItem = async (cartItemId: string | 'all') => {
    try {
      await toggleCartItem(cartItemId);
    } catch (error) {
      return;
    }
  };

  const handleChangeQuantityCartItem = async (
    cartItemId: string,
    body: ChangeQuantityCartItemReqType,
  ) => {
    try {
      await changeQuantityCartItem({ cartItemId, body });
    } catch (error) {
      return;
    }
  };

  const handleDeleteCartItem = async (cartItemId: string) => {
    try {
      await deleteCartItem(cartItemId);
    } catch (error) {
      return;
    }
  };

  const allItemSelected = cart?.cartItems.every((item) => item.selected);

  return (
    <div className="my-16 space-y-4">
      <Breadcrumb>
        <BreadcrumbList className="gap-1 text-base font-medium sm:gap-1">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="-rotate-210">
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem className="text-primary">
            <BreadcrumbLink href="/cart">Giỏ hàng</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-6 grid gap-x-6 gap-y-8 lg:grid-cols-3 lg:gap-x-8">
        <Card className="h-fit lg:col-span-2">
          <CardHeader className="text-primary py-4 text-xl font-bold uppercase">
            DANH SÁCH SẢN PHẨM
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="all"
                checked={allItemSelected}
                onCheckedChange={() => handleToggleCartItem('all')}
              />
              <Label
                htmlFor="all"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Chọn tất cả (
                {cart?.cartItems.filter((item) => item.selected).length} sản
                phẩm)
              </Label>
            </div>
            {cart &&
              cart.cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-md border border-gray-200 bg-white px-4 py-6 shadow-sm"
                >
                  <div className="flex gap-6 max-sm:flex-col sm:gap-4">
                    <Checkbox
                      className="cursor-pointer"
                      checked={item.selected}
                      onCheckedChange={() => handleToggleCartItem(item.id)}
                    />
                    <div className="shrink-0 max-sm:h-24 max-sm:w-24">
                      <Image
                        alt={item.product.name}
                        width={96}
                        height={96}
                        src="/images/product.png"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <Link
                          href={`/product/${item.product.id}`}
                          className="text-sm font-semibold text-black sm:text-base"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          Phân loại: <Badge>{item.option.name}</Badge>
                        </p>
                      </div>
                      <div className="mt-auto">
                        <h2 className="text-primary text-base font-semibold">
                          {item.product.salePrice
                            ? currency(Number(item.product.salePrice) + Number(item.option.price))
                            : currency(Number(item.product.basePrice) + Number(item.option.price))
                          }
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto flex flex-col">
                    <div className="flex items-start justify-end gap-4">
                      <Heart className="text-muted-foreground size-4 cursor-pointer hover:text-pink-500" />
                      <Trash2
                        className="text-muted-foreground hover:text-destructive size-4 cursor-pointer"
                        onClick={() => handleDeleteCartItem(item.id)}
                      />
                    </div>
                    <div className="mt-auto flex items-center gap-x-0.5">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="group/qlt-btn flex size-6 items-center justify-center rounded-full"
                        onClick={() =>
                          handleChangeQuantityCartItem(item.id, {
                            quantity: { decrement: 1 },
                          })
                        }
                      >
                        <Minus className="!size-3 group-hover/qlt-btn:text-white" />
                      </Button>
                      <Input
                        type="text"
                        className="size-6 shrink-0 border-0 p-0 text-center text-base font-semibold shadow-none focus-visible:ring-0"
                        value={item.quantity}
                        onChange={(e) =>
                          handleChangeQuantityCartItem(item.id, {
                            quantity: Number(e.target.value),
                          })
                        }
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="group/qlt-btn flex size-6 items-center justify-center rounded-full"
                        onClick={() =>
                          handleChangeQuantityCartItem(item.id, {
                            quantity: { increment: 1 },
                          })
                        }
                      >
                        <Plus className="!size-3 group-hover/qlt-btn:text-white" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
        <div className="h-max space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Tổng tiền</p>
                <p>{currency(temporaryTotalPrice)}</p>
              </div>
              <Separator />
              <div className="flex justify-between">
                <p className="text-muted-foreground">Tổng khuyến mãi</p>
                <p>{currency(0)}</p>
              </div>
              <Separator />
              <div className="flex justify-between">
                <p className="font-semibold">Cần thanh toán</p>
                <p className="text-primary font-semibold">
                  {currency(temporaryTotalPrice)}
                </p>
              </div>
            </div>
            <Button
              type="submit"
              disabled={temporaryTotalPrice === 0}
              className="w-full py-5 text-base"
            >
              Tiến hành đặt hàng
            </Button>
          </div>

          <Card>
            <CardHeader className="text-primary font-bold uppercase">
              PHIẾU KHUYẾN MÃI
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="group/vc-trg text-muted-foreground flex w-full items-center justify-between gap-x-1.5 bg-neutral-100 py-6 text-base"
                  >
                    <TicketPercent className="text-primary !size-6 group-hover/vc-trg:text-white" />
                    <div className="w-full text-left group-hover/vc-trg:text-white">
                      Chọn hoặc nhập mã phiếu khuyến mãi
                    </div>
                    <ChevronRight className="!size-6 group-hover/vc-trg:text-white" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader className="pt-4 pb-0">
                    <SheetTitle className="text-lg font-medium">
                      Khuyến mãi và ưu đãi
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mx-4 grid gap-4">
                    <div className="flex items-stretch space-x-2">
                      <Input
                        placeholder="Nhập mã phiếu khuyến mãi"
                        className="h-10"
                      />
                      <Button type="button" className="h-full">
                        Áp dụng
                      </Button>
                    </div>
                  </div>
                  <div className="px-4">
                    <Separator orientation="horizontal" />
                  </div>
                  <div className="no-scrollbar mx-4 flex h-full flex-col space-y-4 overflow-y-scroll">
                    {promotions?.map((promotion) => (
                      <div
                        key={promotion.id}
                        className="flex w-full text-white"
                      >
                        <div className="grid h-full justify-items-center rounded-l-lg bg-neutral-700 px-4 py-5">
                          <div className="bg-secondary size-8 place-content-center self-start rounded-full">
                            <Percent className="size-4 w-full text-center text-neutral-700" />
                          </div>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="size-8 self-end rounded-full"
                          >
                            <Plus />
                          </Button>
                        </div>
                        <div
                          className="relative flex h-full flex-col items-center justify-between border border-dashed border-zinc-50 bg-neutral-700">
                          <div className="absolute -top-5 h-7 w-7 rounded-full bg-white" />
                          <div className="absolute -bottom-5 h-7 w-7 rounded-full bg-white" />
                        </div>
                        <div className="grid h-full w-80 flex-1 gap-1 rounded-r-lg bg-neutral-700 px-6 py-4">
                          <div className="text-primary text-xl font-extrabold">
                            {promotion.code}{' '}
                            <span className="text-sm font-normal text-white">
                              ({promotion.usageLimit})
                            </span>
                          </div>
                          <p className="row-span-6 truncate text-sm">
                            {promotion.description}
                          </p>
                          <p className="mt-2 text-sm font-bold">
                            HSD:{' '}
                            <span className="font-normal">
                              {format(promotion.startDate, 'dd/MM/yyyy')} -{' '}
                              {format(promotion.endDate, 'dd/MM/yyyy')}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4">
                    <Separator orientation="horizontal" />
                  </div>
                  <SheetFooter className="pt-0">
                    <SheetClose asChild className="bg-primary py-5 text-base">
                      <Button type="submit">Xác nhận</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
