'use client'

import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { SendContactReqType } from '@/types/contact.type';
import { SendContactSchema } from '@/types/schema/contact.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

const ContactPage = () => {
  const sendContactForm = useForm<SendContactReqType>({
    resolver: zodResolver(SendContactSchema)
  })

  const onSummitSendContactForm = async (body: SendContactReqType) => {}

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="mb-10 lg:mb-0">
          <div className="group h-full w-full">
            <div className="relative h-full">
              <div className="h-full w-full rounded-2xl bg-primary object-cover bg-blend-multiply lg:rounded-l-2xl" />
              <div className="absolute bottom-0 w-full p-5 lg:p-11">
                <div className="block rounded-lg bg-white p-6 space-y-4">
                  <div className="flex items-center">
                    <Phone className="text-primary"/>
                    <h5 className="ml-4 text-base">
                      470-601-1911
                    </h5>
                  </div>
                  <div className="flex items-center">
                    <Mail className="text-primary"/>
                    <h5 className="ml-4 text-base">
                      Pagedone1234@gmail.com
                    </h5>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="text-primary"/>
                    <h5 className="ml-4 text-base">
                      654 Sycamore Avenue, Meadowville, WA 76543
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-11">
          <h2 className="mb-11 text-4xl font-semibold text-primary">
            Liên hệ với chúng tôi
          </h2>

          <Form {...sendContactForm}>
            <form className="space-y-6" onSubmit={sendContactForm.handleSubmit(onSummitSendContactForm)}>
              <FormField
                control={sendContactForm.control}
                name='subject'
                render={({ field }) => (
                  <FormItem className="grid !space-y-1">
                    <FormLabel className="text-base">Chủ đề</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={sendContactForm.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem className="grid !space-y-1">
                    <FormLabel className="text-base text-black">Họ và tên <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={sendContactForm.control}
                name='email'
                render={({ field }) => (
                  <FormItem className="grid !space-y-1">
                    <FormLabel className="text-base text-black">Email <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={sendContactForm.control}
                name='message'
                render={({ field }) => (
                  <FormItem className="grid !space-y-1">
                    <FormLabel className="text-base text-black">Lời nhắn <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Textarea
                        rows={8}
                        {...field}
                        className="border p-3 border-input rounded-md shadow-sm"

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full p-6 text-base">Gửi</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
