import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import envConfig from 'src/shared/config';
import { JWTPayload } from 'src/shared/types/jwt.type';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  signAccessToken(payload: JWTPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: envConfig.ACCESS_TOKEN_SECRET,
      expiresIn: envConfig.ACCESS_TOKEN_EXPIRY,
      algorithm: 'HS256',
    });
  }

  signRefreshToken(payload: JWTPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: envConfig.REFRESH_TOKEN_SECRET,
      expiresIn: envConfig.REFRESH_TOKEN_EXPIRY,
      algorithm: 'HS256',
    });
  }

  verifyAccessToken(token: string): Promise<JWTPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: envConfig.ACCESS_TOKEN_SECRET,
    });
  }

  verifyRefreshToken(token: string): Promise<JWTPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: envConfig.REFRESH_TOKEN_SECRET,
    });
  }
}
