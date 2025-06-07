import { GetActivePromotionsResDTO } from '@route/promotion/promotion.dto';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/prisma.service';

export interface PromotionRepository {
  getActivePromotions(): Promise<GetActivePromotionsResDTO>;
}

@Injectable()
export class PrismaPromotionRepository implements PromotionRepository {
  constructor(@Inject() private readonly prismaService: PrismaService) {}

  async getActivePromotions(): Promise<GetActivePromotionsResDTO> {
    const promotions = await this.prismaService.promotion.findMany({
      where: { status: 'ACTIVE' },
    });
    return promotions.map(
      ({ createdAt, updatedAt, deletedAt, percent, maxAmount, ...rest }) => ({
        ...rest,
        percent: percent.toNumber(),
        maxAmount: maxAmount.toNumber(),
      }),
    );
  }
}
