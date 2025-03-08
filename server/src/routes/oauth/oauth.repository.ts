import { Injectable } from '@nestjs/common';
import { UserOauth2 } from '@route/oauth/oauth.model';
import { PrismaService } from '@shared/services/prisma.service';

export interface OAuthRepository {
  createUser(
    data: UserOauth2 & { password: string; roleId: number },
  ): Promise<any>;
}

@Injectable()
export class PrismaOauthRepository implements OAuthRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(
    data: UserOauth2 & { password: string; roleId: number },
  ): Promise<any> {
    return await this.prismaService.user.create({
      data: {
        ...data,
      },
      omit: {
        password: true,
      },
    });
  }
}
