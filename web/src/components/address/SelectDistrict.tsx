'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import addressService from '@/service/address.service';
import React, { useEffect, useState } from 'react';

type SelectDistrictProps = {
  provinceId: number | null;
  setValue: (value: number, text: string) => void;
};

type District = {
  id: number;
  name: string;
  parentId: string;
};

const SelectDistrict = ({ setValue, provinceId }: SelectDistrictProps) => {
  const [districts, setDistricts] = useState<District[] | undefined>(undefined);
  useEffect(() => {
    if (provinceId) {
      addressService
        .getDistrict(provinceId)
        .then((res) => {
          if (res)
            setDistricts((_) => {
              return res.map((item) => {
                return {
                  id: item.id,
                  name: item.name,
                  parentId: item.parentId,
                };
              });
            });
        })
        .catch(() => {
          console.error('Error province');
        });
    }
  }, [provinceId]);

  return (
    <Select
      value={undefined}
      onValueChange={(value) => {
        const item = JSON.parse(value) as District;
        setValue(item.id, item.name);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Chọn quận/huyện" />
      </SelectTrigger>
      <SelectContent>
        {districts &&
          districts.map((item) => (
            <SelectItem value={JSON.stringify(item)}>{item.name}</SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default SelectDistrict;
