import { ProductDetailRes, ProductRes } from '@route/product/product.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/prisma.service';
import {ProductRepository} from "@route/product/interfaces/product-repository.interface";
import { Paging } from '@shared/common/interfaces/paging.interface';
import {
  mapProductDetailToResponse,
  mapProductListToResponse,
  mapProductToResponse,
} from '@shared/mapper/product.mapper';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(page = 1, limit = 10): Promise<Paging<ProductRes>> {
    const skip = (page - 1) * limit;

    const [totalItems, products] = await this.prisma.$transaction([
      this.prisma.product.count(),
      this.prisma.product.findMany({
        skip,
        take: limit,
        include: {
          category: true,
        },
      }),
    ]);

    return {
      items: mapProductListToResponse(products),
        pagination: {
          totalItems,
          page,
          limit,
          totalPages: Math.ceil(totalItems / limit),
      },
    };
  }

  async getProductById(id: number): Promise<ProductDetailRes | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        supplier: true,
      },
    });
    if (!product) {
      return null;
    }
    return mapProductDetailToResponse(product);
  }
}
