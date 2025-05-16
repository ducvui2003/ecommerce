import { Inject, Injectable } from '@nestjs/common';
import { CategoryType } from '@shared/models/category.model';
import { PrismaService } from '@shared/services/prisma.service';

export interface CategoryRepository {
  findAll(): Promise<CategoryType[]>;
}

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}
  findAll(): Promise<CategoryType[]> {
    return this.prismaService.category.findMany();
  }
}
