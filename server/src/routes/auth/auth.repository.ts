import { Injectable } from '@nestjs/common';
import { UserStatus } from '@prisma/client';
import { RegisterBodyType } from '@route/auth/auth.schema';
import { TypeOfVerificationType } from '@shared/constants/auth.constant';
import { RoleType } from '@shared/models/role.model';
import { UserType } from '@shared/models/user.model';
import { VerificationCodeType } from '@shared/models/verification-code.model';
import { PrismaService } from '@shared/services/prisma.service';

export interface AuthRepository {
  createUser(
    data: Omit<RegisterBodyType, 'otp'> & Pick<UserType, 'roleId'>,
  ): Promise<any>;

  existEmail(email: string): Promise<boolean>;

  updatePassword(email: string, password: string);

  updateStatus(email: string, status: UserStatus): Promise<UserType>;
}

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(
    data: Omit<RegisterBodyType, 'otp'> & Pick<UserType, 'roleId' | 'role'>,
  ): Promise<any> {
    return await this.prismaService.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        roleId: data.roleId,
      },
      omit: {
        password: true,
      },
    });
  }

  async existEmail(email: string): Promise<boolean> {
    const response = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!response) return false;
    return true;
  }
  async updatePassword(email: string, password: string) {
    return await this.prismaService.user.update({
      where: {
        email: email,
      },
      data: {
        password: password,
      },
    });
  }
  updateStatus(email: string, status: UserStatus): Promise<UserType> {
    return this.prismaService.user.update({
      where: {
        email: email,
      },
      data: {
        status: status,
      },
    });
  }
}
