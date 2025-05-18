'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import image from '/public/images/brian.jpeg';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import userService from '@/service/user.service';
import { useAppSelector } from '@/hooks/use-store';

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, 'Tên người dùng không hợp lệ')
      .max(50, 'Tên người dùng không hợp lệ'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    phone: z
      .string()
      .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
      .max(11, 'Số điện thoại không được quá 11 chữ số')
      .regex(/^[0-9]+$/, 'Số điện thoại không hợp lệ'),
    birthday: z
      .string()
      .min(10, 'Ngày sinh không hợp lệ')
      .max(11, 'Ngày sinh không hợp lệ'),
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      path: ['confirmPassword'],
      message: 'Mật khẩu không khớp',
    },
  );

const UserInfoPage = () => {
  const [update, setUpdate] = useState<boolean>(false);
  const accessToken = useAppSelector((state) => state.authSlice.accessToken);
  const response =  userService.getInfo(data.accessToken);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: 'tên',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('hellop');
    setUpdate(false);
  }

  const renderInputField = (
    name:
      | 'username'
      | 'email'
      | 'password'
      | 'confirmPassword'
      | 'phone'
      | 'birthday',
    label: string,
    type = 'text',
  ) => {
    return (
      <div className={'mb-6'}>
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  type={type}
                  placeholder=""
                  {...field}
                  disabled={!update}
                  className={cn(
                    baseInputClasses,
                    !update && 'cursor-not-allowed opacity-70',
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };
  const baseInputClasses = cn(
    'border-input rounded-md border px-3 py-2',
    'focus:ring-primary focus:border-primary focus:ring-1 focus:outline-none',
    'focus-visible:ring-primary focus-visible:border-primary focus-visible:ring-1 focus-visible:outline-none',
  );

  return (
    <div className={'mt-3'}>
      <div className={'flex items-center justify-center'}>
        <div
          className={'relative block size-[150px] overflow-hidden rounded-full'}
        >
          <Image src={image} alt="logo" fill className="object-contain" />
        </div>
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mt-3 flex justify-center">
            {!update ? (
              <Button
                className={
                  'bg-primary hover:bg-secondary mr-3 cursor-pointer rounded-xl p-3 px-8 text-[16px] text-white'
                }
                onClick={() => setUpdate(true)}
              >
                Cập nhập
              </Button>
            ) : (
              <div className={'flex w-1/3 justify-around'}>
                <Button
                  className={
                    'bg-primary hover:bg-secondary mr-3 cursor-pointer rounded-xl p-3 px-10 text-[16px] text-white'
                  }
                >
                  Đổi ảnh
                </Button>
                <Button
                  className={
                    'border-primary text-primary hover:bg-primary mr-3 cursor-pointer rounded-xl border-2 bg-white p-3 px-10 text-[16px] hover:text-white'
                  }
                  type="submit"
                >
                  Lưu
                </Button>
              </div>
            )}
          </div>
          <div className="mx-auto mt-3 w-1/2">
            {renderInputField('email', 'Email', 'email')}
            {renderInputField('username', 'Họ Tên')}
            <div className={'mb-6'}>
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel>Ngày sinh</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'border-input h-10 w-full rounded-md border pl-3 text-left font-normal',
                              'focus:ring-primary focus:border-primary focus:bg-white focus:ring-1 focus:outline-none',
                              'focus-within:ring-primary focus-within:border-primary focus-within:bg-white focus-within:ring-1 focus-within:outline-none',
                              'hover:border-primary transition-colors duration-150 ease-in-out hover:bg-white',
                              !field.value && 'text-muted-foreground',
                              !update && 'cursor-not-allowed opacity-70',
                            )}
                            disabled={!update}
                          >
                            {field.value ? (
                              format(field.value, 'dd/MM/yyyy')
                            ) : (
                              <span>Chọn ngày sinh</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={update ? field.onChange : undefined}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {renderInputField('phone', 'Số điện thoại', 'tel')}
            {update && (
              <>
                {renderInputField('password', 'Mật khẩu', 'password')}
                {renderInputField(
                  'confirmPassword',
                  'Xác nhận mật khẩu',
                  'password',
                )}
              </>
            )}
          </div>
          );
        </form>
      </FormProvider>
    </div>
  );
};

export default UserInfoPage;
