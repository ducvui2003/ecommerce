import z from 'zod';
import { AddCartItemSchema, ChangeQuantityCartItemSchema } from '@/types/schema/cart.schema';

type GetCartResType = {
  id: number,
  userId: number,
  cartItems: {
    id: string,
    quantity: number,
    selected: boolean,
    product: {
      id: number,
      name: string,
      basePrice: number,
      salePrice: number,
    }
  }[],
}

type AddCartItemReqType = z.infer<typeof AddCartItemSchema>;

type ChangeQuantityCartItemReqType = z.infer<typeof ChangeQuantityCartItemSchema>;

export type {AddCartItemReqType, ChangeQuantityCartItemReqType, GetCartResType};