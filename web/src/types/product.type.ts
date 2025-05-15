import { z } from 'zod';
import { CategoryType } from './category.type';
import { SupplierType } from '@/types/supplier.type';

type ProductSearchParams = {
  minPrice?: number;
  maxPrice?: number;
  volume?: string;
  origin?: string;
  fragrance?: string;
};

type ProductCardType = {
  id: number;
  thumbnail?: string;
  name: string;
  basePrice: number;
  percentSale?: number;
  star: number;
  numSell: number;
};

type ProductResType = {
  id: number;
  name: string;
  description: string;
  media: string[];
  basePrice: number;
  salePrice: number;
  percentSale?: number;
  star: number;
  numSell: number;
};

type ProductType = {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  supplierId: string;
  basePrice: number;
  salePrice: number;
  category: CategoryType;
  supplier: SupplierType;
};

const CreateOptionBodySchema = z.object({
  name: z.string(),
  price: z.number(),
  resourceId: z.number(),
  stock: z.number(),
});

const CreateProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  categoryId: z.string(),
  supplierId: z.string(),
  basePrice: z.number(),
  salePrice: z.number(),
  resourceIds: z.array(z.string().min(1)),
  isDeleted: z.boolean().optional().default(false),
  options: z.array(CreateOptionBodySchema),
});

type CreateProductBodyType = z.infer<typeof CreateProductBodySchema>;

type ProductManagerResType = {
  id: number;
  name: string;
  createdAt: Date;
  basePrice: number;
  salePrice: number;
  category: number;
  supplier: number;
  media: string;
};

export type {
  ProductCardType,
  ProductResType,
  ProductType,
  ProductSearchParams as SearchParams,
  CreateProductBodyType,
  ProductManagerResType,
};
export { CreateProductBodySchema };
