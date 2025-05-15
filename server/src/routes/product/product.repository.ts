import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProductRepository } from '@route/product/interfaces/product-repository.interface';
import { SearchProductDto } from '@route/product/product.dto';
import { CreateProductBodyType } from '@route/product/product.schema';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { OptionType } from '@shared/models/option.model';
import { ProductType } from '@shared/models/product.model';
import { PrismaService } from '@shared/services/prisma.service';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getProductById(id: number): Promise<ProductType> {
    const product = await this.prisma.product.findFirstOrThrow({
      include: {
        supplier: true,
        category: true,
        productResource: {
          include: {
            resource: true,
          },
        },
      },
      where: {
        id: id,
        deletedAt: null,
      },
    });

    return product;
  }

  async search(dto: SearchProductDto): Promise<Paging<ProductType>> {
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

    const [totalItems, items] = await this.prisma.$transaction([
      this.prisma.product.count({ where: whereClause }),
      this.prisma.product.findMany({
        include: {
          category: true,
          productResource: {
            include: {
              resource: true,
            },
          },
        },
        where: whereClause,
        orderBy: calculateOrderBy,
        skip: (page - 1) * size,
        take: size,
      }),
    ]);

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

  async create(dto: CreateProductBodyType): Promise<ProductType> {
    return await this.prisma.$transaction(async (tx) => {
      // 1. Create product (along with options if needed)
      const product = await tx.product.create({
        data: {
          name: dto.name,
          basePrice: dto.basePrice,
          salePrice: dto.salePrice,
          description: dto.description,
          categoryId: dto.categoryId,
          supplierId: dto.supplierId,
          Option: {
            create: dto.options.map((item) => ({
              name: item.name,
              price: item.price,
              resourceId: item.resourceId,
              stock: item.stock,
            })),
          },
        },
      });

      // 2. Create productResource entries using the returned product.id
      await tx.productResource.createMany({
        data: dto.resourceIds.map((resourceId) => ({
          productId: product.id,
          resourceId,
        })),
      });

      // 3. Return full product with related data if needed
      return await tx.product.findUnique({
        where: { id: product.id },
        include: {
          category: true,
          productResource: true,
          Option: true, // include if needed
        },
      });
    });
  }
}
