import Image from 'next/image';
import { ALT, HOME_PAGE } from '@/constraint/variable';
import { Button } from '@/components/ui/button';
import Link from '@/components/Link';

const NotFound = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <Image
        src={'/images/notfound.png'}
        alt={ALT}
        className="w-full object-contain object-center"
        fill
        sizes="100vw"
      />
      <Button
        size={'lg'}
        className="animate-shake animate-infinite animate-duration-1000 animate-delay-[5000ms] animate-ease-in absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <Link href={HOME_PAGE}>Trang chủ</Link>
      </Button>
    </div>
  );
};

export default NotFound;
