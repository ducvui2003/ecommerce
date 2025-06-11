import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreateOrderFormType } from '@/types/order.type';
import Image from 'next/image';
import sepay from 'public/images/sepay.png';
import vnpay from 'public/images/VNpay.png';
import { useFormContext } from 'react-hook-form';

export default function OrderPayment() {
  const { control } = useFormContext<CreateOrderFormType>();
  return (
    <div className={'mt-9 w-full border p-5 shadow-xl'}>
      <div className={'text-primary my-4 text-2xl font-bold'}>
        Phương thức thanh toán
      </div>
      <FormField
        control={control}
        name="method"
        render={({ field }) => {
          return (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  className="grid grid-cols-2 gap-4"
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <div className="flex items-center space-x-2 rounded-lg border p-4 shadow">
                    <FormControl>
                      <RadioGroupItem value="VNPAY" id="vnpay" />
                    </FormControl>
                    <label htmlFor="vnpay" className="flex items-center gap-2">
                      <Image src={vnpay} alt="vnpay" className="h-6 w-6" />
                      <span>Thanh toán qua VNPAY</span>
                    </label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-lg border p-4 shadow">
                    <FormControl>
                      <RadioGroupItem value="SEPAY" id="sepay" />
                    </FormControl>
                    <label htmlFor="sepay" className="flex items-center gap-2">
                      <Image src={sepay} alt="sepay" className="h-6 w-6" />
                      <span>Thanh toán qua SePay</span>
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
