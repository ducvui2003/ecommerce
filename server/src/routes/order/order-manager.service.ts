import { Inject, Injectable } from '@nestjs/common';
import { isNotFoundError, transformItemsPaging } from '@shared/helper.shared';

import { OrderManagerRepository } from '@route/order/order-manager.repository';
import {
  OrderDetailResSchema,
  OrderDetailResType,
  OrderRepositoryType,
  OrderResSchema,
  OrderResType,
  SearchOrderType,
} from '@route/order/order-manager.schema';
import { ORDER_MANAGER_REPOSITORY } from '@route/order/order.constant';
import { OrderNotFound } from '@route/order/order.error';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { OrderType } from '@shared/models/order.model';

@Injectable()
export class OrderManagerService {
  constructor(
    @Inject(ORDER_MANAGER_REPOSITORY)
    private readonly orderRepository: OrderManagerRepository,
  ) {}

  async search(dto: SearchOrderType): Promise<Paging<OrderResType>> {
    const page: Paging<OrderRepositoryType> =
      await this.orderRepository.search(dto);
    return transformItemsPaging<OrderResType, OrderRepositoryType>(
      page,
      (item) => {
        const parse: OrderResType = {
          ...item,
          receiver: {
            name: item.receiverName,
            phone: item.receiverPhone,
            email: item.receiverEmail,
          },
          payment: {
            id: item.paymentId,
            provider: item.paymentProvider,
            status: item.paymentStatus,
            createdAt: item.paymentCreatedAt,
          },
        };
        return OrderResSchema.parse(parse);
      },
    );
  }

  async getDetail(orderId: number): Promise<OrderDetailResType> {
    try {
      const data: OrderType = await this.orderRepository.getDetail(orderId);
      const dataParse = {
        ...data,
        items:
          data.orderItem?.map((item) => {
            return {
              ...item.product,
              quantity: item.quantity,
            };
          }) ?? [],
      };
      return OrderDetailResSchema.parse(dataParse);
    } catch (e) {
      if (isNotFoundError(e)) throw OrderNotFound;
      throw e;
    }
  }
}
