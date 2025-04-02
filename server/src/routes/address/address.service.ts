import envConfig from '@config/env.config';
import { Injectable } from '@nestjs/common';
import {
  ADDRESS_TYPE,
  ADDRESS_URL,
  ADDRESS_VERSION,
} from '@shared/constants/api.constraint';

type Province = {
  id: number;
  name: string;
};

type District = Province & {
  parentId: number;
};

type Ward = District;

type Response = {
  code: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
  data: Province[] | District[] | Ward[];
};

@Injectable()
export class AddressService {
  getAddress(type: ADDRESS_TYPE, parentId: number | null = null) {}

  public async getAddressExternal(
    type: ADDRESS_TYPE,
    parentId: number | null = null,
    // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
  ): Promise<Province[] | District[] | Ward[]> {
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

    if (body.code === 0) {
      throw new Error('Empty address');
    }

    return body.data;
  }
}
