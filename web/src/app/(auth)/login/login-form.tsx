'use client';
import signIn from '@/components/auth/signIn';
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
import { HOME_PAGE, HTTP_STATUS_CODE } from '@/constraint/variable';
import { setAuthState } from '@/features/auth/auth.slice';
import { useAppDispatch } from '@/hooks/use-store';
import { EntityError } from '@/lib/http';
import { handleErrorApi } from '@/lib/utils';
import { LoginFormSchema, LoginFormType } from '@/types/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // 1. Define your form.
  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  function onSubmit(values: LoginFormType) {
    return signIn({
      email: values.email,
      password: values.password,
    })
      .then(({ accessToken, expiresAt, user }) => {
        dispatch(
          setAuthState({
            accessToken,
            expiresAt,
            user,
          }),
        );
        router.push(HOME_PAGE);
      })
      .catch((error) => {
        throw new EntityError({
          status: HTTP_STATUS_CODE.UNAUTHORIZED,
          payload: {
            error: '',
            message: [
              {
                field: 'email',
                error: 'Tài khoản với email này chưa tồn tại',
              },
            ],
          },
        });
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
              <span className="h-[25px]">
                <FormMessage />
              </span>
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
