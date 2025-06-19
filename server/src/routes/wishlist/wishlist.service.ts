import { Inject, Injectable } from '@nestjs/common';
import { WISHLIST_REPOSITORY } from '@route/wishlist/wishlist.dependency';
import {
  WishlistAlreadyExistsError,
  WishlistNotFoundError,
} from '@route/wishlist/wishlist.error';
import { WishlistRepository } from '@route/wishlist/wishlist.repository';
import {
  CreateWishlistType,
  WishlistResSchema,
  WishlistResType,
} from '@route/wishlist/wishlist.schema';
import {
  isNotFoundError,
  isUniqueConstraintError,
} from '@shared/helper.shared';
import { FileService } from '@shared/services/file/file.service';

@Injectable()
export class WishlistService {
  constructor(
    @Inject(WISHLIST_REPOSITORY)
    readonly wishlistRepository: WishlistRepository,
    @Inject('FILE_SERVICE')
    private readonly fileService: FileService,
  ) {}
  async create(userId: number, createWishlistDto: CreateWishlistType) {
    try {
      await this.wishlistRepository.create(userId, createWishlistDto);
    } catch (e) {
      if (isUniqueConstraintError(e)) {
        throw WishlistAlreadyExistsError;
      }
      throw e;
    }
  }

  async findAll(userId: number): Promise<WishlistResType[]> {
    const data = await this.wishlistRepository.findAll(userId);
    return data.map((item) => {
      const parser: WishlistResType = {
        ...item,
        product: {
          ...item.product,
          thumbnail:
            item.product.thumbnail &&
            this.fileService.getUrl(item.product.thumbnail.publicId),
        },
      };
      return WishlistResSchema.parse(parser);
    });
  }

  async remove(userId: number, id: number) {
    try {
      return await this.wishlistRepository.delete(userId, id);
    } catch (e) {
      if (isNotFoundError(e)) {
        throw WishlistNotFoundError;
      }
      throw e;
    }
  }

  async checkIsLiked(userId: number, productId: number): Promise<boolean> {
    const item = await this.wishlistRepository.findByProductId(
      userId,
      productId,
    );
    return !!item;
  }
}
