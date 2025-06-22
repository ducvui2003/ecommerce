import { Injectable } from '@nestjs/common';
import { CreateWishlistType } from '@route/wishlist/wishlist.schema';
import { WishlistType } from '@shared/models/wishlist.model';
import { PrismaService } from '@shared/services/prisma.service';

export interface WishlistRepository {
  findAll(userId: number): Promise<WishlistType[]>;
  create(userId: number, data: CreateWishlistType): Promise<WishlistType>;
  delete(userId: number, id: number): Promise<void>;
  findByProductId(
    userId: number,
    productId: number,
  ): Promise<WishlistType | null>;
}
@Injectable()
export class PrismaWishlistRepository implements WishlistRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: number): Promise<WishlistType[]> {
    return this.prismaService.wishlist.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: {
          include: {
            thumbnail: true,
          },
        },
      },
    });
  }

  async create(userId: number, data: CreateWishlistType) {
    return this.prismaService.wishlist.create({
      data: {
        userId: userId,
        productId: data.productId,
      },
    });
  }

  async delete(userId: number, productId: number): Promise<void> {
    await this.prismaService.wishlist.delete({
      where: {
        userId_productId: {
          productId: productId,
          userId: userId,
        },
      },
    });
  }

  async findByProductId(
    userId: number,
    productId: number,
  ): Promise<WishlistType | null> {
    return this.prismaService.wishlist.findFirst({
      where: {
        userId: userId,
        productId: productId,
      },
    });
  }
}
