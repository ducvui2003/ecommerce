import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ActiveUser } from '@shared/decorators/active-user.decorator';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthType } from '@shared/constants/auth.constant';
import {
  AddCartItemReqDTO,
  ChangeQltCartItemReqDTO,
} from '@route/cart/cart.dto';

@Controller('/api/v1/carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/current')
  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @HttpCode(HttpStatus.OK)
  async getCart(@ActiveUser('id') userId: number) {
    return this.cartService.getCart(userId);
  }

  @Post('/current/items')
  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @HttpCode(HttpStatus.OK)
  async addCartItem(
    @ActiveUser('id') userId: number,
    @Body() body: AddCartItemReqDTO,
  ) {
    return this.cartService.addCartItem(userId, body);
  }

  @Patch('/current/items/:cartItemId')
  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @HttpCode(HttpStatus.OK)
  async changeQuantityCartItem(
    @ActiveUser('id') userId: number,
    @Param('cartItemId') cartItemId: string,
    @Body() body: ChangeQltCartItemReqDTO,
  ) {
    return this.cartService.changeQuantityCartItem(userId, cartItemId, body);
  }

  @Delete('/current/items/:cartItemId')
  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @HttpCode(HttpStatus.OK)
  async deleteCartItem(
    @ActiveUser('id') userId: number,
    @Param('cartItemId') cartItemId: string,
  ) {
    return this.cartService.deleteCartItem(cartItemId, userId);
  }
}
