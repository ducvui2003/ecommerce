'use client';
import { ReactNode } from 'react';

import { useAppSelector } from '@/hooks/use-store';
import { RootState } from '@/lib/store';
import { MediaType } from '@/types/media.type';
import {
  CreateProductBodySchema,
  CreateProductBodyType,
} from '@/types/product.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Editor from '@/components/Editor';
import ListView from '@/components/ListView';
import MediaButton from '@/components/media/MediaButton';
import MediaCard from '@/components/media/MediaCard';
import OptionForm from '@/components/option/OptionForm';
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
type CreateProductFormProps = {
  children: ReactNode;
};

const CreateProductForm = () => {
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
  const medias = useAppSelector(
    (state: RootState) => state.mediaSlice.mediaPicks,
  );
  const { isSubmitting } = form.formState;
  const onSubmit = (values: CreateProductBodyType) => {
    console.log(values);
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
                      className="size-[80px]"
                      key={item.id}
                      url={item.url ?? ''}
                    />
                  );
                }}
                emptyComponent={null}
                append={<MediaButton />}
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
            {/* Supplier */}
            <FormField
              control={form.control}
              name="supplierId"
              render={({ field }) => {
                return (
                  <FormItem className="border-accent rounded-md border-2 p-2">
                    <FormLabel className="mb-2 block text-lg">
                      Nhà phân phối
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
            {/* Category */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => {
                return (
                  <FormItem className="border-accent rounded-md border-2 p-2">
                    <FormLabel className="mb-2 block text-lg">
                      Thể loại
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
