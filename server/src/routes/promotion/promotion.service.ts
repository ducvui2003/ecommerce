import { Inject, Injectable } from '@nestjs/common';
import { PROMOTION_REPOSITORY } from '@route/promotion/promotion.const';
import { GetActivePromotionsResDTO } from '@route/promotion/promotion.dto';
import { PromotionRepository } from '@route/promotion/promotion.repository';

@Injectable()
export class PromotionService {
  constructor(@Inject(PROMOTION_REPOSITORY) private readonly promotionRepository: PromotionRepository) {}

  async getActivePromotions(): Promise<GetActivePromotionsResDTO>{
    return this.promotionRepository.getActivePromotions();
  }
}
