'use client';
import { MediaType } from '@/types/media.type';
import { createContext, ReactNode, useContext, useState } from 'react';

type MediaContextType = {
  selectedImages: MediaType[];
  selectImages: (img: MediaType[]) => void;
};

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMediaDialog must be used inside MediaDialogProvider');
  }
  return context;
};

export const MediaProvider = ({ children }: { children: ReactNode }) => {
  const [selectedImages, setSelectedImages] = useState<MediaType[]>([]);

  const selectImages = (img: MediaType[]) => {
    setSelectedImages(img);
  };

  return (
    <MediaContext.Provider
      value={{
        selectedImages,
        selectImages,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};
