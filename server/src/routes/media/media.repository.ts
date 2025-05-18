import { Injectable } from '@nestjs/common';
import { ResourceType } from '@shared/models/resource.model';
import { PrismaService } from '@shared/services/prisma.service';
import { Pageable } from '@shared/types/request.type';
import { Paging } from '@shared/common/interfaces/paging.interface';

export interface MediaRepository {
  getMedia<K extends keyof ResourceType>(
    pageable: Pageable,
    fields?: K[],
  ): Promise<Paging<Pick<ResourceType, K>>>;

  createMedia(data: Pick<ResourceType, 'publicId' | 'format' | 'type'>);

  // changeVisibility(data: Pick<MediaType, 'id'>);
}
@Injectable()
export class PrismaMediaRepository implements MediaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getMedia<K extends keyof ResourceType>(
    pageable: Pageable,
    fields?: K[],
  ): Promise<Paging<Pick<ResourceType, K>>> {
    const { page, size } = pageable;
    const select = fields?.reduce(
      (acc, field) => {
        acc[field] = true;
        return acc;
      },
      {} as Record<keyof ResourceType, true>,
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

  async createMedia(data: Pick<ResourceType, 'publicId' | 'format' | 'type'>) {
    console.log(data);
    return await this.prismaService.resource.create({
      data: {
        publicId: data.publicId,
        format: data.format,
        type: data.type,
      },
    });
  }

  // async changeVisibility(data: Pick<MediaType, 'id' | 'isDeleted'>) {
  //   await this.prismaService.resource.update({
  //     data: {
  //       isDeleted: data.isDeleted,
  //       deletedAt: getCurrentDatetime(),
  //     },
  //     where: {
  //       id: data.id,
  //     },
  //   });
  // }
}
