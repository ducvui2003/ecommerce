'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ClientIcon from '../ClientIcon';

interface WishlistButtonProps {
  productId: number;
}

export default function WishlistButton({ productId}: WishlistButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  return (
      <Button className="px-3 py-2 text-white rounded font-semibold transition-colors duration-300">
        <ClientIcon icon={isFavorite ? "fa6-solid:heart" : "fa6-regular:heart"} />
      </Button>
  );
}
