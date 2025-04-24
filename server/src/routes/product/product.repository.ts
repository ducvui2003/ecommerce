import { ProductRes } from '@route/product/product.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/prisma.service';
import { PagingResult } from '@shared/common/interfaces/paging-result.interface';
import {ProductRepository} from "@route/product/interfaces/product-repository.interface";

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(page = 1, limit = 10): Promise<PagingResult<ProductRes>> {
    const skip = (page - 1) * limit;

    const [total, products] = await this.prisma.$transaction([
      this.prisma.product.count(),
      this.prisma.product.findMany({
        skip,
        take: limit,
        include: {
          category: true,
        },
      }),
    ]);

    const mapped = products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      basePrice: Number(p.basePrice),
      salePrice: Number(p.salePrice),
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      deletedAt: p.deletedAt,
      isDeleted: !!p.deletedAt,
      category: p.category.name,
    }));

    return {
      data: mapped,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
