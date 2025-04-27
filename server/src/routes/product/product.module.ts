import { Module } from '@nestjs/common';
import { ProductController } from '@route/product/product.controller';
import { ProductServiceImpl } from '@route/product/product.service';
import { ProductRepositoryImpl } from '@route/product/product.repository';
import { SharedModule } from '@shared/shared.module';

@Module({
  controllers: [ProductController],
  providers: [
    ProductServiceImpl,
    {
      provide: 'PRODUCT_REPOSITORY',
      useClass: ProductRepositoryImpl,
    },
  ],
})
export class ProductModule {}
