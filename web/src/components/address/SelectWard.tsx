'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetWardsQuery } from '@/features/address/address.api';
import { uuid } from '@/lib/utils';
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
  const { data, isFetching } = useGetWardsQuery(districtId as number, {
    skip: !districtId,
  });

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
        {!districtId && <Skeleton className="h-[20px] w-full rounded-full" />}
        {isFetching &&
          Array(5)
            .fill(null)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="my-2 h-[20px] w-full rounded-full"
              />
            ))}
        {data &&
          data?.map((item) => (
            <SelectItem key={uuid()} value={JSON.stringify(item)}>
              {item.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default SelectWard;
