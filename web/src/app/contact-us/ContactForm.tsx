'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateContactMutation } from '@/features/contact/contact.api';
import ClientIcon from '@/components/ClientIcon';
import ContactCard from '@/app/contact-us/ContactCard';
import GoogleMap from '@/app/contact-us/GoogleMap';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(1, 'Họ và tên là bắt buộc'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string(),
  message: z.string().min(1, 'Nội dung liên hệ là bắt buộc'),
  title: z.string().min(1, 'Tiêu đề là bắt buộc'),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      title: '',
    },
  });

  const [createContact, { isLoading }] = useCreateContactMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createContact(values).unwrap();
      toast.success('Gửi liên hệ thành công');
      form.reset();
    } catch (error) {
      toast.error('Gửi liên hệ thất bại');
    }
  };

  return (
    <div className="mx-auto max-w-7xl rounded-2xl mt-10 mb-10">
      <ContactCard/>
      <div className="grid grid-cols-1 px-4 py-12 shadow-2xl sm:px-6 md:grid-cols-3 lg:px-8">
        <Card className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md transition-shadow hover:shadow-lg text-black">
          <CardContent className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">Thông tin liên hệ</h2>
            <p className="text-sm text-muted-foreground">
              Nếu bạn có thắc mắc hoặc bất kỳ câu hỏi gì, đừng ngần ngại liên hệ với chúng tôi. Chúng tôi luôn sẵn sàng hỗ trợ bạn.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-4">
                <div className="bg-secondary text-black p-2 rounded-full">
                  <ClientIcon icon="lucide:phone" />
                </div>
                <span className="pt-1">773 097 6543</span>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary text-black p-2 rounded-full">
                  <ClientIcon icon="lucide:mail" />
                </div>
                <span className="pt-1">tinhdau@hcmuaf.edu.vn</span>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary text-black p-2 rounded-full">
                  <ClientIcon icon="lucide:map-pin" />
                </div>
                <span className="pt-1">
          Khu phố 6, phường Linh Trung, thành phố Thủ Đức, Việt Nam
        </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary text-black p-2 rounded-full">
                  <ClientIcon icon="lucide:clock-9" />
                </div>
                <span className="pt-1">Thứ hai - Chủ nhật: 9:00 - 22:00</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Link href="#" aria-label="Facebook" className="hover:opacity-80 transition">
                <ClientIcon icon="ic:baseline-facebook" className="text-xl text-blue-600" />
              </Link>
              <Link href="#" aria-label="YouTube" className="hover:opacity-80 transition">
                <ClientIcon icon="mdi:youtube" className="text-xl text-red-600" />
              </Link>
              <Link href="#" aria-label="Instagram" className="hover:opacity-80 transition">
                <ClientIcon icon="mdi:instagram" className="text-xl text-pink-500" />
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className="md:col-span-2">
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ và tên</FormLabel>
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="example@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input placeholder="0987 654 321" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiêu đề</FormLabel>
                      <FormControl>
                        <Input placeholder="Tiêu đề liên hệ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nội dung liên hệ</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Viết nội dung liên hệ tại đây..." rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-primary text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Đang gửi...' : 'Gửi liên hệ'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </div>
      </div>
      <GoogleMap/>
    </div>
  );
}
