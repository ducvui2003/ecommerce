'use client';
import Link from '@/components/Link';
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
import { EntityError } from '@/lib/http';
import { handleErrorApi } from '@/lib/utils';
import { LoginFormSchema, LoginFormType } from '@/types/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  function onSubmit(values: LoginFormType) {
    return signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })
      .then((response) => {
        if (
          response?.error ===
          HTTP_STATUS_CODE.ENTITY_ERROR_STATUS_CODE.toString()
        ) {
          // Đóng gói error để trả error trên form thay vì toast message error
          throw new EntityError({
            status: HTTP_STATUS_CODE.ENTITY_ERROR_STATUS_CODE,
            payload: {
              error: '',
              message: [
                {
                  field: 'password',
                  error: 'Email hoặc mật khẩu không đúng',
                },
              ],
            },
          });
        }
        if (response?.error === HTTP_STATUS_CODE.UNAUTHORIZED.toString()) {
          // Đóng gói error để trả error trên form thay vì toast message error
          throw new EntityError({
            status: HTTP_STATUS_CODE.UNAUTHORIZED,
            payload: {
              error: '',
              message: [
                {
                  field: 'email',
                  error:
                    'Tài khoản với email này chưa tồn tại, vui lòng thực hiện đăng ký',
                },
              ],
            },
          });
        }
        router.push('/');
      })
      .catch((error) => {
        handleErrorApi({
          error: error,
          setError: form.setError,
        });
      });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Vui lòng không để trống"
                  {...field}
                />
              </FormControl>

              <FormMessage />
              <span className="block text-right">
                <Link
                  href={'/forgot-password'}
                  className="hover:text-accent text-sm hover:underline"
                >
                  Quên mật khẩu
                </Link>
              </span>
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
