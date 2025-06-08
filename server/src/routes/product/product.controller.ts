import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SearchProductDto } from '@route/product/product.dto';
import {
  ProductDetailResType,
  ProductResType,
} from '@route/product/product.schema';
import { ProductServiceImpl } from '@route/product/product.service';
import { Paging } from '@shared/common/interfaces/paging.interface';

@Controller('/api/v1/products')
export class ProductController {
  constructor(
    @Inject('PRODUCT_SERVICE')
    private readonly productService: ProductServiceImpl,
  ) {}
  @Get('/new')
  getNewProducts(): Promise<ProductResType[]> {
    return this.productService.getNewProducts();
  }

  @Get('/search')
  searchProducts(
    @Query() query: SearchProductDto,
  ): Promise<Paging<ProductResType>> {
    return this.productService.search(query);
  }

  @Get('/:id')
  findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductDetailResType> {
    return this.productService.findById(id);
  }
}
