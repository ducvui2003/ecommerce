import envConfig from '@config/env.config';
import { Inject, Injectable } from '@nestjs/common';
import {
  CreatedAddressDTO,
  UpdatedAddressDTO,
} from '@route/address/address.dto';
import {
  AddressMaxEntriesException,
  AddressNotFoundException,
  AddressNotValidException,
} from '@route/address/address.error';
import { AddressRepository } from '@route/address/address.repository';
import {
  ADDRESS_TYPE,
  ADDRESS_URL,
  ADDRESS_VERSION,
  CARRIER_URL,
  SHIPPING_FEE_URL,
} from '@shared/constants/api.constraint';
import { isNotFoundError } from '@shared/helper.shared';
import { CacheService } from '@shared/services/cache/cache.service';
import {
  createNamespaces,
  KEY_CARRIER,
  keyAddress,
  NAMESPACE_ADDRESS,
} from '@shared/services/cache/cache.util';

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

type Response<T> = {
  code: number;
  message: string;
  data: T;
};

type Carrier = {
  id: number;
  name: string;
  logo: string;
  services: Record<
    string,
    {
      id: number;
      name: string;
      description: string;
    }
  >;
};

type CalculationRequest = {
  fromCityName: string;
  fromDistrictName: string;
  toCityName: string;
  toDistrictName: string;
  codMoney?: number;
  length?: number;
  width?: number;
  height?: number;
};

type CalculateResponse = {
  carrierId: number;
  carrierName: string;
  logo: string;
  serviceId: number;
  serviceName: string;
  serviceTypeName: string;
  serviceDescription: string;
  estimatedDeliveryTime: number;
  shipFee: number;
  codFee: number;
  declaredFee: number;
  isBulkyGoods: 1 | 0;
  isRequiredInsurance: 1 | 0;
};

@Injectable()
export class AddressService {
  private readonly MAX_ENTRIES = 5;
  private readonly DEFAULT_CAREER_ID = '5';
  private readonly DEFAULT_SHIPPING_WEIGHT = 9000;
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
      // 1. Define key of address that saved in redis
      const key = keyAddress(type, parentId);

      // 2. Check if redis has value with key, return value.
      // Otherwise get fetch data from external resource
      const cacheData: Address | null =
        await this.cacheService.get<Address>(key);
      if (cacheData) {
        return cacheData;
      }

      const data: Address = await this.getAddressExternal(type, parentId);
      this.cacheService.set<Address>(key, data);
      return data;
    } catch (error) {
      if (isNotFoundError(error)) {
        throw AddressNotFoundException;
      }
      throw error;
    }
  }

  public async createAddress(userId: number, body: CreatedAddressDTO) {
    // 1. Check Address is valid
    const isValid = await this.isAddressValid({
      ward: body.ward,
      district: body.district,
      province: body.province,
    });
    if (!isValid) throw AddressNotValidException;

    // 2. Check Entries in table Address that need to lower than MAX_ENTRIES
    const isMaxAddress = await this.isMaxAddress(userId);
    if (!isMaxAddress) throw AddressMaxEntriesException(this.MAX_ENTRIES);

    // 3. Save Address to database
    return await this.addressRepository.save({
      detail: body.detail,
      ward: body.ward,
      district: body.district,
      province: body.province,
      userId: userId,
    });
  }

  public async updateAddress(userId: number, body: UpdatedAddressDTO) {
    // 1. Check Address is valid
    const isValid = await this.isAddressValid({
      ward: body.ward,
      district: body.district,
      province: body.province,
    });
    if (!isValid) throw AddressNotValidException;

    // 2. Update Address in database with condition is address id and user id
    await this.addressRepository.update(body.id, {
      detail: body.detail,
      ward: body.ward,
      district: body.district,
      province: body.province,
      userId: userId,
    });
  }

  public async deleteAddress(id: number, userId: number) {
    try {
      // Return deleted record if deleted success
      const deleted = await this.addressRepository.delete(id, userId);
      if (deleted) return true;
      return false;
    } catch (error) {
      if (isNotFoundError(error)) {
        throw AddressNotFoundException;
      }
      throw error;
    }
  }

  private async isMaxAddress(userId: number): Promise<boolean> {
    const countDB = await this.addressRepository.countByUserId(userId);
    return countDB < this.MAX_ENTRIES;
  }

  private async getAddressExternal(
    type: ADDRESS_TYPE,
    parentId: number | null = null,
  ): Promise<Address> {
    // 1. Create a form and sent to external service
    const data = {
      type: type,
    };

    if (type == 'CITY' && parentId) {
      throw new Error('CITY not has parent id param');
    }

    if (parentId) {
      data['parentId'] = parentId;
    }

    const formData = this.createFormData();
    formData.append('data', JSON.stringify(data));

    const res = await fetch(ADDRESS_URL, {
      method: 'POST',
      body: formData,
    });

    // 2. Check response has data
    const body: Response<Address> = await res.json();
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

  private createFormData(): FormData {
    const formData = new FormData();
    formData.append('version', ADDRESS_VERSION);
    formData.append('appId', envConfig.ADDRESS_APP_ID.toString());
    formData.append('businessId', envConfig.ADDRESS_BUSINESS_ID);
    formData.append('accessToken', envConfig.ADDRESS_ACCESS_TOKEN);
    return formData;
  }

  public async getCarrier(): Promise<Carrier> {
    // 1. Define key of address that saved in redis
    const key = createNamespaces(NAMESPACE_ADDRESS, KEY_CARRIER) as string;

    // 2. Check if redis has value with key, return value.
    // Otherwise get fetch data from external resource
    const cacheData: Carrier | null = await this.cacheService.get<Carrier>(key);
    if (cacheData) {
      return cacheData;
    }
    const data = await this.getExternalCarrier();
    this.cacheService.set<Carrier>(key, data);
    return data;
  }

  private async getExternalCarrier() {
    const formData = this.createFormData();

    const res = await fetch(CARRIER_URL, {
      method: 'POST',
      body: formData,
    });

    const body: Response<Record<string, Carrier>> = await res.json();
    if (body.code === 0) {
      throw new Error('Error when fetch');
    }

    const carrier = body.data[this.DEFAULT_CAREER_ID];

    return carrier;
  }

  public async calculateFeeByWeight({
    fromCityName,
    fromDistrictName,
    toCityName,
    toDistrictName,
    width,
    height,
    length,
    codMoney = 0,
  }: CalculationRequest): Promise<CalculateResponse> {
    const data = {
      fromCityName: fromCityName,
      fromDistrictName: fromDistrictName,
      toCityName: toCityName,
      toDistrictName: toDistrictName,
      shippingWeight: this.DEFAULT_SHIPPING_WEIGHT,
      carrierIds: [this.DEFAULT_CAREER_ID],
      length: length,
      width: width,
      height: height,
      codMoney: codMoney,
    };

    const formData = this.createFormData();
    formData.append('data', JSON.stringify(data));
    const res = await fetch(SHIPPING_FEE_URL, {
      method: 'POST',
      body: formData,
    });

    const body: Response<CalculateResponse[]> = await res.json();
    if (body.code === 0) {
      throw new Error('Error when fetch');
    }

    return body.data[0];
  }
}
