'use client';

import { useAddToCartMutation } from '@/features/cart/cart.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

interface AddToCartButtonProps {
    productId: number;
    quantity?: number;
    onAdded?: () => void;
}

export default function AddToCartTextButton({
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
      className="text-white px-4 py-2 rounded bg-[#FFAB66D1] disabled:opacity-50 flex items-center gap-2"
    >
      {isLoading ? (
        'Đang thêm...'
      ) : (
        <>
          <FontAwesomeIcon icon={faCartShopping} />
          <span>Thêm vào giỏ hàng</span>
        </>
      )}
    </button>
  );

}
