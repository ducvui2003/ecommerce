import { boolean, z } from 'zod';
import { CategoryType } from './category.type';
import { SupplierType } from '@/types/supplier.type';

type ProductSearchParams = {
  minPrice?: number;
  maxPrice?: number;
  volume?: string;
  origin?: string;
  fragrance?: string;
  categoryId?: number[] | number;
  supplierId?: number[] | number;
  name?: string;
  isDeleted?: boolean;
};

type ProductCardType = {
  id: number;
  thumbnail?: string;
  name: string;
  basePrice: number;
  salePrice?: number;
  star: number;
  numSell: number;
};

type ProductResType = {
  id: number;
  name: string;
  description: string;
  thumbnail?: string;
  basePrice: number;
  salePrice?: number;
  avgStar: number;
  numSell: number;
};

type ProductDetailRespType = {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  salePrice: number;
  views: number;
  category: {
    id: number;
    name: string;
  };
  supplier: {
    name: string;
  };
  thumbnail?: string;
  resources?: string[];
  option: {
    id: number;
    name: string;
    price: number;
    resource: string;
  }[];
  liked: boolean;
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

const CreateOptionBodySchema = z.object({
  name: string,
  price: z.coerce.number().min(1, 'Price must be >= 0'),
  resourceId: z.number().optional(),
  stock: z.coerce.number(),
});

const BaseResourceForm = z.object({
  id: z.number(),
  publicId: z.string(),
  url: z.string(),
});

const BaseOptionForm = z.object({
  id: z.number().nullable(),
  name: string,
  price: z.coerce.number().min(1, 'Price must be >= 0'),
  resource: BaseResourceForm.optional(),
  stock: z.coerce.number(),
});

const BaseProductFormSchema = z.object({
  name: string,
  description: z.string(),
  categoryId: z.coerce.number().min(1, 'Vui lòng chọn'),
  supplierId: z.coerce.number().min(1, 'Vui lòng chọn'),
  basePrice: z.coerce.number().min(1, 'Price must be >= 0'),
  salePrice: z.coerce.number().min(0, 'Price must be >= 0'),
  thumbnail: BaseResourceForm.optional(),
  resources: z.array(BaseResourceForm).optional(),
  isDeleted: z.boolean(),
  options: z.array(BaseOptionForm).optional(),
});

type BaseProductFormType = z.infer<typeof BaseProductFormSchema>;

const CreateProductBodySchema = z.object({
  name: string,
  description: z.string(),
  categoryId: z.coerce.number().min(1, 'Vui lòng chọn'),
  supplierId: z.coerce.number().min(1, 'Vui lòng chọn'),
  basePrice: z.coerce.number().min(1, 'Price must be >= 0'),
  salePrice: z.coerce.number().min(0, 'Price must be >= 0'),
  thumbnailId: z.number().optional(),
  resourceIds: z.array(z.number()).optional(),
  isDeleted: z.boolean().optional().default(false),
  options: z.array(CreateOptionBodySchema).optional(),
});

const UpdateProductBodySchema = z.object({
  name: string,
  description: z.string(),
  categoryId: z.coerce.number().min(1, 'Vui lòng chọn'),
  supplierId: z.coerce.number().min(1, 'Vui lòng chọn'),
  basePrice: z.coerce.number().min(1, 'Price must be >= 0'),
  salePrice: z.coerce.number().min(0, 'Price must be >= 0'),
  thumbnail: z.number().optional(),
  resourceIds: z.array(z.number()).optional(),
  isDeleted: z.boolean().optional().default(false),
  options: z.array(BaseOptionForm).optional(),
});

type CreateOptionBodyType = z.infer<typeof CreateOptionBodySchema>;
type CreateProductBodyType = z.infer<typeof CreateProductBodySchema>;
type UpdateProductBodyType = z.infer<typeof UpdateProductBodySchema>;
type ProductManagerResType = {
  id: number;
  name: string;
  createdAt: Date;
  basePrice: number;
  salePrice: number;
  category: number;
  supplier: number;
  thumbnail?: string;
  isDeleted: boolean;
};

type ResourceResSchema = {
  id: number;
  publicId: string;
  url: string;
};

type ProductDetailManagerResType = {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  salePrice: number;

  categoryId: number;
  supplierId: number;

  resource: ResourceResSchema[];

  options: {
    id: number;
    name: string;
    price: number;
    stock: number;
    resource: ResourceResSchema;
  }[];

  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

type CreateProductResType = {
  id: number;
  name: string;
  basePrice: number;
  salePrice: number;
  createdAt: Date;
  updatedAt: Date;
};

type SearchProductResType = {
  items: Pick<ProductResType, 'id' | 'name'>[];
};

export type {
  ProductCardType,
  ProductResType,
  ProductType,
  ProductSearchParams as SearchParams,
  CreateProductBodyType,
  ProductManagerResType,
  CreateOptionBodyType,
  CreateProductResType,
  ProductDetailRespType,
  ProductDetailManagerResType,
  BaseProductFormType,
  UpdateProductBodyType,
  SearchProductResType,
};
export {
  CreateProductBodySchema,
  CreateOptionBodySchema,
  BaseProductFormSchema,
  UpdateProductBodySchema,
};
