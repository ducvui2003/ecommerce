import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '@shared/shared.module';
import { PrismaAddressRepository } from '@route/address/address.repository';
import { AddressService } from '@route/address/address.service';

describe('Test AddressService', () => {
  let service: AddressService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: 'ADDRESS_REPOSITORY',
          useClass: PrismaAddressRepository,
        },
      ],
      imports: [SharedModule],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  // 👇 Clean up resources after all tests
  afterAll(async () => {
    await module.close(); // 👈 Properly close the module
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('External service', () => {
    let province, district, ward;
    it('should get provinces', async () => {
      const provinces = await service.getAddress('CITY');
      expect(provinces).toBeDefined();
      province = provinces[0].id;
    });

    it('should get districts based on province', async () => {
      const districts = await service.getAddress('DISTRICT', province);
      expect(districts).toBeDefined();
      district = districts[0].id;
    });

    it('should get wards based on district', async () => {
      const wards = await service.getAddress('WARD', district);
      expect(wards).toBeDefined();
      ward = wards[0].id;
    });

    it('getCarrier', async () => {
      const carrier = await service.getCarrier();
      expect(carrier).toBeDefined();
    });

    it('calculateFeeByWeight', async () => {
      const response = await service.calculateFeeByWeight({
        fromCityName: 'Hà Nội',
        fromDistrictName: 'Quận Ba Đình',
        toCityName: 'Bình Dương',
        toDistrictName: 'Thành phố Dĩ An',
      });
      console.log(response);
    });
  });

  describe('Check valid address', () => {
    const validAddress = {
      province: 'Hà Nội',
      district: 'Quận Ba Đình',
      ward: 'Phường Cống Vị',
    };
    const invalidAddresses = [
      { province: 'Hà Nội1', district: 'Quận Ba Đình', ward: 'Phường Cống Vị' }, // invalid province
      { province: 'Hà Nội', district: 'Quận B1a Đình', ward: 'Phường Cống Vị' }, // invalid district
      { province: 'Hà Nội', district: 'Quận Ba Đình', ward: 'Phường Cống' }, // invalid ward
    ];

    it('should validate correct address', async () => {
      const isValid = await service.isAddressValid(validAddress);
      expect(isValid).toBe(true);
    });

    invalidAddresses.forEach((address) => {
      it(`should return false for invalid address: ${JSON.stringify(address)}`, async () => {
        const isValid = await service.isAddressValid(address);
        expect(isValid).toBe(false);
      });
    });
  });
});
