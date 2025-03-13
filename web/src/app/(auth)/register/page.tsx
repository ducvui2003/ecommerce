import RegisterForm from '@/app/(auth)/register/register-form';
import SocialPart from '@/app/(auth)/social-part';
import Link from '@/components/Link';
import FacebookButton from '@/components/oauth2/FacebookButton';
import GoogleButton from '@/components/oauth2/GoogleButton';
import { Button } from '@/components/ui/button';

const RegisterPage = () => {
  return (
    <>
      <div className="py-2">
        <RegisterForm />
      </div>

      <div className="py-2 ">
        <SocialPart />
      </div>
      <Link href={'/login'}>
        <Button variant={'ghost'} className="w-full mt-5" type="button">
          Đăng nhập
        </Button>
      </Link>
    </>
  );
};

export default RegisterPage;
