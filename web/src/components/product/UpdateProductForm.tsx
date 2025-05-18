'use client';
import CreateProductForm from '@/components/product/CreateProductForm';
import { useGetDetailProductQuery } from '@/features/manager/product/product.api';
import {
  BaseProductFormSchema,
  BaseProductFormType,
} from '@/types/product.type';
type UpdateProductFormProps = {
  id: number;
};

const UpdateProductForm = ({ id }: UpdateProductFormProps) => {
  const { data, isFetching } = useGetDetailProductQuery(id);
  const handleSubmit = (values: BaseProductFormType) => {};

  return (
    <div>
      {data && (
        <CreateProductForm
          initialValue={BaseProductFormSchema.parse(data)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default UpdateProductForm;
