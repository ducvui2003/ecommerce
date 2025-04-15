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

import { handleErrorApi } from '@/lib/utils';
import authService from '@/service/auth.service';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
type VerificationFormProps = {
  formOuter: UseFormReturn<any>;
  setOpenDialog: () => void;
};

const VerificationForm = ({
  formOuter,
  setOpenDialog,
}: VerificationFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);

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

  function onSubmit(email: string) {
    if (!formOuter.getValues().email) {
      formOuter.setError('email', {
        type: 'manual',
        message: 'Vui lòng không để trống',
      });
      return;
    }
    formOuter.clearErrors('email');
    setLoading(true);
    authService
      .sendOTPForgetPassword({
        email: email,
      })
      .then(() => {
        setOpenDialog();
      })
      .catch((error) => {
        handleErrorApi({
          error: error,
          setError: formOuter.setError,
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
    <>
      <Form {...formOuter}>
        <FormField
          control={formOuter.control}
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
          loading={loading}
          type="button"
          className="mt-4 w-full"
          onClick={() => onSubmit(formOuter.getValues().email)}
        >
          Lấy lại mật khẩu
        </Button>
      </Form>
    </>
  );
};

export default VerificationForm;
