import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Image from 'next/image'
import cod from 'public/images/COD.png'
import paypal from 'public/images/PayPal.png'
import sepay from 'public/images/sepay.png'
import vnpay from 'public/images/VNpay.png'

export default function OrderPayment() {
    return (
        <div className={'w-full mt-9 p-5 border shadow-xl'}>
            <div className={'my-4 text-2xl text-primary font-bold'}>Phương thức thanh toán</div>
            <RadioGroup defaultValue="cod" className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 border shadow rounded-lg p-4">
                    <RadioGroupItem value="cod" id="cod" />
                    <label htmlFor="cod" className="flex items-center gap-2">
                        <Image src={cod} alt="cod" className="w-6 h-6" />
                        <span>Thanh toán khi nhận hàng</span>
                    </label>
                </div>

                <div className="flex items-center space-x-2 border shadow rounded-lg p-4">
                    <RadioGroupItem value="vnpay" id="vnpay" />
                    <label htmlFor="vnpay" className="flex items-center gap-2">
                        <Image src={vnpay} alt="vnpay" className="w-6 h-6" />
                        <span>Thanh toán qua VNPAY</span>
                    </label>
                </div>

                <div className="flex items-center space-x-2 border shadow rounded-lg p-4">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <label htmlFor="paypal" className="flex items-center gap-2">
                        <Image src={paypal} alt="paypal" className="w-6 h-6" />
                        <span>Thanh toán qua Paypal</span>
                    </label>
                </div>

                <div className="flex items-center space-x-2 border shadow rounded-lg p-4">
                    <RadioGroupItem value="sepay" id="sepay" />
                    <label htmlFor="sepay" className="flex items-center gap-2">
                        <Image src={sepay} alt="sepay" className="w-6 h-6" />
                        <span>Thanh toán qua SePay</span>
                    </label>
                </div>
            </RadioGroup>
        </div>
    )
}