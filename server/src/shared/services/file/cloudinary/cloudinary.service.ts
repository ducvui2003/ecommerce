import cloudinaryInstance from '@config/cloudinary.config';
import envConfig from '@config/env.config';
import { Injectable } from '@nestjs/common';
import { FileService } from '@shared/services/file/file.service';
import {
  SignatureProperties,
  UploadSignature,
  UploadSignatureResult,
} from '@shared/types/media.type';
import path from 'path';

@Injectable()
export class CloudinaryService implements FileService {
  private folderRoot = 'ecommerce';
  getUrl(publicId: string, options?: any): string {
    return cloudinaryInstance.url(publicId, options);
  }

  sign(upload: UploadSignature | UploadSignature[]): UploadSignatureResult {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signatures: SignatureProperties[] = [];
    if (Array.isArray(upload)) {
      for (let i = 0; i < upload.length; i++) {
        const folderUpload = path.join(this.folderRoot, upload[i].folder);
        const paramsToSign = {
          public_id: upload[i].publicId,
          folder: folderUpload,
          timestamp: timestamp,
        };
        const signature = cloudinaryInstance.utils.api_sign_request(
          paramsToSign,
          envConfig.CLOUDINARY_API_SECRET,
        );
        signatures.push({
          folder: folderUpload,
          signature,
        });
      }
    } else {
      const folderUpload = path.join(this.folderRoot, upload.folder);
      const paramsToSign = {
        public_id: upload.publicId,
        folder: folderUpload,
        timestamp: timestamp,
      };
      const signature = cloudinaryInstance.utils.api_sign_request(
        paramsToSign,
        envConfig.CLOUDINARY_API_SECRET,
      );
      signatures.push({
        folder: folderUpload,
        signature,
      });
    }

    return {
      timestamp,
      properties: signatures,
      apiKey: envConfig.CLOUDINARY_API_KEY,
    };
  }

  delete(publicIds: string[]): void {
    cloudinaryInstance.api
      .delete_resources(publicIds)
      .then((result) => console.log(result));
  }
}
