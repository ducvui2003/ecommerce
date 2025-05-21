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
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers accessToken={session?.accessToken ?? ''}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
