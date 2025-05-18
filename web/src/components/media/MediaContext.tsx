'use client';
import { MediaType } from '@/types/media.type';
import { createContext, ReactNode, useContext, useState } from 'react';

type MediaContextType = {
  selectedImages: MediaType[];
  selectImages: (img: MediaType[]) => void;
  openDialog?: boolean;
  setOpenDialog: (open: boolean) => void;
  previewMode: boolean;
  preview?: MediaType;
  setPreview: (media: MediaType) => void;
};

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMediaDialog must be used inside MediaDialogProvider');
  }
  return context;
};

type MediaProviderProps = {
  children: ReactNode;
  initValue?: MediaType[];
  previewMode?: boolean;
};

export const MediaProvider = ({
  children,
  initValue = [],
  previewMode = false,
}: MediaProviderProps) => {
  const [selectedImages, setSelectedImages] = useState<MediaType[]>(initValue);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [preview, setPreview] = useState<MediaType>();
  const selectImages = (img: MediaType[]) => {
    setSelectedImages(img);
  };

  return (
    <MediaContext.Provider
      value={{
        selectedImages,
        selectImages,
        openDialog,
        setOpenDialog,
        previewMode,
        preview,
        setPreview,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};
