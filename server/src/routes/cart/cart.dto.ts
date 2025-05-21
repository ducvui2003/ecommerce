import { createZodDto } from 'nestjs-zod';
import {
  AddCartItemBodySchema,
  ChangeQuantityCartItemBodySchema,
} from '@route/cart/cart.schema';
import { CartType } from '@shared/models/cart.model';
import { CartItemType } from '@shared/models/cart-item.model';
import { ProductType } from '@shared/models/product.model';
import { OptionType } from '@shared/models/option.model';

export class AddCartItemReqDTO extends createZodDto(AddCartItemBodySchema) {}

export class ChangeQuantityCartItemReqDTO extends createZodDto(
  ChangeQuantityCartItemBodySchema,
) {}

type GetCartResDTO = Pick<CartType, 'userId' | 'id'> & {
  cartItems: Array<
    Pick<CartItemType, 'id' | 'quantity' | 'selected' | 'createdAt'> & {
      product: Pick<ProductType, 'name' | 'basePrice' | 'salePrice'>;
      option?: Pick<OptionType, 'id' | 'name' | 'price'>
    }
  >;
};

export { GetCartResDTO };
