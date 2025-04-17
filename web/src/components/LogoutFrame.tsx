'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { LOCAL_STORAGE } from '@/constraint/variable';
import { signOut } from 'next-auth/react';

type LogoutButtonProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const LogoutFrame = ({ open, setOpen }: LogoutButtonProps) => {
  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Ở lại
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              localStorage.setItem(LOCAL_STORAGE.LOGOUT, 'true');
              signOut({ callbackUrl: '/' });
            }}
          >
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutFrame;
