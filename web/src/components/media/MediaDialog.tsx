'use client';
import ClientIcon from '@/components/ClientIcon';
import ListView from '@/components/ListView';
import { useMediaContext } from '@/components/media/MediaContext';
import { MediaFileUpload } from '@/components/media/MediaUpload';
import MediaViewerCard from '@/components/media/MediaViewerCard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useGetPagingMediaQuery } from '@/features/media/media.api';
import { nanoId, uuid } from '@/lib/utils';
import mediaService from '@/service/media.service';
import { PageReq } from '@/types/api.type';
import { MediaType, MediaUploading } from '@/types/media.type';
import {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';

type MediaDialogProps = {
  expose?: (resources: MediaType[]) => void;
  children?: ReactNode;
  multiple: boolean;
};

const MediaDialog = ({ multiple, expose }: MediaDialogProps) => {
  const [filesUploading, setFilesUploading] = useState<MediaUploading[]>([]);

  const {
    selectedImages,
    selectImages,
    openDialog,
    setOpenDialog,
    previewMode,
    setPreview,
  } = useMediaContext();
  const mediasRef = useRef<MediaType[]>(selectedImages ?? []);

  const [paging, setPaging] = useState<PageReq<{}>>({
    page: 1,
    size: 3,
  });

  const { isFetching, data } = useGetPagingMediaQuery({
    page: paging.page,
    size: paging.size,
  });

  const handleUpload = useCallback(
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
            publicId: file.name.split('.')[0] + nanoId(8),
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
              publicId: signaturePromises.properties[index].publicId,
            });
            const response = await mediaService.createMedia({
              format: result.format,
              publicId: result.public_id,
              type: result.resource_type,
            });

            if (response) {
              setFilesUploading((prev) => [
                {
                  id: response.id.toString(),
                  publicId: response.publicId,
                  url: result.url,
                },
                ...prev.filter((item) => !item.file),
              ]);
            }
            toast.success(`Upload Success`, {
              description: response.publicId,
            });
            onSuccess(file);

            return {
              resourceId: response.id,
              url: result.url,
            };
          } catch (error) {
            toast.error(`Upload Failed`);
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

  const handleFileChange = useCallback((files: File[]) => {
    setFilesUploading((prev) => [
      ...prev,
      ...files.map((file) => ({
        id: uuid(),
        publicId: file.name,
        file: file,
      })),
    ]);
  }, []);

  const handleSelect = (
    checked: boolean,
    media: MediaType,
    multiple: boolean,
  ) => {
    if (checked) {
      mediasRef.current.push({
        id: media.id,
        publicId: media.publicId,
        url: media.url,
      });
    } else {
      mediasRef.current = [
        ...mediasRef.current.filter((item) => item.id != media.id),
      ];
    }
  };

  const handleSubmit = () => {
    if (!multiple && mediasRef.current.length > 1) {
      toast.message('Vui lòng chọn 1 ảnh');
      return;
    }
    selectImages(mediasRef.current);
    if (previewMode) {
      setPreview(mediasRef.current[0]);
    }
    expose?.(mediasRef.current);
    setOpenDialog?.(false);
  };

  useEffect(() => {
    if (openDialog) {
      mediasRef.current = [...selectedImages];
    }
  }, [open, selectedImages]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="max-w-[70vw]">
        <DialogHeader>
          <DialogTitle>Chọn file</DialogTitle>
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
          onUpload={handleUpload}
          onValueChange={handleFileChange}
        >
          <ListView<MediaType | MediaUploading>
            display="grid"
            className="grid-cols-5 gap-4"
            loading={isFetching}
            data={[
              ...filesUploading,
              ...(data?.items.map((item) => ({
                id: item.id.toString(),
                publicId: item.publicId,
                url: item.url,
              })) ?? []),
            ]}
            render={(item, _) => {
              return (
                <MediaViewerCard
                  {...item}
                  name={item.publicId}
                  key={item.id}
                  checked={mediasRef.current.some((i) => i.id === item.id)}
                  onChecked={(checked) => handleSelect(checked, item, multiple)}
                />
              );
            }}
          />
          <div className="flex gap-2">
            <Button type="button" onClick={handleSubmit}>
              Ok
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              className="ml-auto"
              disabled={paging.page == 1}
              onClick={() => {
                setPaging((prev) => ({
                  ...prev,
                  page: prev.page - 1,
                }));
              }}
            >
              Previous
            </Button>
            <Button
              disabled={paging.page == data?.pagination.totalPages}
              onClick={() => {
                setPaging((prev) => ({
                  ...prev,
                  page: prev.page + 1,
                }));
              }}
            >
              Next
            </Button>
          </div>
        </MediaFileUpload>
      </DialogContent>
    </Dialog>
  );
};

export default memo(MediaDialog);
