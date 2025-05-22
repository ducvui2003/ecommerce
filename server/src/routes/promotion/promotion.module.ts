import { Module } from '@nestjs/common';
import { PromotionService } from '@route/promotion/promotion.service';
import { PromotionController } from '@route/promotion/promotion.controller';
import { PROMOTION_REPOSITORY } from '@route/promotion/promotion.const';
import { PrismaPromotionRepository } from '@route/promotion/promotion.repository';

@Module({
  controllers: [PromotionController],
  providers: [
    PromotionService,
    {
      provide: PROMOTION_REPOSITORY,
      useClass: PrismaPromotionRepository
    }
  ],
})
export class PromotionModule {}
