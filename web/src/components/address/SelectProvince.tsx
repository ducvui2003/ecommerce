'use client';
import {
  SelectTrigger,
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useGetProvincesQuery } from '@/features/address/address.slice';
import { uuid } from '@/lib/utils';

type SelectProvinceProps = {
  setValue: (value: number, text: string) => void;
};

type Province = {
  id: number;
  name: string;
};

const SelectProvince = ({ setValue }: SelectProvinceProps) => {
  const { data, isFetching } = useGetProvincesQuery();

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
        {!isFetching &&
          data?.map((item) => (
            <SelectItem key={uuid()} value={JSON.stringify(item)}>
              {item.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default SelectProvince;
