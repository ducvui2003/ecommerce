'use client';
import signOut from '@/components/auth/signOut';
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
import { HOME_PAGE, LOCAL_STORAGE } from '@/constraint/variable';
import { useRouter } from 'next/navigation';

type LogoutButtonProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const LogoutFrame = ({ open, setOpen }: LogoutButtonProps) => {
  const router = useRouter();
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
              signOut().then(() => {
                router.replace(HOME_PAGE);
              });
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
