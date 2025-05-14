import { Product, Category, Supplier } from '@prisma/client';
import { ProductDetailRes } from '@route/product/product.dto';

export function mapProductDetailToResponse(
  product: Product & { category: Category; supplier: Supplier },
): ProductDetailRes {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    categoryId: product.categoryId,
    supplierId: String(product.supplierId),
    basePrice: product.basePrice.toNumber(),
    salePrice: product.salePrice.toNumber(),
    category: {
      id: product.category.id,
      name: product.category.name,
      createdAt: product.category.createdAt,
      updatedAt: product.category.updatedAt ?? null,
      deletedAt: product.category.deletedAt ?? null,
      isDeleted: !!product.category.deletedAt,
    },
    supplier: {
      id: product.supplier.id,
      name: product.supplier.name,
      email: product.supplier.email,
      phone: product.supplier.phone,
      country: product.supplier.country,
      website: product.supplier.website,
      addressId: product.supplier.addressId,
    },
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    deletedAt: product.deletedAt ?? null,
    isDeleted: !!product.deletedAt,
  };
}

// export function mapProductListToResponse(products: (Product & { category: Category })[]): ProductRes[] {
//   return products.map(mapProductToResponse);
// }
