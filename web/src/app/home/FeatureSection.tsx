import ClientIcon from '@/components/ClientIcon';
import { cn, uuid } from '@/lib/utils';
import React from 'react';

const FeatureSection = () => {
  return (
    <div className="container flex justify-between gap-12">
      {data.map((item) => (
        <Card {...item} key={uuid()} />
      ))}
    </div>
  );
};

const data: CardProps[] = [
  {
    title: 'Mua sắm dễ dàng',
    description:
      'Giao diện đơn giản, thân thiện giúp bạn tìm kiếm và chọn mua tinh dầu yêu thích chỉ trong vài bước.',
    icon: 'mdi:cart',
  },
  {
    title: 'Giao hàng nhanh chóng',
    description:
      'Chúng tôi cam kết giao hàng nhanh, đóng gói cẩn thận để sản phẩm đến tay bạn luôn nguyên vẹn và thơm ngát.',
    icon: 'hugeicons:truck-delivery',
  },
  {
    title: 'Hỗ trợ tận tâm',
    description:
      'Đội ngũ chăm sóc khách hàng luôn sẵn sàng lắng nghe và đồng hành cùng bạn trong hành trình trải nghiệm hương thơm.',
    icon: 'mdi:customer-service',
    highlight: true,
  },
];


type CardProps = {
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
};
const Card = ({ title, description, icon, highlight = false }: CardProps) => {
  return (
    <article
      className={cn(
        'flex flex-col justify-center rounded-xl px-5 pb-12 pt-8 text-center transition-colors duration-300 cursor-pointer',
        'hover:bg-[#FFF5EA]',
      )}
    >

    <ClientIcon icon={icon} size={60} className="text-primary"/>
      <h3 className="mt-2 text-xl font-bold">{title}</h3>
      <p className="pt-4">{description}</p>
    </article>
  );
};

export default FeatureSection;
