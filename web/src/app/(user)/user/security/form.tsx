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
import { cn, handleErrorApi } from '@/lib/utils';
import userService from '@/service/user.service';
import { PasswordFormSchema, PasswordFormType } from '@/types/user.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
type ChangePasswordFormProps = {
  children: ReactNode;
};

const ChangePasswordForm = () => {
  const form = useForm<PasswordFormType>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const { isSubmitting } = form.formState;
  function onSubmit(values: PasswordFormType) {
    userService
      .changePassword(values)
      .then(() => {
        form.reset();
        toast.success('Thay đổi mật khẩu thành công');
      })
      .catch((_error) => {
        handleErrorApi({
          error: _error,
          setError: form.setError,
        });
        toast.error('Thay đổi mật khẩu không thành công');
      });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-5">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Mật khẩu hiện tại</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Mật khẩu mới</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Xác nhận mật khẩu mới</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex">
          <Button
            className={cn('ml-3')}
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Thay đổi
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
