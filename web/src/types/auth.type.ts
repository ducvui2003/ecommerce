export type RefreshTokenResType = {
  accessToken: string;
  refreshToken: string;
  exp: number;
};

export type LoginResType = RefreshTokenResType & {
  id: number;
  email: string;
  image?: string | undefined;
};
