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

import { handleErrorApi } from '@/lib/utils';
import authService from '@/service/auth.service';
import {
  VerifyForgetPasswordFormSchema,
  VerifyForgetPasswordFormType,
} from '@/types/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type VerificationFormProps = {
  data: {
    email: string;
  };
  onUpdate: (data: { otp: string }) => void;
  onNextStep: () => void;
};

const VerificationForm = ({
  data,
  onNextStep,
  onUpdate,
}: VerificationFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  // 1. Define your form.
  const form = useForm<VerifyForgetPasswordFormType>({
    resolver: zodResolver(VerifyForgetPasswordFormSchema),
    defaultValues: {
      otp: '',
    },
  });
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        console.log('Stopped loading after 5 minutes');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  function onSubmit(values: VerifyForgetPasswordFormType) {
    authService
      .verifyOTPForgetPassword({
        email: data.email,
        otp: values.otp,
      })
      .then(() => {
        console.log('Set');
        onUpdate({ otp: values.otp });
        onNextStep();
      })
      .catch((error) => {
        handleErrorApi({
          error: error,
          setError: form.setError,
        });
      })
      .finally(() => {
        setCountdown(5);
        toast.warning('Gửi email tạo lại mật khẩu thành công', {
          description: 'Vui lòng kiểm tra email ',
        });
      });
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
          <Button className="mx-auto mt-8! flex gap-1">Gửi mã OTP</Button>
        </form>
      </Form>
    </div>
  );
};

export default VerificationForm;
