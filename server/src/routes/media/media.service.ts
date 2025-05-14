import { Inject, Injectable, Req } from '@nestjs/common';
import { MediaRepository } from '@route/media/media.repository';
import {
  ChangeVisibilityType,
  CreatedMediaBodyType,
  MediaResponseType,
} from '@route/media/media.schema';
import { transformItemsPaging } from '@shared/helper.shared';
import { MediaType } from '@shared/models/media.model';
import { FileService } from '@shared/services/file/file.service';
import { Pageable } from '@shared/types/request.type';

@Injectable()
export class MediaService {
  constructor(
    @Inject('FILE_SERVICE')
    private readonly fileService: FileService,
    @Inject('MEDIA_REPOSITORY')
    private readonly mediaRepository: MediaRepository,
  ) {}

  async createMedia(
    data: CreatedMediaBodyType,
  ): Promise<Pick<MediaType, 'publicId' | 'format' | 'type'>> {
    return await this.mediaRepository.createMedia({
      publicId: data.publicId,
      format: data.format,
      type: data.type,
    });
  }

  // changeVisibility(data: ChangeVisibilityType) {
  //   this.mediaRepository.changeVisibility({
  //     id: data.id,
  //     isDeleted: data.visibility,
  //   });
  // }

  async getList(pageable: Pageable) {
    const data = await this.mediaRepository.getMedia(pageable, [
      'id',
      'format',
      'publicId',
      'type',
    ]);
    return transformItemsPaging<
      MediaResponseType,
      Pick<MediaType, 'id' | 'format' | 'publicId' | 'type'>
    >(data, (item) => {
      return {
        ...item,
        url: this.fileService.getUrl(item.publicId),
      };
    });
  }
}
