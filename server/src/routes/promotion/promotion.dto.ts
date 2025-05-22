import { PromotionType } from '@shared/models/promotion.model';

type GetActivePromotionsResDTO = Array<Omit<PromotionType, 'createdAt' | 'updatedAt' | 'deletedAt' | 'isDeleted'>>

export {GetActivePromotionsResDTO};