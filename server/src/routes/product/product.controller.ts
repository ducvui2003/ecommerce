import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from './interfaces/product-service.interface';
import { ProductRes } from '@route/product/product.dto';
import { PagingResult } from '@shared/common/interfaces/paging-result.interface';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<PagingResult<ProductRes>> {
    return this.productService.findAll(page, limit);
  }


}
