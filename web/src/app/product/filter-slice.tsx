'use client';
import { CheckboxFilter } from '@/components/product/CheckboxFilter';
import { appendIfExist, currency } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';
import { string } from 'zod';

type Range = {
  from: number;
  to?: number;
};

const priceRange: Range[] = [
  {
    from: 50000,
    to: 200000,
  },
  {
    from: 200000,
    to: 500000,
  },
  {
    from: 500000,
    to: 1000000,
  },
  {
    from: 1000000,
    to: 1500000,
  },
];

const origins: string[] = ['Pháp', 'Nhật', 'Singapore', 'Ấn Độ '];

const volumeRange: Range[] = [
  {
    from: 120,
    to: 200,
  },
  {
    from: 200,
    to: 300,
  },
  {
    from: 300,
    to: 500,
  },
];

const fragrances: string[] = [
  'Hương ấm áp',
  'Hương gỗ',
  'Hương lãng mạn',
  'Hương nâng đỡ tinh thần',
  'Hương sang trọng',
];

// /items?priceRange=200,400&priceRange=100,200&brand=apple&sort=popular
type KeySearching = 'price' | 'volume' | 'origin' | 'fragrance';

const FilterSlice = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const hasKeyValueString = (key: KeySearching, value: string) => {
    const params = new URLSearchParams(searchParams);
    return params.has(key, value);
  };

  const hasKeyValueRange = (key: KeySearching, value: Range) => {
    const params = new URLSearchParams(searchParams);
    let valueRange = `${value.from}${value.to && ',' + value.to}`;
    return params.has(key, valueRange);
  };

  const handleCheckString = (
    check: boolean,
    key: KeySearching,
    value: string,
  ) => {
    const params = new URLSearchParams(searchParams);
    if (check) {
      appendIfExist(params, key, value);
    } else {
      params.delete(key, value);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleCheckRange = (
    check: boolean,
    key: KeySearching,
    value: Range,
  ) => {
    const params = new URLSearchParams(searchParams);
    let valueRange = `${value.from}${value.to && ',' + value.to}`;
    if (check) {
      appendIfExist(params, key, `${valueRange}`);
    } else {
      params.delete(key, valueRange);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-[#F2F2F2] px-2">
      <div className="py-2">
        <span className="text-md font-bold uppercase">Giá</span>
        {priceRange.map((item, index) => (
          <CheckboxFilter<Range>
            key={index}
            name={`Giá từ ${currency(item.from)} ${item.to && `tới ${currency(item.to)}`}`}
            data={item}
            onChecked={(check, data) => {
              handleCheckRange(check, 'price', data);
            }}
            checked={hasKeyValueRange('price', item)}
          />
        ))}
      </div>
      <span className="block h-[1px] w-full bg-black"></span>
      <div className="py-2">
        <span className="text-md font-bold uppercase">Xuất xứ</span>
        {origins.map((item, index) => (
          <CheckboxFilter<string>
            key={index}
            name={item}
            data={item}
            onChecked={(check, data) => {
              handleCheckString(check, 'origin', data);
            }}
            checked={hasKeyValueString('origin', item)}
          />
        ))}
      </div>
      <span className="block h-[1px] w-full bg-black"></span>
      <div className="py-2">
        <span className="text-md font-bold uppercase">DUNG TÍCH</span>
        {volumeRange.map((item, index) => (
          <CheckboxFilter<Range>
            key={index}
            name={`${item.from}ml - ${item.to}ml`}
            data={item}
            onChecked={(check, data) => {
              handleCheckRange(check, 'volume', data);
            }}
            checked={hasKeyValueRange('volume', item)}
          />
        ))}
      </div>
      <span className="block h-[1px] w-full bg-black"></span>
      <div className="py-2">
        <span className="text-md font-bold uppercase">NHÓM MÙI HƯƠNG</span>
        {fragrances.map((item, index) => (
          <CheckboxFilter<string>
            key={index}
            name={item}
            data={item}
            onChecked={(check, data) => {
              handleCheckString(check, 'fragrance', data);
            }}
            checked={hasKeyValueString('fragrance', item)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterSlice;
