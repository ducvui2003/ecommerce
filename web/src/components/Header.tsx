import Logo from '@/components/Logo';
import Link from '@/components/Link';
import SearchBar from '@/components/SearchBar';
import UserDropdown from '@/components/UserDropdown';
import CartDropdown from '@/components/CartDropdown';
import ClientIcon from '@/components/ClientIcon';
import React from 'react';
import Navigation, { components } from '@/components/Navigation';

const Header = async () => {

  return (
    <header className='container flex py-5 bg-white'>
      <div className='flex flex-wrap items-center justify-between gap-4 w-full'>
        <Logo className="size-16" />
        <Navigation components={components}/>
        <div className='flex gap-3 w-2/5'>
          <SearchBar/>
          <div className="size-11 p-3 rounded-full bg-muted cursor-pointer hover:opacity-50 border border-gray-200">
            <Link href="/wishlist" className="relative">
              <ClientIcon icon={'lucide:heart'} size={22} />
              <span className="absolute -top-3.5 border-2 border-muted -right-2 text-[10px] rounded-full size-5 text-center place-content-center text-white bg-destructive">0</span>
            </Link>
          </div>
          <CartDropdown />
          <UserDropdown />
        </div>

      </div>
    </header>
  );
};

export default Header;
