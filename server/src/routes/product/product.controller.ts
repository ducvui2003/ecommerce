import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductDetailRes, ProductRes, SearchProductDto} from '@route/product/product.dto';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { ProductServiceImpl } from '@route/product/product.service';

@Controller('/api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductServiceImpl) {}

  @Get('/search')
  searchProducts(@Query() query: SearchProductDto) {
    console.log(query);
    return this.productService.searchProducts(query);
  }

  @Get('/all')
  findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<Paging<ProductRes>> {
    return this.productService.findAll(page, limit);
  }

  @Get('/:id')
  findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductDetailRes | null> {
    return this.productService.findById(id);
  }
}
