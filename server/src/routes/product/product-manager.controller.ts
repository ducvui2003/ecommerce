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
import { Roles } from '@shared/decorators/roles.decorator';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import { RolesGuard } from '@shared/guards/role.guard';

@Controller('/api/v1/manager/products')
@UseGuards(AuthenticationGuard, RolesGuard)
@Auth([AuthType.Bearer])
@Roles('ADMIN')
export class ProductManagerController {
  constructor(
    @Inject() private readonly productManagerService: ProductManagerService,
  ) {}
  @Get('/search')
  @MessageHttp('Paging product for manager')
  searchProducts(
    @Query() query: SearchProductDto,
  ): Promise<Paging<ProductManagerResType>> {
    console.log('Search query:', query);
    return this.productManagerService.search(query);
  }

  @Post()
  @MessageHttp('Create product for manager')
  createProduct(@Body() body: CreateProductBodyDto) {
    return this.productManagerService.createProduct(body);
  }

  @Get('/:id')
  @MessageHttp('Get detail product for manager')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productManagerService.findById(id);
  }

  @Put('/:id')
  @MessageHttp('Update product for manager')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductBodyDto,
  ) {
    return this.productManagerService.updateProduct(id, body);
  }
}
