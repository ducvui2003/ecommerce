import { Inject, Injectable } from '@nestjs/common';
import {
  GetReviewOfOrderItemResDTO,
  GetReviewsOfProductQueryDTO,
  GetReviewsOfProductResDTO,
  SendReviewReqDTO,
} from '@route/review/review.dto';
import { REVIEW_REPOSITORY } from '@route/review/review.const';
import { ReviewRepository } from '@route/review/review.repository';

@Injectable()
export class ReviewService {
  constructor(
    @Inject(REVIEW_REPOSITORY)
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async sendReview(userId: number, body: SendReviewReqDTO, reviewId?: number) {
    await this.reviewRepository.sendReview(userId, body, reviewId);
  }

  async getReviewsOfProduct(
    productId: number,
    query: GetReviewsOfProductQueryDTO,
  ): Promise<GetReviewsOfProductResDTO> {
    return await this.reviewRepository.getReviewsOfProduct(productId, query);
  }

  async getReviewOfOrderItem(
    userId: number,
    orderItemId: number,
  ): Promise<GetReviewOfOrderItemResDTO> {
    return await this.reviewRepository.getReviewOfOrderItem(
      userId,
      orderItemId,
    );
  }
}
