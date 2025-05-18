import ClientIcon from "../ClientIcon";

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
        <ClientIcon icon={isFavorite ? "fa6-solid:heart" : "fa6-regular:heart"} />
      </button>
  );
}
