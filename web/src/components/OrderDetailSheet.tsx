'use client';
import ListView from '@/components/ListView';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { DEFAULT_IMAGE, statusOrder } from '@/constraint/variable';
import { useGetOrderDetailQuery } from '@/features/order/order.api';
import { setIsDetailSheet } from '@/features/order/order.slice';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { currency, formatDate } from '@/lib/utils';
import { OrderDetailItemType, OrderDetailResType } from '@/types/order.type';
import Image from 'next/image';

const OrderDetailSheet = () => {
  const { isOpenDetailSheet: open, orderId } = useAppSelector(
    (state) => state.orderSlice,
  );

  const dispatch = useAppDispatch();

  const { data, isFetching } = useGetOrderDetailQuery(orderId as number, {
    skip: !orderId,
  });

  if (!data) return <Skeleton className="h-[300px]" />;

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => dispatch(setIsDetailSheet(open))}
    >
      <SheetContent className="sm:w-[50vw]">
        <SheetHeader>
          <SheetTitle>Order #{data.id}</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <section className="px-4 [&>*]:py-4">
          <OrderItemList items={data.items} />
          <OrderMetadata {...data} />
          <OrderReceiver {...data.receiver} />
        </section>
      </SheetContent>
    </Sheet>
  );
};

type OrderItemListProps = { items: OrderDetailItemType[] };

const OrderItemList = ({ items }: OrderItemListProps) => {
  return (
    <div>
      <h2 className="text-lg">Danh sách sản phẩm</h2>
      <ListView<OrderDetailItemType>
        data={items}
        className="flex-col gap-3"
        render={(item) => {
          return <OrderItem key={item.id} {...item} />;
        }}
      />
    </div>
  );
};

type OrderItemProps = OrderDetailItemType;

const OrderItem = ({
  price,
  id,
  name,
  category,
  media,
  quantity,
  supplier,
  options,
}: OrderItemProps) => {
  const unitPrice = price + (options?.price ?? 0);
  const totalPrice = unitPrice * quantity;
  return (
    <div className="flex items-center gap-4">
      <Image
        src={media || DEFAULT_IMAGE}
        alt={name}
        className="size-[100px] rounded-md shadow-md"
      />
      <div>
        <span>
          {category} - <Badge> {supplier}</Badge>
        </span>

        <h3 className="text-md w-[300px] truncate text-ellipsis">{name}</h3>

        {options && <span className="text-sm">{options.name}</span>}
      </div>
      <div className="ml-auto">
        {currency(unitPrice)} x {quantity} = {currency(totalPrice)}
      </div>
    </div>
  );
};

type OrderMetadataProps = Omit<OrderDetailResType, 'items' | 'receiver'>;

const OrderMetadata = ({
  status,
  createdAt,
  totalAmount,
}: OrderMetadataProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 border-t-2">
      <div className="text-base text-gray-700">Ngày đặt hàng</div>
      <div>{formatDate(createdAt)}</div>
      <div className="text-base text-gray-700">Trạng thái đơn hàng</div>
      <div>{statusOrder[status]}</div>
    </div>
  );
};

type OrderReceiverProps = OrderDetailResType['receiver'];

const OrderReceiver = ({
  email,
  name,
  phone,
  detail,
  district,
  province,
  ward,
}: OrderReceiverProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 border-t-2">
      <div className="text-base text-gray-700">Tên khách hàng</div>
      <div>{name}</div>
      <div className="text-base text-gray-700">Email</div>
      <div>{email}</div>
      <div className="text-base text-gray-700">Số điện thoại</div>
      <div>{phone}</div>
      <div className="text-base text-gray-700">Tỉnh/Thành phố</div>
      <div>{province}</div>
      <div className="text-base text-gray-700">Quận/Huyện</div>
      <div>{district}</div>
      <div className="text-base text-gray-700">Xã/Phường</div>
      <div>{ward}</div>
      <div className="text-base text-gray-700">Số nhà</div>
      <div>{detail}</div>
    </div>
  );
};

type OrderSummaryProps = {
  data: OrderDetailResType;
};
const OrderSummary = ({ data }: OrderSummaryProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>Created At</div>
      <div>{formatDate(data.createdAt)}</div>
      <div></div>
    </div>
  );
};

export default OrderDetailSheet;
