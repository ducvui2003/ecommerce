'use client';

import { useAddToCartMutation } from '@/features/cart/cart.api';
import ClientIcon from '../ClientIcon';

interface AddToCartButtonProps {
    productId: number;
    quantity?: number;
    onAdded?: () => void;
}

export default function AddToCartButton({
    productId,
    quantity = 1,
    onAdded,
}: AddToCartButtonProps) {
    const [addToCart, { isLoading }] = useAddToCartMutation();

    const handleClick = async () => {
        try {
            await addToCart({ productId, quantity }).unwrap();
            if (onAdded) onAdded();
        } catch (err) {
            console.error('Lỗi khi thêm giỏ hàng:', err);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className="text-white px-4 py-2 rounded bg-[#FFAB66D1] disabled:opacity-50"
        >
            {isLoading ? 'Đang thêm...' : <ClientIcon icon={"fa6-solid:cart-shopping"} />}
        </button>
    );
}
