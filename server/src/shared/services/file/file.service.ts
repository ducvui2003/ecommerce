import {
  UploadResult,
  UploadSignature,
  UploadSignatureResult,
} from '@shared/types/file.type';

export interface FileService {
  getUrl(publicId: string, options?: any): string;
  sign(upload: UploadSignature): UploadSignatureResult;
  delete(publicIds: string[]): void;
}
