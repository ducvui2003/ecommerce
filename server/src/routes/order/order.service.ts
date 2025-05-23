import { OrderRepository } from './order.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductNotFoundException } from '@shared/exceptions/product.exception';
import { ProductRepository } from '@route/product/interfaces/product-repository.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject()
    private readonly orderRepository: OrderRepository,
    @Inject('PRODUCT_REPOSITORY') private readonly productRepository: ProductRepository
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<void> {
    const order = await this.orderRepository.createOrder({
      userId: createOrderDto.userId,
      totalAmount: createOrderDto.totalAmount,
      feeShipping: createOrderDto.feeShipping,
      receiver: createOrderDto.receiver,
    });

    for (const item of createOrderDto.orderItem) {
      const product = await this.productRepository.getProductById(item.productId);

      if (!product) {
        throw new ProductNotFoundException();
      }
      await this.orderRepository.createOrderItem({
        orderId: order.id,
        quantity: item.quantity,
        price: item.price,
        product,
      });
    }
  }

}
