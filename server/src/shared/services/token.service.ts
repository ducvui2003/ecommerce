import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import envConfig from 'src/configs/env.config';
import {
  JwtCustomClaims,
  JwtData,
  JwtPayload,
} from 'src/shared/types/jwt.type';
import ms from 'ms';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async signAccessToken(customPayload: JwtCustomClaims): Promise<JwtData> {
    // issue at:  thời gian tạo jwt (epoch timestamp second)
    const iat = Math.floor(Date.now() / 1000);
    // expires in:  thời gian hết hạn jwt (epoch timestamp second)
    const exp = iat + Math.floor(ms(envConfig.ACCESS_TOKEN_EXPIRY) / 1000);
    // jwt id
    const jti = uuidv4();

    const payload: JwtPayload = {
      ...customPayload,
      iat: iat,
      exp: exp,
      jti: jti,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: envConfig.ACCESS_TOKEN_SECRET,
      algorithm: 'HS256',
    });

    return {
      token: token,
      iat: iat,
      exp: exp,
      jti: jti,
    };
  }

  async signRefreshToken(customPayload: JwtCustomClaims): Promise<JwtData> {
    // issue at:  thời gian tạo jwt (epoch timestamp second)
    const iat = Math.floor(Date.now() / 1000);
    // expires in:  thời gian hết hạn jwt (epoch timestamp second)
    const exp = iat + Math.floor(ms(envConfig.ACCESS_TOKEN_EXPIRY) / 1000);
    // jwt id
    const jti = uuidv4();

    const payload: JwtPayload = {
      ...customPayload,
      iat: iat,
      exp: exp,
      jti: jti,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: envConfig.REFRESH_TOKEN_SECRET,
      algorithm: 'HS256',
    });

    return {
      token: token,
      iat: iat,
      exp: exp,
      jti: jti,
    };
  }

  verifyAccessToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: envConfig.ACCESS_TOKEN_SECRET,
    });
  }

  verifyRefreshToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: envConfig.REFRESH_TOKEN_SECRET,
    });
  }
}
