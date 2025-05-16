import ClientIcon from '@/components/ClientIcon';
import MediaCard from '@/components/media/MediaCard';
import { MediaProvider } from '@/components/media/MediaContext';
import MediaDialog from '@/components/media/MediaDialog';
import { cn } from '@/lib/utils';
import { MediaType } from '@/types/media.type';
import { useState } from 'react';
type MediaButtonProps = {
  className?: string;
  expose?: (resources: MediaType[]) => void;
  previewImage?: boolean;
};

const MediaButton = ({
  className,
  expose,
  previewImage = false,
}: MediaButtonProps) => {
  const [openMedia, setOpenMedia] = useState<boolean>(false);
  const [urlPreviewImage, setUrlPreviewImage] = useState<string>('');
  return (
    <div>
      {urlPreviewImage ? (
        <MediaCard
          url={urlPreviewImage}
          onClick={() => setOpenMedia(true)}
          className="size-[100px] hover:cursor-pointer"
        />
      ) : (
        <div
          onClick={() => setOpenMedia(true)}
          className={cn(
            'border-accent grid aspect-square size-[80px] items-center rounded-xl border-2 bg-gray-200 hover:cursor-pointer hover:bg-gray-300',
            className,
          )}
        >
          <ClientIcon
            icon={'mdi:image-add-outline'}
            className={cn(urlPreviewImage && 'hidden')}
          />
        </div>
      )}

      <MediaProvider>
        <MediaDialog
          open={openMedia}
          onOpenChange={(open) => setOpenMedia(open)}
          expose={(resources) => {
            if (previewImage) {
              setUrlPreviewImage(resources[0].url ?? '');
            }
            expose?.(resources);
          }}
        />
      </MediaProvider>
    </div>
  );
};

export default MediaButton;
