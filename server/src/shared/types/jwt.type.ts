export class JwtCustomClaims {
  id: number;
  email: string;
}

export class JwtPayload extends JwtCustomClaims {
  iat: number;
  exp: number;
  jti: string;
}
