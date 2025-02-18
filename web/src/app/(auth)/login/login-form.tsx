'use client';
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
import { LoginBodyReq, LoginBodyReqType } from '@/types/schema/auth.schema';
import authApiRequest from '@/service/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { handleErrorApi } from '@/lib/utils';

const LoginForm = () => {
  const router = useRouter();
  const toast = useToast();

  // 1. Define your form.
  const form = useForm<LoginBodyReqType>({
    resolver: zodResolver(LoginBodyReq),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyReqType) {
    try {
      const { accessToken, refreshToken } = (await authApiRequest.login(values))
        .payload.data;
      authApiRequest.auth({ accessToken, refreshToken });
      router.push('/');
    } catch (err: any) {
      handleErrorApi({
        error: err,
        setError: form.setError,
      });
    }
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
                <Input placeholder="Vui lòng không để trống" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
