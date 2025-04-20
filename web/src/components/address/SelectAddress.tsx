'use client';
import SelectDistrict from '@/components/address/SelectDistrict';
import SelectProvince from '@/components/address/SelectProvince';
import SelectWard from '@/components/address/SelectWard';
import React, { useEffect, useState } from 'react';

type AddressType = {
  province?: {
    id: number;
    name: string;
  };
  district?: {
    id: number;
    name: string;
  };
  ward?: {
    id: number;
    name: string;
  };
  detail?: string;
};

const SelectAddress = () => {
  const [address, setAddress] = useState<AddressType>({
    province: undefined,
    district: undefined,
    ward: undefined,
    detail: '',
  });

  const setProvince = (id: number, name: string) => {
    setAddress(() => {
      return {
        province: {
          id: id,
          name: name,
        },
      };
    });
  };

  const setDistrict = (id: number, name: string) => {
    setAddress((state: AddressType) => {
      return {
        ...state,
        district: {
          id: id,
          name: name,
        },
        ward: undefined,
      };
    });
  };

  const setWard = (id: number, name: string) => {
    setAddress((state: AddressType) => {
      return {
        ...state,
        ward: {
          id: id,
          name: name,
        },
      };
    });
  };

  useEffect(() => {
    console.log(address);
  }, [address]);
  return (
    <div className="flex gap-5">
      <SelectProvince setValue={(value, text) => setProvince(value, text)} />
      <SelectDistrict
        provinceId={address?.province?.id ?? null}
        setValue={(value, text) => setDistrict(value, text)}
      />
      <SelectWard
        districtId={address?.district?.id ?? null}
        setValue={(value, text) => setWard(value, text)}
      />
    </div>
  );
};

export default SelectAddress;
