import { Injectable } from '@nestjs/common';
import { UserType } from '@shared/models/user.model';
import { PrismaService } from '@shared/services/prisma.service';

export interface SharedUserRepository {
  findUnique(
    uniqueObject:
      | {
          email: string;
        }
      | {
          id: number;
        },
  ): Promise<UserType | null>;
  findUniqueWithRole(
    uniqueObject:
      | {
          email: string;
        }
      | {
          id: number;
        },
  ): Promise<UserType | null>;

  findDetailByUnique(
    unique:
      | {
          email: string;
        }
      | {
          id: number;
        },
  ): Promise<Omit<UserType, 'password'> | null>;
}

@Injectable()
export class SharedPrismaUserRepository implements SharedUserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findUnique(
    uniqueObject:
      | {
          email: string;
        }
      | {
          id: number;
        },
  ): Promise<UserType | null> {
    return await this.prismaService.user.findUnique({
      where: uniqueObject,
    });
  }
  async findUniqueWithRole(
    uniqueObject:
      | {
          email: string;
        }
      | {
          id: number;
        },
  ): Promise<UserType | null> {
    return await this.prismaService.user.findUnique({
      where: uniqueObject,
      include: {
        role: true,
      },
    });
  }

  async findDetailByUnique(
    unique: { email: string } | { id: number },
  ): Promise<Omit<UserType, 'password'> | null> {
    return await this.prismaService.user.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        dob: true,
        avatar: true,
        status: true,
        roleId: true,
        role: true,
        addresses: {
          select: {
            id: true,
            province: true,
            district: true,
            ward: true,
            detail: true,
            createdAt: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      where: unique,
    });
  }
}
