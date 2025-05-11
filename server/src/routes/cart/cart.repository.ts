import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/prisma.service';
import {
  AddCartItemReqDTO,
  ChangeQltCartItemReqDTO,
  GetCartResDTO,
} from '@route/cart/cart.dto';
import { v4 } from 'uuid';

export interface CartRepository {
  getCart(userId: number): Promise<GetCartResDTO>;

  addCartItem(userId: number, body: AddCartItemReqDTO): Promise<void>;
  changeQuantityCartItem(
    id: string,
    userId: number,
    body: ChangeQltCartItemReqDTO,
  ): Promise<void>;

  deleteCartItem(cartItemId: string, userId: number): Promise<void>;
}

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(@Inject() private readonly prismaService: PrismaService) {}

  async getCart(userId: number): Promise<GetCartResDTO> {
    await this.upsertCart(userId);
    const cart = await this.manifestCart(userId);
    return {
      id: cart.id,
      userId: cart.userId,
      cartItems: cart.cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        product: {
          name: item.product.name,
          basePrice: Number(item.product.basePrice),
          salePrice: Number(item.product.salePrice),
        },
      })),
    };
  }

  async addCartItem(userId: number, body: AddCartItemReqDTO): Promise<void> {
    const cart = await this.manifestCart(userId);
    await this.upsertCartItem(v4(), cart.id, body.productId, body.quantity);
  }

  async deleteCartItem(cartItemId: string, userId: number): Promise<void> {
    const cart = await this.manifestCart(userId);
    await this.prismaService.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });
  }

  async changeQuantityCartItem(
    id: string,
    userId: number,
    body: ChangeQltCartItemReqDTO,
  ): Promise<void> {
    const cart = await this.manifestCart(userId);
    const cartItem = await this.manifestCartItem(id, cart.id)
    await this.upsertCartItem(id, cart.id, cartItem.productId, body.quantity)
  }

  async upsertCart(userId: number) {
    return this.prismaService.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });
  }

  async manifestCart(userId: number) {
    return this.prismaService.cart.findUniqueOrThrow({
      where: { userId },
      include: {
        cartItems: {
          include: { product: true },
        },
      },
    });
  }

  async upsertCartItem(
    id: string,
    cartId: number,
    productId: number,
    quantity: number,
  ) {
    return this.prismaService.cartItem.upsert({
      where: { id, cartId, productId },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        cartId: cartId,
        productId: productId,
        quantity: quantity,
      },
    });
  }

  async manifestCartItem(id: string, cartId: number) {
    return this.prismaService.cartItem.findUniqueOrThrow({
      where: { id, cartId },
    })
  }
}
