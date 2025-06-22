import {
  RevenueByTimeAndCategoryRequestSchema,
  RevenueByTimeRequestSchema,
} from '@route/dashboard/dashboard.schema';
import { createZodDto } from 'nestjs-zod';

export class RevenueByTimeRequestDto extends createZodDto(
  RevenueByTimeRequestSchema,
) {}

export class RevenueByTimeAndCategoryRequestDto extends createZodDto(
  RevenueByTimeAndCategoryRequestSchema,
) {}
