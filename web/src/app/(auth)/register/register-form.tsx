'use client';
import VerificationForm from '@/app/(auth)/register/verification-form';
import SocialPart from '@/app/(auth)/social-part';
import Link from '@/components/Link';
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
import { handleErrorApi } from '@/lib/utils';
import authService from '@/service/auth.service';
import {
  RegisterFormSchema,
  RegisterFormType,
} from '@/types/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const RegisterForm = () => {
  const [registerValue, setRegisterValue] = useState<RegisterFormType | null>(
    null,
  );
  // 1. Define your form.
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      'confirm-password': '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterFormType) {
    try {
      // sent mail
      const resOtp = await authService.sendOTPVerify({
        email: values.email,
      });

      if (resOtp) {
        toast.success('Gửi email xác thực thành công', {
          description: 'Vui lòng kiểm tra email ',
        });
        setRegisterValue(values);
      }
    } catch (err: any) {
      handleErrorApi({
        error: err,
        setError: form.setError,
      });
    }
  }

  return !registerValue ? (
    <>
      <div className="mx-auto">
        <Logo className="size-[125px]" />
      </div>
      <div className="py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Vui lòng không để trống" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Vui lòng không để trống" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Mật khẩu</FormLabel>
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
                  <FormLabel className="text-base">Nhập lại mật khẩu</FormLabel>
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
            <Button
              className="w-full text-base"
              disabled={form.formState.isSubmitting}
              type="submit"
            >
              {form.formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Đăng ký
            </Button>
          </form>
        </Form>
      </div>
      <div className="py-2">
        <SocialPart />
      </div>
      <Link href={'/login'}>
        <Button variant={'ghost'} className="mt-2 w-full" type="button">
          Đăng nhập
        </Button>
      </Link>
    </>
  ) : (
    <div className="animate-fadeIn-left py-2">
      <VerificationForm registerInfo={registerValue} />
    </div>
  );
};
export default RegisterForm;
