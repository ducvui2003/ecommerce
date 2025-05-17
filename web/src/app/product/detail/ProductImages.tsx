import Image from 'next/image';
import anhmau1 from 'public/images/tinh-dau-2.jpg';

export default function ProductImages() {
  return (
    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      <div className="relative hidden size-full rounded-lg object-cover lg:block">
        <Image src={anhmau1} alt="Ảnh lớn" fill className="rounded-lg object-cover" />
      </div>

      <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        {[1, 2].map((i) => (
          <div key={i} className="relative aspect-[3/2] w-full rounded-lg object-cover">
            <Image src={anhmau1} alt={`Ảnh phụ ${i}`} fill className="rounded-lg object-cover" />
          </div>
        ))}
      </div>

      <div className="relative aspect-[4/5] size-full sm:rounded-lg lg:aspect-auto">
        <Image src={anhmau1} alt="Ảnh chính" fill className="object-cover sm:rounded-lg" />
      </div>
    </div>
  );
}
