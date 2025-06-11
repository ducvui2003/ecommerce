import LoginForm from '@/app/(auth)/login/login-form';
import SocialPart from '@/app/(auth)/social-part';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  return (
    <>
      <div className="mx-auto">
        <Logo />
      </div>
      <div className="mt-2">
        <LoginForm />
      </div>
      <Link href={'/register'}>
        <Button variant={'secondary'} className="mt-2 w-full" type="button">
          Đăng ký
        </Button>
      </Link>
      <div className="py-2">
        <SocialPart />
      </div>
    </>
  );
};

export default LoginPage;
