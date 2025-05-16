import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '@route/category/category.repository';
import {
  CategoryResSchema,
  CategoryResType,
} from '@route/category/category.schema';
import { CATEGORY_REPOSITORY } from '@shared/constants/dependency.constant';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository,
  ) {}
  async findAll(): Promise<CategoryResType> {
    const data = await this.categoryRepository.findAll();
    return CategoryResSchema.parse(data);
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }
}
