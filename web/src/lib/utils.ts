import { toast } from '@/hooks/use-toast';
import { EntityError } from '@/lib/http';
import { clsx, type ClassValue } from 'clsx';
import { UseFormSetError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleErrorApi({
  error,
  setError,
  duration = 5000,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) {
  if (error instanceof EntityError && setError) {
    const errors = error.payload.error as {
      field: string;
      error: string;
    }[];

    errors.forEach(({ field, error }) => {
      setError(field, {
        type: 'server',
        message: error,
      });
    });
  } else {
    toast({
      title: 'Lỗi',
      description: error?.payload?.error ?? 'Lỗi không xác định',
      variant: 'destructive',
      duration: duration,
    });
  }
}

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path;
};

export const uuid = (): string => {
  return uuidv4();
};

const VietNamDong = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export const currency = (currency: number): string => {
  return VietNamDong.format(currency);
};
