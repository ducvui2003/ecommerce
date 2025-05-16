import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ProductManagerService } from '@route/product/product-manager.service';
import {
  CreateProductBodyDto,
  SearchProductDto,
} from '@route/product/product.dto';

@Controller('/api/v1/manager/products')
export class ProductManagerController {
  constructor(
    @Inject() private readonly productManagerService: ProductManagerService,
  ) {}
  @Get('/search')
  searchProducts(@Query() query: SearchProductDto) {
    return this.productManagerService.search(query);
  }

  @Post()
  createProduct(@Body() body: CreateProductBodyDto) {
    return this.productManagerService.createProduct(body);
  }
}
