import http from '@/lib/http';
import { ResponseApi } from '@/types/api.type';
import {
  CreateMediaReqType,
  UploadSignature,
  UploadSignatureResult,
} from '@/types/media.type';

const urlUpload = 'https://api.cloudinary.com/v1_1/yourstyle/auto/upload';

const mediaService = {
  sign: async (data: UploadSignature[]) => {
    const res = await http.post<ResponseApi<UploadSignatureResult>>(
      '/api/v1/media/signature',
      data,
      undefined,
    );
    return res.payload.data;
  },

  uploadFileToCloudinary: async (
    file: File,
    {
      apiKey,
      signature,
      timestamp,
      folder,
      publicId,
    }: {
      apiKey: string;
      timestamp: number;
      signature: string;
      folder: string;
      publicId: string;
    },
  ): Promise<CreateMediaReqType> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);
    formData.append('folder', folder);
    formData.append('public_id', publicId);

    const res = await fetch(urlUpload, {
      method: 'POST',
      body: formData,
    });

    const body: {
      public_id: string;
      format: string;
      resource_type: string;
    } = await res.json();

    return {
      publicId: body.public_id,
      format: body.format,
      type: body.resource_type,
    };
  },
};

export default mediaService;
