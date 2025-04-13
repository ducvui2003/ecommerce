import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from '@route/address/address.controller';
import {
  AddressRepository,
  PrismaAddressRepository,
} from '@route/address/address.repository';
import { AddressService } from '@route/address/address.service';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import { UserType } from '@shared/models/user.model';
import { SharedModule } from '@shared/shared.module';

describe('Test AddressController', () => {
  let module: TestingModule;
  let controller: AddressController;

  // // Create a mock user object that will be injected by the guard
  // const mockUser: UserType = {
  //   id: 1,
  //   name: 'Le Anh Đức',
  //   email: 'ducvui2003@gmail.com',
  // };

  // const mockAddressDatabase: AddressRepository = {
  //   save: jest.fn(),
  //   update: jest.fn(),
  // };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        AddressService,
        {
          provide: 'ADDRESS_REPOSITORY',
          useClass: PrismaAddressRepository,
        },
        {
          provide: AuthenticationGuard,
          useValue: { canActivate: jest.fn(() => true) },
        },
      ],
      imports: [SharedModule],
    }).compile();

    controller = module.get<AddressController>(AddressController);
  });

  // 👇 Clean up resources after all tests
  afterAll(async () => {
    await module.close(); // 👈 Properly close the module
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Test Get Province, District, Ward', () => {
    const mockAddressValid = {
      province: {
        id: 254,
        name: 'Hà Nội',
      },
      district: {
        id: 318,
        name: 'Quận Ba Đình',
      },
      ward: {
        id: 1053,
        name: 'Phường Cống Vị',
      },
    };

    it('getProvince', async () => {
      const provinces = await controller.getProvince();

      expect(provinces).toBeDefined();

      const province = provinces.find(
        (item) =>
          item.id === mockAddressValid.province.id &&
          item.name === mockAddressValid.province.name,
      );
      expect(province).toBeDefined();
    });

    it('getDistrict', async () => {
      const districts = await controller.getDistrict(
        mockAddressValid.province.id,
      );
      expect(districts).toBeDefined();
      expect(
        districts.find(
          (item) =>
            item.id == mockAddressValid.district.id &&
            item.name == mockAddressValid.district.name,
        ),
      ).toBeDefined();
    });

    it('getWard', async () => {
      const wards = await controller.getWard(mockAddressValid.district.id);
      expect(wards).toBeDefined();
      expect(
        wards.find(
          (item) =>
            item.id == mockAddressValid.ward.id &&
            item.name == mockAddressValid.ward.name,
        ),
      ).toBeDefined();
    });
  });

  describe('User interact with address module', () => {});
});
