import { SearchProductDto } from './product.dto';
import { Prisma } from '@prisma/client';

export const buildSearchWhereClause = (dto: SearchProductDto): Prisma.ProductWhereInput => {
  const { name, categoryId, supplierId, minPrice, maxPrice } = dto;
  return {
    name: name ? { contains: name, mode: 'insensitive' } : undefined,
    categoryId: categoryId?.length ? { in: categoryId.map(Number) } : undefined,
    supplierId: supplierId?.length ? { in: supplierId.map(Number) } : undefined,
    salePrice: {
      gte: minPrice ? BigInt(minPrice) : undefined,
      lte: maxPrice ? BigInt(maxPrice) : undefined,
    },
    deletedAt: null,
  };
};
