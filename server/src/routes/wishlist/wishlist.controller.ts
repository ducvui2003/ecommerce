import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { CreateWishlistDto as dto } from '@route/wishlist/wishlist.dto';
import { WishlistService } from '@route/wishlist/wishlist.service';
import { AuthType } from '@shared/constants/auth.constant';
import { ActiveUser } from '@shared/decorators/active-user.decorator';
import { Auth } from '@shared/decorators/auth.decorator';
import { MessageHttp } from '@shared/decorators/message.decorator';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';

@Controller('/api/v1/wishlist')
export class WishlistController {
  constructor(
    @Inject()
    private readonly wishlistService: WishlistService,
  ) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Create wishlist item')
  @Auth([AuthType.Bearer])
  create(@ActiveUser('id') userId: number, @Body() createWishlistDto: dto) {
    return this.wishlistService.create(userId, createWishlistDto);
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Find all wishlist items')
  @Auth([AuthType.Bearer])
  findAll(@ActiveUser('id') userId: number) {
    return this.wishlistService.findAll(userId);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Delete wishlist item')
  @Auth([AuthType.Bearer])
  remove(
    @ActiveUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.wishlistService.remove(userId, id);
  }
}
