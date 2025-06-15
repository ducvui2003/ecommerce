import { ConflictException, NotFoundException } from '@nestjs/common';

const WishlistAlreadyExistsError = new ConflictException(
  'Wishlist already exists',
);
const WishlistNotFoundError = new NotFoundException('Wishlist not found');
export { WishlistAlreadyExistsError, WishlistNotFoundError };
