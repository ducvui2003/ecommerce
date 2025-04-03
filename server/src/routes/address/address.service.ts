import envConfig from '@config/env.config';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatedAddressDTO,
  UpdatedAddressDTO,
} from '@route/address/address.dto';
import { AddressRepository } from '@route/address/address.repository';
import {
  ADDRESS_TYPE,
  ADDRESS_URL,
  ADDRESS_VERSION,
} from '@shared/constants/api.constraint';
import { CacheService } from '@shared/services/cache/cache.service';
import { keyAddress } from '@shared/services/cache/cache.util';

type Base = {
  id: number;
  name: string;
};

type Province = Base & {
  parentId: number;
  countryId: number;
};

type District = Base & {
  cityId: string;
  cityLocationId: string;
  parentId: string;
};

type Ward = Base & {
  districtId: string;
  districtLocationId: string;
  parentId: string;
};
// eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
type Address = Province[] | District[] | Ward[];

type Response = {
  code: number;
  message: string;
  data: Address;
};

@Injectable()
export class AddressService {
  constructor(
    private readonly cacheService: CacheService,
    @Inject('ADDRESS_REPOSITORY')
    private readonly addressRepository: AddressRepository,
  ) {}

  async getAddress(
    type: ADDRESS_TYPE,
    parentId: number | null = null,
  ): Promise<Address> {
    try {
      const key = keyAddress(type, parentId);

      const cacheData: Address | null =
        await this.cacheService.get<Address>(key);
      if (cacheData) {
        return cacheData;
      }

      const data: Address = await this.getAddressExternal(type, parentId);
      this.cacheService.set<Address>(key, data);
      return data;
    } catch (e) {
      const error = e as Error;
      throw new NotFoundException(error.message);
    }
  }

  public async createAddress(userId: number, body: CreatedAddressDTO) {
    const isValid = await this.isAddressValid({
      ward: body.ward,
      district: body.district,
      province: body.province,
    });
    if (!isValid) throw new NotFoundException('Address not valid');

    await this.addressRepository.save({
      detail: body.detail,
      ward: body.ward,
      district: body.district,
      province: body.province,
      userId: userId,
    });
  }

  public async updateAddress(userId: number, body: UpdatedAddressDTO) {
    const isValid = await this.isAddressValid({
      ward: body.ward,
      district: body.district,
      province: body.province,
    });
    if (!isValid) throw new NotFoundException('Address not valid');

    await this.addressRepository.update(body.id, {
      detail: body.detail,
      ward: body.ward,
      district: body.district,
      province: body.province,
      userId: userId,
    });
  }

  private async getAddressExternal(
    type: ADDRESS_TYPE,
    parentId: number | null = null,
  ): Promise<Address> {
    const data = {
      type: type,
    };

    if (type == 'CITY' && parentId) {
      throw new Error('CITY not has parent id param');
    }

    if (parentId) {
      data['parentId'] = parentId;
    }

    const formData = new FormData();
    formData.append('version', ADDRESS_VERSION);
    formData.append('appId', envConfig.ADDRESS_APP_ID.toString());
    formData.append('businessId', envConfig.ADDRESS_BUSINESS_ID);
    formData.append('accessToken', envConfig.ADDRESS_ACCESS_TOKEN);
    formData.append('data', JSON.stringify(data));

    const res = await fetch(ADDRESS_URL, {
      method: 'POST',
      body: formData,
    });

    const body: Response = await res.json();
    if (body.data.length === 0) {
      throw new Error(`Empty ${type.toLowerCase()} fetch`);
    }

    return body.data;
  }

  public async isAddressValid(data: {
    province: string;
    district: string;
    ward: string;
  }): Promise<boolean> {
    try {
      // 1. Get ProvinceId By Province Name
      const provinces: Province[] = (await this.getAddress(
        'CITY',
      )) as Province[];
      const provinceId =
        provinces.find((item) => item.name == data.province)?.id ?? 0;

      // 2. Check ProvinceId !=0
      if (!provinceId) return false;

      // 3. Get Districts By ProvinceId
      const districts: District[] = (await this.getAddress(
        'DISTRICT',
        provinceId,
      )) as District[];
      const districtId =
        districts.find((item) => item.name == data.district)?.id ?? 0;

      // 4. Check DistrictId
      if (!districtId) return false;

      // 5. Get Wards By DistrictId
      const wards: Ward[] = (await this.getAddress(
        'WARD',
        districtId,
      )) as Ward[];
      const wardId = wards.find((item) => item.name == data.ward)?.id ?? 0;

      // 6. Check WardId
      if (!wardId) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}
