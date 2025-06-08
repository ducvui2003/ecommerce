import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import React from 'react';
import image from '/public/images/story_section_2.png';
import { ALT } from '@/constraint/variable';
import { Button } from '@/components/ui/button';

const StorySection2 = () => {
  return (
    <section className="flex rounded-md shadow-lg">
      <div className="flex-1">
        <Image
          src={image}
          alt={ALT}
          className="h-full w-full rounded-md object-contain object-center"
        />
      </div>
      <div className="ml-10 mr-8 mt-[40px] flex-1">
        <h2 className="">Hương thơm mùa đông – Chạm vào cảm xúc</h2>
        <p className="text-xl mb-4">
          Khi tiết trời trở lạnh, cơ thể và tâm trí dễ trở nên mệt mỏi hơn bao giờ hết.
          Bộ sưu tập tinh dầu mùa đông của chúng tôi ra đời để giúp bạn tìm lại sự cân bằng:
          làn hương dịu nhẹ từ thiên nhiên mang đến cảm giác thư giãn sâu sắc, giúp xoa dịu tinh thần và giữ ấm tâm hồn.
          <br />
          Mỗi giọt tinh dầu là sự kết tinh từ nguyên liệu thuần khiết, trải qua quy trình chưng cất kỹ lưỡng – như một món quà nhỏ, ấm áp dành cho bạn trong mùa lạnh.
        </p>
        <Button>Xem thêm </Button>
      </div>
    </section>
  );
};

export default StorySection2;
