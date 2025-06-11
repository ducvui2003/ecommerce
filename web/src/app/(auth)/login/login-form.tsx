'use client';
import signIn from '@/components/auth/signIn';
import Link from '@/components/Link';
import TurnstileWidget from '@/components/TurnstileWidget';
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
import { setAuthState, setStatus } from '@/features/auth/auth.slice';
import { useAppDispatch } from '@/hooks/use-store';
import { EntityError } from '@/lib/http.client';
import { cn, handleErrorApi } from '@/lib/utils';
import { LoginFormSchema, LoginFormType } from '@/types/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState<boolean>(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
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
    if (!turnstileToken) {
      toast.warning('Vui lòng xác thực Turnstile trước khi đăng nhập');
      return;
    }
    return signIn({
      email: values.email,
      password: values.password,
    })
      .then(({ accessToken, expiresAt, user }) => {
        dispatch(
          setAuthState({
            status: 'authenticated',
            accessToken,
            expiresAt,
            user,
          }),
        );
        router.push(HOME_PAGE);
      })
      .catch((_) => {
        setIsError(true);
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
        dispatch(setStatus('un-authenticated'));
        handleErrorApi({
          error: error,
          setError: form.setError,
        });
      });
  }
  return (
    <Form {...form}>
      <div
        className={cn(
          'bg-secondary mb-2 rounded-md px-4 py-2 text-center text-red-600',
          !isError && 'hidden',
        )}
      >
        Email hoặc mật khẩu không chính xác
      </div>
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

        <TurnstileWidget
          onSuccess={(token) => setTurnstileToken(token)}
          onFail={() => {
            toast.error(
              'Xác thực Turnstile không thành công, vui lòng thử lại',
            );
          }}
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
