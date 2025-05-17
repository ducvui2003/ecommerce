import { Injectable } from '@nestjs/common';
import { SupplierType } from '@shared/models/supplier.model';
import { PrismaService } from '@shared/services/prisma.service';

export interface SupplierRepository {
  findAll(): Promise<SupplierType[]>;
}
@Injectable()
export class PrismaSupplierRepository implements SupplierRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<SupplierType[]> {
    return await this.prismaService.supplier.findMany();
  }
}
