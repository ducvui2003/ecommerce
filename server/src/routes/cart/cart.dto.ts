import { createZodDto } from 'nestjs-zod';
import { AddCartItemBodySchema , ChangeQtyCartItemBodySchema} from '@route/cart/cart.schema';
import { CartType } from '@shared/models/cart.model';
import { CartItemType } from '@shared/models/cart-item.model';
import { ProductType } from '@shared/models/product.model';

export class AddCartItemReqDTO extends createZodDto(AddCartItemBodySchema) {}
export class ChangeQltCartItemReqDTO extends createZodDto(ChangeQtyCartItemBodySchema) {}

type GetCartResDTO = Pick<CartType, 'userId' | 'id'> & {
  cartItems: Array<
    Pick<CartItemType, 'id' | 'quantity'> & {
      product: Pick<ProductType, 'name' | 'basePrice' | 'salePrice'>;
    }
  >;
};

export { GetCartResDTO };
