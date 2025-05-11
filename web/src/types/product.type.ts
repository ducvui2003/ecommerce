import { CategoryType } from './category.type';
import { SupplierType } from '@/types/supplier.type';

type ProductCardType = {
  id: number;
  thumbnail: string;
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
  thumbnail: string;
  basePrice: number;
  salePrice: number;
  percentSale?: number;
  star: number;
  numSell: number;
}

type ProductType =  {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  supplierId: string;
  basePrice: number;
  salePrice: number;
  category: CategoryType;
  supplier: SupplierType;
}


export type { ProductCardType, ProductResType, ProductType};
