import CartButton from '@/components/CartButton';
import ClientIcon from '@/components/ClientIcon';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import UserButton from '@/components/UserButton';

const Header = async () => {
  return (
    <header className="container bg-white pt-5">
      <div className="flex items-center justify-between">
        <Logo />
        <SearchBar className="basis-1/2" />
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
