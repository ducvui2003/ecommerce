import OptionItemForm from '@/components/option/OptionItemForm';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CreateProductBodyType } from '@/types/product.type';
import { ReactNode, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
type OptionFormProps = {
  children: ReactNode;
};

const OptionForm = () => {
  const { control, setValue } = useFormContext<CreateProductBodyType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const handleOptionAdd = () => {
    append({
      name: '',
      price: 0,
      resourceId: 0,
      stock: 0,
    });
  };
  return (
    <div className="border-accent rounded-md border-2 p-2">
      <div className="my-2 flex justify-between">
        <Label className="mb-2 block text-lg">Option</Label>

        <Button type="button" onClick={handleOptionAdd}>
          Thêm Option cho sản phẩm
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => {
          return (
            <OptionItemForm
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OptionForm;
