import Logo from '@/components/Logo';
import Link from '@/components/Link';
import SearchBar from '@/components/SearchBar';
import UserDropdown from '@/components/UserDropdown';
import CartDropdown from '@/components/CartDropdown';
import ClientIcon from '@/components/ClientIcon';
import React from 'react';
import Navigation, { components } from '@/components/Navigation';
import WishlistDropdown from '@/components/WishlistDropdown';

const Header = async () => {
  return (
    <header className="container flex bg-white py-5">
      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <Logo className="size-16" />
        <Navigation components={components} />
        <div className="flex w-2/5 gap-3">
          <SearchBar />
          <WishlistDropdown />
          <CartDropdown />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
