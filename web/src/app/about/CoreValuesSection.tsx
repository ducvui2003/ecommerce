"use client";

import Image from "next/image";
import React from "react";
import tinhdaucam from "public/images/tinh-dau-cam.jpeg";
import tinhdauque from 'public/images/tinh-dau-que.jpg'

const coreValues = [
  {
    title: "Chất lượng là trên hết",
    content:
      "Mỗi sản phẩm của chúng tôi đều được tạo nên từ sự tâm huyết và tiêu chuẩn chất lượng nghiêm ngặt. Từ khâu lựa chọn nguyên liệu đến quá trình sản xuất, tất cả đều được kiểm soát chặt chẽ để mang đến những giọt tinh dầu nguyên chất, an toàn và hiệu quả nhất cho sức khỏe người dùng.",
    image: tinhdaucam,
    reverse: false,
  },
  {
    title: "Gắn gũi với thiên nhiên",
    content:
      "Chúng tôi tin rằng thiên nhiên là nguồn năng lượng chữa lành tuyệt vời nhất. Bằng cách khai thác tinh túy từ các loại thảo mộc, vỏ trái cây và hoa lá, chúng tôi mang đến những sản phẩm thân thiện với môi trường, gần gũi với con người, và hài hòa với nhịp sống tự nhiên.",
    image: tinhdauque,
    reverse: true,
  },
];


const CoreValuesSection = () => {
  return (
    <section className="container py-16 max-w-[7.5]xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-[#FFAB66] mb-12">
        Giá trị cốt lõi
      </h2>
      {coreValues.map((value, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${
            value.reverse ? "md:flex-row-reverse" : ""
          } items-center gap-10 mb-16`}
        >
          <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={value.image}
              alt={value.title}
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl text-[#FFAB66] font-semibold mb-4">
              {value.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">{value.content}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CoreValuesSection;
