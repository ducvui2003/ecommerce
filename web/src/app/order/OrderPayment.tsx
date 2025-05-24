import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import cod from 'public/images/COD.png';
import paypal from 'public/images/PayPal.png';
import sepay from 'public/images/sepay.png';
import vnpay from 'public/images/VNpay.png';

export default function OrderPayment() {
  return (
    <div className={'mt-9 w-full border p-5 shadow-xl'}>
      <div className={'text-primary my-4 text-2xl font-bold'}>
        Phương thức thanh toán
      </div>
      <RadioGroup defaultValue="cod" className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2 rounded-lg border p-4 shadow">
          <RadioGroupItem value="vnpay" id="vnpay" />
          <label htmlFor="vnpay" className="flex items-center gap-2">
            <Image src={vnpay} alt="vnpay" className="h-6 w-6" />
            <span>Thanh toán qua VNPAY</span>
          </label>
        </div>

        <div className="flex items-center space-x-2 rounded-lg border p-4 shadow">
          <RadioGroupItem value="sepay" id="sepay" />
          <label htmlFor="sepay" className="flex items-center gap-2">
            <Image src={sepay} alt="sepay" className="h-6 w-6" />
            <span>Thanh toán qua SePay</span>
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}
