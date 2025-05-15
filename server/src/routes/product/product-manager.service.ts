import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '@route/product/interfaces/product-repository.interface';
import { CreateProductBodyType } from '@route/product/product.schema';

@Injectable()
export class ProductManagerService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: ProductRepository,
  ) {}
  createProduct(product: CreateProductBodyType) {
    return this.productRepository.create(product);
  }
}
