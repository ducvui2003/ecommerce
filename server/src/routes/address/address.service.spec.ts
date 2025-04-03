import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';
import { SharedModule } from '@shared/shared.module';

describe('AddressService', () => {
  let service: AddressService;
  let province, district, ward;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressService],
      imports: [SharedModule],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get address from external service', () => {
    it('get provinces from external service', async () => {
      const provinces = await service.getAddress('CITY');
      province = provinces[0].id;
      const name = provinces[0].name;
      console.info('province', province, name);
      expect(true).toBe(true);
    });

    it('get districts from external service', async () => {
      const districts = await service.getAddress('DISTRICT', province);
      district = districts[0].id;
      const name = districts[0].name;
      console.info('district', district, name);
      expect(true).toBe(true);
    });

    it('get wards from external service', async () => {
      const wards = await service.getAddress('WARD', district);
      ward = wards[0].id;
      const name = wards[0].name;
      console.info('ward', ward, name);
      expect(true).toBe(true);
    });
  });
});
