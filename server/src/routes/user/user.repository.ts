import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  GetUserQueryType,
  GetUserResType,
  UserInformationAllowed,
  InfoUpdate,
} from '@route/user/user.schema';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { UserType } from '@shared/models/user.model';
import { PrismaService } from '@shared/services/prisma.service';

export interface UserRepository {
  getInfo(id: number): Promise<UserInformationAllowed>;

  updateInfo(id: number, info: InfoUpdate): Promise<UserInformationAllowed>;

  getList(pageable: GetUserQueryType): Promise<Paging<GetUserResType>>;
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(@Inject() private readonly prismaService: PrismaService) {}

  async getInfo(id: number): Promise<UserInformationAllowed> {
    const entity = await this.prismaService.user.findFirstOrThrow({
      where: {
        id: id,
      },
      include: { role: true },
    });

    const { password, role, ...safeEntity } = entity;

    return {
      ...safeEntity,
      role: role.name,
    };
  }

  async updateInfo(
    id: number,
    info: InfoUpdate,
  ): Promise<UserInformationAllowed> {
    const entity = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        ...info,
      },
      include: { role: true },
    });

    const { password, role, ...safeEntity } = entity;

    return {
      ...safeEntity,
      role: role.name,
    };
  }

  async getList(pageable: GetUserQueryType): Promise<Paging<GetUserResType>> {
    const { page, size, name, email, id, status } = pageable;
    const where: Prisma.UserWhereInput = {
      deletedAt: null,
    };

    // Filter
    if (id) {
      where.id = {
        equals: id,
      };
    }

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    if (email) {
      where.email = {
        startsWith: name,
      };
    }

    if (status && status.length > 0) {
      where.status = {
        in: status,
      };
    }

    const [database, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          dob: true,
          phone: true,
          status: true,
          avatar: true,
          createdAt: true,
          role: {
            select: {
              name: true,
            },
          },
        },
        where: where,
        skip: (page - 1) * size,
        take: size,
      }),
      this.prismaService.user.count({
        where: where,
      }),
    ]);

    const items: GetUserResType[] = database.map((user) => {
      const { role, ...rest } = user;
      return {
        ...rest,
        roleName: role?.name ?? null,
      };
    });

    return {
      items: items,
      pagination: {
        page: page,
        limit: size,
        totalItems: total,
        totalPages: Math.ceil(total / size),
      },
    };
  }
}
