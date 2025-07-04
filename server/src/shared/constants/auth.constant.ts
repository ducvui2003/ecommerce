export const REQUEST_USER_KEY = 'user';
export const API_KEY = 'apikey';
export const AUTH_TYPE_KEY = 'authType';
export const ROLES_KEY = 'role';
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

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]; // 'ACTIVE' | 'INACTIVE' | 'BLOCKED'

export const VerificationType = {
  REGISTER: 'REGISTER',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
} as const;

export const RoleName = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type RoleName = (typeof RoleName)[keyof typeof RoleName];

export type TypeOfVerificationType =
  (typeof VerificationType)[keyof typeof VerificationType];
