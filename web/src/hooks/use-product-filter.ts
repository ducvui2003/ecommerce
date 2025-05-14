import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type PriceRange = {
  from: number;
  to: number;
};

export const useProductFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const isCheckedPrice = (range: PriceRange) => {
    const min = searchParams.get('minPrice');
    const max = searchParams.get('maxPrice');
    return min === `${range.from}` && max === `${range.to}`;
  };

  const isCheckedCategory = (categoryId: number) => {
    const categoryIds = searchParams.getAll('categoryId');
    return categoryIds.includes(`${categoryId}`);
  }

  const isCheckedSupplier = (supplierId: number) => {
    const supplierIds = searchParams.getAll('supplierId');
    return supplierIds.includes(`${supplierId}`);
  }

  return {
    setParam,
    isCheckedPrice,
    isCheckedCategory,
    isCheckedSupplier
  };
};
