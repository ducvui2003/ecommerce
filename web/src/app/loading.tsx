import Logo from '@/components/Logo';

const RootLoading = () => {
  return (
    <div className="bg-primary grid h-screen w-screen animate-pulse place-items-center">
      <div>
        <Logo />
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default RootLoading;
