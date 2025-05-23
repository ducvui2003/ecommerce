import { Card, CardContent } from '@/components/ui/card'
import { currency } from '@/lib/utils'
import Image from 'next/image'
import tinhdau2 from 'public/images/tinh-dau-2.jpg'


type OrderItemProps = {
    name: string,
    quantity: number,
    option: string,
    image: string,
    price: number
}



export default function OrderItem({ name, quantity, option, image, price }: OrderItemProps) {
    const total = price * quantity;
    return (

        <div className={'w-full p-5 border shadow-xl'}>
            <div className={'my-4 text-2xl text-primary font-bold'}>Danh sách sản phẩm</div>
            <div className='flex flex-col gap-y-4'>
                <Card>
                <CardContent className="flex items-center space-x-4 p-4">
                        <Image
                            src={tinhdau2}
                            alt="product"
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                        <div className="font-semibold text-base truncate w-full">{name}</div>
                            <div className="text-base">{option}</div>
                            <div className="text-sm text-muted-foreground"> {currency(price)} × {quantity}</div>
                        </div>
                        <div className="font-semibold text-orange-500 whitespace-nowrap">
                            {currency(total)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center space-x-4 p-4">
                        <Image
                            src={tinhdau2}
                            alt="product"
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                        <div className="font-semibold text-base truncate w-full">{name}</div>
                            <div className="text-base">{option}</div>
                            <div className="text-sm text-muted-foreground"> {currency(price)} × {quantity}</div>
                        </div>
                        <div className="font-semibold text-orange-500 whitespace-nowrap">
                            {currency(total)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center space-x-4 p-4">
                        <Image
                            src={tinhdau2}
                            alt="product"
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                        <div className="font-semibold text-base truncate w-full">{name}</div>
                            <div className="text-base">{option}</div>
                            <div className="text-sm text-muted-foreground"> {currency(price)} × {quantity}</div>
                        </div>
                        <div className="font-semibold text-orange-500 whitespace-nowrap">
                            {currency(total)}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
