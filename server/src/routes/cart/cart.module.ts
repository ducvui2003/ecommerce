import { Module } from '@nestjs/common';
import { CartController } from '@route/cart/cart.controller';
import { CartService } from '@route/cart/cart.service';
import { CART_REPOSITORY } from '@route/cart/cart.const';
import { PrismaCartRepository } from '@route/cart/cart.repository';

@Module({
  controllers: [CartController],
  providers: [
    CartService,
    {
      provide: CART_REPOSITORY,
      useClass: PrismaCartRepository
    }
  ],
})
export class CartModule {}
