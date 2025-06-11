import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CATEGORY_REPOSITORY } from '@shared/constants/dependency.constant';
import { PrismaCategoryRepository } from '@route/category/category.repository';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: PrismaCategoryRepository,
    },
  ],
})
export class CategoryModule {}
