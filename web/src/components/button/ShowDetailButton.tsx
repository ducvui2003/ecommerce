'use client';

import { useRouter } from 'next/navigation';
import ClientIcon from '../ClientIcon';

interface ShowDetailButtonProps {
  productId: number;
}

export default function ShowDetailButton({ productId }: ShowDetailButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/detail/${productId}`);
  };

  return (
    <button
      onClick={handleClick}
      className="text-white px-4 py-2 rounded bg-[#FFAB66D1] disabled:opacity-50"
    >
      <ClientIcon icon={"fa-solid:eye"} className="mr-2" />
      Xem chi tiết
    </button>
  );
}
