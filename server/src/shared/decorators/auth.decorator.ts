import { SetMetadata } from '@nestjs/common';
import {
  AUTH_TYPE_KEY,
  AuthType,
  ConditionType,
} from 'src/shared/constants/auth.constant';

export type AuthTypeDecoratorPayload = {
  authType: AuthType[];
  options: {
    condition: ConditionType;
  };
};

export const Auth = (
  authTypes: AuthType[],
  options?: {
    condition: ConditionType | undefined;
  },
) => {
  return SetMetadata(AUTH_TYPE_KEY, {
    authType: authTypes,
    options: options ?? {
      condition: ConditionType.And,
    },
  });
};
