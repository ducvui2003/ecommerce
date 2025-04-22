'use client';
import ClientIcon from '@/components/ClientIcon';
import ListView from '@/components/ListView';
import { MediaFileUpload } from '@/components/media/MediaUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
} from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { uuid } from '@/lib/utils';
import { Media, MediaUploading } from '@/types/media.type';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
type MediaDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
};

const url =
  'https://plus.unsplash.com/premium_photo-1673803529478-c155a34d8b45?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmVydGljYWwlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D';
const data: Media[] = Array(5)
  .fill(false)
  .map(() => ({
    id: uuid(),
    url: url,
  }));

const MediaDialog = ({ open = undefined, onOpenChange }: MediaDialogProps) => {
  const [files, setFiles] = useState<(Media | MediaUploading)[]>(data);
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="max-w-[70vw]">
        <DialogHeader>
          <DialogTitle>Select file</DialogTitle>
        </DialogHeader>
        <div className="flex">
          <Input type="text" className="flex-1" />
          <div className="flex-1">
            <Button className="ml-auto flex items-center p-1">
              <ClientIcon icon={'fluent-mdl2:sort'} size={20} />
              Sort
            </Button>
          </div>
        </div>
        <MediaFileUpload
          onValueChange={(files) =>
            setFiles((prev) => [
              {
                id: '123123',
                url: '123123.png',
                file: files[0],
              },
              ...prev,
            ])
          }
        >
          <ListView<Media | MediaUploading>
            display="grid"
            className="grid-cols-5 gap-4"
            data={files}
            render={(item, _) => {
              if ('file' in item) {
                return (
                  <FileUploadItem
                    key={item.id}
                    value={item.file}
                    className="justify-between"
                  >
                    <FileUploadItemPreview className="w-full flex-1" />
                    {/* <FileUploadItemMetadata /> */}
                    <FileUploadItemProgress />
                  </FileUploadItem>
                );
              }
              return <MediaViewerCard url={item.url} key={item.id} />;
            }}
          />
        </MediaFileUpload>
      </DialogContent>
    </Dialog>
  );
};

type MediaViewerCardProps = {
  url: string;
  checked?: boolean;
};

const MediaViewerCard = ({ url, checked }: MediaViewerCardProps) => {
  return (
    <div className="border-accent aspect-square rounded-xl border-2 p-1">
      <img src={url} className="size-full rounded-xl bg-white object-center" />
    </div>
  );
};

export default MediaDialog;
