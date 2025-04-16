'use client';
import Logo from '@/components/Logo';
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
import { HTTP_STATUS_CODE } from '@/constraint/variable';
import { handleErrorApi } from '@/lib/utils';
import authService from '@/service/auth.service';
import {
  ResetPasswordFormSchema,
  ResetPasswordFormType,
} from '@/types/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type ResetPasswordFormProps = {
  data: {
    email: string;
    otp: string;
  };
};

const ResetPasswordForm = ({ data }: ResetPasswordFormProps) => {
  const router = useRouter();
  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: '',
      'confirm-password': '',
    },
  });

  const onSubmit = async (value: ResetPasswordFormType) => {
    try {
      const res = await authService.resetPassword({
        email: data.email,
        otp: data.otp,
        password: value.password,
      });
      if (res.status === HTTP_STATUS_CODE.SUCCESS) {
        toast.success('Thay đổi mật khẩu thành công', {
          description: 'Vui lòng đăng nhâp lại.',
          action: {
            label: ' Đăng nhập',
            onClick: () => router.push('/login'),
          },
        });
        form.reset();
      }
    } catch (err: any) {
      handleErrorApi({
        error: err,
        setError: form.setError,
      });
    }
  };

  return (
    <>
      <div className="mx-auto">
        <Logo />
      </div>
      <div className="mt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Vui lòng không để trống"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm-password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhập lại mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Vui lòng không để trống"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Gửi OTP
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ResetPasswordForm;
