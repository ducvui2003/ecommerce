import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaAddressRepository } from '@route/address/address.repository';

@Module({
  controllers: [AddressController],
  providers: [
    AddressService,
    {
      provide: 'ADDRESS_REPOSITORY',
      useClass: PrismaAddressRepository,
    },
  ],
})
export class AddressModule {}
