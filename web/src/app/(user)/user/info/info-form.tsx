'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn, formatDate } from '@/lib/utils';
import userService from '@/service/user.service';
import {
  Gender,
  InformationFormSchema,
  InformationFormType,
} from '@/types/user.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type UserInfoFormProps = {
  initialValues: InformationFormType;
};

const UserInfoForm = ({ initialValues }: UserInfoFormProps) => {
  const form = useForm<InformationFormType>({
    resolver: zodResolver(InformationFormSchema),
    defaultValues: initialValues,
  });

  const [isChange, setIsChange] = useState<boolean>(false);

  const watched = form.watch();

  useEffect(() => {
    const subscription = form.watch((current) => {
      const isChanged =
        (current.name !== initialValues.name ||
          current.gender !== initialValues.gender ||
          (initialValues.phone && current.phone !== initialValues.phone) ||
          (current.dob &&
            initialValues.dob &&
            formatDate(current.dob) !== formatDate(initialValues.dob))) ??
        false;

      setIsChange(isChanged);
    });

    return () => subscription.unsubscribe();
  }, [watched]);

  function onSubmit(values: InformationFormType) {
    userService
      .updateInfo(values)
      .then((response) => {
        console.log(response);
        form.reset(response);
        toast.success('Cập nhập thông tin thành công');
      })
      .catch((error) => {
        console.error(error);
        toast.success('Cập nhập thông tin thất bại');
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="Họ và tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Số điện thoại" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel>Ngày sinh</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline">
                        {field.value ? (
                          format(field.value, 'dd/MM/yyyy')
                        ) : (
                          <span>Chọn ngày sinh</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Giới tính </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Gender.MALE}>Nam</SelectItem>
                      <SelectItem value={Gender.FEMALE}>Nữ</SelectItem>
                      <SelectItem value={Gender.UNKNOWN}>Khác</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="flex">
          <Button
            type="button"
            onClick={() => form.reset()}
            variant={'cancel'}
            className={cn(
              'ml-auto',
              isChange ? 'cursor-pointer' : 'hover:cursor-not-allowed',
            )}
          >
            Hủy
          </Button>
          <Button
            className={cn(
              'ml-3',
              isChange ? 'cursor-pointer' : 'hover:cursor-not-allowed',
            )}
            disabled={!isChange}
          >
            Thay đổi
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserInfoForm;
