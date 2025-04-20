import cloudinaryInstance from '@config/cloudinary.config';
import envConfig from '@config/env.config';
import { Injectable } from '@nestjs/common';
import { FileService } from '@shared/services/file/file.service';
import {
  UploadSignature,
  UploadSignatureResult,
} from '@shared/types/file.type';

@Injectable()
export class CloudinaryService implements FileService {
  getUrl(publicId: string, options?: any): string {
    return cloudinaryInstance.url(publicId, options);
  }

  sign(upload: UploadSignature): UploadSignatureResult {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign = {
      public_id: upload.publicId,
      folder: upload.folder,
      timestamp: timestamp,
    };
    const signature = cloudinaryInstance.utils.api_sign_request(
      paramsToSign,
      envConfig.CLOUDINARY_API_SECRET,
    );

    return {
      timestamp,
      signature,
      apiKey: envConfig.CLOUDINARY_API_KEY,
    };
  }

  delete(publicIds: string[]): void {
    cloudinaryInstance.api
      .delete_resources(publicIds)
      .then((result) => console.log(result));
  }
}
