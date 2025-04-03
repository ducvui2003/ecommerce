import envConfig from '@config/env.config';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
  constructor(private readonly cacheService: CacheService) {}

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

  public async getAddressExternal(
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
}
