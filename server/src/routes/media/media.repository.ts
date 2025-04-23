import { Injectable } from '@nestjs/common';
import { getCurrentDatetime } from '@shared/helper.shared';
import { MediaType } from '@shared/models/media.model';
import { PrismaService } from '@shared/services/prisma.service';
import { Pageable } from '@shared/types/request.type';
import { Paging } from '@shared/types/response.type';

export interface MediaRepository {
  getMedia<K extends keyof MediaType>(
    pageable: Pageable,
    fields?: K[],
  ): Promise<Paging<Pick<MediaType, K>>>;

  createMedia(data: Pick<MediaType, 'publicId' | 'format' | 'type'>);

  changeVisibility(data: Pick<MediaType, 'id' | 'isDeleted'>);
}
@Injectable()
export class PrismaMediaRepository implements MediaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getMedia<K extends keyof MediaType>(
    pageable: Pageable,
    fields?: K[],
  ): Promise<Paging<Pick<MediaType, K>>> {
    const { page, size } = pageable;
    const select = fields?.reduce(
      (acc, field) => {
        acc[field] = true;
        return acc;
      },
      {} as Record<keyof MediaType, true>,
    );
    const [database, total] = await this.prismaService.$transaction([
      this.prismaService.resource.findMany({
        select: select,
        skip: (page - 1) * size,
        take: size,
      }),
      this.prismaService.resource.count(),
    ]);

    return {
      items: database,
      pagination: {
        page: page,
        limit: size,
        totalItems: total,
        totalPages: Math.ceil(total / size),
      },
    };
  }

  async createMedia(data: Pick<MediaType, 'publicId' | 'format' | 'type'>) {
    return await this.prismaService.resource.create({
      data: {
        publicId: data.publicId,
        format: data.format,
        type: data.type,
      },
    });
  }

  async changeVisibility(data: Pick<MediaType, 'id' | 'isDeleted'>) {
    await this.prismaService.resource.update({
      data: {
        isDeleted: data.isDeleted,
        deletedAt: getCurrentDatetime(),
      },
      where: {
        id: data.id,
      },
    });
  }
}
