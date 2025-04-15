import { Inject, Injectable } from '@nestjs/common';
import { InfoAllow, InfoUpdate } from '@route/user/user.type';
import { UserType } from '@shared/models/user.model';
import { PrismaService } from '@shared/services/prisma.service';

export interface UserRepository {
  getInfo(id: number): Promise<InfoAllow>;

  updateInfo(id: number, info: InfoUpdate): Promise<InfoAllow>;

}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(@Inject() private readonly prismaService: PrismaService) {}

  async getInfo(id: number): Promise<InfoAllow> {
    const entity = await this.prismaService.user.findFirstOrThrow({
      where: {
        id: id,
      },
      include: { Role: true },
    });

    const { password, Role, ...safeEntity } = entity;

    return {
      ...safeEntity,
      role: Role.name,
    };
  }

  async updateInfo(id: number, info: InfoUpdate): Promise<InfoAllow> {
    const entity = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        ...info,
      },
      include: { Role: true },
    });

    const { password, Role, ...safeEntity } = entity;

    return {
      ...safeEntity,
      role: Role.name,
    };
  }
}
