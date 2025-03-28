import { Injectable } from '@nestjs/common';
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

  getRoleIdByRoleNameOrThrown: (roleName: string) => Promise<RoleType>;

  createVerificationCode(
    data: Pick<VerificationCodeType, 'email' | 'type' | 'code' | 'expiredAt'>,
  ): Promise<VerificationCodeType>;

  findUniqueVerificationCode(
    uniqueValue:
      | {
          email: string;
        }
      | { id: number }
      | { email: string; code: string; type: TypeOfVerificationType },
  ): Promise<VerificationCodeType | null>;

  deleteVerificationCode(
    uniqueValue:
      | {
          email: string;
        }
      | { id: number }
      | { email: string; code: string; type: TypeOfVerificationType },
  ): Promise<any>;

  existEmail(email: string): Promise<boolean>;

  updatePassword(email: string, password: string);
}

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(
    data: Omit<RegisterBodyType, 'otp'> & Pick<UserType, 'roleId'>,
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

  getRoleIdByRoleNameOrThrown(roleName: string): Promise<RoleType> {
    return this.prismaService.role.findUniqueOrThrow({
      where: { name: roleName },
    });
  }

  async createVerificationCode(
    data: Pick<VerificationCodeType, 'email' | 'type' | 'code' | 'expiredAt'>,
  ): Promise<VerificationCodeType> {
    return await this.prismaService.verificationCode.upsert({
      where: {
        email: data.email,
      },
      create: {
        ...data,
      },
      update: {
        code: data.code,
        expiredAt: data.expiredAt,
      },
    });
  }

  findUniqueVerificationCode(
    uniqueValue:
      | { email: string }
      | { id: number }
      | { email: string; code: string; type: TypeOfVerificationType },
  ): Promise<VerificationCodeType | null> {
    return this.prismaService.verificationCode.findUnique({
      where: uniqueValue,
    });
  }

  deleteVerificationCode(
    uniqueValue:
      | { email: string }
      | { id: number }
      | { email: string; code: string; type: TypeOfVerificationType },
  ): Promise<any> {
    return this.prismaService.verificationCode.delete({
      where: uniqueValue,
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
}
