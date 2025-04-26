import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from './interfaces/product-service.interface';
import { ProductDetailRes, ProductRes } from '@route/product/product.dto';
import { Paging } from '@shared/common/interfaces/paging.interface';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<Paging<ProductRes>> {
    return this.productService.findAll(page, limit);
  }

  @Get(':id')
  findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductDetailRes | null> {
    return this.productService.findById(id);
  }
}
