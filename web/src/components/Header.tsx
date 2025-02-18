import Logo from '@/components/Logo';
import LogoutButton from '@/components/LogoutButton';

const Header = () => {
  return (
    <header className="columns-2 px-5 py-2 bg-pink-100">
      <div className="flex">
        <Logo />
        <div>
          <p>0965809127</p>
          <p>80/50, An Binh</p>
        </div>
      </div>
      <div className="flex justify-end">
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
