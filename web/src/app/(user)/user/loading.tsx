import Logo from '@/components/Logo';

const UserLoading = () => {
  return (
    <div className="bg-primary grid h-full w-full animate-pulse place-items-center">
      <div>
        <Logo />
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default UserLoading;
