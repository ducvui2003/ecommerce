import CartButton from '@/components/CartButton';
import ClientIcon from '@/components/ClientIcon';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import UserButton from '@/components/UserButton';
import { getAccessToken } from '@/lib/http';

const Header = async () => {
  const accessToken = await getAccessToken();
  return (
    <header className="container py-5 bg-white ">
      <div className="flex justify-between items-center">
        <Logo />
        <SearchBar className="basis-1/2 " />
        <div className="flex gap-16">
          <CartButton />
          <ClientIcon icon={'lucide:heart'} size={24} />
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
