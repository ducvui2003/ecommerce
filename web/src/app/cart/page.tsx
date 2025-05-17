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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
        .reduce(
          (accumulator, currentItem) =>
            accumulator +
            currentItem.quantity *
              (currentItem.product.salePrice ?? currentItem.product.basePrice),
          0,
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
  }

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
                <div key={item.id} className="flex gap-4 rounded-md border border-gray-200 bg-white px-4 py-6 shadow-sm">
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
                          className="text-sm font-semibold text-slate-900 sm:text-base"
                        >
                          {item.product.name}
                        </Link>
                        <div className="mt-2">
                          <Select defaultValue="100ml">
                            <SelectTrigger className="w-36">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Dung tích</SelectLabel>
                                <SelectItem value="100ml">100ml</SelectItem>
                                <SelectItem value="500ml">500ml</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <h3 className="text-primary text-sm font-semibold">
                          {item.product.salePrice
                            ? currency(item.product.salePrice)
                            : currency(item.product.basePrice)}
                        </h3>
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
                    <div className="mt-auto flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="group/qlt-btn flex size-8 items-center justify-center rounded-full"
                        onClick={() =>
                          handleChangeQuantityCartItem(item.id, {
                            quantity: { decrement: 1 },
                          })
                        }
                      >
                        <Minus className="group-hover/qlt-btn:text-white" />
                      </Button>
                      <Input
                        type="text"
                        className="h-9 w-6 shrink-0 border-0 p-0 text-center text-base font-semibold shadow-none focus-visible:ring-0"
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
                        className="group/qlt-btn flex size-8 items-center justify-center rounded-full"
                        onClick={() =>
                          handleChangeQuantityCartItem(item.id, {
                            quantity: { increment: 1 },
                          })
                        }
                      >
                        <Plus className="group-hover/qlt-btn:text-white" />
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
                <p>{currency(temporaryTotalPrice)}</p>
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
                    <Separator orientation='horizontal'/>
                  </div>
                  <div className="flex h-full mx-4 space-y-4 flex-col overflow-y-scroll no-scrollbar">
                    {promotions?.map((promotion) => (
                      <div key={promotion.id} className="flex w-full text-white">
                        <div className="grid h-full justify-items-center rounded-l-lg bg-neutral-700 px-4 py-5">
                          <div className="size-8 self-start rounded-full bg-secondary place-content-center">
                            <Percent className="text-neutral-700 size-4 text-center w-full" />
                          </div>
                          <Button size="icon" variant="secondary" className="rounded-full self-end size-8">
                            <Plus/>
                          </Button>
                        </div>
                        <div className="relative flex h-full flex-col items-center justify-between border border-dashed border-zinc-50 bg-neutral-700">
                          <div className="absolute -top-5 h-7 w-7 rounded-full bg-white" />
                          <div className="absolute -bottom-5 h-7 w-7 rounded-full bg-white" />
                        </div>
                        <div className="grid h-full w-80 flex-1 gap-1 rounded-r-lg bg-neutral-700 px-6 py-4">
                          <div className="text-primary text-xl font-extrabold">
                            {promotion.code} <span className="text-sm font-normal text-white">({promotion.usageLimit})</span>
                          </div>
                          <p className="row-span-6 truncate text-sm">{promotion.description}</p>
                          <p className="text-sm font-bold mt-2">
                            HSD: <span className="font-normal">{format(promotion.startDate,'dd/MM/yyyy')} - {format(promotion.endDate,'dd/MM/yyyy')}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4">
                    <Separator orientation='horizontal'/>
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
