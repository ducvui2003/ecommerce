import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { PrismaMediaRepository } from '@route/media/media.repository';

@Module({
  controllers: [MediaController],
  providers: [
    MediaService,
    {
      provide: 'MEDIA_REPOSITORY',
      useClass: PrismaMediaRepository,
    },
  ],
})
export class MediaModule {}
