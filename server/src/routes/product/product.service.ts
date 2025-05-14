import { Inject, Injectable } from '@nestjs/common';
import {
  ProductDetailRes,
  ProductResType,
  SearchProductDto,
} from '@route/product/product.dto';
import { ProductRepository } from '@route/product/interfaces/product-repository.interface';
import { ProductService } from '@route/product/interfaces/product-service.interface';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { ProductNotFoundException } from '@shared/exceptions/product.exception';
import { transformItemsPaging } from '@shared/helper.shared';
import { FileService } from '@shared/services/file/file.service';

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: ProductRepository,
    @Inject('FILE_SERVICE')
    private readonly fileService: FileService,
  ) {}

  async findById(id: number): Promise<ProductDetailRes | null> {
    const product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new ProductNotFoundException();
    }
    return product;
  }

  async search(dto: SearchProductDto): Promise<Paging<ProductResType>> {
    const page = await this.productRepository.search(dto);
    return transformItemsPaging<ProductResType, ProductResType>(
      page,
      (item) => {
        return {
          ...item,
          media: item.media.map((publicId) =>
            this.fileService.getUrl(publicId),
          ),
        };
      },
    );
  }
}
