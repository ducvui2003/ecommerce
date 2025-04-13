import { Injectable } from '@nestjs/common';
import { RoleType } from '@shared/models/role.model';
import { PrismaService } from '@shared/services/prisma.service';

@Injectable()
export class SharedRoleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getRoleIdByRoleNameOrThrown(roleName: string): Promise<RoleType> {
    return this.prismaService.role.findUniqueOrThrow({
      where: { name: roleName },
    });
  }
}
