'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

interface WishlistButtonProps {}

export default function WishlistButton({}: WishlistButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <button
      onClick={toggleFavorite}
      className="rounded bg-[#FFAB66D1] px-3 py-2 font-semibold text-white transition-colors duration-300 hover:bg-[#FFAB66D1]"
    >
      <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartOutline} />
    </button>
  );
}
