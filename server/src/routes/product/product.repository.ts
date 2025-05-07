import {
  ProductDetailRes,
  ProductRes,
  SearchProductDto,
} from '@route/product/product.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/prisma.service';
import { ProductRepository } from '@route/product/interfaces/product-repository.interface';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { Prisma } from '@prisma/client';
import {
  mapProductDetailToResponse,
  mapProductListToResponse,
} from '@shared/mapper/product.mapper';
import { buildSearchWhereClause } from '@route/product/product.helper';

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

  async searchProducts(dto: SearchProductDto): Promise<Paging<ProductRes>> {
    const {
      name,
      categoryId,
      supplierId,
      minPrice,
      maxPrice,
      page = '1',
      limit = '10',
    } = dto;

    const whereClause: Prisma.ProductWhereInput = buildSearchWhereClause(dto)


    const pageNum = Number(page);
    const limitNum = Number(limit);

    const [totalItems, products] = await this.prisma.$transaction([
      this.prisma.product.count({ where: whereClause }),
      this.prisma.product.findMany({
        where: whereClause,
        include: {
          category: true,
          supplier: true,
          ProductResource: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
    ]);

    const items: ProductRes[] = mapProductListToResponse(products);

    return {
      items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalItems / limitNum),
        totalItems,
      },
    };
  }

}



