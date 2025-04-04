import { Inject, Injectable } from '@nestjs/common';
import { RoleName } from '@route/auth/auth.const';
import { AuthRepository } from '@route/auth/auth.repository';
import { SharedRoleRepository } from '@shared/repositories/shared-role.repository';

@Injectable()
export class RoleService {
  private clientRoleId: number | null = null;
  constructor(private readonly sharedRoleRepository: SharedRoleRepository) {}

  async getClientRoleId() {
    if (this.clientRoleId) return this.clientRoleId;
    const role = await this.sharedRoleRepository.getRoleIdByRoleNameOrThrown(
      RoleName.USER,
    );
    this.clientRoleId = role.id;
    return this.clientRoleId;
  }
}
