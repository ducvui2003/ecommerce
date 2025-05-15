import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ProductManagerService } from '@route/product/product-manager.service';
import { CreateProductBodyDto } from '@route/product/product.dto';

@Controller('/api/v1/manager/products')
export class ProductManagerController {
  constructor(
    @Inject() private readonly productManagerService: ProductManagerService,
  ) {}

  @Post()
  createProduct(@Body() body: CreateProductBodyDto) {
    return this.productManagerService.createProduct(body);
  }
}
