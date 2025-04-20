import { ProductType } from '@shared/models/product.model';

type ProductRes = Omit<
  ProductType,
  'supplier' | 'supplierId' | 'category' | 'categoryId'
> & {
  category: string;
};

type ProductDetailRes = ProductType;

export type { ProductRes, ProductDetailRes };
