import Link from '@/components/Link';
import Logo from '@/components/Logo';
import LogoutButton from '@/components/LogoutButton';
import ConditionalRenderer from '@/components/protected/ConditionalRenderer';
import { Button } from '@/components/ui/button';
import { getAccessToken } from '@/lib/http';

const Header = async () => {
  const accessToken = await getAccessToken();
  return (
    <header className="columns-2 px-5 py-2 bg-pink-100 flex justify-between items-center">
      <div className="flex">
        <Logo />
        <div>
          <p>0965809127</p>
          <p>80/50, An Binh</p>
        </div>
      </div>
      <div className="flex justify-end">
        <ConditionalRenderer
          condition={accessToken == ''}
          whenTrue={
            <Link href={'/login'}>
              <Button className="w-full" variant={'outline'}>
                Đăng Nhập
              </Button>
            </Link>
          }
          whenFalse={<LogoutButton />}
        />
      </div>
    </header>
  );
};

export default Header;
