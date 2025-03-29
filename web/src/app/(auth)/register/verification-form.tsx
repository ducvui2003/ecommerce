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
import { useToast } from '@/hooks/use-toast';
import { handleErrorApi } from '@/lib/utils';
import authService from '@/service/auth.service';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
type VerificationFormProps = {
  formOuter: UseFormReturn<any>;
};

const VerificationForm = ({ formOuter }: VerificationFormProps) => {
  const { toast } = useToast();
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
      .sendOTPVerify({
        email: email,
      })
      .catch((error) => {
        handleErrorApi({
          error: error,
          setError: formOuter.setError,
        });
      })
      .finally(() => {
        setCountdown(5);
        toast({
          title: 'Gửi email xác thực thành công',
          description: 'Vui lòng kiểm tra email ',
        });
      });
  }

  return (
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
      <FormLabel>Mã xác nhận</FormLabel>
      <div className="flex gap-1 !mt-2">
        <div className="flex-1">
          <FormField
            control={formOuter.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Vui lòng không để trống" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button
            loading={loading}
            type="button"
            className=""
            onClick={() => onSubmit(formOuter.getValues().email)}
          >
            Gửi mã OTP
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default VerificationForm;
