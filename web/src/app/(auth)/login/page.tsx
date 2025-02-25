import LoginForm from '@/app/(auth)/login/login-form';
import ClientIcon from '@/components/ClientIcon';
import Link from '@/components/Link';
import ProtectedServer from '@/components/protected/ProtectedServer';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  return (
    <article className="flex flex-col gap-4">
      <div className="flex justify-between gap-2 p-2 border rounded-md border-gray-300">
        <Link className="block flex-1" href={'/login'}>
          <Button className="w-full" variant={'outline'}>
            Đăng Nhập
          </Button>
        </Link>
        <Link href={'/register'} className="block flex-1">
          <Button className="w-full" variant={'outline'}>
            Đăng Ký
          </Button>
        </Link>
      </div>
      <div className="p-2 border rounded-md border-gray-300">
        <LoginForm />
      </div>
      <div className="p-2 border rounded-md border-gray-300">
        <span className="text-center block py-2">Hoặc đăng nhập với</span>
        <div className="flex justify-evenly      ">
          <ClientIcon icon="flat-color-icons:google" size={40} />
          <ClientIcon icon="logos:facebook" size={40} />
        </div>
      </div>
    </article>
  );
};

export default LoginPage;
