'use client';
import ClientIcon from '@/components/ClientIcon';
import ListView from '@/components/ListView';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DEFAULT_IMAGE, statusOrder } from '@/constraint/variable';
import { useGetOrderDetailQuery } from '@/features/order/order.api';
import { setIsDetailSheet } from '@/features/order/order.slice';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { currency, formatDate } from '@/lib/utils';
import { OrderDetailItemType, OrderDetailResType } from '@/types/order.type';
import Image from 'next/image';
import ReviewDialog from '@/components/ReviewDialog';

const OrderDetailSheet = () => {
  const { isOpenDetailSheet: open, orderId } = useAppSelector(
    (state) => state.orderSlice,
  );

  const dispatch = useAppDispatch();

  const { data, isFetching } = useGetOrderDetailQuery(orderId as number, {
    skip: !orderId,
  });

  if (!data) return null;

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => dispatch(setIsDetailSheet(open))}
    >
      <SheetContent className="sm:w-[50vw]">
        <SheetHeader>
          <SheetTitle>Đơn hàng #{data.id}</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <section className="px-4 [&>*]:mb-4 [&>*]:py-2">
          <OrderItemList items={data.items} status={data.status} />
          <OrderMetadata {...data} />
          <OrderReceiver {...data.receiver} />
          <OrderPayment {...data.payment} />
        </section>
      </SheetContent>
    </Sheet>
  );
};

type OrderItemListProps = { items: OrderDetailItemType[] } & Pick<
  OrderMetadataProps,
  'status'
>;

const OrderItemList = ({ items, status }: OrderItemListProps) => {
  return (
    <div>
      <ListView<OrderDetailItemType>
        data={items}
        className="flex-col gap-3"
        render={(item) => {
          return <OrderItem key={item.id} status={status} {...item} />;
        }}
      />
    </div>
  );
};

type OrderItemProps = OrderDetailItemType & Pick<OrderMetadataProps, 'status'>;

const OrderItem = ({ status, ...item }: OrderItemProps) => {
  const { price, options, media, category, supplier, name, quantity } = item;
  const unitPrice = price + (options?.price ?? 0);
  const totalPrice = unitPrice * quantity;
  return (
    <div className="flex items-center gap-4">
      <Image
        src={media || DEFAULT_IMAGE}
        alt={name}
        className="size-[70px] rounded-md shadow-md"
        width={100}
        height={100}
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
      {
        (status === 'COMPLETE') &&
        <ReviewDialog item={item} />
      }
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
      <div>Tổng tiền</div>
      <div>{currency(totalAmount)}</div>
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
    <div className="border-accent flex items-start gap-3 rounded-md border-2 px-2 shadow-md">
      <ClientIcon icon={'mynaui:location'} />
      <div className="">
        <span className="flex items-end gap-3 text-base">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-accent text-lg">{name}</span>
            </TooltipTrigger>
            <TooltipContent>
              <span>{email}</span>
            </TooltipContent>
          </Tooltip>
          <span className="text-gray-700">{phone}</span>
        </span>
        <div className="text-base text-gray-700">
          {detail}, {ward}, {district}, {province}
        </div>
      </div>
    </div>
  );
};

type OrderPaymentProps = OrderDetailResType['payment'];

const OrderPayment = ({
  createdAt,
  provider,
  status,
  updatedAt,
}: OrderPaymentProps) => {
  return (
    <div className="bg-secondary flex items-start gap-3 rounded-md px-2 shadow-md">
      <ClientIcon icon={'tdesign:money'} className="text-green-300" size={30} />

      <div className="flex flex-1 flex-col gap-2">
        <span className="flex justify-between">
          Thanh toán thông qua {provider} <Badge>{status}</Badge>
        </span>
        <div>Tạo giao dịch lúc {formatDate(createdAt, 'LONG')}</div>
        {updatedAt && (
          <div>Cập nhập giao dịch lúc {formatDate(updatedAt, 'LONG')}</div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailSheet;
