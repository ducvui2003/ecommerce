import {
  UploadResult,
  UploadSignature,
  UploadSignatureResult,
} from '@shared/types/media.type';

export interface FileService {
  getUrl(publicId: string, options?: any): string;
  sign(upload: UploadSignature | UploadSignature[]): UploadSignatureResult;
  delete(publicIds: string[]): void;
}
