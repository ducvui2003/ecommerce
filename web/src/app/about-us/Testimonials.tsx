import Image from 'next/image';
import brian from 'public/images/brian.jpeg';
import { BackgroundGradient } from './background-gradient';

export const testimonials = [
  {
    id: 1,
    quote: "“Tôi hài lòng với sản phẩm và những dịch vụ mà công ty mang lại.”",
    name: "Nguyễn Thanh Bình",
    position: "Đồng sáng lập An Nhiên",
    image: brian,
  },
  {
    id: 2,
    quote: "“Đây là sự lựa chọn hoàn hảo cho những ai tìm kiếm sự thiên nhiên”",
    name: "Lê Anh Đức",
    position: "Giám đốc sản phẩm",
    image: brian,
  },
  {
    id: 3,
    quote: "“Sản phẩm và dịch vụ tại đây luôn vượt trên cả mong đợi của chúng tôi.”",
    name: "Trịnh Trần Sỹ Đông",
    position: "Nhà sáng chế tinh dầu",
    image: brian,
  },
  {
    id: 4,
    quote: "“Sản phẩm và dịch vụ tại đây luôn vượt trên cả mong đợi của chúng tôi.”",
    name: "Đặng Minh Tấn",
    position: "Chuyên viên nghiên cứu",
    image: brian,
  },
];

function Testimonials() {
  return (
    <div className="container flex justify-center items-center gap-8 my-36">
      {testimonials.map((item) => (
        <BackgroundGradient
          key={item.id}
          className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900"
        >
          <div className="flex flex-col items-center">
            <Image
              src={item.image}
              alt={item.name}
              className="w-40 h-40 rounded-full object-cover"
            />
            <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
              {item.name}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {item.position}
            </p>
            <p className="italic text-neutral-500 dark:text-neutral-300 mt-2">
              {item.quote}
            </p>
          </div>
        </BackgroundGradient>
      ))}
    </div>
  );
}

export default Testimonials;