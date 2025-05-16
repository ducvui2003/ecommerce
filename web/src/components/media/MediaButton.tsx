import ClientIcon from '@/components/ClientIcon';
import MediaDialog from '@/components/media/MediaDialog';
import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';
type MediaButtonProps = {
  className?: string;
};

const MediaButton = ({ className }: MediaButtonProps) => {
  const [openMedia, setOpenMedia] = useState<boolean>(false);
  return (
    <div>
      <div
        onClick={() => setOpenMedia(true)}
        className={cn(
          'border-accent grid size-[80px] items-center rounded-xl border-2 bg-gray-200 hover:cursor-pointer hover:bg-gray-300',
          className,
        )}
      >
        <ClientIcon icon={'ic:baseline-plus'} />
      </div>
      <MediaDialog
        open={openMedia}
        onOpenChange={(open) => setOpenMedia(open)}
      />
    </div>
  );
};

export default MediaButton;
