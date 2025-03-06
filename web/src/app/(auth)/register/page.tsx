import RegisterForm from '@/app/(auth)/register/register-form';
import Link from '@/components/Link';
import { Button } from '@/components/ui/button';

const RegisterPage = () => {
  return (
    <>
      <RegisterForm />
      <Link href={'/login'}>
        <Button variant={'ghost'} className="w-full mt-5" type="button">
          Đăng nhập
        </Button>
      </Link>
    </>
  );
};

export default RegisterPage;
