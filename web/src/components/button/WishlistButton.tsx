'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface WishlistButtonProps {
  productId: number;
}

export default function WishlistButton({ productId}: WishlistButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  return (
      <Button className="px-3 py-2 text-white rounded font-semibold transition-colors duration-300">
        <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartOutline} /> Yêu thích
      </Button>
  );
}
