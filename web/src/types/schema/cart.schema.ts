import z, { number, string } from 'zod';

const AddCartItemSchema = z.object({
  productId: number().int().positive(),
  quantity: number().int().positive(),
}).strict()

const ChangeQuantityCartItemSchema = z.object({
  quantity: z.union([
    z.number().int().positive(),
    z.object({ increment: z.number().int().positive() }),
    z.object({ decrement: z.number().int().positive() }),
  ]),
}).strict();

export {AddCartItemSchema, ChangeQuantityCartItemSchema}