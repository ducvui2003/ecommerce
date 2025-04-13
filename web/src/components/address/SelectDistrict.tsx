'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetDistrictsQuery } from '@/features/address/address.slice';
import { uuid } from '@/lib/utils';

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
  const { data, isFetching } = useGetDistrictsQuery(provinceId as number, {
    skip: !provinceId,
  });

  return (
    <Select
      onValueChange={(value) => {
        const item = JSON.parse(value) as District;
        setValue(item.id, item.name);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Chọn quận/huyện" />
      </SelectTrigger>
      <SelectContent>
        {!provinceId && <Skeleton className="w-full h-[20px] rounded-full" />}
        {isFetching &&
          Array(5)
            .fill(null)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="w-full h-[20px] rounded-full my-2"
              />
            ))}
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

export default SelectDistrict;
