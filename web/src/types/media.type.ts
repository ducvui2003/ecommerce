type Media = {
  id: string;
  url: string;
};

type MediaUploading = Media & {
  file: File;
};

type UploadSignature = {
  publicId: string;
  folder: string;
};

type UploadSignatureResult = {
  timestamp: number;
  properties: SignatureProperties[];
  apiKey: string;
};

type SignatureProperties = {
  folder: string;
  signature: string;
};

type CreateMediaReqType = {
  publicId: string;
  type: string;
  format: string;
};

export type {
  Media,
  MediaUploading,
  UploadSignature,
  UploadSignatureResult,
  SignatureProperties,
  CreateMediaReqType,
};
