import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { REVIEW_REPOSITORY } from '@route/review/review.const';
import { PrismaReviewRepository } from '@route/review/review.repository';

@Module({
  controllers: [ReviewController],
  providers: [
    ReviewService,
    {
      provide: REVIEW_REPOSITORY,
      useClass: PrismaReviewRepository,
    },
  ],
  exports: [ReviewService],
})
export class ReviewModule {}
