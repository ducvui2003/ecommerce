import truck from 'public/truck.svg';
import bag from 'public/bag.svg';
import support from 'public/support.svg';
import returnIcon from 'public/return.svg';
import whyChooseUs from 'public/images/tinh-dau-2.jpg';
import Image from 'next/image';
import { FEATURES } from './about-content';

function WhyChooseUs() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start gap-12">
          {/* Text Content */}
          <div className="w-full lg:w-6/12">
            <h2 className="text-3xl font-bold text-[#FFAB66] mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-gray-700">
              Chúng tôi không chỉ mang đến sản phẩm nội thất cao cấp, mà còn
              mang đến cho bạn những trải nghiệm mua sắm hoàn hảo. Hãy khám phá
              những lý do bạn nên tin tưởng chúng tôi:
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              {FEATURES.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <Image src={feature.icon} alt={feature.title} className="h-12 w-12" />
                  <h3 className="text-xl font-semibold text-[#FFAB66]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-5/12">
            <div className="relative w-full h-[620px]">
              <Image
                src={whyChooseUs}
                alt="Tại sao chọn chúng tôi"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
