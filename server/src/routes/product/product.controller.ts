import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SearchProductDto } from '@route/product/product.dto';
import { ProductDetailResType } from '@route/product/product.schema';
import { ProductServiceImpl } from '@route/product/product.service';

@Controller('/api/v1/products')
export class ProductController {
  constructor(
    @Inject('PRODUCT_SERVICE')
    private readonly productService: ProductServiceImpl,
  ) {}

  @Get('/search')
  searchProducts(@Query() query: SearchProductDto) {
    return this.productService.search(query);
  }

  @Get('/:id')
  findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductDetailResType> {
    return this.productService.findById(id);
  }
}
