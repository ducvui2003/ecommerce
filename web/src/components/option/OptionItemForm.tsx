'use client';
import ClientIcon from '@/components/ClientIcon';
import Media from '@/components/media/Media';
import MediaButton from '@/components/media/MediaButton';
import ProductCategoryForm from '@/components/product/ProductCategoryForm';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CreateProductBodyType } from '@/types/product.type';
import { useFormContext } from 'react-hook-form';
type OptionItemFormProps = {
  index: number;
  onRemove?: () => void;
};

const OptionItemForm = ({ index, onRemove }: OptionItemFormProps) => {
  const { control, setValue, getValues } =
    useFormContext<CreateProductBodyType>();
  return (
    <div className="border-accent flex items-center gap-5 rounded-md border-2 p-2">
      <Media
        previewMode
        expose={(resources) =>
          setValue(`options.${index}.resourceId`, Number(resources[0].id))
        }
      />
      <div className="grid flex-1 grid-cols-3 gap-2">
        <FormField
          control={control}
          name={`options.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 block text-lg"> Tên</FormLabel>
              <FormControl>
                <Input placeholder="Vui lòng không để trống" {...field} />
              </FormControl>
              <span className="h-[25px]">
                <FormMessage />
              </span>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`options.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 block text-lg">Giá</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Vui lòng không để trống"
                  {...field}
                />
              </FormControl>
              <span className="h-[25px]">
                <FormMessage />
              </span>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`options.${index}.stock`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 block text-lg">Số lượng</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Vui lòng không để trống"
                  {...field}
                />
              </FormControl>
              <span className="h-[25px]">
                <FormMessage />
              </span>
            </FormItem>
          )}
        />
      </div>
      <ClientIcon
        icon={'meteor-icons:xmark'}
        className="border-accent bg-secondary flex self-stretch rounded-md border-2 p-2 text-red-500 hover:cursor-pointer hover:opacity-55"
        onClick={() => {
          onRemove?.();
        }}
      />
    </div>
  );
};

export default OptionItemForm;
