import { toast } from '@/hooks/use-toast';
import { EntityError } from '@/lib/http';
import { clsx, type ClassValue } from 'clsx';
import { UseFormSetError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

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
    const errors = error.payload.message as {
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
