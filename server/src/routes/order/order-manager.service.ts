import { Inject, Injectable } from '@nestjs/common';
import {
  FILE_SERVICE,
  SHARED_CART_ITEM_REPOSITORY,
  SHARED_PAYMENT_REPOSITORY,
  SHARED_PRODUCT_REPOSITORY,
} from '@shared/constants/dependency.constant';
import { transformItemsPaging } from '@shared/helper.shared';
import { SharedCartItemRepository } from '@shared/repositories/shared-cart-item.repository';
import { SharedPrismaPaymentRepository } from '@shared/repositories/shared-payment.repository';
import { SharedProductRepository } from '@shared/repositories/shared-product.repository';
import { PrismaService } from '@shared/services/prisma.service';

import { OrderManagerRepository } from '@route/order/order-manager.repository';
import {
  OrderRepositoryType,
  OrderResSchema,
  OrderResType,
  SearchOrderType,
} from '@route/order/order-manager.schema';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { FileService } from '@shared/services/file/file.service';
import { ORDER_MANAGER_REPOSITORY } from '@route/order/order.constant';

@Injectable()
export class OrderManagerService {
  constructor(
    @Inject(ORDER_MANAGER_REPOSITORY)
    private readonly orderRepository: OrderManagerRepository,
    @Inject(SHARED_CART_ITEM_REPOSITORY)
    private readonly sharedCartItemRepository: SharedCartItemRepository,
    @Inject()
    private readonly prismaService: PrismaService,
    @Inject(SHARED_PAYMENT_REPOSITORY)
    private readonly sharedPaymentRepository: SharedPrismaPaymentRepository,
    @Inject(SHARED_PRODUCT_REPOSITORY)
    private readonly sharedProductRepository: SharedProductRepository,
    @Inject(FILE_SERVICE)
    private readonly fileService: FileService,
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
        console.log('parse', parse);
        return OrderResSchema.parse(parse);
      },
    );
  }
}
