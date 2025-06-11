import { Inject, Injectable } from '@nestjs/common';
import { SupplierRepository } from '@route/supplier/supplier.repository';
import {
  SupplierResSchema,
  SupplierResType,
} from '@route/supplier/supplier.schema';
import { SUPPLIER_REPOSITORY } from '@shared/constants/dependency.constant';

@Injectable()
export class SupplierService {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplierRepository: SupplierRepository,
  ) {}
  async findAll(): Promise<SupplierResType> {
    const data = await this.supplierRepository.findAll();
    return SupplierResSchema.parse(data);
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }
}
