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
  ProductSitemapType,
} from '@route/product/product.schema';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { ReviewService } from '@route/review/review.service';
import { ReviewItemType } from '@shared/models/review.model';
import { GetReviewsOfProductQueryDTO } from '@route/review/review.dto';
import { ProductService } from '@route/product/interfaces/product-service.interface';

@Controller('/api/v1/products')
export class ProductController {
  constructor(
    @Inject('PRODUCT_SERVICE')
    private readonly productService: ProductService,
    private readonly reviewService: ReviewService,
  ) {}

  @Get('/most-view')
  getMostViewProducts(): Promise<ProductResType[]> {
    return this.productService.getMostViewProducts();
  }

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

  @Get('/:id/reviews')
  getReviewsOfProduct(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: GetReviewsOfProductQueryDTO,
  ): Promise<Paging<ReviewItemType>> {
    return this.reviewService.getReviewsOfProduct(id, query);
  }

  @Get('/metadata/sitemap')
  getSitemap(): Promise<ProductSitemapType> {
    return this.productService.getSitemap();
  }
}
