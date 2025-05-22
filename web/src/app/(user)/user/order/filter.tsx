'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const timeOptions = ['Thời gian', 'Mới nhất', 'Cũ nhất'];
const statusOptions = [
  'Trạng thái',
  'Chờ xử lý',
  'Đang vận chuyển',
  'Hoàn thành',
];
const FilterOrder = () => {
  const [timeIndex, setTimeIndex] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0); // index for 3 states

  const handleStatusClick = () => {
    setStatusIndex((prevIndex) => (prevIndex + 1) % statusOptions.length);
  };
  const handleTimeClick = () => {
    setTimeIndex((prevIndex) => (prevIndex + 1) % timeOptions.length);
  };
  return (
    <>
      <div className={'flex w-full justify-between'}>
        <div className={'flex gap-2'}>
          <Button onClick={handleTimeClick}>
            {timeOptions[timeIndex]}
          </Button>
          <Button onClick={handleStatusClick}>
            {statusOptions[statusIndex]}
          </Button>
        </div>
        <Button className={'min-w-[100px]'}> Lọc</Button>
      </div>
    </>
  );
};

export default FilterOrder;
