import { Inject, Injectable } from '@nestjs/common';
import {
  CreateOrderType,
  OrderDetailResSchema,
  OrderDetailResType,
  OrderResSchema,
  OrderResType,
  SearchOrderType,
} from '@route/order/order.schema';
import {
  FILE_SERVICE,
  SHARED_PAYMENT_REPOSITORY,
  SHARED_PRODUCT_REPOSITORY,
} from '@shared/constants/dependency.constant';
import {
  isNotFoundError,
  toDecimalSchema,
  transformItemsPaging,
} from '@shared/helper.shared';
import { OrderItemType } from '@shared/models/order-item.model';
import { SharedPrismaPaymentRepository } from '@shared/repositories/shared-payment.repository';
import { SharedProductRepository } from '@shared/repositories/shared-product.repository';
import { PrismaService } from '@shared/services/prisma.service';
import { OrderRepository } from './order.repository';

import { RoleName } from '@route/auth/auth.const';
import { ORDER_REPOSITORY } from '@route/order/order.constant';
import { OrderNotFound } from '@route/order/order.error';
import { USER_REPOSITORY } from '@route/user/user.const';
import { UserRepository } from '@route/user/user.repository';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { OrderStatus } from '@shared/constants/order.constant';
import { UserNotFoundException } from '@shared/exceptions/user.exception';
import { OrderType } from '@shared/models/order.model';
import { PaymentType } from '@shared/models/payment.model';
import { FileService } from '@shared/services/file/file.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,

    @Inject()
    private readonly prismaService: PrismaService,
    @Inject(SHARED_PAYMENT_REPOSITORY)
    private readonly sharedPaymentRepository: SharedPrismaPaymentRepository,
    @Inject(SHARED_PRODUCT_REPOSITORY)
    private readonly sharedProductRepository: SharedProductRepository,
    @Inject(FILE_SERVICE)
    private readonly fileService: FileService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
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
    const cartItems = await this.orderRepository.findCartItemByIdIn(
      dto.cartItemIds,
    );

    let totalAmount = 0;
    const recordPriceOrderItem: Record<number, number> = {};

    cartItems.forEach((item) => {
      let price = 0;
      const { basePrice, salePrice } = item.product;
      let productPrice = 0;
      if (salePrice) {
        productPrice = Math.min(basePrice.toNumber(), salePrice.toNumber());
      } else {
        productPrice = basePrice.toNumber();
      }
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
      await this.orderRepository.deleteCartItemByIdIn(dto.cartItemIds, tx);

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
            const { id, product, quantity } = item;
            const { id: productId, ...restProduct } = product;
            return {
              ...restProduct,
              id,
              productId,
              quantity,
            };
          }) ?? [],
      };
      return OrderDetailResSchema.parse(dataParse);
    } catch (e) {
      if (isNotFoundError(e)) throw OrderNotFound;
      throw e;
    }
  }

  async cancelOrder(id: number, userId: number): Promise<void> {
    const order = await this.orderRepository.findById(id);
    const user = await this.userRepository.getInfo(userId);

    if (!order) throw OrderNotFound;
    if (!user) throw new UserNotFoundException();

    const isAdmin = user.role === RoleName.ADMIN;

    if (!isAdmin && order.userId !== userId) {
      throw new Error('Not authorized to cancel this order');
    }

    if (!isAdmin && order.status !== OrderStatus.PENDING) {
      throw new Error(
        'Order cannot be cancelled unless it is in PENDING status',
      );
    }

    await this.orderRepository.updateOrderStatus(id);
  }
}
