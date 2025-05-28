'use client';

import { Card, CardContent } from '@/components/ui/card';
import ClientIcon from '@/components/ClientIcon';
import Link from 'next/link';

export default function ContactCard() {
  return (
    <Card className="p-6 shadow-lg md:p-10">
      <CardContent className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="flex-1">
          <h2 className="inline-block rounded-md bg-secondary p-2 text-2xl font-semibold text-black md:text-3xl">
            Chúng tôi rất mong nhận được phản hồi từ bạn
          </h2>
        </div>

        <div className="flex-1">
            Cảm ơn bạn đã quan tâm đến An Nhien – nơi lan tỏa sự thư giãn và cân
            bằng từ thiên nhiên. Chúng tôi luôn lắng nghe mọi chia sẻ, câu hỏi
            và phản hồi từ bạn. Đừng ngần ngại liên hệ với chúng tôi – đội ngũ
            An Nhien sẵn sàng đồng hành và hỗ trợ bạn trên hành trình chăm sóc
            sức khỏe và tinh thần mỗi ngày.
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
        </div>
      </CardContent>
    </Card>
  );
}
