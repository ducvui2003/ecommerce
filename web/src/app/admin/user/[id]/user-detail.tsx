'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import ClientIcon from '@/components/ClientIcon';
import ListView from '@/components/ListView';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useChangeStatusMutation,
  useGetUserDetailQuery,
} from '@/features/manager/user/user.api';
import { cn, formatDate } from '@/lib/utils';
import Image from 'next/image';
import avatar from 'public/images/user-avatar.png';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { UserStatus } from '@/types/user.type';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

type UserDetailProps = {
  id: number;
};

const UserDetail = ({ id }: UserDetailProps) => {
  const { data, isFetching } = useGetUserDetailQuery(id, {
    skip: !id,
  });

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
          <Badge className="text-md" userStatus={data.status}>
            {data.status}
          </Badge>
          <ActionDropdown id={data.id} status={data.status} />
        </div>
      </div>
      <div className="mt-5 flex gap-5">
        {/* Left */}
        <div className="flex-1">
          <Heading className="mb-3">Thông tin cá nhân</Heading>
          <div className="flex gap-4">
            <div className="border-accent bg-secondary basis-[200px] rounded-xl border-2">
              <Image alt="avatar" src={avatar} className="object-fit" />
            </div>
            <div className="border-accent bg-secondary flex-1 rounded-md border p-2">
              <span className="">
                <h4 className="text-xl">Họ và tên</h4>
                <p className="text-lg">{data?.name}</p>
              </span>
              <div className="my-2 border border-black"></div>
              <span className="block">
                <h4 className="text-xl">Email</h4>
                <p>{data?.email}</p>
              </span>
              <div className="my-2 border border-black"></div>
              <span className="block">
                <h4 className="text-xl">Số điện thoại</h4>
                <p>{data?.phone ?? ''}</p>
              </span>
            </div>
          </div>
          <div className="mt-5">
            <div className="bg-secondary grid grid-cols-3 overflow-hidden rounded-md text-center [&>*]:py-2">
              <div className="pl-2">
                <h4 className="text-xl">Ngày sinh</h4>
                <p>{(data?.dob && formatDate(data.dob)) ?? 'Khong xac dinh'}</p>
              </div>
              <span className="border-x-2 px-2">
                <h4 className="text-xl">Giới tính</h4>
                <p>{'Khong xac dinh'}</p>
              </span>
              <div className="pr-2">
                <h4 className="text-xl">Quyền hạn</h4>
                <Badge userRole={data.role}>{data.role}</Badge>
              </div>
            </div>
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

type ListAddressProps = {
  data?: {
    province: string;
    district: string;
    ward: string;
    detail: string;
  }[];
};

const ListAddress = ({ data }: ListAddressProps) => {
  return (
    <div>
      <Heading className="mb-3">Danh sách địa chỉ</Heading>
      <ListView<{
        province: string;
        district: string;
        ward: string;
        detail: string;
      }>
        className="gap-5"
        data={data}
        render={(item, index) => {
          return (
            <Card className="bg-secondary" key={index}>
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
type ListOrderProps = {
  data?: any[];
};
const ListOrder = ({ data }: ListOrderProps) => {
  return (
    <>
      <Heading className="mt-3">Danh sách đơn hàng</Heading>
      {/* <ListView data={data} /> */}
    </>
  );
};

type ActionDropdownProps = {
  id: number;
  status: UserStatus;
};

const ActionDropdown = ({ id, status }: ActionDropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [changeStatus] = useChangeStatusMutation();

  const statusMap: Record<
    Exclude<UserStatus, 'INACTIVE'>,
    Exclude<UserStatus, 'INACTIVE'>
  > = useMemo(() => {
    return {
      ACTIVE: 'BLOCKED',
      BLOCKED: 'ACTIVE',
    };
  }, []);

  const handleBlockUser = () => {
    changeStatus({
      id: id,
      status: 'BLOCKED',
    })
      .unwrap()
      .then(() => {
        toast.success('Thay đổi trạng thái user thành công');
      })
      .then(() => {
        setOpen(false);
      })
      .catch(() => {
        toast.error('Thay đổi trạng thái user thất bại');
      });
  };

  const handleUnBlockUser = () => {
    changeStatus({
      id: id,
      status: 'ACTIVE',
    })
      .unwrap()
      .then(() => {
        toast.success('Thay đổi trạng thái user thành công');
      })
      .then(() => {
        setOpen(false);
      })
      .catch(() => {
        toast.error('Thay đổi trạng thái user thất bại');
      });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2">
          Điều chỉnh
          <ClientIcon icon={'mingcute:down-line'} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {status === 'INACTIVE' ? (
            <DropdownMenuItem>Xóa tài khoản</DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => {
                setOpen(true);
              }}
            >
              {status === 'ACTIVE' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={(open) => setOpen(open)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Cân nhắc trước các thay đổi của bạn
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <span className="flex items-center">
                  <ClientIcon icon={'fluent-color:warning-16'} />
                  Trạng thái của khách hàng thay đổi từ
                </span>
                {status !== 'INACTIVE' && (
                  <span className="mt-3 flex justify-center">
                    <Badge className="text-md mx-2" userStatus={status}>
                      {status}
                    </Badge>
                    <ClientIcon icon={'formkit:arrowright'} />
                    <Badge
                      className="text-md ml-2"
                      userStatus={statusMap[status]}
                    >
                      {statusMap[status]}
                    </Badge>
                  </span>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                console.log(status);
                status === 'ACTIVE' ? handleBlockUser() : handleUnBlockUser();
              }}
            >
              Thay đổi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserDetail;
