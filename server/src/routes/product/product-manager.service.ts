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
  UpdateProductBodyType,
  UpdateProductResSchema,
  UpdateProductResType,
} from '@route/product/product-manager.schema';
import { SearchProductDto } from '@route/product/product.dto';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { ProductNotFoundException } from '@shared/exceptions/product.exception';
import {
  isNotFoundError,
  isUniqueConstraintError,
  transformItemsPaging,
} from '@shared/helper.shared';
import { ProductType } from '@shared/models/product.model';
import { SharedResourceRepository } from '@shared/repositories/shared-resource.repository';
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
          thumbnail:
            item?.thumbnail?.publicId &&
            this.fileService.getUrl(item.thumbnail.publicId),
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
        thumbnail: product.thumbnail && {
          id: product.thumbnail.id,
          publicId: product.thumbnail.publicId,
          url: this.fileService.getUrl(product.thumbnail.publicId),
        },
        resources: product.productResource.map((item) => {
          if (item?.resource)
            return {
              id: item.resource.id,
              publicId: item.resource.publicId,
              url: this.fileService.getUrl(item.resource.publicId),
            };
          return null;
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
      if (isNotFoundError(error)) {
        throw new ProductNotFoundException();
      }
      throw error;
    }
  }

  async updateProduct(
    id: number,
    product: UpdateProductBodyType,
  ): Promise<UpdateProductResType> {
    const data = await this.productRepository.update(id, product);
    return UpdateProductResSchema.parse(data);
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
