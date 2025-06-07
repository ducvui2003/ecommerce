'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ClientIcon from '@/components/ClientIcon';

interface WishlistButtonProps {
  productId: number;
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  return (
    <Button className="rounded px-3 py-2 font-semibold text-white transition-colors duration-300">
      {isFavorite ? (
        <ClientIcon icon={'fa6-solid:heart'} />
      ) : (
        <ClientIcon icon={'fa6-regular:heart'} />
      )}
      Yêu thích
    </Button>
  );
}
