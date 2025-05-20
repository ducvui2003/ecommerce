import AvatarForm from '@/app/(user)/user/info/avatar-form';
import UserInfoForm from '@/app/(user)/user/info/info-form';
import getServerSession from '@/components/auth/getServerSession';
import userService from '@/service/user.service';
import { Gender } from '@/types/user.type';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Thông tin cá nhân',
  description: 'Oil',
};

const UserInfoPage = async () => {
  const session = await getServerSession();
  if (!session) return notFound();
  const { email, role, status, avatar, name, phone, dob } =
    await userService.getInfo(session.accessToken);
  return (
    <div className="mx-auto mt-3 w-[70vw]">
      <div className="border-accent rounded-md border-2 p-4">
        <h2 className="text-primary text-3xl">Thông tin cá nhân</h2>
        <p className="text-accent pt-2">
          Các thông tin công khai cho quản trị viên
        </p>
        <span className="bg-accent mt-2 mb-8 block h-[2px] w-full" />
        <div className="flex gap-4">
          <AvatarForm avatar={avatar} />
          <UserInfoForm
            initialValues={{
              name: name,
              dob: dob,
              phone: phone,
              gender: Gender.MALE,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;
