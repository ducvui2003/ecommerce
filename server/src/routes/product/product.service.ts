import { Inject, Injectable } from '@nestjs/common';
import { SearchProductDto } from '@route/product/product.dto';
import { ProductRepository } from '@route/product/interfaces/product-repository.interface';
import { ProductService } from '@route/product/interfaces/product-service.interface';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { ProductNotFoundException } from '@shared/exceptions/product.exception';
import {
  isUniqueConstraintError,
  transformItemsPaging,
} from '@shared/helper.shared';
import { FileService } from '@shared/services/file/file.service';
import {
  ProductDetailResSchema,
  ProductDetailResType,
  ProductResSchema,
  ProductResType,
} from '@route/product/product.schema';
import { ProductType } from '@shared/models/product.model';

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: ProductRepository,
    @Inject('FILE_SERVICE')
    private readonly fileService: FileService,
  ) {}

  async findById(id: number): Promise<ProductDetailResType> {
    try {
      const product = await this.productRepository.getProductById(id);
      return ProductDetailResSchema.parse({
        ...product,
        media:
          product.productResource.map(({ resource }) => {
            return this.fileService.getUrl(resource.publicId);
          }) ?? [],
      });
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        throw new ProductNotFoundException();
      }
      throw error;
    }
  }

  async search(dto: SearchProductDto): Promise<Paging<ProductResType>> {
    const page: Paging<ProductType> = await this.productRepository.search(dto);
    return transformItemsPaging<ProductResType, ProductType>(page, (item) => {
      return ProductResSchema.parse({
        ...item,
        media:
          item.productResource.map(({ resource }) => {
            return this.fileService.getUrl(resource.publicId);
          }) ?? [],
      });
    });
  }
}
