import { Inject, Injectable } from '@nestjs/common';
import {
  ProductDetailRes,
  ProductRes,
  SearchProductDto,
} from '@route/product/product.dto';
import { ProductRepository } from '@route/product/interfaces/product-repository.interface';
import { ProductService } from '@route/product/interfaces/product-service.interface';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { ProductNotFoundException } from '@shared/exceptions/product.exception';

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: ProductRepository,
  ) {}

  async findAll(page = 1, limit = 10): Promise<Paging<ProductRes>> {
    return this.productRepository.getProducts(page, limit);
  }

  async findById(id: number): Promise<ProductDetailRes | null> {
    const product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new ProductNotFoundException();
    }
    return product;
  }

  searchProducts(dto: SearchProductDto): Promise<Paging<ProductRes>> {
    return this.productRepository.searchProducts(dto);
  }
}
