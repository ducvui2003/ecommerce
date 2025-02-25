export const REQUEST_USER_KEY = 'user';
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
