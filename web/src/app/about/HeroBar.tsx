import product2 from "public/images/tinh-dau-1.png";
import Image from "next/image";
import { HeroButton } from '@/components/button/HeroButton';

const heroContent = {
  heading: "Về chúng tôi",
  description:
    "Cùng chúng tôi khám phá những sản phẩm mới nhất và ưu đãi hấp dẫn nhất từ các thương hiệu uy tín trên thị trường.",
  primaryBtn: {
    label: "Xem ngay",
    href: "#",
  },
  secondaryBtn: {
    label: "Khám phá",
    href: "#",
  },
};

const sectionClass = "gap-2 flex pt-20";

function HeroBar() {
  return (
    <section className={sectionClass}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="lg:w-5/12 w-full mb-8 lg:mb-0">
            <div className="intro-excerpt">
              <h1 className="text-4xl font-bold text-[#FFAB66D1]">{heroContent.heading}</h1>
              <p className="mb-4 text-[#FFAB66D1]">{heroContent.description}</p>
              <p>
                <HeroButton href="#" className="bg-black text-[#FFAB66D1] mr-4 hover:bg-[#FFAB66D1] hover:text-black rounded">
                  Xem ngay
                </HeroButton>
                <HeroButton href="#" className="bg-[#FFAB66D1] text-black mr-4 hover:bg-black hover:text-[#FFAB66D1] rounded">
                  Khám phá
                </HeroButton>
              </p>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:flex">
            <Image src={product2} alt="Product"
              width={500}
              height={600}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBar;