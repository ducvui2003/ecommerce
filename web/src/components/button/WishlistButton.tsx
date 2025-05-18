import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';

interface WishlistButtonProps {
  isFavorite: boolean;
  toggleFavorite: () => void;
}

export default function WishlistButton({ isFavorite, toggleFavorite }: WishlistButtonProps) {
  return (
      <button
        onClick={toggleFavorite}
        className="px-3 py-2 bg-[#FFAB66D1] text-white rounded font-semibold transition-colors duration-300 hover:bg-[#FFAB66D1]"
      >
        <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartOutline} />
      </button>
  );
}
