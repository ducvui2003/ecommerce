import { Inject, Injectable } from '@nestjs/common';
import { AddCartItemReqDTO, ChangeQltCartItemReqDTO, GetCartResDTO } from '@route/cart/cart.dto';
import { CartRepository } from '@route/cart/cart.repository';
import { CART_REPOSITORY } from '@route/cart/cart.const';

@Injectable()
export class CartService {
  constructor(@Inject(CART_REPOSITORY) private readonly cartRepository: CartRepository) {}

  async getCart(userId: number): Promise<GetCartResDTO> {
    return await this.cartRepository.getCart(userId);
  }

  async addCartItem(userId: number, body: AddCartItemReqDTO) {
    return await this.cartRepository.addCartItem(userId, body);
  }

  async deleteCartItem(cartItemId: string,userId: number) {
    return await this.cartRepository.deleteCartItem(cartItemId, userId);
  }

  async changeQuantityCartItem(userId: number, cartItemId: string, body: ChangeQltCartItemReqDTO) {
    return await this.cartRepository.changeQuantityCartItem(cartItemId, userId, body)
  }
}
