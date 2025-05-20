import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  CreatedAddressDTO,
  UpdatedAddressDTO,
} from '@route/address/address.dto';
import { AddressService } from '@route/address/address.service';
import { AuthType } from '@shared/constants/auth.constant';
import { ActiveUser } from '@shared/decorators/active-user.decorator';
import { Auth } from '@shared/decorators/auth.decorator';
import { MessageHttp } from '@shared/decorators/message.decorator';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';

@Controller('/api/v1/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('/province')
  @HttpCode(HttpStatus.OK)
  @MessageHttp('Get provinces')
  public getProvince() {
    return this.addressService.getAddress('CITY');
  }

  @Get('/district/:province_id')
  @HttpCode(HttpStatus.OK)
  @MessageHttp('Get districts by province id')
  public getDistrict(@Param('province_id', ParseIntPipe) provinceId: number) {
    return this.addressService.getAddress('DISTRICT', provinceId);
  }

  @Get('/ward/:district_id')
  @HttpCode(HttpStatus.OK)
  @MessageHttp('Get wards by district id')
  public getWard(@Param('district_id', ParseIntPipe) districtId: number) {
    return this.addressService.getAddress('WARD', districtId);
  }

  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @Post()
  @HttpCode(HttpStatus.OK)
  @MessageHttp('Add address')
  public addAddress(@ActiveUser('id') userId, @Body() body: CreatedAddressDTO) {
    return this.addressService.createAddress(userId, body);
  }

  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @Put()
  @HttpCode(HttpStatus.OK)
  @MessageHttp('Update address')
  public updateAddress(
    @ActiveUser('id') userId,
    @Body() body: UpdatedAddressDTO,
  ) {
    return this.addressService.updateAddress(userId, body);
  }

  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @MessageHttp('Delete address')
  public deleteAddress(
    @Param('id', ParseIntPipe) id: number,
    @ActiveUser('id') userId: number,
  ) {
    return this.addressService.deleteAddress(id, userId);
  }

  @Get('/token')
  getToken(@Req() req) {
    console.log(req);
  }

  @Post('/callbback')
  callback(@Req() req) {
    console.log(req);
  }
  @Get('/verify')
  verify(@Req() req) {
    console.log(req);
  }
}
