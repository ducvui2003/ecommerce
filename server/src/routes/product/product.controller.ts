import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductDetailRes, SearchProductDto } from '@route/product/product.dto';
import { ProductServiceImpl } from '@route/product/product.service';

@Controller('/api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductServiceImpl) {}

  @Get('/search')
  searchProducts(@Query() query: SearchProductDto) {
    console.log(query);
    return this.productService.search(query);
  }

  @Get('/:id')
  findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductDetailRes | null> {
    return this.productService.findById(id);
  }
}
