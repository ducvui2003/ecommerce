type Media = {
  id: string;
  url: string;
};

type MediaUploading = Media & {
  file: File;
};
export type { Media, MediaUploading };
