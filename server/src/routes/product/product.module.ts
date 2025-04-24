import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaUserRepository } from '@route/user/user.repository';
import { ProductRepositoryImpl } from '@route/product/product.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService,
    {
      provide: 'PRODUCT_REPOSITORY',
      useClass: ProductRepositoryImpl,
    },],

})
export class ProductModule {}
