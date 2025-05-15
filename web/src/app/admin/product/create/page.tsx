'use client';

import ClientIcon from '@/components/ClientIcon';
import Editor from '@/components/Editor';
import ListView from '@/components/ListView';
import MediaCard from '@/components/media/MediaCard';
import MediaDialog from '@/components/media/MediaDialog';
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
import { useAppSelector } from '@/hooks/use-store';
import { RootState } from '@/lib/store';
import { MediaType } from '@/types/media.type';
import {
  CreateProductBodySchema,
  CreateProductBodyType,
} from '@/types/product.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type CreateProductPageProps = {};

const CreateProductPage = ({}: CreateProductPageProps) => {
  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBodySchema),
  });
  const medias = useAppSelector(
    (state: RootState) => state.mediaSlice.mediaPicks,
  );
  const { isSubmitting } = form.formState;
  const [openMedia, setOpenMedia] = useState<boolean>(false);
  const onSubmit = (values: CreateProductBodyType) => {};

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
              className="grid-cols-8 gap-2"
              render={(item) => {
                return <MediaCard key={item.id} url={item.url ?? ''} />;
              }}
              append={
                <div
                  onClick={() => setOpenMedia(true)}
                  className="border-accent grid h-full w-full items-center rounded-xl border-2 bg-gray-200 hover:cursor-pointer hover:bg-gray-300"
                >
                  <ClientIcon icon={'ic:baseline-plus'} />
                </div>
              }
            />
          </FormItem>
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
      <MediaDialog
        open={openMedia}
        onOpenChange={(open) => setOpenMedia(open)}
        expose={(resource) => {
          console.log(resource);
        }}
      />
    </>
  );
};

export default CreateProductPage;
