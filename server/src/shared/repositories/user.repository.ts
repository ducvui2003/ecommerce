import { Injectable } from '@nestjs/common';
import { UserType } from '@shared/models/user.model';
import { PrismaService } from '@shared/services/prisma.service';

@Injectable()
export class UserRepository {
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
        Role: true,
      },
    });
  }
}
