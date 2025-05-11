import CartButton from '@/components/CartButton';
import ClientIcon from '@/components/ClientIcon';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import UserDropdown from '@/components/UserDropdown';
import Link from '@/components/Link';

const Header = async () => {
  return (
    <header className="container bg-white pt-5">
      <div className="flex items-center justify-between">
        <Logo />
        <SearchBar className="basis-1/2" />
        <div className="flex gap-16">
         <Link href={'/cart'}>
           <CartButton />
         </Link>
          <ClientIcon icon={'lucide:heart'} size={24} />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
