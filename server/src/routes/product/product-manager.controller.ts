import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductManagerResType } from '@route/product/product-manager.schema';
import { ProductManagerService } from '@route/product/product-manager.service';
import {
  CreateProductBodyDto,
  SearchProductDto,
  UpdateProductBodyDto,
} from '@route/product/product.dto';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { AuthType } from '@shared/constants/auth.constant';
import { Auth } from '@shared/decorators/auth.decorator';
import { MessageHttp } from '@shared/decorators/message.decorator';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';

@Controller('/api/v1/manager/products')
export class ProductManagerController {
  constructor(
    @Inject() private readonly productManagerService: ProductManagerService,
  ) {}
  @Get('/search')
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Paging product for manager')
  @Auth([AuthType.Bearer])
  searchProducts(
    @Query() query: SearchProductDto,
  ): Promise<Paging<ProductManagerResType>> {
    console.log('Search query:', query);
    return this.productManagerService.search(query);
  }

  @Post()
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Create product for manager')
  @Auth([AuthType.Bearer])
  createProduct(@Body() body: CreateProductBodyDto) {
    return this.productManagerService.createProduct(body);
  }

  @Get('/:id')
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Get detail product for manager')
  @Auth([AuthType.Bearer])
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productManagerService.findById(id);
  }

  @Put('/:id')
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Update product for manager')
  @Auth([AuthType.Bearer])
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductBodyDto,
  ) {
    return this.productManagerService.updateProduct(id, body);
  }
}
