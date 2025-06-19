import { Module } from '@nestjs/common';
import { WishlistController } from '@route/wishlist/wishlist.controller';
import { WISHLIST_REPOSITORY } from '@route/wishlist/wishlist.dependency';
import { PrismaWishlistRepository } from '@route/wishlist/wishlist.repository';
import { WishlistService } from '@route/wishlist/wishlist.service';

@Module({
  controllers: [WishlistController],
  providers: [
    WishlistService,
    {
      provide: WISHLIST_REPOSITORY,
      useClass: PrismaWishlistRepository,
    },
  ],
})
export class WishlistModule {}
