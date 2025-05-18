'use client';
import MediaButton from '@/components/media/MediaButton';
import {
  MediaProvider,
  useMediaContext,
} from '@/components/media/MediaContext';
import MediaDialog from '@/components/media/MediaDialog';
import { MediaType } from '@/types/media.type';
import { ReactNode, useState } from 'react';
type MediaProps = {
  className?: string;
  expose?: (resources: MediaType[]) => void;
  previewMode?: boolean;
  initialValue?: MediaType[];
};

const Media = ({
  className,
  expose,
  previewMode = false,
  initialValue,
}: MediaProps) => {
  return (
    <MediaProvider previewMode={previewMode} initValue={initialValue}>
      <MediaButton className={className} expose={expose} />
      <MediaDialog
        expose={(resources) => {
          expose?.(resources);
        }}
      />
    </MediaProvider>
  );
};

export default Media;
