import {
  ProductDetailRes,
  ProductResType,
  SearchProductDto,
} from '@route/product/product.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/prisma.service';
import { ProductRepository } from '@route/product/interfaces/product-repository.interface';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { Prisma } from '@prisma/client';
import { mapProductDetailToResponse } from '@shared/mapper/product.mapper';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

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

  async search(dto: SearchProductDto): Promise<Paging<ProductResType>> {
    const {
      name,
      categoryId,
      supplierId,
      page,
      size,
      minPrice,
      maxPrice,
      sort,
    } = dto;

    const whereClause: Prisma.ProductWhereInput = {
      name: name ? { contains: name, mode: 'insensitive' } : undefined,
      categoryId:
        categoryId && categoryId.length > 0
          ? { in: categoryId.map(Number) }
          : undefined,
      supplierId:
        supplierId && supplierId.length > 0
          ? { in: supplierId.map(Number) }
          : undefined,
      deletedAt: null,
      basePrice: {
        gte: minPrice,
        lte: maxPrice,
      },
    };

    const calculateOrderBy: Prisma.ProductOrderByWithRelationInput = {};

    sort.forEach((item) => {
      if (item.sortBy === 'createdAt') {
        calculateOrderBy.createdAt = item.orderBy;
      }
      if (item.sortBy === 'price') {
        calculateOrderBy.basePrice = item.orderBy;
      }
    });

    const [totalItems, products] = await this.prisma.$transaction([
      this.prisma.product.count({ where: whereClause }),
      this.prisma.product.findMany({
        select: {
          id: true,
          name: true,
          basePrice: true,
          salePrice: true,
          productResource: {
            select: {
              resource: {
                select: {
                  publicId: true,
                },
              },
            },
          },
        },
        where: whereClause,
        orderBy: calculateOrderBy,
        skip: (page - 1) * size,
        take: size,
      }),
    ]);

    const items: ProductResType[] = products.map((item) => {
      return {
        id: item.id,
        name: item.name,
        basePrice: item.basePrice.toNumber(),
        salePrice: item.salePrice.toNumber(),
        media: item.productResource.map((i) => i.resource.publicId),
      };
    });

    return {
      items,
      pagination: {
        page,
        limit: size,
        totalPages: Math.ceil(totalItems / size),
        totalItems,
      },
    };
  }
}
