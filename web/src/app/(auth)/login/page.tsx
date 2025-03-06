import LoginForm from '@/app/(auth)/login/login-form';
import Link from '@/components/Link';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  return (
    <>
      <LoginForm />

      <Link href={'/register'}>
        <Button variant={'secondary'} className="w-full mt-5" type="button">
          Đăng ký
        </Button>
      </Link>
    </>
  );
};

export default LoginPage;
