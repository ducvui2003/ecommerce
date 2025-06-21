import { Inject, Injectable } from '@nestjs/common';
import { SearchProductDto } from '@route/product/product.dto';
import { ProductRepository } from '@route/product/interfaces/product-repository.interface';
import { ProductService } from '@route/product/interfaces/product-service.interface';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { ProductNotFoundException } from '@shared/exceptions/product.exception';
import {
  isNotFoundError,
  isUniqueConstraintError,
  transformItemsPaging,
} from '@shared/helper.shared';
import { FileService } from '@shared/services/file/file.service';
import {
  ProductDetailResSchema,
  ProductDetailResType,
  ProductResSchema,
  ProductResType,
  ProductSitemapType,
} from '@route/product/product.schema';
import { ProductType } from '@shared/models/product.model';
import { SharedResourceRepository } from '@shared/repositories/shared-resource.repository';

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: ProductRepository,
    @Inject('FILE_SERVICE')
    private readonly fileService: FileService,
    @Inject()
    private readonly sharedResourceRepository: SharedResourceRepository,
  ) {}

  async findById(id: number): Promise<ProductDetailResType> {
    try {
      await this.productRepository.increaseView(id);
      const product = await this.productRepository.getProductById(id, false);
      const temp = product.option?.map((option, index) => ({
        index,
        resourceId: option.resourceId,
        publicId: '',
      }));
      if (temp) {
        const resourceIds = temp
          ?.map((item) => item.resourceId)
          .filter((id): id is number => id != null);

        const resources =
          await this.sharedResourceRepository.findResourceInId(resourceIds);
        temp.forEach((item) => {
          item.publicId =
            resources.find((i) => i.id === item.resourceId)?.publicId ?? '';
        });
      }
      return ProductDetailResSchema.parse({
        ...product,
        thumbnail:
          product.thumbnail &&
          this.fileService.getUrl(product.thumbnail.publicId),
        resources: product.productResource.map((item) => {
          if (item?.resource)
            return this.fileService.getUrl(item.resource.publicId);
          return '';
        }),
        option: product.option?.map((option, index) => {
          return {
            ...option,
            resource:
              temp?.[index].publicId &&
              this.fileService.getUrl(temp[index].publicId),
          };
        }),
      });
    } catch (error) {
      if (isNotFoundError(error)) {
        throw new ProductNotFoundException();
      }
      throw error;
    }
  }

  async search(dto: SearchProductDto): Promise<Paging<ProductResType>> {
    const page: Paging<ProductType> = await this.productRepository.search(dto);
    const productIds = page.items.map((item) => item.id);
    const avgStar = await this.productRepository.countAvgStar(productIds);
    const numSell = await this.productRepository.countNumSell(productIds);

    return transformItemsPaging<ProductResType, ProductType>(page, (item) => {
      const itemParser: ProductResType = {
        ...item,
        thumbnail:
          item.thumbnail && this.fileService.getUrl(item.thumbnail.publicId),
        avgStar: avgStar.find((i) => i.productId === item.id)?.avgStar ?? 0,
        numSell: numSell.find((i) => i.productId === item.id)?.numSell ?? 0,
      };
      return ProductResSchema.parse(itemParser);
    });
  }

  async getNewProducts(): Promise<ProductResType[]> {
    const products = await this.productRepository.getNewProducts();
    return products.map((item) => {
      return ProductResSchema.parse({
        ...item,
        thumbnail:
          item.thumbnail && this.fileService.getUrl(item.thumbnail.publicId),
      });
    });
  }

  async getMostViewProducts(): Promise<ProductResType[]> {
    const products = await this.productRepository.getMostViewProducts();
    return products.map((item) => {
      return ProductResSchema.parse({
        ...item,
        thumbnail:
          item.thumbnail && this.fileService.getUrl(item.thumbnail.publicId),
      });
    });
  }

  getSitemap(): Promise<ProductSitemapType> {
    return this.productRepository.getAllId();
  }
}
