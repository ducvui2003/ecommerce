import { MetadataFields } from '@shared/models/base.model';
import { CategoryModel } from '@shared/models/category.model';
import { SupplierModel } from '@shared/models/supplier.model';
import { z } from 'zod';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export const ProductModel = MetadataFields.extend({
  id: z.number(),
  name: z.string().min(8),
  description: z.string(),
  categoryId: z.number(),
  supplierId: z.string(),
  basePrice: z.number().negative(),
  salePrice: z.number().negative(),

  category: CategoryModel,
  supplier: SupplierModel,
});

export type ProductType = z.infer<typeof ProductModel>;

export class ProductFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  supplierId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;
}
