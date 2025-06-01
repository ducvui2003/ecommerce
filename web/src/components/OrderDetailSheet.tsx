'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { setIsDetailSheet } from '@/features/order/order.slice';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';

const OrderDetailSheet = () => {
  const { isOpenDetailSheet: open } = useAppSelector(
    (state) => state.orderSlice,
  );
  const dispatch = useAppDispatch();
  return (
    <Sheet
      open={open}
      onOpenChange={(open) => dispatch(setIsDetailSheet(open))}
    >
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default OrderDetailSheet;
