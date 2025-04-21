import { Injectable } from '@nestjs/common';
import { getCurrentDatetime } from '@shared/helper.shared';
import { MediaType } from '@shared/models/media.model';
import { PrismaService } from '@shared/services/prisma.service';
import { Pageable } from '@shared/types/request.type';
import { Paging } from '@shared/types/response.type';
import { limits } from 'argon2';

export interface MediaRepository {
  getMedia(
    pageable: Pageable,
    fields?: (keyof MediaType)[],
  ): Promise<Paging<Partial<MediaType>>>;

  createMedia(data: Pick<MediaType, 'publicId' | 'format' | 'type'>);

  changeVisibility(data: Pick<MediaType, 'id' | 'isDeleted'>);
}
@Injectable()
export class PrismaMediaRepository implements MediaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getMedia(
    pageable: Pageable,
    fields?: (keyof MediaType)[],
  ): Promise<Paging<Partial<MediaType>>> {
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

  createMedia(data: Pick<MediaType, 'publicId' | 'format' | 'type'>) {
    return this.prismaService.resource.create({
      data: {
        publicId: data.publicId,
        format: data.format,
        type: data.type,
      },
    });
  }

  changeVisibility(data: Pick<MediaType, 'id' | 'isDeleted'>) {
    this.prismaService.resource.update({
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
