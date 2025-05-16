'use client';
import { ReactNode, useState } from 'react';

import Editor from '@/components/Editor';
import ListView from '@/components/ListView';
import MediaButton from '@/components/media/MediaButton';
import MediaCard from '@/components/media/MediaCard';
import OptionForm from '@/components/option/OptionForm';
import ProductCategoryForm from '@/components/product/ProductCategoryForm';
import ProductSupplierForm from '@/components/product/ProductSupplierForm';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MediaType } from '@/types/media.type';
import {
  CreateProductBodySchema,
  CreateProductBodyType,
} from '@/types/product.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCreateProductMutation } from '@/features/manager/product/product.api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const CreateProductForm = () => {
  const router = useRouter();
  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBodySchema),
    defaultValues: {
      name: '',
      basePrice: 0,
      salePrice: 0,
      supplierId: 0,
      categoryId: 0,
      description: '',
      resourceIds: [],
      options: [],
      isDeleted: false,
    },
  });
  const [medias, setMedias] = useState<MediaType[]>([]);
  const [create] = useCreateProductMutation();
  const { isSubmitting } = form.formState;
  const onSubmit = (values: CreateProductBodyType) => {
    create(values)
      .unwrap()
      .then((response) => {
        toast.success('Tạo sản phẩm thành công', {
          description: `${response.id} - ${response.name}`,
        });
        router.push('/admin/product');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Tạo sản phẩm thất bại', {});
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="border-accent rounded-md border-2 p-2">
                  <FormLabel className="mb-2 block text-lg">
                    Tên sản phẩm
                  </FormLabel>
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
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="border-accent rounded-md border-2 p-2">
                  <FormLabel className="mb-2 block text-lg">Mô tả</FormLabel>
                  <FormControl>
                    <Editor
                      markdown=""
                      {...field}
                      classNameContainer="h-[200px] rounded-md border shadow-sm"
                    />
                  </FormControl>

                  <FormMessage />
                  <span className="block text-right"></span>
                </FormItem>
              )}
            />
            <FormItem className="border-accent rounded-md border-2 p-2">
              <FormLabel className="mb-2 block text-lg">Hình ảnh</FormLabel>

              <ListView<MediaType>
                data={medias}
                display="grid"
                className="grid-cols-7 gap-2"
                render={(item) => {
                  return (
                    <MediaCard
                      className="size-[100px]"
                      key={item.id}
                      url={item.url ?? ''}
                    />
                  );
                }}
                emptyComponent={null}
                append={
                  <MediaButton
                    expose={(mediaState) => {
                      form.setValue(
                        'resourceIds',
                        mediaState.map((item) => item.id).map(Number),
                      );
                      setMedias(mediaState);
                    }}
                    className="size-[100px]"
                  />
                }
              />
            </FormItem>

            <OptionForm />
          </div>
          <div className="flex basis-[300px] flex-col gap-4">
            {/* isDeleted */}
            <FormField
              control={form.control}
              name="isDeleted"
              render={({ field }) => {
                return (
                  <FormItem className="border-accent rounded-md border-2 p-2">
                    <FormLabel className="mb-2 block text-lg">
                      Trạng thái
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Trạng thái" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="false">Đang bán</SelectItem>
                        <SelectItem value="true">Đóng</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* Price */}
            <div className="border-accent rounded-md border-2 p-2">
              <FormField
                control={form.control}
                name="basePrice"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="mb-2 block">Giá gốc</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Vui lòng không để trống"
                        {...field}
                        onChange={(event) =>
                          form.setValue('basePrice', event.target.valueAsNumber)
                        }
                      />
                    </FormControl>
                    <span className="h-[25px]">
                      <FormMessage />
                    </span>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salePrice"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="mb-2 block">Giá giảm</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Vui lòng không để trống"
                        {...field}
                        onChange={(event) =>
                          form.setValue('salePrice', event.target.valueAsNumber)
                        }
                      />
                    </FormControl>
                    <span className="h-[25px]">
                      <FormMessage />
                    </span>
                  </FormItem>
                )}
              />
            </div>
            <ProductSupplierForm />
            <ProductCategoryForm />
          </div>
        </div>
        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Tạo sản phẩm
        </Button>
      </form>
    </Form>
  );
};

export default CreateProductForm;
