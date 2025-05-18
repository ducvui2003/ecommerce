'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAddress } from '@/hooks/use-address';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  ward: z.string(),
  district: z.string(),
  province: z.string(),
  note: z.string(),
});

type AddressOption = {
  code: string;
  name: string;
};

export default function OrderInfo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      phone: '',
      address: '',
      ward: '',
      district: '',
      province: '',
      note: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const {
    provinces,
    districts,
    wards,
    fetchDistricts,
    fetchWards,
    setDistricts,
    setWards,
  } = useAddress();

  const handleProvinceChange = async (provinceCode: string) => {
    await fetchDistricts(provinceCode);
    form.setValue('district', '');
    form.setValue('ward', '');
  };

  const handleDistrictChange = async (districtCode: string) => {
    await fetchWards(districtCode);
    form.setValue('ward', '');
  };

  return (
    <div className={'w-full border p-5 shadow-xl'}>
      <div className={'text-primary my-4 text-2xl font-bold'}>
        Thông tin giao hàng
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className={'flex gap-4'}>
            <div className={'flex-1'}>
              <FormField
                control={form.control}
                name="username"
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
            </div>
            <div className={'flex-1'}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email<span className={'text-red-500'}> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="21130291@st.hcmuaf.edu.vn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={'flex-1'}>
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
            </div>
          </div>
          <div className={'flex-1'}>
            <FormField
              control={form.control}
              name="address"
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
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Thành phố/Tỉnh<span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleProvinceChange(e.target.value);
                        }}
                        className="w-full rounded border px-3 py-2"
                      >
                        <option value="">Chọn tỉnh/thành</option>
                        {provinces.map((p) => (
                          <option key={p.code} value={p.code}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1">
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Quận/Huyện<span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleDistrictChange(e.target.value);
                        }}
                        className="w-full rounded border px-3 py-2"
                        disabled={!form.watch('province')}
                      >
                        <option value="">Chọn quận/huyện</option>
                        {districts.map((d) => (
                          <option key={d.code} value={d.code}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1">
              <FormField
                control={form.control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phường/Xã<span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full rounded border px-3 py-2"
                        disabled={!form.watch('district')}
                      >
                        <option value="">Chọn phường/xã</option>
                        {wards.map((w) => (
                          <option key={w.code} value={w.code}>
                            {w.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

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
        </form>
      </Form>
    </div>
  );
}
