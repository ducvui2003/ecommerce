import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY, RoleName } from '@shared/constants/auth.constant';

export const Roles = (roles: RoleName[] | RoleName) =>
  SetMetadata(ROLES_KEY, Array.isArray(roles) ? roles : [roles]);
