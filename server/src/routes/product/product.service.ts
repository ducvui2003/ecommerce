import { Injectable } from '@nestjs/common';
import { PagingResult } from '@shared/common/interfaces/paging-result.interface';
import { ProductRes } from '@route/product/product.dto';
import { ProductRepository } from '@route/product/interfaces/product-repository.interface';
import { ProductService } from '@route/product/interfaces/product-service.interface';

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async findAll(page = 1, limit = 10): Promise<PagingResult<ProductRes>> {
    return this.productRepository.getProducts(page, limit);
  }
}
