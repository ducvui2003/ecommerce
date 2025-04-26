import product2 from "public/images/tinh-dau-1.png";
import Image from "next/image";

function HeroBar() {
  return (
    <section className={"gap-2 flex pt-20"}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="lg:w-5/12 w-full mb-8 lg:mb-0">
            <div className="intro-excerpt">
              <h1 className="text-4xl font-bold text-[#FFAB66]">Về chúng tôi</h1>
              <p className="mb-4 text-[#FFAB66]">
                Cùng chúng tôi khám phá những sản phẩm mới nhất và ưu đãi hấp dẫn nhất từ các thương
                hiệu uy tín trên thị trường.
              </p>
              <p>
                <a href="#"
                   className="btn bg-black text-[#FFAB66] rounded px-6 py-2  mr-4 hover:bg-[#FFAB66] hover:text-black font-bold">Xem
                  ngay</a>
                <a href="#"
                   className="btn  text-black border-gray-800 rounded bg-[#FFAB66] px-6 py-2 hover:bg-black hover:text-[#FFAB66] font-bold">Khám
                  phá</a>
              </p>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image src={product2}  alt="Product"
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