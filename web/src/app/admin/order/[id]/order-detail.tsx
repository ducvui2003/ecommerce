'use client';

import ClientIcon from '@/components/ClientIcon';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DEFAULT_IMAGE,
  paymentStatus,
  statusOrder,
} from '@/constraint/variable';
import { useGetOrderDetailQuery } from '@/features/manager/order/order.api';
import { cn, currency, formatDate } from '@/lib/utils';
import { OrderDetailItemType, OrderDetailResType } from '@/types/order.type';
import Image from 'next/image';

type OrderDetailManagerProps = {
  id: number;
};

const OrderDetailManager = ({ id }: OrderDetailManagerProps) => {
  const { data, isFetching } = useGetOrderDetailQuery(id);
  if (!data) {
    return <Skeleton className="h-[500px] w-full" />;
  }
  return (
    <div>
      <div className="bg-secondary text-accent sticky top-0 flex items-center gap-2 rounded-md border px-2 py-4">
        <ClientIcon icon={'material-symbols:inbox'} />
        <h3># {data.id}</h3>
        <div className="ml-auto flex items-center gap-3">
          <OrderPaymentBadge {...data.payment} />
        </div>
      </div>

      <div className="mt-5 flex gap-5">
        {/* Left */}
        <div className="flex-1">
          <div className="border-accent bg-secondary basis-[200px] rounded-xl border-2 p-2">
            <h4 className="pb-2 text-xl">Danh sách sản phẩm</h4>
            <OrderItemList items={data.items} />

            <div className="mt-4">
              <OrderMetadata {...data} />
            </div>
          </div>
          <div className="mt-5">
            <div className="bg-secondary grid grid-cols-3 overflow-hidden rounded-md text-center [&>*]:py-2"></div>
          </div>
        </div>
        {/* Right */}
        <div className="basis-[380px]">
          <div className="">
            <OrderReceiver {...data.receiver} />
          </div>
          <div className="mt-4">
            <OrderPayment {...data.payment} />
          </div>
        </div>
      </div>
    </div>
  );
};

type OrderItemListProps = {
  items: OrderDetailItemType[];
};

const OrderItemList = ({ items }: OrderItemListProps) => {
  return (
    <div className="shadow-accent flex flex-col gap-2 bg-white">
      {items.map(
        ({ id, category, media, name, price, quantity, supplier, options }) => {
          const unitPrice = price + (options?.price ?? 0);
          const totalPrice = unitPrice * quantity;
          return (
            <div
              key={id}
              className="border-accent flex items-center gap-4 rounded-md border-2 p-2"
            >
              <Image
                src={media || DEFAULT_IMAGE}
                alt={name}
                className="size-[70px] rounded-md shadow-md"
                width={70}
                height={70}
              />
              <div>
                <span className="text-sm">
                  {category} - <Badge> {supplier}</Badge>
                </span>

                <h3 className="w-[300px] truncate py-1 text-base text-ellipsis">
                  {name}
                </h3>

                {options && <span className="text-sm">{options.name}</span>}
              </div>
              <div className="ml-auto">
                {currency(unitPrice)} x {quantity} = {currency(totalPrice)}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};
type OrderReceiverProps = OrderDetailResType['receiver'];

const OrderReceiver = ({
  detail,
  district,
  email,
  name,
  phone,
  province,
  ward,
}: OrderReceiverProps) => {
  return (
    <div className="border-accent bg-secondary flex-1 rounded-md border-2 p-2 shadow-md">
      <div>
        <h4 className="pb-2 text-xl">Thông tin liên lạc</h4>
        <div className="flex flex-col gap-2">
          <span>{email}</span>
          <span>{phone}</span>
        </div>
      </div>
      <span className="border-accent inline-block w-full border-1"></span>
      <div>
        <h4 className="pb-2 text-xl">Thông tin giao hàng</h4>
        <div className="flex flex-col gap-2">
          <span>{name}</span>
          <span>{detail}</span>
          <span>{ward}</span>
          <span>{district}</span>
          <span>{province}</span>
        </div>
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
    <div className="grid grid-cols-2 gap-4 [&>*:nth-child(even)]:text-right">
      <div>Tổng tiền</div>
      <div>{currency(totalAmount)}</div>
      <div className="text-base">Ngày đặt hàng</div>
      <div>{formatDate(createdAt)}</div>
      <div className="text-base">Trạng thái đơn hàng</div>
      <div>{statusOrder[status]}</div>
    </div>
  );
};

type OrderPaymentBadgeProps = {
  status: OrderDetailResType['payment']['status'];
};
const OrderPaymentBadge = ({ status }: OrderPaymentBadgeProps) => {
  let icon = '';
  switch (status) {
    case 'PENDING':
      icon = 'material-symbols:pending-actions';
      break;
    case 'SUCCESS':
      icon = 'mdi:success';
      break;
    case 'FAILED':
      icon = 'ep:failed';
      break;
  }
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-md px-4 py-2',

        status === 'PENDING' && 'bg-yellow-100 text-black',
        status === 'SUCCESS' && 'bg-green-100 text-green-800',
        status === 'FAILED' && 'bg-red-100 text-red-800',
      )}
    >
      <ClientIcon icon={icon} />
      {paymentStatus[status]}
    </div>
  );
};

type OrderPaymentProps = OrderDetailResType['payment'];

const OrderPayment = ({
  status,
  createdAt,
  provider,
  updatedAt,
}: OrderPaymentProps) => {
  return (
    <div className="bg-secondary border-accent rounded-md border-2 px-2 py-1 shadow-md">
      <h4 className="pb-2 text-xl">Thông tin giao hàng</h4>
      <div className="flex items-start gap-3">
        <ClientIcon
          icon={'tdesign:money'}
          className="text-green-300"
          size={30}
        />

        <div className="flex flex-1 flex-col gap-2">
          <span className="flex justify-between">
            Thanh toán thông qua {provider}
          </span>
          <div>Tạo giao dịch lúc {formatDate(createdAt, 'LONG')}</div>
          {updatedAt && (
            <div>Cập nhập giao dịch lúc {formatDate(updatedAt, 'LONG')}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailManager;
