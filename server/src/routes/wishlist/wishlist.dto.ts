import { CreateWishlistSchema } from '@route/wishlist/wishlist.schema';
import { createZodDto } from 'nestjs-zod';

class CreateWishlistDto extends createZodDto(CreateWishlistSchema) {}
export { CreateWishlistDto };
