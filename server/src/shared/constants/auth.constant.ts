export const REQUEST_USER_KEY = 'user';
export const X_API_KEY = 'x-api-key';
export const AUTH_TYPE_KEY = 'authType';

export const AuthType = {
  Bearer: 'Bearer',
  None: 'None',
  APIKey: 'ApiKey',
} as const;

export type AuthType = (typeof AuthType)[keyof typeof AuthType];

export const ConditionType = {
  And: 'and',
  Or: 'or',
} as const;

export type ConditionType = (typeof ConditionType)[keyof typeof ConditionType];

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BLOCKED: 'BLOCKED',
} as const;

export const VerificationType = {
  REGISTER: 'REGISTER',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
} as const;

export type TypeOfVerificationType =
  (typeof VerificationType)[keyof typeof VerificationType];
