'use client';

import ClientIcon from '@/components/ClientIcon';
import ListView from '@/components/ListView';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetUserDetailQuery } from '@/features/manager/user/user.api';
import { cn, formatDate } from '@/lib/utils';
import Image from 'next/image';
import avatar from 'public/images/user-avatar.png';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Role } from '@/types/auth.type';
import { UserStatus } from '@/types/user.type';
import { useState } from 'react';

type UserFormProps = {
  id: number;
};

const UserForm = ({ id }: UserFormProps) => {
  const { data, isFetching } = useGetUserDetailQuery(id, {
    skip: !id,
  });

  const [isEditRole, setIsEditRole] = useState<boolean>(false);

  if (isFetching) {
    return <Skeleton className="h-[300px] w-full rounded-md bg-gray-400" />;
  }
  if (!data) return <div>No reuslt</div>;
  return (
    <div className="relative">
      <div className="bg-secondary text-accent sticky top-0 flex items-center gap-2 rounded-md border px-2 py-4">
        <ClientIcon icon={'mdi:user'} />
        <h3>#{data.id}</h3>
        <div className="ml-auto flex items-center gap-3">
          {!isEditRole ? (
            <Badge className="text-md">{data.status}</Badge>
          ) : (
            <SelectStatus
              defaultValue={data.status}
              data={['ACTIVE', 'BLOCKED', 'INACTIVE']}
            />
          )}

          {!isEditRole ? (
            <ClientIcon
              className="opacity-80 hover:cursor-pointer"
              icon={'lucide:edit'}
              onClick={() => {
                setIsEditRole(true);
              }}
            />
          ) : (
            <ClientIcon
              className="text-red-700 hover:cursor-pointer"
              icon={'meteor-icons:xmark'}
              onClick={() => {
                setIsEditRole(false);
              }}
            />
          )}
        </div>
      </div>
      <div className="mt-5 flex gap-5">
        {/* Left */}
        <div className="flex-1">
          <Heading className="mb-3">Danh sach don hang</Heading>
          <div className="flex gap-4">
            <div className="border-accent bg-secondary basis-[200px] rounded-xl border-2">
              <Image alt="avatar" src={avatar} className="object-fit" />
            </div>
            <div className="border-accent bg-secondary flex-1 rounded-md border p-2">
              <span className="">
                <h4 className="text-xl">Ho va ten</h4>
                <p className="text-lg">{data?.name}</p>
              </span>
              <div className="my-2 border border-black"></div>
              <span className="block">
                <h4 className="text-xl">Email</h4>
                <p>{data?.email}</p>
              </span>
              <div className="my-2 border border-black"></div>
              <span className="block">
                <h4 className="text-xl">Sdt</h4>
                <p>{data?.phone ?? ''}</p>
              </span>
            </div>
          </div>
          <div className="mt-5">
            <div className="bg-secondary grid grid-cols-3 overflow-hidden rounded-md text-center [&>*]:py-2">
              <div className="pl-2">
                <h4 className="text-xl">Ngay sinh</h4>
                <p className="text-lg">
                  {(data?.dob && formatDate(data.dob)) ?? 'Khong xac dinh'}
                </p>
              </div>
              <span className="border-x-2 px-2">
                <h4 className="text-xl">Gioi tinh</h4>
                <p className="text-lg">{'Khong xac dinh'}</p>
              </span>
              <div className="pr-2">
                <h4 className="text-xl">Vai tro</h4>
                <p className="text-lg">{data?.role ?? 'Khong xac dinh'}</p>
              </div>
            </div>
            <Heading className="mt-3">Danh sach don hang</Heading>
            <ListOrder />
          </div>
        </div>
        {/* Right */}
        <div className="basis-[500px]">
          <ListAddress data={data?.addresses} />
        </div>
      </div>
    </div>
  );
};

type ListAddressProps = {
  data?: {
    province: string;
    district: string;
    ward: string;
    detail: string;
  }[];
};

const Heading = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <h4
      className={cn(
        'bg-primary border-accent rounded-md border-2 p-2 text-2xl',
        className,
      )}
    >
      {children}
    </h4>
  );
};

type SelectStatusProps = {
  defaultValue?: UserStatus;
  data: UserStatus[];
};

const SelectStatus = ({ data, defaultValue }: SelectStatusProps) => {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map((item) => (
            <SelectItem value={item}>{item}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const ListAddress = ({ data }: ListAddressProps) => {
  return (
    <div>
      <Heading className="mb-3">Danh sach dia chi</Heading>
      <ListView<{
        province: string;
        district: string;
        ward: string;
        detail: string;
      }>
        className="gap-5"
        data={data}
        render={(item) => {
          return (
            <Card className="bg-secondary">
              <CardContent className="grid grid-cols-2 grid-rows-2 gap-2 p-3">
                <div>{item.province}</div>
                <div>{item.district}</div>
                <div>{item.ward}</div>
                <div>{item.detail}</div>
              </CardContent>
            </Card>
          );
        }}
      />
    </div>
  );
};

const ListOrder = () => {
  return <div></div>;
};

export default UserForm;
