import { Injectable } from '@nestjs/common';
import { OrderStatusType } from '@shared/constants/order.constant';
import { PrismaService } from '@shared/services/prisma.service';

export interface SharedOrderRepository {
  updateStatusOrder(orderId: number, status: OrderStatusType): Promise<void>;
}

@Injectable()
export class PrismaOrderRepository implements SharedOrderRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async updateStatusOrder(
    orderId: number,
    status: OrderStatusType,
  ): Promise<void> {
    await this.prismaService.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: status,
      },
    });
  }
}
