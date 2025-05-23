import { Injectable } from '@nestjs/common';
import { ResourceType } from '@shared/models/resource.model';
import { PrismaService } from '@shared/services/prisma.service';

@Injectable()
export class cSharedResourceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findResourceInId(ids: number[]): Promise<ResourceType[]> {
    return this.prismaService.resource.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
