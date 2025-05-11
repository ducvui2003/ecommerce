import Providers from '@/app/provider';
import type { Metadata } from 'next';
import './globals.css';

import { Inter } from 'next/font/google';
import getServerSession from '@/components/auth/getServerSession';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'An Nhien',
  description: 'Oil',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers accessToken={session?.accessToken ?? ''}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
