import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '@shared/shared.module';
import { FileService } from '@shared/services/file/file.service';

import * as fs from 'fs';

import {
  UploadSignature,
  UploadSignatureResult,
} from '@shared/types/file.type';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';
import { cloudName, resources } from '@test/config.test';

describe('Test AddressService', () => {
  let service: FileService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [SharedModule],
    }).compile();

    service = module.get<FileService>('FILE_SERVICE');
  });

  afterAll(async () => {
    await module.close();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('process upload image', () => {
    let signData: UploadSignatureResult;
    const publicId = 'test.png';
    const folder = path.join('ecommerce', 'test');
    it('get signature', () => {
      const request: UploadSignature = {
        folder: folder,
        publicId: publicId,
      };
      const response = service.sign(request);
      expect(response).toBeDefined();
      signData = {
        signature: response.signature,
        apiKey: response.apiKey,
        timestamp: response.timestamp,
      };
    });

    it('upload image in client', () => {
      expect(signData).toBeDefined();

      const { apiKey, signature, timestamp } = signData;
      const filePath = path.join(resources, publicId);
      if (!fs.existsSync(filePath)) {
        throw new Error(`File does not exist at path: ${filePath}`);
      }

      const formData = new FormData();
      formData.append('api_key', apiKey);
      formData.append('folder', folder);
      formData.append('file', fs.readFileSync(filePath), publicId);
      formData.append('public_id', publicId);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);

      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.error(error));
    });
  });
});
