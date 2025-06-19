import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderPrismaRepository } from '@route/order/order.repository';
import { ProductModule } from '@route/product/product.module';
import { OrderManagerController } from '@route/order/order-manager.controller';
import {
  ORDER_MANAGER_REPOSITORY,
  ORDER_REPOSITORY,
} from '@route/order/order.constant';
import { OrderManagerService } from '@route/order/order-manager.service';
import { OrderManagerPrismaRepository } from '@route/order/order-manager.repository';
import { UserModule } from '@route/user/user.module';

@Module({
  imports: [ProductModule, UserModule],
  controllers: [OrderController, OrderManagerController],
  providers: [
    OrderService,
    OrderManagerService,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderPrismaRepository,
    },
    {
      provide: ORDER_MANAGER_REPOSITORY,
      useClass: OrderManagerPrismaRepository,
    },
  ],
})
export class OrderModule {}
