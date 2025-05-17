import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function WishlistButton() {
  const handleClick = () => {
    console.log('Wishlist button clicked');
  };

  return (
    <button
      onClick={handleClick}
      className="rounded bg-[#FFAB66D1] px-4 py-2 text-white disabled:opacity-50"
    >
      <FontAwesomeIcon icon={faHeart} className="h-6 w-6" />
    </button>
  );
}

export default WishlistButton;
