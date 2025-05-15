import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '@route/product/interfaces/product-repository.interface';
import { SearchProductDto } from '@route/product/product.dto';
import {
  CreateProductBodyType,
  ProductManagerResSchema,
  ProductManagerResType,
  ProductResType,
} from '@route/product/product.schema';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { transformItemsPaging } from '@shared/helper.shared';
import { ProductType } from '@shared/models/product.model';
import { FileService } from '@shared/services/file/file.service';

@Injectable()
export class ProductManagerService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: ProductRepository,
    @Inject('FILE_SERVICE')
    private readonly fileService: FileService,
  ) {}
  createProduct(product: CreateProductBodyType) {
    return this.productRepository.create(product);
  }

  async search(dto: SearchProductDto): Promise<Paging<ProductManagerResType>> {
    const page: Paging<ProductManagerResType> =
      await this.productRepository.search(dto);
    return transformItemsPaging<ProductManagerResType, ProductType>(
      page,
      (item) => {
        return ProductManagerResSchema.parse({
          ...item,
          media: this.fileService.getUrl(
            item.productResource[0].resource.publicId,
          ),
          supplier: item.supplier.name,
          category: item.category.name,
        });
      },
    );
  }
}
