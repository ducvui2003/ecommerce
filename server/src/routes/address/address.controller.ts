import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  CreatedAddressDTO,
  UpdatedAddressDTO,
} from '@route/address/address.dto';
import { AddressService } from '@route/address/address.service';
import { AuthType } from '@shared/constants/auth.constant';
import { ActiveUser } from '@shared/decorators/actice-user.decorator';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';

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

  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @Post()
  @HttpCode(HttpStatus.OK)
  public addAddress(@ActiveUser('id') userId, @Body() body: CreatedAddressDTO) {
    return this.addressService.createAddress(userId, body);
  }

  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @Put()
  @HttpCode(HttpStatus.OK)
  public updateAddress(
    @ActiveUser('id') userId,
    @Body() body: UpdatedAddressDTO,
  ) {
    return this.addressService.createAddress(userId, body);
  }
}
