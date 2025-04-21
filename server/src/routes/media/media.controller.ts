import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ChangeVisibilityDTO,
  CreatedMediaDTO,
  SignatureDTO,
} from '@route/media/media.dto';
import { FileService } from '@shared/services/file/file.service';
import { MediaService } from './media.service';
import { Pageable, PageableDTO } from '@shared/types/request.type';
import { MessageHttp } from '@shared/decorators/message.decorator';

@Controller('/api/v1/media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    @Inject('FILE_SERVICE') private readonly fileService: FileService,
  ) {}

  @Post('/signature')
  @MessageHttp('Get signature to upload media from client')
  @HttpCode(HttpStatus.OK)
  signMedia(@Body() req: SignatureDTO) {
    return this.fileService.sign({
      folder: req.folder,
      publicId: req.publicId,
    });
  }

  @Post()
  @MessageHttp('Create media')
  async createMedia(@Body() req: CreatedMediaDTO) {
    return await this.mediaService.createMedia(req);
  }

  @Put()
  @MessageHttp('Deleted / Un Deleted media')
  changeVisibility(@Body() req: ChangeVisibilityDTO) {
    return this.mediaService.changeVisibility(req);
  }

  @Get()
  @MessageHttp('Pageable media')
  getListMedia(@Query() pageable: PageableDTO) {
    return this.mediaService.getList(pageable);
  }
}
