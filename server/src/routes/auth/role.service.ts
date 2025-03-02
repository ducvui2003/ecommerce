import { Inject, Injectable } from '@nestjs/common';
import { RoleName } from '@route/auth/auth.const';
import { AuthRepository } from '@route/auth/auth.repository';

@Injectable()
export class RoleService {
  private clientRoleId: number | null = null;
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
  ) {}

  async getClientRoleId() {
    if (this.clientRoleId) return this.clientRoleId;
    const role = await this.authRepository.getRoleIdByRoleNameOrThrown(
      RoleName.USER,
    );
    this.clientRoleId = role.id;
    return this.clientRoleId;
  }
}
