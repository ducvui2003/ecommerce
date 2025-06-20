'use client';
import ClientIcon from '@/components/ClientIcon';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { HTTP_STATUS_CODE } from '@/constraint/variable';
import { handleErrorApi } from '@/lib/utils';
import authService from '@/service/auth.service';
import {
  RegisterFormType,
  VerifyFormSchema,
  VerifyFormType,
} from '@/types/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type VerificationFormProps = {
  registerInfo: RegisterFormType;
};

const VerificationForm = ({ registerInfo }: VerificationFormProps) => {
  const [countdown, setCountdown] = useState<number>(0);
  const router = useRouter();
  const form = useForm<VerifyFormType>({
    resolver: zodResolver(VerifyFormSchema),
    defaultValues: {
      otp: '',
    },
  });

  const { isSubmitting } = form.formState;
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  async function onSubmit(values: VerifyFormType) {
    try {
      const res = await authService.register({
        name: registerInfo.name,
        email: registerInfo.email,
        password: registerInfo.password,
        otp: values.otp,
      });
      if (res.status === HTTP_STATUS_CODE.SUCCESS) {
        toast.success('Đăng ký thành công', {
          description:
            'Bạn đã đăng ký thành công. Đang chuyển hướng trong 3 giây...',
          action: {
            label: 'Đăng nhập ',
            onClick: () => router.push('/login'),
          },
        });

        const timeout = setTimeout(() => {
          router.push('/login');
        }, 3000);

        return () => clearTimeout(timeout);
      }
    } catch (err) {
      handleErrorApi({
        error: err,
        setError: form.setError,
      });
    }
  }

  return (
    <div>
      <span className="bg-secondary mx-auto flex size-[80px] items-center justify-center rounded-full">
        <ClientIcon icon={'tabler:lock'} size={40} />
      </span>
      <h1 className="mt-8 text-center text-3xl font-bold">Nhập Mã OTP</h1>
      <p className="foreground text-foreground mt-2 text-center text-sm">
        Vui lòng kiểm tra email để nhập mã OTP
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="gap-8">
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  >
                    <InputOTPGroup className="gap-5">
                      <InputOTPSlot index={0} className="size-12 !rounded-xl" />
                      <InputOTPSlot index={1} className="size-12 !rounded-xl" />
                      <InputOTPSlot index={2} className="size-12 !rounded-xl" />
                      <InputOTPSlot index={3} className="size-12 !rounded-xl" />
                      <InputOTPSlot index={4} className="size-12 !rounded-xl" />
                      <InputOTPSlot index={5} className="size-12 !rounded-xl" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />

          <Button
            loading={isSubmitting}
            type="submit"
            className="mx-auto mt-8! flex gap-1"
          >
            Gửi mã OTP
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VerificationForm;
