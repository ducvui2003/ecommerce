import ClientIcon from '@/components/ClientIcon';
import MediaCard from '@/components/media/MediaCard';
import { useMediaContext } from '@/components/media/MediaContext';
import { cn } from '@/lib/utils';
import { MediaType } from '@/types/media.type';

type MediaButtonProps = {
  className?: string;
  expose?: (resources: MediaType[]) => void;
  previewImage?: boolean;
  initialValue?: string;
};

const MediaButton = ({ className }: MediaButtonProps) => {
  const { setOpenDialog, openDialog, preview, setPreview } = useMediaContext();
  return (
    <div>
      {preview ? (
        <MediaCard
          url={preview.url ?? ''}
          onClick={() => setOpenDialog(true)}
          className="size-[100px] hover:cursor-pointer"
        />
      ) : (
        <div
          onClick={() => setOpenDialog(true)}
          className={cn(
            'border-accent grid aspect-square size-[80px] items-center rounded-xl border-2 bg-gray-200 hover:cursor-pointer hover:bg-gray-300',
            className,
          )}
        >
          <ClientIcon
            icon={'mdi:image-add-outline'}
            className={cn(preview && 'hidden')}
          />
        </div>
      )}
    </div>
  );
};

export default MediaButton;
