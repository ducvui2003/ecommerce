import { Injectable } from '@nestjs/common';
import { CartItemType } from '@shared/models/cart-item.model';
import { ProductType } from '@shared/models/product.model';
import { PrismaService } from '@shared/services/prisma.service';

export interface SharedCartItemRepository {
  findCartItemByIdIn(ids: string[]): Promise<CartItemType[]>;
}

@Injectable()
export class PrismaCartItemRepository implements SharedCartItemRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findCartItemByIdIn(ids: string[]): Promise<CartItemType[]> {
    return await this.prismaService.cartItem.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        option: true,
      },
    });
  }
}
