'use client';
import VerificationForm from '@/app/(auth)/forgot-password/verification-form';
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
  ForgotPasswordFormSchema,
  ForgotPasswordFormType,
} from '@/types/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import Logo from '@/components/Logo';

type ForgotPasswordFormProps = {
  onUpdate: (data: { email: string }) => void;
  onNextStep: () => void;
};

const ForgotPasswordForm = ({
  onUpdate,
  onNextStep,
}: ForgotPasswordFormProps) => {
  // 1. Define your form.
  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(value: ForgotPasswordFormType) {
    authService
      .sendOTPForgetPassword(value.email)
      .then(() => {
        onUpdate({ email: value.email });
        onNextStep();
      })
      .catch((error) => {
        handleErrorApi({
          error: error,
          setError: form.setError,
        });
      })
      .finally(() => {
        toast.warning('Gửi email tạo lại mật khẩu thành công', {
          description: 'Vui lòng kiểm tra email ',
        });
      });
  }

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
            <Button
              className="w-full"
              disabled={form.formState.isSubmitting}
              type="submit"
            >
              {form.formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Gửi OTP
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
