import http from '@/lib/http';
import {
  ResponseApi,
  ResponseApiPaging,
  Paging,
  RequestPaging,
} from '@/types/api.type';
import {
  CloudinaryUploadResult,
  CreatedMediaResType,
  CreateMediaReqType,
  PagingMediaType,
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
      true,
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
  ): Promise<CloudinaryUploadResult> => {
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

    return await res.json();
  },

  createMedia: async (
    data: CreateMediaReqType,
  ): Promise<CreatedMediaResType> => {
    const res = await http.post<ResponseApi<CreatedMediaResType>>(
      '/api/v1/media',
      data,
      undefined,
      true,
    );
    return res.payload.data;
  },

  getMedia: async (req: RequestPaging): Promise<Paging<PagingMediaType>> => {
    const query = new URLSearchParams({
      size: req.size.toString(),
      page: req.page.toString(),
    });

    const res = await http.get<ResponseApiPaging<PagingMediaType>>(
      `/api/v1/media?${query.toString()}`,
      undefined,
      true,
    );
    return res.payload.data;
  },
};

export default mediaService;
