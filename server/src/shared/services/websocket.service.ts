import { Inject, Injectable } from '@nestjs/common';
import { CacheService } from '@shared/services/cache/cache.service';

@Injectable()
export class WebsocketService {
  constructor(@Inject() private readonly cacheService: CacheService) {
    this.cacheService = cacheService;
  }
  createPaymentListener(userId: number, socketId: string) {
    this.cacheService.set(`payment:${userId}`, socketId);
  }

  getPaymentListener(userId: number): Promise<number | null> {
    return this.cacheService.get<number>(`payment:${userId}`);
  }

  deletePaymentListener(userId: number) {
    this.cacheService.del(`payment:${userId}`);
  }
}
