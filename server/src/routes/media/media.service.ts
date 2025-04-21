import { Inject, Injectable, Req } from '@nestjs/common';
import { MediaRepository } from '@route/media/media.repository';
import {
  ChangeVisibilityType,
  CreatedMediaBodyType,
} from '@route/media/media.schema';
import { Pageable } from '@shared/types/request.type';

@Injectable()
export class MediaService {
  constructor(
    @Inject('MEDIA_REPOSITORY')
    private readonly mediaRepository: MediaRepository,
  ) {}

  async createMedia(data: CreatedMediaBodyType) {
    return await this.mediaRepository.createMedia({
      publicId: data.publicId,
      format: data.format,
      type: data.type,
    });
  }

  changeVisibility(data: ChangeVisibilityType) {
    this.mediaRepository.changeVisibility({
      id: data.id,
      isDeleted: data.visibility,
    });
  }

  getList(pageable: Pageable) {
    return this.mediaRepository.getMedia(pageable);
  }
}
