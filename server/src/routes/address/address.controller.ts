import { Controller, Get, Param } from '@nestjs/common';
import { AddressService } from '@route/address/address.service';

@Controller('/api/v1/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('/province')
  public getProvince() {
    return this.addressService.getAddress('CITY');
  }

  @Get('/district/:province_id')
  public getDistrict(@Param('province_id') provinceId: number) {
    return this.addressService.getAddress('DISTRICT', provinceId);
  }

  @Get('/ward/:district_id')
  public getWard(@Param('district_id') districtId: number) {
    return this.addressService.getAddress('WARD', districtId);
  }
}
