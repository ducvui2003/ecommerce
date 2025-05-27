'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import SelectDistrict from '@/components/address/SelectDistrict';
import SelectProvince from '@/components/address/SelectProvince';
import SelectWard from '@/components/address/SelectWard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreateOrderFormType } from '@/types/order.type';
import { useFormContext } from 'react-hook-form';

export default function OrderInfo() {
  const form = useFormContext<CreateOrderFormType>();
  return (
    <div className={'w-full border p-5 shadow-xl'}>
      <div className={'text-primary my-4 text-2xl font-bold'}>
        Thông tin giao hàng
      </div>

      <div className="space-y-8">
        <div className={'grid grid-cols-3 grid-rows-2 gap-x-4 gap-y-6'}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Họ và tên<span className={'text-red-500'}> *</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nguyễn Văn A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email<span className={'text-red-500'}> *</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="21130291@st.hcmuaf.edu.vn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Số điện thoại<span className={'text-red-500'}> *</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="0901323070" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SelectProvince />
          <SelectDistrict />
          <SelectWard />
        </div>

        <FormField
          control={form.control}
          name="detail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Địa chỉ cụ thể<span className={'text-red-500'}> *</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="1156 Phạm Văn Đồng" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className={'flex-1'}>
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ghi chú</FormLabel>
                <FormControl>
                  <Textarea placeholder="Giao sau 10h sáng" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
