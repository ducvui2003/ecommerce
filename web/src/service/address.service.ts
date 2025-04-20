import http from '@/lib/http';
import { DistrictType, ProvinceType, WardType } from '@/types/address.type';
import { ResponseApi } from '@/types/api.type';

const addressService = {
  getProvince: async (): Promise<ProvinceType[]> => {
    try {
      const res = await http.get<ResponseApi<ProvinceType[]>>(
        '/api/v1/address/province',
      );
      const body = res.payload.data;

      return body;
    } catch (error) {
      throw error;
    }
  },

  getDistrict: async (provinceId: number): Promise<DistrictType[]> => {
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      await sleep(5000);
      const res = await http.get<ResponseApi<DistrictType[]>>(
        `/api/v1/address/district/${provinceId}`,
      );
      const body = res.payload.data;

      return body;
    } catch (error) {
      throw error;
    }
  },

  getWard: async (districtId: number): Promise<WardType[]> => {
    try {
      const res = await http.get<ResponseApi<WardType[]>>(
        `/api/v1/address/ward/${districtId}`,
      );
      const body = res.payload.data;

      return body;
    } catch (error) {
      throw error;
    }
  },
};

export default addressService;
