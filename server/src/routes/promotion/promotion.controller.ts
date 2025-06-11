import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { PromotionService } from './promotion.service';

@Controller('/api/v1/promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  async getActivePromotions() {
    return this.promotionService.getActivePromotions();
  }
}
