import {
  GetReviewOfOrderItemResDTO,
  GetReviewsOfProductQueryDTO,
  GetReviewsOfProductResDTO,
  SendReviewReqDTO,
} from '@route/review/review.dto';
import { PrismaService } from '@shared/services/prisma.service';
import { Inject } from '@nestjs/common';
import { Prisma } from '@prisma/client';
export interface ReviewRepository {
  sendReview(
    userId: number,
    body: SendReviewReqDTO,
    reviewId?: number,
  ): Promise<void>;

  getReviewsOfProduct(
    productId: number,
    query: GetReviewsOfProductQueryDTO,
  ): Promise<GetReviewsOfProductResDTO>;

  getReviewOfOrderItem(
    userId: number,
    orderItemId: number,
  ): Promise<GetReviewOfOrderItemResDTO>;
}

export class PrismaReviewRepository implements ReviewRepository {
  constructor(@Inject() private readonly prismaService: PrismaService) {}

  async getReviewOfOrderItem(
    userId: number,
    orderItemId: number,
  ): Promise<GetReviewOfOrderItemResDTO> {
    const data = await this.prismaService.review.findUniqueOrThrow({
      where: { orderItemId_userId: { userId, orderItemId } },
    });

    const { rating, content, id, createdAt, updatedAt } = data;
    return { rating, orderItemId, content, id, createdAt, updatedAt };
  }

  async getReviewsOfProduct(
    productId: number,
    query: GetReviewsOfProductQueryDTO,
  ): Promise<GetReviewsOfProductResDTO> {
    const {
      page,
      size,
      ratings,
      sort,
      onlyHasResponse,
      onlyHasBuyAgain,
      search,
    } = query;

    let qualifiedUserIds: number[] = [];
    if (onlyHasBuyAgain) {
      const userOrderCounts = await this.prismaService.order.groupBy({
        by: ['userId'],
        where: {
          orderItem: {
            some: {
              product: {
                path: ['id'],
                equals: productId,
              },
            },
          },
        },
        _count: true,
      });

      qualifiedUserIds = userOrderCounts
        .filter((entry) => entry._count >= 2)
        .map((entry) => entry.userId);
    }

    const where: Prisma.ReviewWhereInput = {
      productId,
      ...(ratings &&
        ratings.length && {
          rating: { in: ratings },
        }),
      ...(search && {
        content: {
          contains: search,
          mode: 'insensitive',
        },
      }),
      ...(onlyHasResponse && {
        response: { not: null },
      }),
      ...(onlyHasBuyAgain && {
        userId: { in: qualifiedUserIds },
      }),
    };

    let orderBy: Prisma.ReviewOrderByWithRelationInput | undefined;

    if (sort === 'rating_asc') {
      orderBy = { rating: 'asc' };
    } else if (sort === 'rating_desc') {
      orderBy = { rating: 'desc' };
    } else if (sort === 'rating_newest') {
      orderBy = { createdAt: 'desc' };
    } else if (sort === 'rating_oldest') {
      orderBy = { createdAt: 'asc' };
    }

    const [collectItems, totalItems, computeAvgRating, computeRatingStars] =
      await Promise.all([
        this.prismaService.review.findMany({
          where,
          skip: (page - 1) * size,
          take: size,
          orderBy,
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
              },
            },
            orderItem: {
              select: {
                product: true,
              },
            },
          },
        }),
        this.prismaService.review.count({ where }),
        this.prismaService.review.aggregate({
          where: { productId },
          _avg: { rating: true },
        }),
        this.prismaService.review.groupBy({
          by: ['rating'],
          where: { productId },
          _count: { rating: true },
        }),
      ]);

    const ratingStars: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    for (const item of computeRatingStars) {
      ratingStars[item.rating] = item._count.rating;
    }

    return {
      averageRating: parseFloat((computeAvgRating._avg.rating ?? 0).toFixed(1)),
      ratingStars,
      items: collectItems.map(({ orderItem, ...rest }) => {
        return {
          ...rest,
          options: orderItem.product.options,
        };
      }),
      pagination: {
        page,
        limit: size,
        totalItems,
        totalPages: Math.ceil(totalItems / size),
      },
    };
  }

  async sendReview(
    userId: number,
    body: SendReviewReqDTO,
    reviewId?: number,
  ): Promise<void> {
    const { productId, orderItemId, content, rating } = body;
    await this.upsertReview(
      {
        orderItemId_userId: { orderItemId, userId },
        ...(reviewId && { id: reviewId }),
        productId,
      },
      { content, rating },
      { productId, orderItemId, content, rating, userId, updatedAt: null },
    );
  }

  async upsertReview(
    where: Prisma.ReviewWhereUniqueInput,
    update: Prisma.ReviewUncheckedUpdateInput,
    create: Prisma.ReviewUncheckedCreateInput,
  ) {
    return this.prismaService.review.upsert({
      where,
      update,
      create,
    });
  }
}
