import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreatedMediaDTO,
  SearchMediaReqDTO,
  SignatureDTO,
} from '@route/media/media.dto';
import { MessageHttp } from '@shared/decorators/message.decorator';
import { FileService } from '@shared/services/file/file.service';
import { MediaService } from './media.service';

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
    return this.fileService.sign(req);
  }

  @Post()
  @MessageHttp('Create media')
  async createMedia(@Body() req: CreatedMediaDTO) {
    const response = await this.mediaService.createMedia(req);
    return response;
  }

  // @Put()
  // @MessageHttp('Deleted / Un Deleted media')
  // changeVisibility(@Body() req: ChangeVisibilityDTO) {
  //   return this.mediaService.changeVisibility(req);
  // }

  @Get()
  @MessageHttp('Pageable media')
  getListMedia(@Query() pageable: SearchMediaReqDTO) {
    return this.mediaService.getList(pageable);
  }
}
