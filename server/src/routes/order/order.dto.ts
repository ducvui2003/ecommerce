import {
  CreateOrderSchema,
  SearchOrderReqSchema,
} from '@route/order/order.schema';
import { createZodDto } from 'nestjs-zod';

export class CreateOrderDto extends createZodDto(CreateOrderSchema) {}
export class SearchOrderDto extends createZodDto(SearchOrderReqSchema) {}
