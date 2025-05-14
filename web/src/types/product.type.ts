import { CategoryType } from './category.type';
import { SupplierType } from '@/types/supplier.type';

type SearchParams = {
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

type ProductDetailRespType = {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  salePrice: number;
  category: {
    name: string;
  };
  supplier: {
    name: string;
  };
  media: string[];
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

export type { ProductCardType, ProductResType, ProductType, SearchParams, ProductDetailRespType};
