'use client';
import {
  SelectTrigger,
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import addressService from '@/service/address.service';
import { useEffect, useState } from 'react';

type SelectProvinceProps = {
  setValue: (value: number, text: string) => void;
};

type Province = {
  id: number;
  name: string;
};

const SelectProvince = ({ setValue }: SelectProvinceProps) => {
  const [provinces, setProvinces] = useState<Province[] | undefined>(undefined);

  useEffect(() => {
    addressService
      .getProvince()
      .then((res) => {
        if (res)
          setProvinces((_) => {
            return res.map((item) => {
              return {
                id: item.id,
                name: item.name,
              };
            });
          });
      })
      .catch(() => {
        console.error('Error province');
      });
  }, []);

  return (
    <Select
      onValueChange={(value) => {
        const item = JSON.parse(value) as Province;
        setValue(item.id, item.name);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Chọn tỉnh/thành phố" />
      </SelectTrigger>
      <SelectContent>
        {provinces &&
          provinces.map((item) => (
            <SelectItem value={JSON.stringify(item)}>{item.name}</SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default SelectProvince;
