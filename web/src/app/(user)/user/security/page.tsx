import ChangePasswordForm from '@/app/(user)/user/security/form';

const UserSecurityPage = () => {
  return (
    <div className="mx-auto mt-3 w-[70vw]">
      <div className="border-accent rounded-md border-2 p-4">
        <h2 className="text-primary text-3xl">Thông tin bảo mật</h2>
        <p className="text-accent pt-2">
          Các thông tin dùng để truy cập vào tài khoản của bạn
        </p>
        <span className="bg-accent mt-2 mb-8 block h-[2px] w-full" />
        <div className="flex gap-4">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default UserSecurityPage;
