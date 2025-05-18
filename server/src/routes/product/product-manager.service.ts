import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '@route/product/interfaces/product-repository.interface';
import {
  CreateProductBodyType,
  CreateProductResSchema,
  CreateProductResType,
  ProductDetailManagerResSchema,
  ProductDetailManagerResType,
  ProductManagerResSchema,
  ProductManagerResType,
} from '@route/product/product-manager.schema';
import { SearchProductDto } from '@route/product/product.dto';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { ProductNotFoundException } from '@shared/exceptions/product.exception';
import {
  isUniqueConstraintError,
  transformItemsPaging,
} from '@shared/helper.shared';
import { ProductType } from '@shared/models/product.model';
import { SharedResourceRepository } from '@shared/repositories/shared-repository.repository';
import { FileService } from '@shared/services/file/file.service';

@Injectable()
export class ProductManagerService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: ProductRepository,
    @Inject('FILE_SERVICE')
    private readonly fileService: FileService,
    @Inject()
    private readonly sharedMediaRepository: SharedResourceRepository,
  ) {}
  async createProduct(
    product: CreateProductBodyType,
  ): Promise<CreateProductResType> {
    const data = await this.productRepository.create(product);
    return CreateProductResSchema.parse(data);
  }

  async search(dto: SearchProductDto): Promise<Paging<ProductManagerResType>> {
    const page: Paging<ProductManagerResType> =
      await this.productRepository.search(dto);
    return transformItemsPaging<ProductManagerResType, ProductType>(
      page,
      (item) => {
        return ProductManagerResSchema.parse({
          ...item,
          resource: this.fileService.getUrl(
            item.productResource[0].resource.publicId,
          ),
          supplier: item.supplier.name,
          category: item.category.name,
        });
      },
    );
  }

  async findById(id: number): Promise<ProductDetailManagerResType> {
    try {
      const product = await this.productRepository.getProductById(id);

      const temp = await this.getOptionDetail(product);
      return ProductDetailManagerResSchema.parse({
        ...product,
        resources: product.productResource.map(({ resource }) => {
          return {
            id: resource.id,
            publicId: resource.publicId,
            url: this.fileService.getUrl(resource.publicId),
          };
        }),
        options: product.option?.map((option, index) => {
          return {
            ...option,
            resource: {
              id: temp?.[index].mediaId,
              publicId: temp?.[index].publicId,
              url:
                temp?.[index].publicId &&
                this.fileService.getUrl(temp[index].publicId),
            },
          };
        }),
      });
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        throw new ProductNotFoundException();
      }
      throw error;
    }
  }

  private async getOptionDetail(product: ProductType): Promise<
    | {
        index: number;
        mediaId: number | null;
        publicId: string;
      }[]
    | null
  > {
    const temp:
      | {
          index: number;
          mediaId: number | null;
          publicId: string;
        }[]
      | null =
      product.option?.map((option, index) => ({
        index,
        mediaId: option.resourceId,
        publicId: '',
      })) ?? null;

    if (!temp) return null;

    if (temp) {
      const mediaIds = temp
        ?.map((item) => item.mediaId)
        .filter((id): id is number => id != null);

      const resources =
        await this.sharedMediaRepository.findResourceInId(mediaIds);
      temp.forEach((item) => {
        item.publicId =
          resources.find((i) => i.id === item.mediaId)?.publicId ?? '';
      });
    }

    return temp;
  }
}
