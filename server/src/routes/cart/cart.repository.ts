import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/prisma.service';
import {
  AddCartItemReqDTO,
  ChangeQuantityCartItemReqDTO,
  GetCartResDTO,
} from '@route/cart/cart.dto';
import { v4 } from 'uuid';
import { Prisma } from '@prisma/client';

export interface CartRepository {
  getCart(userId: number): Promise<GetCartResDTO>;

  addCartItem(userId: number, body: AddCartItemReqDTO): Promise<void>;

  changeQuantityCartItem(
    cartItemId: string,
    userId: number,
    body: ChangeQuantityCartItemReqDTO,
  ): Promise<void>;

  deleteCartItem(cartItemId: string, userId: number): Promise<void>;

  toggleCartItem(userId: number, cartItemId: string | 'all'): Promise<void>;
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
      cartItems: cart.cartItems
        .map((item) => ({
          id: item.id,
          quantity: item.quantity,
          selected: item.selected,
          createdAt: item.createdAt,
          product: {
            name: item.product.name,
            basePrice: item.product.basePrice,
            salePrice: item.product.salePrice,
          },
          ...(item.option && {
            option: {
              id: item.option.id,
              name: item.option.name,
              price: item.option.price,
            },
          }),
        }))
        .sort(
          (itemFirst, itemSecond) =>
            new Date(itemSecond.createdAt).getTime() -
            new Date(itemFirst.createdAt).getTime(),
        ),
    };
  }

  async addCartItem(userId: number, body: AddCartItemReqDTO): Promise<void> {
    const cart = await this.manifestCart(userId);
    const { quantity, productId, optionId } = body;

    await this.upsertCartItem(
      optionId
        ? {
            cartId_productId_optionId: { cartId: cart.id, productId, optionId },
          }
        : { cartId_productId: { cartId: cart.id, productId } },
      { quantity: { increment: 1 } },
      { quantity, cartId: cart.id, productId, optionId: optionId },
    );
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

  async toggleCartItem(
    userId: number,
    cartItemId: string | 'all',
  ): Promise<void> {
    const { cartItems, id: cartId } = await this.manifestCart(userId);
    if (cartItemId === 'all') {
      const allSelected = cartItems.every((item) => item.selected);
      await this.prismaService.cartItem.updateMany({
        where: { cartId },
        data: { selected: !allSelected },
      });
    } else {
      const cartItem = await this.manifestCartItem({ id: cartItemId, cartId });
      await this.prismaService.cartItem.update({
        where: { id: cartItemId, cartId },
        data: { selected: !cartItem.selected },
      });
    }
  }

  async changeQuantityCartItem(
    cartItemId: string,
    userId: number,
    body: ChangeQuantityCartItemReqDTO,
  ): Promise<void> {
    const cart = await this.manifestCart(userId);
    const cartItem = await this.manifestCartItem({
      id: cartItemId,
      cartId: cart.id,
    });
    const { quantity } = body;
    await this.prismaService.cartItem.update({
      where: {
        id: cartItem.id,
        cartId: cart.id,
        productId: cartItem.productId,
      },
      data: { quantity },
    });
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
          include: {
            product: true,
            option: true,
          },
        },
      },
    });
  }

  async upsertCartItem(
    where: Prisma.CartItemWhereUniqueInput,
    update: Prisma.CartItemUncheckedUpdateInput,
    create: Prisma.CartItemUncheckedCreateInput,
  ) {
    return this.prismaService.cartItem.upsert({
      where,
      update,
      create,
    });
  }

  async manifestCartItem(where: Prisma.CartItemWhereUniqueInput) {
    return this.prismaService.cartItem.findUniqueOrThrow({
      where,
    });
  }
}
