import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';

describe('AddressService', () => {
  let service: AddressService;
  let province, district, ward;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressService],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get address from external service', () => {
    it('get provinces from external service', async () => {
      const provinces = await service.getAddressExternal('CITY');
      province = provinces[0].id;
      const name = provinces[0].name;
      console.info('province', province, name);
    });

    it('get districts from external service', async () => {
      const districts = await service.getAddressExternal('DISTRICT', province);
      district = districts[0].id;
      const name = districts[0].name;
      console.info('district', district, name);
    });

    it('get wards from external service', async () => {
      const wards = await service.getAddressExternal('WARD', district);
      ward = wards[0].id;
      const name = wards[0].name;
      console.info('ward', ward, name);
    });
  });
});
