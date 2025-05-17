import { Injectable } from '@nestjs/common';
import { MediaType } from '@shared/models/media.model';
import { PrismaService } from '@shared/services/prisma.service';

@Injectable()
export class SharedMediaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMediaInId(ids: number[]): Promise<MediaType[]> {
    return this.prismaService.resource.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
