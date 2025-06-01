import { Inject, Injectable } from '@nestjs/common';
import {
  FILE_SERVICE,
  SHARED_CART_ITEM_REPOSITORY,
  SHARED_PAYMENT_REPOSITORY,
  SHARED_PRODUCT_REPOSITORY,
} from '@shared/constants/dependency.constant';
import {
  isNotFoundError,
  toDecimalSchema,
  transformItemsPaging,
} from '@shared/helper.shared';
import { OrderItemType } from '@shared/models/order-item.model';
import { SharedCartItemRepository } from '@shared/repositories/shared-cart-item.repository';
import { PrismaService } from '@shared/services/prisma.service';
import { OrderRepository } from './order.repository';
import { SharedPrismaPaymentRepository } from '@shared/repositories/shared-payment.repository';
import { SharedProductRepository } from '@shared/repositories/shared-product.repository';
import { ProductType } from '@shared/models/product.model';
import {
  CreateOrderType,
  OrderDetailResSchema,
  OrderDetailResType,
  OrderResSchema,
  OrderResType,
  SearchOrderType,
} from '@route/order/order.schema';

import { PaymentType } from '@shared/models/payment.model';
import { OrderStatus } from '@shared/constants/order.constant';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { OrderType } from '@shared/models/order.model';
import { FileService } from '@shared/services/file/file.service';
import { ProductNotFoundException } from '@shared/exceptions/product.exception';
import { OrderNotFound } from '@route/order/order.error';

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
    @Inject(FILE_SERVICE)
    private readonly fileService: FileService,
  ) {}

  async createOrder(
    userId: number,
    dto: CreateOrderType,
  ): Promise<
    PaymentType & {
      totalAmount: number;
      orderId: number;
    }
  > {
    // 1. Calculate price
    const cartItems = await this.sharedCartItemRepository.findCartItemByIdIn(
      dto.cartItemIds,
    );

    let totalAmount = 0;
    const recordPriceOrderItem: Record<number, number> = {};
    cartItems.forEach((item) => {
      const basePrice = item.product?.basePrice?.toNumber() ?? 0;
      let price = 0;
      if (item.optionId) {
        const optionPrice = item.option?.price?.toNumber() ?? 0;
        price = (basePrice + optionPrice) * item.quantity;
      } else {
        price = basePrice * item.quantity;
      }
      recordPriceOrderItem[item.id] = price;
      totalAmount += price;
    });

    return this.prismaService.$transaction(async (tx) => {
      // 1. Create Order
      const order = await this.orderRepository.createOrder(
        {
          userId: userId,
          totalAmount: toDecimalSchema(totalAmount),
          feeShipping: toDecimalSchema(dto.feeShipping),
          receiver: dto.receiver,
          status: OrderStatus.PENDING,
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
        const product = products.find((i) => i.id === item.productId);
        console.log(item.option);
        return {
          orderId: order.id,
          price: toDecimalSchema(recordPriceOrderItem[item.id] ?? 0),
          product: {
            id: product!.id,
            name: product!.name,
            category: product!.category.name,
            media: product!.thumbnail?.publicId
              ? this.fileService.getUrl(product!.thumbnail.publicId)
              : '',
            price: product!.basePrice.toNumber(),
            supplier: product!.supplier.name,
            options: item.option
              ? {
                  id: item.option.id,
                  name: item.option.name,
                  price: item.option.price.toNumber(),
                }
              : undefined,
          },
          quantity: item.quantity,
        };
      });
      await this.orderRepository.createOrderItem(orderItems, tx);

      // 3. Create Payment
      const payment = await this.sharedPaymentRepository.createPayment(
        {
          orderId: order.id,
          provider: dto.method,
          status: 'PENDING',
        },
        tx,
      );

      // 4. Delete cart item

      return {
        ...payment,
        totalAmount: totalAmount,
        orderId: order.id,
      };
    });
  }

  async search(
    userId: number,
    dto: SearchOrderType,
  ): Promise<Paging<OrderResType>> {
    const page: Paging<OrderResType> = await this.orderRepository.search(
      userId,
      dto,
    );
    return transformItemsPaging<OrderResType, OrderResType>(page, (item) => {
      return OrderResSchema.parse(item);
    });
  }

  async getDetail(
    userId: number,
    orderId: number,
  ): Promise<OrderDetailResType> {
    try {
      const data: OrderType = await this.orderRepository.getDetail(
        userId,
        orderId,
      );
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
