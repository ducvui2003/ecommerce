import { Injectable } from '@nestjs/common';
import { ResourceType } from '@shared/models/resource.model';
import { PrismaService } from '@shared/services/prisma.service';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { Prisma } from '@prisma/client';
import { SearchMediaReqType } from '@route/media/media.schema';

export interface MediaRepository {
  getMedia<K extends keyof ResourceType>(
    pageable: SearchMediaReqType,
    fields?: K[],
  ): Promise<Paging<Pick<ResourceType, K>>>;

  createMedia(data: Pick<ResourceType, 'publicId' | 'format' | 'type'>);

  // changeVisibility(data: Pick<MediaType, 'id'>);
}
@Injectable()
export class PrismaMediaRepository implements MediaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getMedia<K extends keyof ResourceType>(
    pageable: SearchMediaReqType,
    fields?: K[],
  ): Promise<Paging<Pick<ResourceType, K>>> {
    const { page, size, skipIds } = pageable;
    const select = fields?.reduce(
      (acc, field) => {
        acc[field] = true;
        return acc;
      },
      {} as Record<keyof ResourceType, true>,
    );
    const where: Prisma.ResourceWhereInput = {
      id: skipIds && {
        notIn: skipIds,
      },
    };
    const [database, total] = await this.prismaService.$transaction([
      this.prismaService.resource.findMany({
        select: select,
        where: where,
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
