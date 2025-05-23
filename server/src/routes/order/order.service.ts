import { Inject, Injectable } from '@nestjs/common';
import {
  SHARED_CART_ITEM_REPOSITORY,
  SHARED_PAYMENT_REPOSITORY,
  SHARED_PRODUCT_REPOSITORY,
} from '@shared/constants/dependency.constant';
import { toDecimalSchema } from '@shared/helper.shared';
import { OrderItemType } from '@shared/models/order-item.model';
import { OrderStatusEnum } from '@shared/models/order.model';
import { SharedCartItemRepository } from '@shared/repositories/shared-cart-item.repository';
import { PrismaService } from '@shared/services/prisma.service';
import { OrderRepository } from './order.repository';
import { SharedPrismaPaymentRepository } from '@shared/repositories/shared-payment.repository';
import { SharedProductRepository } from '@shared/repositories/shared-product.repository';
import { ProductType } from '@shared/models/product.model';
import { CreateOrderType } from '@route/order/order.schema';

import { PaymentType } from '@shared/models/payment.model';

@Injectable()
export class OrderService {
  constructor(
    @Inject()
    private readonly orderRepository: OrderRepository,
    @Inject(SHARED_CART_ITEM_REPOSITORY)
    private readonly sharedCartItemRepository: SharedCartItemRepository,
    @Inject()
    private readonly prismaService: PrismaService,
    @Inject(SHARED_PAYMENT_REPOSITORY)
    private readonly sharedPaymentRepository: SharedPrismaPaymentRepository,
    @Inject(SHARED_PRODUCT_REPOSITORY)
    private readonly sharedProductRepository: SharedProductRepository,
  ) {}

  async createOrder(
    userId: number,
    dto: CreateOrderType,
  ): Promise<
    PaymentType & {
      totalAmount: number;
    }
  > {
    // 1. Calculate price
    const cartItems = await this.sharedCartItemRepository.findCartItemByIdIn(
      dto.orderItemIds,
    );

    let totalAmount = 0;
    cartItems.forEach((item) => {
      const basePrice = item.product?.basePrice?.toNumber() ?? 0;
      if (item.optionId) {
        const optionPrice = item.option?.price?.toNumber() ?? 0;
        totalAmount = (basePrice + optionPrice) * item.quantity;
      } else {
        totalAmount = basePrice * item.quantity;
      }
    });

    return this.prismaService.$transaction(async (tx) => {
      // 1. Create Order
      const order = await this.orderRepository.createOrder(
        {
          userId: userId,
          totalAmount: toDecimalSchema(totalAmount),
          feeShipping: toDecimalSchema(dto.feeShipping),
          receiver: dto.receiver,
          status: OrderStatusEnum.enum.PENDING,
        },
        tx,
      );

      // 2. Create order item

      const products = await this.sharedProductRepository.findProductByIdIn(
        cartItems.map((item) => item.productId),
      );

      const orderItems: Pick<
        OrderItemType,
        'orderId' | 'price' | 'product' | 'quantity'
      >[] = cartItems.map((item) => {
        const product: ProductType = products.find(
          (i) => i.id === item.productId,
        );
        return {
          orderId: order.id,
          price: toDecimalSchema(totalAmount),
          product: {
            id: product!.id,
            name: product!.name,
            category: product!.category.name,
            media: '',
            price: product!.basePrice,
            supplier: product.supplier.name,
            options: item.option && {
              id: item.option.id,
              name: item.option.name,
              price: item.option.price,
            },
          },
          quantity: item.quantity,
        };
      });
      this.orderRepository.createOrderItem(orderItems, tx);

      // 3. Create Payment
      const payment = await this.sharedPaymentRepository.createPayment(
        {
          orderId: order.id,
          provider: dto.method,
          status: 'PENDING',
        },
        tx,
      );

      return {
        ...payment,
        totalAmount: totalAmount,
      };
    });
  }
}
