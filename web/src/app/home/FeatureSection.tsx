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
    title: 'Shopping',
    description:
      'At imperdiet dui accumsan sit amet nulla risus est ultricies quis.',
    icon: 'mdi:cart',
  },
  {
    title: 'Delivery',
    description:
      'At imperdiet dui accumsan sit amet nulla risus est ultricies quis.',
    icon: 'hugeicons:truck-delivery',
  },
  {
    title: 'Customer Service',
    description:
      'At imperdiet dui accumsan sit amet nulla risus est ultricies quis.',
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
        'flex flex-col justify-center rounded-xl px-5 pb-12 pt-8 text-center',
        highlight && 'bg-[#FFF5EA]',
      )}
    >
      <ClientIcon icon={icon} size={60} className="text-[#FFAB66]" />
      <h3 className="mt-2 text-xl font-bold">{title}</h3>
      <p className="pt-4">{description}</p>
    </article>
  );
};

export default FeatureSection;
