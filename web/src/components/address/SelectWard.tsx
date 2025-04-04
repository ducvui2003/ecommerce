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
type SelectWardProps = {
  districtId: number | null;
  setValue: (value: number, text: string) => void;
};
type Ward = {
  id: number;
  name: string;
  parentId: string;
};
const SelectWard = ({ districtId, setValue }: SelectWardProps) => {
  const [wards, setWards] = useState<Ward[] | undefined>(undefined);

  useEffect(() => {
    if (districtId) {
      addressService
        .getWard(districtId)
        .then((res) => {
          if (res)
            setWards((_) => {
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
  }, [districtId]);

  return (
    <Select
      onValueChange={(value) => {
        const item = JSON.parse(value) as Ward;
        setValue(item.id, item.name);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Chọn quận/huyện" />
      </SelectTrigger>
      <SelectContent>
        {wards &&
          wards.map((item) => (
            <SelectItem value={JSON.stringify(item)}>{item.name}</SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default SelectWard;
