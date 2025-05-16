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

const string = z.string().min(1, 'Name is required');
const number = z.coerce.number().min(0, 'Price must be >= 0');
const numberNotZero = z.coerce.number().min(1, 'Price must be >= 0');

const CreateOptionBodySchema = z.object({
  name: string,
  price: numberNotZero,
  resourceId: z.number(),
  stock: number,
});

const CreateProductBodySchema = z.object({
  name: string,
  description: string,
  categoryId: z.number(),
  supplierId: z.number(),
  basePrice: numberNotZero,
  salePrice: numberNotZero,
  resourceIds: z.array(z.string().min(1)),
  isDeleted: z.boolean().optional().default(false),
  options: z.array(CreateOptionBodySchema),
});

type CreateOptionBodyType = z.infer<typeof CreateOptionBodySchema>;

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
  CreateOptionBodyType,
};
export { CreateProductBodySchema, CreateOptionBodySchema };
