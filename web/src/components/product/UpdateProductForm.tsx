'use client';
import CreateProductForm from '@/components/product/CreateProductForm';
import { useGetDetailProductQuery } from '@/features/manager/product/product.api';
import { ReactNode } from 'react';
type UpdateProductFormProps = {
  id: number;
};

const UpdateProductForm = ({ id }: UpdateProductFormProps) => {
  const { data, isFetching } = useGetDetailProductQuery(id);
  return <div>{data && <CreateProductForm initialValue={data} />}</div>;
};

export default UpdateProductForm;
