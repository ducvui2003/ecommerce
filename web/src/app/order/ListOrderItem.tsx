'use client';
import { Card, CardContent } from '@/components/ui/card';
import { useGetCartSelectedQuery } from '@/features/cart/cart.api';
import Image from 'next/image';
import { ReactNode } from 'react';
import tinhdau2 from 'public/images/tinh-dau-2.jpg';
import { currency } from '@/lib/utils';
type ListOrderItemProps = {
  children: ReactNode;
};

const ListOrderItem = () => {
  const { data } = useGetCartSelectedQuery();
  return (
    <div className={'w-full border p-5 shadow-xl'}>
      <div className={'text-primary my-4 text-2xl font-bold'}>
        Danh sách sản phẩm
      </div>
      <div className="flex flex-col gap-y-4">
        {data?.cartItems.map((item) => {
          return (
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <Image
                  src={tinhdau2}
                  alt="product"
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
                <div className="flex-1 flex-wrap">
                  <div className="line-clamp-1 text-base font-semibold text-wrap">
                    {item.product.name}
                  </div>
                  <div className="text-base">{item.option?.name}</div>
                  <div className="text-muted-foreground text-sm">
                    {currency(
                      Number(item.product.basePrice) +
                        Number(item.option?.price ?? 0),
                    )}
                    × {item.quantity}
                  </div>
                </div>
                <div className="font-semibold text-orange-500">
                  {currency(
                    (Number(item.product.basePrice) +
                      Number(item.option?.price ?? 0)) *
                      item.quantity,
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ListOrderItem;
