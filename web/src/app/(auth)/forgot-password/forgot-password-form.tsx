'use client';
import VerificationForm from '@/app/(auth)/forgot-password/verification-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
  ForgotPasswordReq,
  ForgotPasswordType,
} from '@/types/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useState } from 'react';

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [openDialogAlert, setOpenDialogAlert] = useState<boolean>(false);
  // 1. Define your form.
  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(ForgotPasswordReq),
    defaultValues: {
      email: '',
      otp: '',
      password: '',
      'confirm-password': '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: ForgotPasswordType) {
    try {
      const res = await authService.resetPassword(values);
      if (res.status === HTTP_STATUS_CODE.SUCCESS) {
        toast({
          title: 'Thay đổi mật khẩu thành công',
          description: (
            <>
              <p>Vui lòng đăng nhâp lại.</p>
              <button
                onClick={() => router.push('/login')}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Đăng nhập
              </button>
            </>
          ),
          variant: 'default',
        });
        form.reset();
        setOpenDialogAlert(false);
      }
    } catch (err: any) {
      handleErrorApi({
        error: err,
        setError: form.setError,
      });
    }
  }

  return (
    <>
      <VerificationForm
        formOuter={form}
        setOpenDialog={() => {
          form.reset({
            otp: '',
            password: '',
            'confirm-password': '',
          });
          setOpenDialogAlert(true);
        }}
      />
      <Form {...form}>
        <Dialog
          open={openDialogAlert}
          onOpenChange={(value) => setOpenDialogAlert(value)}
        >
          <DialogContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <DialogHeader>
                <DialogTitle>Vui lòng nhập mã OTP</DialogTitle>
                <DialogDescription>
                  Kiểm tra email và nhập mã OTP
                </DialogDescription>
              </DialogHeader>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <InputOTP
                        {...field}
                        maxLength={6}
                        containerClassName="justify-center mt-4!"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Vui lòng nhập OTP từ email của bạn
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
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
                    <FormLabel>Confirm password</FormLabel>
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
              <DialogFooter>
                <Button type="submit">Xác thực</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </Form>
    </>
  );
};

export default ForgotPasswordForm;
