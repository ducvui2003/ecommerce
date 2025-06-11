import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { SUPPLIER_REPOSITORY } from '@shared/constants/dependency.constant';
import { PrismaSupplierRepository } from '@route/supplier/supplier.repository';

@Module({
  controllers: [SupplierController],
  providers: [
    SupplierService,
    {
      provide: SUPPLIER_REPOSITORY,
      useClass: PrismaSupplierRepository,
    },
  ],
})
export class SupplierModule {}
