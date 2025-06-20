import { createZodDto } from 'nestjs-zod';
import { GetReviewsOfProductQuerySchema, SendReviewSchema } from '@route/review/review.schema';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { ReviewItemType } from '@shared/models/review.model';

export class SendReviewReqDTO extends createZodDto(SendReviewSchema){}
export class GetReviewsOfProductQueryDTO extends createZodDto(GetReviewsOfProductQuerySchema){}

type GetReviewsOfProductResDTO = Paging<ReviewItemType> & {
  averageRating: number;
  ratingStars: Record<number, number>
}

type GetReviewOfOrderItemResDTO = Pick<ReviewItemType, 'orderItemId' | 'id' | 'rating' | 'content' | 'createdAt' | 'updatedAt'>;

export {GetReviewsOfProductResDTO, GetReviewOfOrderItemResDTO}