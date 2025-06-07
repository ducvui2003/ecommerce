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
import { OrderChangeNotAllow, OrderNotFound } from '@route/order/order.error';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { OrderStatusType } from '@shared/constants/order.constant';
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

  async getOrderStatusCanChange(orderId: number): Promise<OrderStatusType[]> {
    try {
      const { orderStatus } =
        await this.orderRepository.getCurrentStatus(orderId);
      if (orderStatus === 'PENDING') return ['CANCELED'];
      if (orderStatus === 'PAID') {
        return ['DELIVERING', 'CANCELED', 'COMPLETE'];
      }
      if (orderStatus === 'DELIVERING') {
        return ['COMPLETE', 'CANCELED'];
      }
      if (orderStatus === 'COMPLETE' || orderStatus === 'CANCELED') return [];
      return [];
    } catch (e) {
      if (isNotFoundError(e)) throw OrderNotFound;
      throw e;
    }
  }

  async changeStatus(orderId: number, status: OrderStatusType): Promise<void> {
    const orderStatusCanChange = await this.getOrderStatusCanChange(orderId);
    if (orderStatusCanChange.length === 0) {
      throw OrderChangeNotAllow();
    }
    if (!orderStatusCanChange.includes(status)) {
      throw OrderChangeNotAllow(orderStatusCanChange);
    }
    await this.orderRepository.changeOrderStatus(orderId, status);
  }
}
