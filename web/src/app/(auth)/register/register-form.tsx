'use client';
import VerificationForm from '@/app/(auth)/register/verification-form';
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
import { toast } from '@/hooks/use-toast';
import { handleErrorApi } from '@/lib/utils';
import authService from '@/service/auth.service';
import {
  RegisterBodyReq,
  RegisterBodyReqType,
} from '@/types/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const RegisterForm = () => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<RegisterBodyReqType>({
    resolver: zodResolver(RegisterBodyReq),
    defaultValues: {
      email: '',
      otp: '',
      name: '',
      password: '',
      'confirm-password': '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterBodyReqType) {
    try {
      const res = await authService.register(values);
      if (res.status === HTTP_STATUS_CODE.SUCCESS) {
        toast({
          title: 'Đăng ký thành công',
          description: (
            <>
              <p>You have logged in successfully.</p>
              <button
                onClick={() => router.push('/login')}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Go to Dashboard
              </button>
            </>
          ),
          variant: 'default',
        });
      }
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
        <VerificationForm formOuter={form} />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
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
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm-password"
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
            </FormItem>
          )}
        />
        <Button
          className="w-full"
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
  );
};

export default RegisterForm;
