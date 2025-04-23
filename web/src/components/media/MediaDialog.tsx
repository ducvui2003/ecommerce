'use client';
import ClientIcon from '@/components/ClientIcon';
import ListView from '@/components/ListView';
import { MediaFileUpload } from '@/components/media/MediaUpload';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FileUploadItem,
  FileUploadItemPreview,
  FileUploadItemProgress,
} from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { useGetPagingMediaQuery } from '@/features/media/media.api';
import { uuid } from '@/lib/utils';
import mediaService from '@/service/media.service';
import { Paging, RequestPaging } from '@/types/api.type';
import { Media, MediaUploading } from '@/types/media.type';
import { ReactNode, useCallback, useState } from 'react';
import { toast } from 'sonner';
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
    name: '12d.png',
  }));

const MediaDialog = ({ open = undefined, onOpenChange }: MediaDialogProps) => {
  const [files, setFiles] = useState<(Media | MediaUploading)[]>(data);
  const [paging, setPaging] = useState<RequestPaging>({
    page: 1,
    size: 3,
  });
  // const { isFetching, data } = useGetPagingMediaQuery({
  //   page: paging.page,
  //   size: paging.size,
  // });

  const onUpload = useCallback(
    async (
      files: File[],
      {
        onProgress,
        onSuccess,
        onError,
      }: {
        onProgress: (file: File, progress: number) => void;
        onSuccess: (file: File) => void;
        onError: (file: File, error: Error) => void;
      },
    ) => {
      try {
        const signaturePromises = await mediaService.sign(
          files.map((file) => ({
            folder: 'test',
            publicId: file.name,
          })),
        );

        const uploadPromises = files.map(async (file, index) => {
          try {
            console.log('Preparing upload for', file.name);

            // Simulate file upload with progress
            const totalChunks = 10;
            let uploadedChunks = 0;

            // Simulate chunk upload with delays
            for (let i = 0; i < totalChunks; i++) {
              // Simulate network delay (100-300ms per chunk)
              await new Promise((resolve) =>
                setTimeout(resolve, Math.random() * 200 + 100),
              );

              // Update progress for this specific file
              uploadedChunks++;
              const progress = (uploadedChunks / totalChunks) * 100;
              onProgress(file, progress);
            }

            const result = await mediaService.uploadFileToCloudinary(file, {
              apiKey: signaturePromises.apiKey,
              folder: signaturePromises.properties[index].folder,
              signature: signaturePromises.properties[index].signature,
              timestamp: signaturePromises.timestamp,
              publicId: file.name,
            });
            const response = await mediaService.createMedia({
              format: result.format,
              publicId: result.public_id,
              type: result.resource_type,
            });

            if (response) {
              setFiles((prev) => [
                {
                  id: response.id.toString(),
                  name: response.publicId,
                  url: result.url,
                },
                ...prev.filter((item) => !('file' in item)),
              ]);
            }
            toast.success(`Upload Success`, {
              description: response.publicId,
            });
            onSuccess(file);
          } catch (error) {
            toast.success(`Upload Failed`);
            onError(
              file,
              error instanceof Error ? error : new Error('Upload failed'),
            );
          }
        });

        await Promise.all(uploadPromises);
      } catch (error) {
        // This handles any error that might occur outside the individual upload processes
        console.error('Unexpected error during upload:', error);
        toast.success('Upload failed');
      }
    },
    [],
  );

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
          onUpload={onUpload}
          onValueChange={() => {
            setFiles((prev) => [
              {
                id: '123123',
                name: files[0].name,
                file: files[0],
              },
              ...prev,
            ]);
          }}
        >
          <ListView<Media | MediaUploading>
            display="grid"
            className="grid-cols-5 gap-4"
            data={data}
            render={(item, _) => {
              return <MediaViewerCard {...item} />;
            }}
          />
        </MediaFileUpload>
      </DialogContent>
    </Dialog>
  );
};

type MediaViewerCardProps = {
  id: string;
  url?: string;
  name: string;
  checked?: boolean;
  file?: File;
};

const MediaViewerCard = ({
  url,
  checked,
  file,
  id,
  name,
}: MediaViewerCardProps) => {
  if (file)
    return (
      <FileUploadItem key={id} value={file} className="justify-between">
        <FileUploadItemPreview className="w-full flex-1" />
        <FileUploadItemProgress />
      </FileUploadItem>
    );
  return (
    <div className="border-accent aspect-square rounded-xl border-2 p-1">
      <img src={url} className="size-full rounded-xl bg-white object-center" />
      <div className="text-center">
        <span className="block truncate text-xs">{name}</span>
      </div>
    </div>
  );
};

export default MediaDialog;
