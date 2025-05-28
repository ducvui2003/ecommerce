import { Module } from '@nestjs/common';
import { ProductServiceImpl } from '@route/product/product.service';
import { ProductRepositoryImpl } from '@route/product/product.repository';
import { ProductController } from '@route/product/product.controller';
import { ProductManagerController } from '@route/product/product-manager.controller';
import { ProductManagerService } from '@route/product/product-manager.service';

@Module({
  controllers: [ProductController, ProductManagerController],
  providers: [
    ProductManagerService,
    {
      provide: 'PRODUCT_SERVICE',
      useClass: ProductServiceImpl,
    },
    {
      provide: 'PRODUCT_REPOSITORY',
      useClass: ProductRepositoryImpl,
    },
  ],
  exports: ['PRODUCT_REPOSITORY'],
})
export class ProductModule {}
