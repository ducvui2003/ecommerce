export type JwtCustomClaims = {
  id: number;
  email: string;
};

export type JwtPayload = JwtCustomClaims & {
  iat: number;
  exp: number;
  jti: string;
};

export type JwtData = {
  token: string;
  iat: number;
  exp: number;
  jti: string;
};
