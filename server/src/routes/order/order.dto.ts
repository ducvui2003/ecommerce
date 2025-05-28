import { CreateOrderSchema } from '@route/order/order.schema';
import { createZodDto } from 'nestjs-zod';

export class CreateOrderDto extends createZodDto(CreateOrderSchema) {}
