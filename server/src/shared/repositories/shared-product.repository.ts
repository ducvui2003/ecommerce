import { Injectable } from '@nestjs/common';
import { ProductType } from '@shared/models/product.model';
import { PrismaService } from '@shared/services/prisma.service';

export interface SharedProductRepository {
  findProductByIdIn(ids: number[]): Promise<ProductType[]>;
}
@Injectable()
export class PrismaProductRepository implements SharedProductRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findProductByIdIn(ids: number[]): Promise<ProductType[]> {
    return await this.prismaService.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        category: true,
        supplier: true,
        productResource: {
          include: {
            resource: true,
          },
        },
      },
    });
  }
}
