import { Inject, Injectable, Req } from '@nestjs/common';
import { SearchMediaReqDTO } from '@route/media/media.dto';
import { MediaRepository } from '@route/media/media.repository';
import {
  ChangeVisibilityType,
  CreatedMediaBodyType,
  MediaResponseType,
} from '@route/media/media.schema';
import { transformItemsPaging } from '@shared/helper.shared';
import { ResourceType } from '@shared/models/resource.model';
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
  ): Promise<Pick<ResourceType, 'publicId' | 'format' | 'type'>> {
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

  async getList(pageable: SearchMediaReqDTO) {
    const data = await this.mediaRepository.getMedia(pageable, [
      'id',
      'format',
      'publicId',
      'type',
    ]);
    return transformItemsPaging<
      MediaResponseType,
      Pick<ResourceType, 'id' | 'format' | 'publicId' | 'type'>
    >(data, (item) => {
      return {
        ...item,
        url: this.fileService.getUrl(item.publicId),
      };
    });
  }
}
