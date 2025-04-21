type UploadResult = {
  provider: 'cloudinary' | 'firebase' | 's3';
  publicId: string;
  url: string;
  secureUrl?: string;
  createAt: string;
} & Partial<MetadataResult>;

type MetadataResult = {
  version: string | number;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  type: string;
};

type UploadSignature = {
  publicId: string;
  folder: string;
};

type UploadSignatureResult = {
  timestamp: number;
  signature: string;
  apiKey: string;
  folder: string;
};

export type {
  UploadResult,
  MetadataResult,
  UploadSignature,
  UploadSignatureResult,
};
