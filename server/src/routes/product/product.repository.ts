import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProductRepository } from '@route/product/interfaces/product-repository.interface';
import {
  CreateProductBodyType,
  UpdateProductBodyType,
} from '@route/product/product-manager.schema';
import { SearchProductDto } from '@route/product/product.dto';
import { ProductSitemapType } from '@route/product/product.schema';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { ProductType } from '@shared/models/product.model';
import { PrismaService } from '@shared/services/prisma.service';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async increaseView(productId: number): Promise<void> {
    await this.prisma.product.update({
      where: { id: productId },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }

  async getProductById(id: number, isDeleted: boolean): Promise<ProductType> {
    const product = await this.prisma.product.findFirstOrThrow({
      include: {
        supplier: true,
        category: true,
        thumbnail: true,
        productResource: {
          include: {
            resource: true,
          },
        },
        option: true,
      },
      where: {
        id: id,
        isDeleted: isDeleted,
      },
    });

    return product;
  }

  async search(dto: SearchProductDto): Promise<Paging<ProductType>> {
    const {
      name,
      categoryId,
      supplierId,
      categoryName,
      page,
      size,
      minPrice,
      maxPrice,
      sort,
      isDeleted,
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
      isDeleted: isDeleted ?? undefined,
      basePrice: {
        gte: minPrice,
        lte: maxPrice,
      },
      category: categoryName && {
        name: {
          in: categoryName,
        },
      },
    };

    const calculateOrderBy: Prisma.ProductOrderByWithRelationInput = {};

    sort.forEach((item) => {
      if (item.sortBy === 'id') {
        calculateOrderBy.id = item.orderBy;
      }
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
          supplier: true,
          thumbnail: true,
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
          thumbnailId: dto.thumbnailId,
          isDeleted: dto.isDeleted,
          option: {
            create: dto.options?.map((item) => ({
              name: item.name,
              price: item.price,
              resourceId: item.resourceId,
              stock: item.stock,
            })),
          },
        },
        include: {
          category: true,
          productResource: {
            include: {
              resource: true,
            },
          },
        },
      });
      tx.productResource.createMany({
        data: [
          {
            productId: product.id,
            resourceId: 1,
          },
        ],
      });
      if (dto.resourceIds)
        // 2. Create productResource entries using the returned product.id
        await tx.productResource.createMany({
          data: dto.resourceIds.map((resourceId) => {
            return {
              productId: product.id,
              resourceId: resourceId,
            };
          }),
        });

      return product;
    });
  }

  async update(id: number, dto: UpdateProductBodyType): Promise<ProductType> {
    return await this.prisma.$transaction(async (tx) => {
      // 1. Update Product
      await tx.product.update({
        data: {
          name: dto.name,
          basePrice: dto.basePrice,
          salePrice: dto.salePrice,
          description: dto.description,
          categoryId: dto.categoryId,
          supplierId: dto.supplierId,
          thumbnailId: dto.thumbnailId,
          isDeleted: dto.isDeleted,
        },
        where: {
          id: id,
        },
      });

      const existProductResource = await this.prisma.productResource.findMany({
        where: {
          productId: id,
        },
        select: {
          resourceId: true,
        },
      });

      // Delete: in DB but NOT in DTO
      const deleteProductResource = existProductResource.filter(
        (item) => !dto.resourceIds?.includes(item.resourceId),
      );

      // Keep/Update: in both DB and DTO
      const keepProductResource = existProductResource.filter((item) =>
        dto.resourceIds?.includes(item.resourceId),
      );

      // Create: in DTO but NOT in DB
      const createProductResource = dto.resourceIds?.filter(
        (id) => !existProductResource.some((item) => item.resourceId === id),
      );

      if (deleteProductResource.length!=0)
        await this.prisma.productResource.deleteMany({
          where: {
            resourceId: {
              in: deleteProductResource.map((item) => item.resourceId),
            },
          },
        });

      if (createProductResource.length!=0)
        await this.prisma.productResource.createMany({
          data: createProductResource.map((item) => {
            return {
              productId: id,
              resourceId: item,
            };
          }),
        });

      // Update Option
      const existOption = await this.prisma.option.findMany({
        where: {
          productId: id,
        },
      });

      const optionIds = dto.options?.map((item) => item.id) ?? [];

      // Delete: in DB but NOT in DTO
      const deleteOption = existOption.filter(
        (item) => !optionIds.includes(item.id),
      );

      // Keep/Update: in both DB and DTO
      const keepOption = dto.options?.filter((item) =>
        existOption.some((eo) => eo.id === item.id),
      );

      // Create: in DTO but NOT in DB
      const createOption = dto.options?.filter((item) => item.id == null);

      if (deleteOption) {
        await this.prisma.option.deleteMany({
          where: {
            id: {
              in: deleteOption.map((item) => item.id),
            },
          },
        });
      }

      if (keepOption) {
        await Promise.all(
          keepOption.map((option) =>
            tx.option.update({
              where: {
                id: option.id,
              },
              data: {
                productId: id,
                name: option.name,
                price: option.price,
                resourceId: option.resourceId,
              },
            }),
          ),
        );
      }

      if (createOption) {
        await tx.option.createMany({
          data: createOption.map((opt) => ({
            productId: id,
            name: opt.name,
            price: opt.price,
            resourceId: opt.resourceId,
          })),
        });
      }

      return await tx.product.findUniqueOrThrow({
        where: { id },
        include: {
          category: true,
          productResource: {
            include: {
              resource: true,
            },
          },
        },
      });
    });
  }

  async getNewProducts(): Promise<ProductType[]> {
    const products = await this.prisma.product.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      include: {
        supplier: true,
        category: true,
        thumbnail: true,
        productResource: {
          include: {
            resource: true,
          },
        },
        option: true,
      },
    });

    return products;
  }

  async getMostViewProducts(): Promise<ProductType[]> {
    const products = await this.prisma.product.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        views: 'desc',
      },
      take: 10,
      include: {
        supplier: true,
        category: true,
        thumbnail: true,
        productResource: {
          include: {
            resource: true,
          },
        },
        option: true,
      },
    });

    return products;
  }

  getAllId(): Promise<ProductSitemapType> {
    return this.prisma.product
      .findMany({
        where: {
          isDeleted: false,
        },
        select: {
          id: true,
          createdAt: true,
        },
      })
      .then((products) =>{
        return products.map((product) => {
          return {
            id: product.id,
            createdAt: product.createdAt,
          };
        });
      });
  }

  countAvgStar(
    productIds: number[],
  ): Promise<{ productId: number; avgStar: number }[]> {
    return this.prisma.review
      .groupBy({
        by: ['productId'],
        where: {
          productId: { in: productIds },
        },
        _avg: {
          rating: true,
        },
      })
      .then((results) => {
        return results.map((item) => ({
          productId: item.productId,
          avgStar: parseFloat((item._avg.rating ?? 0).toFixed(1)),
        }));
      });
  }

  countNumSell(
    productIds: number[],
  ): Promise<{ productId: number; numSell: number }[]> {
    return this.prisma.$queryRaw<{ productId: number; numSell: number }[]>(
      Prisma.sql`   SELECT (oi.product ->> 'id')::INT AS "productId", COUNT(*)::INT AS "numSell"
                    FROM order_items oi 
                    WHERE (oi.product ->> 'id')::INT IN (${Prisma.join(productIds)})
                    GROUP BY oi.product ->> 'id'`,
    );
  }
}
